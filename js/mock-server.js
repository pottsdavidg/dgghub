/* =====================================================================
   MOCK SERVER  (delete this file when the FastAPI backend exists)
   ---------------------------------------------------------------------
   HTMX sends real requests (hx-get / hx-post) to paths like /app/bills.
   In the prototype there is no backend, so this file intercepts those
   requests in the browser and hands them to the handlers in routes.js.

   Each route("GET", "/path/{id}", handler) maps 1:1 to a FastAPI route:
       @app.get("/path/{id}", response_class=HTMLResponse)
   Handlers receive { params, query, form, res } and return an HTML
   string. res.toast(), res.trigger(), res.retarget() set the same
   HX-* response headers your FastAPI handlers will set.
   ===================================================================== */
(function () {
  const ROUTES = [];

  window.route = function (method, pattern, handler) {
    const keys = [];
    const re = new RegExp('^' + pattern.replace(/\{(\w+)\}/g, (_, k) => { keys.push(k); return '([^/]+)'; }) + '$');
    ROUTES.push({ method, re, keys, handler });
  };

  function makeRes() {
    const headers = {}, triggers = {};
    return {
      headers, triggers, status: 200,
      toast(msg) { triggers.toast = msg; },
      trigger(name, value) { triggers[name] = value ?? true; },
      retarget(sel, swap) { headers['HX-Retarget'] = sel; if (swap) headers['HX-Reswap'] = swap; },
    };
  }

  function handle(method, url, body) {
    const u = new URL(url, location.href);
    const query = Object.fromEntries(u.searchParams);
    const form = Object.fromEntries(new URLSearchParams(typeof body === 'string' ? body : ''));
    for (const r of ROUTES) {
      if (r.method !== method) continue;
      const m = u.pathname.match(r.re);
      if (!m) continue;
      const params = Object.fromEntries(r.keys.map((k, i) => [k, decodeURIComponent(m[i + 1])]));
      const res = makeRes();
      let html = '';
      try { html = r.handler({ params, query, form, res }) ?? ''; }
      catch (e) { console.error('[mock-server]', method, u.pathname, e); res.status = 500; html = ''; res.toast('Something went wrong: ' + e.message); }
      if (Object.keys(res.triggers).length) res.headers['HX-Trigger'] = JSON.stringify(res.triggers);
      return { status: res.status, headers: res.headers, body: html, path: u.pathname + u.search };
    }
    console.warn('[mock-server] no route for', method, u.pathname);
    return { status: 404, headers: { 'HX-Trigger': JSON.stringify({ toast: 'No route for ' + method + ' ' + u.pathname }) }, body: '', path: u.pathname };
  }

  /* Minimal XMLHttpRequest stand-in. Only paths starting with "/" are
     intercepted; anything else falls through to the real XHR. */
  const RealXHR = window.XMLHttpRequest;
  function MockXHR() {
    this._real = null; this._listeners = {}; this._rh = {};
    this.readyState = 0; this.status = 0; this.response = ''; this.responseText = '';
    this.upload = { addEventListener() {} };
  }
  MockXHR.prototype.open = function (method, url) {
    this._method = String(method).toUpperCase(); this._url = url;
    if (!String(url).startsWith('/')) { this._real = new RealXHR(); this._real.open.apply(this._real, arguments); }
    this.readyState = 1;
  };
  MockXHR.prototype.setRequestHeader = function (k, v) { if (this._real) this._real.setRequestHeader(k, v); };
  MockXHR.prototype.overrideMimeType = function () {};
  MockXHR.prototype.addEventListener = function (t, fn) { (this._listeners[t] = this._listeners[t] || []).push(fn); };
  MockXHR.prototype.removeEventListener = function () {};
  MockXHR.prototype.getAllResponseHeaders = function () { return Object.entries(this._rh).map(([k, v]) => k + ': ' + v).join('\r\n'); };
  MockXHR.prototype.getResponseHeader = function (k) {
    const key = Object.keys(this._rh).find(h => h.toLowerCase() === String(k).toLowerCase());
    return key ? this._rh[key] : null;
  };
  MockXHR.prototype.abort = function () {};
  MockXHR.prototype._fire = function (t) {
    const ev = { type: t, target: this, currentTarget: this, lengthComputable: false, loaded: 0, total: 0 };
    if (typeof this['on' + t] === 'function') this['on' + t](ev);
    (this._listeners[t] || []).forEach(fn => fn.call(this, ev));
  };
  MockXHR.prototype.send = function (body) {
    if (this._real) {
      const r = this._real, self = this;
      r.onload = function () { self.status = r.status; self.response = self.responseText = r.responseText; self._rh = {}; self.readyState = 4; self._fire('load'); self._fire('loadend'); };
      r.onerror = function () { self._fire('error'); self._fire('loadend'); };
      return r.send(body);
    }
    setTimeout(() => {
      const out = handle(this._method, this._url, body);
      this.status = out.status; this._rh = out.headers;
      this.response = this.responseText = out.body;
      this.responseURL = location.origin + out.path;
      this.readyState = 4;
      this._fire('load'); this._fire('loadend');
    }, 30);
  };
  window.XMLHttpRequest = MockXHR;
  window.__mockHandle = handle;   // exposed for automated tests only
})();
