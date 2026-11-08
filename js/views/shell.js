/* ---------- pop-ups (each has a "don't show again" checkbox) ---------- */
const BENEFITS=[['pin','Save your information','Your location and lookups are saved, so you never have to enter them again.'],['star','Keep your progress','Save Civics 101 progress and game scores, and share games with friends.'],['flask','Unlock more tools','DGG Media, Local Chapter, Election Data, and a path into the Democracy Lab.']];
const modalWrap=inner=>`<div id="modal" hx-swap-oob="innerHTML"><div class="modal-back"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="mtitle">${inner}</div></div></div>`;
const T_modal_clear=()=>`<div id="modal" hx-swap-oob="innerHTML"></div>`;
const mclose=`<button class="iconbtn mclose" hx-post="/ui/modal/close" hx-swap="none" aria-label="Close">${ic('x')}</button>`;
function T_prompt_account(title,text){
 return modalWrap(`${mclose}<span class="label">Free account</span><h2 id="mtitle">${title}</h2><p class="mtext">${text}</p>
 <ul class="mbenefits">${BENEFITS.map(([i,t,d])=>`<li>${ic(i)}<span><b>${t}</b>${d}</span></li>`).join('')}</ul>
 <form class="mfoot" hx-post="/ui/modal/close" hx-swap="none"><label class="checkrow"><input type="checkbox" name="dont_show" value="account">Don't show me these pop-ups again</label>
  <div class="mbtns"><button type="submit" class="btn ghost">Not now</button><button type="button" class="btn primary" hx-get="/auth/modal/signup" hx-swap="none">Create free account</button></div></form>`);
}
function T_prompt_team(title,text){
 return modalWrap(`${mclose}<span class="label">DGG Team</span><h2 id="mtitle">${title}</h2><p class="mtext">${text}</p>
 <ul class="mbenefits">${[['flask','The Democracy Lab','The Blue Book, Election Models, the Tracker Suite, and the Rolodex.'],['users','Your own team','Tasks, an inbox, and contacts for the people you organize with.'],['target','Real-world impact','Help run canvasses and write the community ballot breakdowns.']].map(([i,t,d])=>`<li>${ic(i)}<span><b>${t}</b>${d}</span></li>`).join('')}</ul>
 <form class="mfoot" hx-post="/ui/modal/close" hx-swap="none"><label class="checkrow"><input type="checkbox" name="dont_show" value="team">Don't show me these pop-ups again</label>
  <div class="mbtns"><button type="submit" class="btn ghost">Not now</button><button type="button" class="btn primary" hx-post="/ui/modal/join" hx-swap="none">Find my team · 2 min</button></div></form>`);
}
function T_auth_modal(mode,join){
 const su=mode==='signup';
 return modalWrap(`${mclose}<div class="seg mtabs" role="tablist"><button role="tab" aria-selected="${!su}" aria-pressed="${!su}" hx-get="/auth/modal/signin" hx-swap="none">Sign in</button><button role="tab" aria-selected="${su}" aria-pressed="${su}" hx-get="/auth/modal/signup" hx-swap="none">Create account</button></div>
 <h2 id="mtitle">${su?'Create your free account':'Welcome back'}</h2>
 ${su?`<p class="mtext">Your location, lookups, and pins are saved, so you won't have to enter them again.</p>`:''}
 <form class="auth-fields" hx-post="${su?'/auth/signup':'/auth/signin'}" hx-swap="none">
  ${su?`<div class="field"><label class="label" for="m-name">Full name</label><input id="m-name" name="name" value="Jordan Ellis" autocomplete="name"></div>`:''}
  <div class="field"><label class="label" for="m-email">Email</label><input id="m-email" name="email" type="email" value="jordan.ellis@example.org" autocomplete="email"></div>
  <div class="field"><label class="label" for="m-pw">Password</label><input id="m-pw" name="password" type="password" value="demo-password" autocomplete="${su?'new':'current'}-password"></div>
  ${su?`<fieldset class="addrset"><legend class="label">Home address <span class="d">(fills in your ballot, representatives, and dates)</span></legend>
   <div class="field"><label class="sr" for="m-addr">Street address</label><input id="m-addr" name="address" placeholder="Street address" autocomplete="street-address" value="${esc(CTX().location?.address||'1420 Neil Ave')}"></div>
   <div class="addrrow"><div class="field"><label class="sr" for="m-city">City</label><input id="m-city" name="city" placeholder="City" autocomplete="address-level2" value="${esc(CTX().location?.city||'Columbus')}"></div>
    <div class="field"><label class="sr" for="m-state">State</label><select id="m-state" name="state" autocomplete="address-level1"><option value="">State</option>${STATE_OPTS(CTX().location?.state||'OH')}</select></div>
    <div class="field"><label class="sr" for="m-zip">ZIP</label><input id="m-zip" name="zip" placeholder="ZIP" inputmode="numeric" autocomplete="postal-code" value="${esc(CTX().location?.zip||'43201')}"></div></div></fieldset>
  <label class="checkrow"><input type="checkbox" name="join" value="1" ${join?'checked':''}>I want to join a Digital Ground Game team</label>`:''}
  <button class="btn primary block" type="submit">${su?'Create account':'Sign in'}</button>
 </form><p class="demo-note" style="margin:0">Prototype: any email and password work.</p>`);
}

/* ---------- header ---------- */
const PUBLIC_PAGES=['about','regions','region','mailing'];
function T_header(u,page){
 const L=(k,l,a)=>`<button class="hlink" ${a} ${k===(PUBLIC_PAGES.includes(page)?(page==='mailing'?'':'about'):'hub')?'aria-current="page"':''}>${l}</button>`;
 const init=(u.name||'').split(' ').map(x=>x[0]).join('').slice(0,2);
 return `<header class="hubhead"><div class="hubhead-in">
  <button class="iconbtn menubtn" data-ui="menu-open" aria-label="Open menu">${ic('menu')}</button>
  <button class="hbrand" ${nav('home')}>${HUB_NAME}</button>
  <nav class="hlinks" aria-label="Site">${L('hub','Home',nav('home'))}<span class="hsep" aria-hidden="true">-</span>${L('about','About us',nav('about'))}<span class="hsep" aria-hidden="true">-</span><a class="hlink" href="${DISCORD_URL}" target="_blank" rel="noopener">Discord${ic('ext')}</a></nav>
  <div class="hacts">
   <button class="hmail" ${nav('mailing')} aria-label="Join the mailing list" title="Join the mailing list">${ic('mail')}</button>
   <a class="btn sm red" href="${DONATE_URL}" target="_blank" rel="noopener">${ic('heart')}<span class="hide-sm">Donate</span></a>
   ${isV(u)?`<button class="btn sm primary" hx-get="/auth/modal/signin" hx-swap="none">Sign in</button>`
   :`<details class="umenu"><summary aria-label="Account menu"><span class="avatar av-sm">${init}</span><span class="hide-sm">${esc(u.first)}</span>${ic('down')}</summary><div class="umenu-list"><div class="umenu-who"><b>${esc(u.name)}</b><span>${isMember(u)&&u.team?TEAMS[u.team].n:'Account'}</span></div><button ${nav('settings')}>${ic('gear')}Settings</button><button hx-post="/auth/signout" hx-target="#root">${ic('logout')}Sign out</button></div></details>`}
  </div></div></header>`;
}

/* ---------- sidebar ---------- */
const PARENT={rep:'reps',bill:'bills',article:'wiki',region:'about',regions:'about'};
const GOV=[['register','Registration','badge'],['ballot','Sample Ballot','ballot'],['reps','Representation','users'],['bills','Bills & Laws','doc'],['history','Voting History','history']];
const CIVICS_NAV=['civics','Civics 101','cap'];
const LAB=[['wiki','The Blue Book','book'],['model','Election Models','chart'],['trackers','Tracker Suite','track'],['rolodex','Rolodex','phone']];
const TEAMNAV=[['contact','Contact','idcard'],['inbox','Inbox','mail'],['tasks','Tasks','check'],['chapter','Local Chapter','pin'],['ops','Operations','target']];
function T_sidebar(u,page){
 const cur=PARENT[page]||page;
 const item=([p,l,i],o={})=>`<button class="navbtn${o.sub?' sub':''}" ${nav(p)} ${cur===p?'aria-current="page"':''} title="${l}"><span class="nico">${ic(i)}</span><span class="nlabel">${l}</span>${o.lock?ic('lock','lk'):''}${o.badge||''}</button>`;
 const drop=(label,icon,items,o={})=>{const inside=items.some(x=>x[0]===cur);return `<details class="navdetails" ${inside||o.open?'open':''}><summary class="navbtn navdrop" title="${label}" ${inside?'data-inside="1"':''}><span class="nico">${ic(icon)}</span><span class="nlabel">${label}</span>${ic('back','chev')}</summary><div class="navsub">${items.map(x=>item(x,{sub:1,lock:o.lock})).join('')}</div></details>`};
 const group=n=>`<div class="navgroup"><span class="nlabel">${n}</span></div>`;
 const unread=MESSAGES.filter(m=>m.unread).length;
 let top,bottom='';
 if(isV(u)){
  top=group('Digital Hub')+item(['home','Dashboard','home'])+GOV.map(x=>item(x)).join('')+item(CIVICS_NAV);
  bottom=item(['resources','Resources','info'])+item(['help','Help','help'])
   +`<button class="navbtn themetoggle" hx-post="/ui/theme/toggle" hx-swap="none" title="Switch between light and dark mode"><span class="nico tt-dark">${ic('moon')}</span><span class="nico tt-light">${ic('sun')}</span><span class="nlabel tt-dark">Dark mode</span><span class="nlabel tt-light">Light mode</span></button>`;
 } else {
  top=group('Digital Hub')+item(['home','Dashboard','home'])+drop('Your Government','scale',GOV)+item(CIVICS_NAV)
   +group('Digital Tools')+drop('Resources','info',[['resources','Resources','info'],['help','Help & FAQ','help']])+item(['media','Political Media','play'])
   +(isMember(u)?'':item(['chapter','Local Chapter','pin']))+item(['elections','Election Data','map'],{badge:'<span class="freetag">Soon</span>'})
   +drop('Democracy Lab','flask',LAB,{lock:!isMember(u)})
   +(isMember(u)?group('DGG Team')+TEAMNAV.map(x=>item(x,{badge:x[0]==='inbox'&&unread?`<span class="navcount">${unread}</span>`:''})).join(''):'');
  bottom=isMember(u)?`<div class="teamtag" title="${TEAMS[u.team].n}"><span class="nico">${ic(TEAMS[u.team].icon)}</span><span class="nlabel">${TEAMS[u.team].n}</span></div>`
   :`<button class="jointeam" ${nav('join')} title="Join team"><span class="nico">${ic('users')}</span><span class="nlabel">Join Team</span></button>`;
 }
 return `<aside class="side" id="side">
  <div class="side-head patwrap tilebg dark"><button class="side-logo-btn" ${nav('home')} aria-label="Dashboard"><img class="side-logo" src="img/logo-white.png" alt="Digital Ground Game"></button>
   <button class="side-toggle" data-ui="side-toggle" aria-label="Collapse sidebar" title="Collapse sidebar">${ic('back')}</button></div>
  <button class="side-expand" data-ui="side-toggle" aria-label="Expand sidebar" title="Expand sidebar">${ic('menu')}<span>DGG</span></button>
  <nav class="side-nav" aria-label="Main">${top}</nav>
  <div class="side-bottom">${bottom}</div>
 </aside>`;
}
function T_shell(u,page,content){
 return T_header(u,page)+`<div id="app">${T_sidebar(u,page)}<div class="scrim" data-ui="menu-close"></div><main class="main"><div class="content" id="content">${content}</div></main></div>`;
}

/* ---------- sign-in required (visitor opening an account page) ---------- */
V.needaccount=(u,q,page)=>`${head('Create a free account','This section is part of a free account.')}
 <section class="panel panel-b" style="display:flex;flex-direction:column;gap:14px;align-items:flex-start;max-width:720px">
  <ul class="mbenefits">${BENEFITS.map(([i,t,d])=>`<li>${ic(i)}<span><b>${t}</b>${d}</span></li>`).join('')}</ul>
  <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn primary" hx-get="/auth/modal/signup" hx-swap="none">Create free account</button><button class="btn ghost" hx-get="/auth/modal/signin" hx-swap="none">Sign in</button></div></section>`;

/* public pages render inside the app shell */
const T_public=(active,inner)=>`<div class="pubpage">${inner}</div>`;
