/* =====================================================================
   VIEWS  (becomes templates/*.html in Jinja2)
   ---------------------------------------------------------------------
   Each T_* / V.* function returns HTML for one template or partial.
   hx-* attributes in the markup are real HTMX and stay as they are.
   ${...} interpolations become {{ ... }} and loops become {% for %}.
   ===================================================================== */
/* ---------- icons ---------- */
const P={
home:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
check:'<path d="M20 6L9 17l-5-5"/>',
badge:'<path d="M12 2l3 3h4v4l3 3-3 3v4h-4l-3 3-3-3H5v-4l-3-3 3-3V5h4z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
users:'<circle cx="9" cy="8" r="4"/><path d="M1 21v-1a7 7 0 0114 0v1"/><path d="M16 4a4 4 0 010 8M23 21v-1a7 7 0 00-5-6.7"/>',
history:'<path d="M3 12a9 9 0 103-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 3"/>',
doc:'<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
ballot:'<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 8l1.5 1.5L12 7M8 15l1.5 1.5L12 14M14 8.5h3M14 15.5h3"/>',
track:'<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 6-7"/>',
scale:'<path d="M12 3v18M5 21h14M3 7h18"/><path d="M6 7l-3 7a3 3 0 006 0zM18 7l-3 7a3 3 0 006 0z"/>',
book:'<path d="M4 19.5A2.5 2.5 0 016.5 17H20V3H6.5A2.5 2.5 0 004 5.5z"/><path d="M4 19.5A2.5 2.5 0 006.5 22H20v-5"/>',
chart:'<path d="M12 20V10M18 20V4M6 20v-4"/>',
lock:'<rect x="4" y="11" width="16" height="10" rx="1"/><path d="M8 11V7a4 4 0 018 0v4"/>',
heart:'<path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 000-7.8z"/>',
logout:'<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>',
menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
star:'<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
bell:'<path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0"/>',
linkedin:'<rect x="2" y="2" width="20" height="20" rx="3"/><path d="M7 10v7M7 7v.01M11 17v-7M11 13a3 3 0 016 0v4"/>',
ext:'<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>',
back:'<path d="M15 18l-6-6 6-6"/>',
pen:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/>',
play:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M10 9l5 3-5 3z"/>',
cam:'<path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/>',
mic:'<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v1a7 7 0 0014 0v-1M12 18v4M8 22h8"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
moon:'<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>',
cap:'<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5M22 10v6"/>',
code:'<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>',
mega:'<path d="M3 11v2a1 1 0 001 1h3l5 4V6L7 10H4a1 1 0 00-1 1z"/><path d="M16 8a5 5 0 010 8M19 5a9 9 0 010 14"/>',
door:'<path d="M14 3H5v18h9"/><path d="M10 12h11M18 9l3 3-3 3"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
chat:'<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><path d="M8 9h8M8 13h5"/>',
gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/>',
up:'<path d="M18 15l-6-6-6 6"/>',
down:'<path d="M6 9l6 6 6-6"/>',
mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/>',
send:'<path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>',
mega2:'<path d="M3 11v2a1 1 0 001 1h3l5 4V6L7 10H4a1 1 0 00-1 1z"/>',
pin:'<path d="M12 17v5"/><path d="M9 10.8V4h6v6.8l3 3.2v2H6v-2z"/>',
flag:'<path d="M4 22V4"/><path d="M4 4h13l-2 4 2 4H4"/>',
info:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 11v6M12 7.5v.01"/>',
help:'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 015.8 1c0 2-3 3-3 3M12 17h.01"/>',
map:'<path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4z"/><path d="M8 2v16M16 6v16"/>',
flask:'<path d="M9 3h6M10 3v6L4 20a1 1 0 001 1h14a1 1 0 001-1L14 9V3"/><path d="M7 15h10"/>',
idcard:'<rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="8" cy="11" r="2.5"/><path d="M4.5 17a3.5 3.5 0 017 0M14 9h5M14 13h5"/>',
target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
x:'<path d="M18 6L6 18M6 6l12 12"/>',
pin:'<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
cal:'<rect x="3" y="4" width="18" height="18" rx="1"/><path d="M16 2v4M8 2v4M3 10h18"/>',
gavel:'<path d="M14 13l-7.5 7.5a2.1 2.1 0 01-3-3L11 10"/><path d="M16 16l6-6M8 8l6-6M9 7l8 8M21 11l-8-8"/>',
phone:'<path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z"/>',
};
const ic=(n,c='')=>`<svg class="${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;


const V={};
/* =====================================================================
   HTMX helpers  (become Jinja macros)
   ===================================================================== */
const esc=s=>String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
// Full-page navigation inside the app: swaps the whole shell so the sidebar state stays in sync.
const nav=(page,qs='')=>`hx-get="/app/${page}${qs}" hx-target="#root" hx-swap="innerHTML show:window:top"`;
// Placeholder for actions that will become real endpoints (RSVP, follow, message...). Shows a toast.
const act=msg=>`hx-post="/actions/notify" hx-vals="${esc(JSON.stringify({msg}))}" hx-swap="none"`;
const vals=o=>`hx-vals="${esc(JSON.stringify(o))}"`;
const arrow=()=>ic('back').replace('<svg','<svg style="width:16px;transform:rotate(180deg)"');
const ACCOUNT_LABEL={visitor:'Visitor',account:'Account',member:'Team Member'};
const daysLeftN=()=>daysLeft();

const head=(t,p,right='',crumb='')=>`<div class="pagehead"><div>${crumb}<h1>${t}</h1>${p?`<p>${p}</p>`:''}</div>${right}</div>`;
const crumb=(page,l)=>`<button class="crumb" ${nav(page)}>${ic('back')}${l}</button>`;
const PARTY={D:'Democrat',R:'Republican',I:'Independent',N:'Nonpartisan',L:'Libertarian',G:'Green'};
const party=p=>`<span class="party ${p}" title="${PARTY[p]}">${p==='N'?'NP':p}</span>`;
const pipe=s=>`<div class="pipe" aria-label="${STAGES[s]}">${STAGES.map((_,i)=>`<i class="${i<=s?'on':''}"></i>`).join('')}</div>`;
const modbar=(name,host,url)=>`<div class="modbar"><span class="dot"></span><b class="label" style="color:#fff">Connected module</b><span>${name}</span><code>${host}</code>${url?`<a class="btn sm" href="${url}" target="_blank" rel="noopener">${ic('ext')}Open full app</a>`:`<button class="btn sm" ${act('Would open the full '+name+' app in a new tab')}>${ic('ext')}Open full app</button>`}</div>`;
const sampleBar=(u,n)=>u.account==='member'?'':`<div class="samplebar"><span class="pro">Open preview</span><span class="msg"><b>${n} is open to everyone.</b> Join a team to unlock the rest of the Democracy Lab: four trackers and the Election Model.</span><button class="btn primary" ${nav('join')}>Join a team</button></div>`;
function gate(u,title,inner){
 if(u.account==='member')return inner;
 const v=u.account==='visitor';
 return `<div class="locked"><div class="ghost" aria-hidden="true" inert>${inner}</div><div class="lockcard"><div>
  <span class="chip yel">${ic('flask')}Democracy Lab</span><h2>${title} is for team members</h2>
  <p>${v?'Create a free account, then join a DGG team':'Join a DGG team'} to unlock the Democracy Lab: The Blue Book, Election Models, and the Tracker Suite. A two-minute quiz finds where you fit.</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap">${v?`<button class="btn primary" hx-get="/auth/modal/signup" hx-swap="none">Create free account</button>`:`<button class="btn primary" ${nav('join')}>Join a team</button>`}</div></div></div></div>`;
}

/* =====================================================================
   POLITICAL HUB v3: shell, navigation, pop-ups, pins, and pages
   Three access levels: u.account = 'visitor' | 'account' | 'member'
   ===================================================================== */
const isV=u=>u.account==='visitor', isMember=u=>u.account==='member';
const PARTY_LABEL={D:'Democrat',R:'Republican',B:'Bipartisan'};
const partyChip=p=>p?`<span class="pchip ${p}">${PARTY_LABEL[p]}</span>`:'';
const fmtDate=iso=>{const d=new Date(iso+'T12:00:00');return {m:d.toLocaleDateString('en-US',{month:'short'}).toUpperCase(),d:d.getDate(),long:d.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',year:'numeric'})}};
const daysUntil=iso=>Math.ceil((new Date(iso+'T07:00:00')-new Date())/864e5);

/* ---------- pins ---------- */
const isPinned=(u,k)=>(u.pins||[]).includes(k);
const pinBtn=(u,k)=>`<button class="pinbtn" aria-pressed="${isPinned(u,k)}" title="${isPinned(u,k)?'Unpin from dashboard':'Pin to dashboard'}" hx-post="/pins/toggle" ${vals({key:k})} hx-swap="outerHTML">${ic('pin')}<span>${isPinned(u,k)?'Pinned':'Pin'}</span></button>`;
const flagBtn=(u,k)=>`<button class="flagbtn" aria-pressed="${isPinned(u,k)}" aria-label="${isPinned(u,k)?'Unpin':'Pin'} this bill" title="${isPinned(u,k)?'Unpin from dashboard':'Pin to dashboard'}" hx-post="/pins/toggle" ${vals({key:k,style:'flag'})} hx-swap="outerHTML">${ic('flag')}</button>`;
const ph=(title,right='')=>`<div class="panel-h"><h2>${title}</h2><div class="ph-r">${right}</div></div>`;

/* Module credits: small cards crediting the people who built a module. */
const credits=(list,heading='Built by')=>`<section class="credits" aria-label="${heading}">
 <h2 class="label">${heading}</h2>
 <div class="creditgrid">${list.map(p=>`<article class="ccard">
  <div class="ccard-h">${p.img?`<img class="cphoto" src="${p.img}" alt="">`:`<span class="cphoto" style="background:${p.c}" aria-hidden="true">${p.ini}</span>`}
   <div><b>${p.n}</b><span>${p.title}</span></div></div>
  ${p.blurb.length>160?`<p class="cblurb clamp">${p.blurb}</p><button type="button" class="cmore" aria-expanded="false" onclick="const o=this.previousElementSibling.classList.toggle('clamp');this.setAttribute('aria-expanded',!o);this.textContent=o?'Read more':'Show less'">Read more</button>`:`<p class="cblurb">${p.blurb}</p>`}
  ${p.links.length?`<div class="clinks">${p.links.map(([l,u,i])=>`<a href="${u}" target="_blank" rel="noopener">${ic(i||'ext')}${l}</a>`).join('')}</div>`:''}
 </article>`).join('')}</div>
</section>`;
