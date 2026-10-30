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
x:'<path d="M18 6L6 18M6 6l12 12"/>',
pin:'<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
cal:'<rect x="3" y="4" width="18" height="18" rx="1"/><path d="M16 2v4M8 2v4M3 10h18"/>',
gavel:'<path d="M14 13l-7.5 7.5a2.1 2.1 0 01-3-3L11 10"/><path d="M16 16l6-6M8 8l6-6M9 7l8 8M21 11l-8-8"/>',
phone:'<path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z"/>',
};
const ic=(n,c='')=>`<svg class="${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;


/* =====================================================================
   HTMX helpers  (become Jinja macros)
   ===================================================================== */
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
// Full-page navigation inside the app: swaps the whole shell so the sidebar state stays in sync.
const nav=(page,qs='')=>`hx-get="/app/${page}${qs}" hx-target="#root" hx-swap="innerHTML show:window:top"`;
// Placeholder for actions that will become real endpoints (RSVP, follow, message...). Shows a toast.
const act=msg=>`hx-post="/actions/notify" hx-vals="${esc(JSON.stringify({msg}))}" hx-swap="none"`;
const vals=o=>`hx-vals="${esc(JSON.stringify(o))}"`;
const arrow=()=>ic('back').replace('<svg','<svg style="width:16px;transform:rotate(180deg)"');
const ACCOUNT_LABEL={basic:'Citizen · Basic',advanced:'Citizen · Advanced',member:'Team Member'};
const daysLeftN=()=>daysLeft();

const head=(t,p,right='',crumb='')=>`<div class="pagehead"><div>${crumb}<h1>${t}</h1>${p?`<p>${p}</p>`:''}</div>${right}</div>`;
const crumb=(page,l)=>`<button class="crumb" ${nav(page)}>${ic('back')}${l}</button>`;
const PARTY={D:'Democrat',R:'Republican',I:'Independent',N:'Nonpartisan',L:'Libertarian',G:'Green'};
const party=p=>`<span class="party ${p}" title="${PARTY[p]}">${p==='N'?'NP':p}</span>`;
const pipe=s=>`<div class="pipe" aria-label="${STAGES[s]}">${STAGES.map((_,i)=>`<i class="${i<=s?'on':''}"></i>`).join('')}</div>`;
const modbar=(name,host)=>`<div class="modbar"><span class="dot"></span><b class="label" style="color:#fff">Connected module</b><span>${name}</span><code>${host}</code><button class="btn sm" ${act('Would open the full '+name+' app in a new tab')}>${ic('ext')}Open full app</button></div>`;
const sampleBar=(u,n)=>u.account==='member'?'':`<div class="samplebar"><span class="pro">Open preview</span><span class="msg"><b>${n} is open to everyone.</b> Join a team to unlock the rest of the Democracy Lab: four trackers, the Election Model, and the Rolodex.</span><button class="btn primary" ${nav('join')}>Join a team</button></div>`;
function gate(u,title,inner){
 if(u.account==='member')return inner;
 return `<div class="locked"><div class="ghost" aria-hidden="true" inert>${inner}</div><div class="lockcard"><div>
  <span class="chip yel">${ic('users')}Democracy Lab</span><h2>${title} is for team members</h2>
  <p>Join a DGG team to unlock the Trackers, the Election Model, and the Rolodex. A five-question quiz finds where you fit.</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn primary" ${nav('join')}>Join a team</button><button class="btn ghost" ${nav('wiki')}>Preview The Blue Book</button></div></div></div></div>`;
}

/* =====================================================================
   AUTH TEMPLATES  (templates/auth/*.html)
   ===================================================================== */
const authPage=inner=>T_sitenav('hub')+`<div id="auth"><section class="auth-form"><div class="auth-card">${inner}</div></section></div>`;
const tagline=(sub=true)=>`<div class="tagline"><div class="slogan"><span class="r">Vote</span> loud,<br><span class="r">Lead</span> louder</div>${sub?'<p>Your government in one place: registration, representatives, bills, and ballots. Plus the tools our teams use to win.</p>':''}</div>`;
const authBack=(path,l='Back')=>`<button class="crumb" hx-get="${path}" hx-target="#root" style="align-self:flex-start">${ic('back')}${l}</button>`;

const T_auth_landing=()=>authPage(`${tagline()}
 <p class="auth-q">Do you have a Digital Ground Game account?</p>
 <div class="auth-choice">
  <button class="btn primary block" hx-get="/auth/signin" hx-target="#root">Sign in</button>
  <button class="btn block" hx-get="/auth/signup" hx-target="#root">Create an account</button>
 </div>
 <a class="sitelinkout" href="${SITE_URL}" target="_blank" rel="noopener">${ic('ext')}<span><b>Visit digitalgroundgame.org</b><small>Our main website while the hub is in beta</small></span></a>
 <p class="demo-note">Prototype: any email and password work. Every name, bill, and figure inside is sample data.</p>`);

const T_auth_signin=()=>authPage(`${authBack('/auth')}${tagline(false)}
 <form class="auth-fields" hx-post="/auth/signin" hx-target="#root">
  <div class="field"><label class="label" for="f-email">Email</label><input id="f-email" name="email" type="email" value="jordan.ellis@example.org" autocomplete="email"></div>
  <div class="field"><label class="label" for="f-pw">Password</label><input id="f-pw" name="password" type="password" value="demo-password" autocomplete="current-password"></div>
  <button class="btn primary block" type="submit">Sign in</button>
 </form>
 <p class="demo-note">New here? <button class="linkbtn" hx-get="/auth/signup" hx-target="#root">Create an account</button></p>`);

const ACCOUNTS=[
 ['basic','I just want to check my information.','Citizen · Basic','Your registration, ballot, representatives, bills, and voting history, plus Media and your Local Chapter.'],
 ['advanced','Give me all the details!','Citizen · Advanced','Everything in Basic, plus Know Your Stuff civics games and a preview of the Democracy Lab.'],
 ['member','Can I join your team?','Team Member','Everything, including the full Democracy Lab. A short quiz places you on a DGG team.'],
];
const changeNote=`<div class="note">${ic('gear')}<span>You can change your account type anytime in <b>Settings</b>, so don't worry about picking the perfect one now.</span></div>`;
const T_auth_signup=()=>authPage(`${authBack('/auth')}
 <div class="tagline" style="margin-bottom:6px"><span class="label">Create an account · Step 1</span><div class="slogan" style="font-size:clamp(40px,5vw,60px)">What brings <span class="r">you</span> here?</div></div>
 <div class="acctcards">${ACCOUNTS.map(([k,q,n,d])=>`<button class="acctcard" hx-get="/auth/signup/${k}" hx-target="#root"><b>${q}</b><span class="label">${n}</span><small>${d}</small>${arrow()}</button>`).join('')}</div>
 ${changeNote}`);

const T_auth_details=acct=>{const a=ACCOUNTS.find(x=>x[0]===acct);return authPage(`${authBack('/auth/signup')}
 <div class="tagline" style="margin-bottom:6px"><span class="label">Create an account · Step 2${acct==='member'?' of 3':''}</span><div class="slogan" style="font-size:clamp(36px,4.5vw,54px)">${a[2]}</div><p>${a[3]}</p></div>
 <form class="auth-fields" hx-post="/auth/signup" hx-target="#root">
  <input type="hidden" name="account" value="${acct}">
  <div class="field"><label class="label" for="f-name">Full name</label><input id="f-name" name="name" value="Jordan Ellis" autocomplete="name"></div>
  <div class="field"><label class="label" for="f-zip">Home ZIP code</label><input id="f-zip" name="zip" value="43201" inputmode="numeric" autocomplete="postal-code"></div>
  <div class="field"><label class="label" for="f-email">Email</label><input id="f-email" name="email" type="email" value="jordan.ellis@example.org" autocomplete="email"></div>
  <div class="field"><label class="label" for="f-pw">Password</label><input id="f-pw" name="password" type="password" value="demo-password" autocomplete="new-password"></div>
  <button class="btn primary block" type="submit">${acct==='member'?'Next: find your team':'Create account'}</button>
 </form>
 ${changeNote}`)};

/* ---------- team-matching quiz (used at sign-up and in the app) ---------- */
function teamScores(answers){const sc=Object.fromEntries(TEAM_ORDER.map(k=>[k,0]));answers.forEach((a,i)=>{if(a==null)return;const w=TEAMQUIZ[i][1][a][1];for(const k in w)sc[k]+=w[k]});return sc}
function T_quiz(q){
 const app=q.ctx==='app';
 if(q.step<TEAMQUIZ.length){
  const [text,opts]=TEAMQUIZ[q.step];
  return `<div class="quizbox" id="quizbox">
   <div class="tagline" style="margin-bottom:6px"><span class="label">${app?'Join a team':'Create an account · Step 3 of 3'}</span><div class="slogan" style="font-size:clamp(40px,5vw,60px)">Where do <span class="r">you</span> fit?</div><p>Five quick questions match you with a Digital Ground Game team. You can switch teams later.</p></div>
   <div class="qprog">${TEAMQUIZ.map((_,i)=>`<i class="${i<=q.step?'on':''}"></i>`).join('')}</div>
   <div class="tq-head"><span class="label">Question ${q.step+1} of ${TEAMQUIZ.length}</span><button class="crumb" style="margin:0" hx-post="/quiz/skip" hx-target="#root">${app?'Not now':'Skip for now'}</button></div>
   <div class="tq-q">${text}</div>
   <div class="tq-opts">${opts.map(([l],i)=>`<button class="opt ${q.answers[q.step]===i?'picked':''}" hx-post="/quiz/answer" ${vals({choice:i})} hx-target="#quizbox" hx-swap="outerHTML">${l}</button>`).join('')}</div>
   ${q.step>0?`<button class="btn ghost sm" style="align-self:flex-start" hx-post="/quiz/back" hx-target="#quizbox" hx-swap="outerHTML">${ic('back')}Back</button>`:''}
  </div>`;
 }
 const sc=teamScores(q.answers),max=Math.max(1,...Object.values(sc)),best=TEAM_ORDER.slice().sort((a,b)=>sc[b]-sc[a])[0];
 const pick=q.pick||best,T=TEAMS[pick];
 return `<div class="quizbox" id="quizbox">
  <div class="tagline" style="margin-bottom:6px"><span class="label">Your match</span><div class="slogan" style="font-size:clamp(40px,5vw,60px)">Welcome to the <span class="r">${TEAMS[best].n.replace(' Team','')}</span> team</div></div>
  <div class="teamhero" style="--team:${T.c}"><div class="teamicon">${ic(T.icon)}</div><div><h2>${T.n}</h2><div class="tsub">${T.sub}</div><p>${T.d}</p></div></div>
  <div class="panel panel-b" style="display:flex;flex-direction:column;gap:8px"><span class="label">How you matched</span>${TEAM_ORDER.map(k=>`<div class="teamscore"><span>${TEAMS[k].n}</span><span class="bar"><i style="width:${sc[k]/max*100}%;background:${TEAMS[k].c}"></i></span><span class="mono tab-nums" style="text-align:right">${sc[k]}</span></div>`).join('')}</div>
  <div class="field"><span class="label">Rather join a different team?</span><div class="otherteams">${TEAM_ORDER.map(k=>`<button aria-pressed="${pick===k}" hx-post="/quiz/pick" ${vals({team:k})} hx-target="#quizbox" hx-swap="outerHTML">${ic(TEAMS[k].icon)}${TEAMS[k].n}</button>`).join('')}</div></div>
  <button class="btn primary block" hx-post="/quiz/join" hx-target="#root">Join the ${T.n}${app?'':' and continue'}</button>
  <button class="crumb" style="align-self:center" hx-post="/quiz/restart" hx-target="#quizbox" hx-swap="outerHTML">Retake the quiz</button>
 </div>`;
}
const T_auth_quiz=q=>authPage(T_quiz(q));

/* =====================================================================
   APP SHELL  (templates/base.html + partials/sidebar.html)
   ===================================================================== */
const PARENT={rep:'reps',bill:'bills',article:'wiki'};
const GOV=[['register','Voter registration','badge'],['ballot','My ballot','ballot'],['reps','Representatives','users'],['bills','Bills & laws','doc'],['history','Voting history','history']];
const TRACKERS=[['leg','LegisTracker','track'],['courts','Court Tracker','scale'],['agenda','Agenda Tracker','check'],['exec','ExecuTracker','pen']];

function T_sidebar(u,page){
 const cur=PARENT[page]||page,member=u.account==='member',locked=!member;
 const item=([p,l,i],o={})=>`<button class="navbtn${o.sub?' sub':''}" ${nav(p)} ${cur===p?'aria-current="page"':''}>${ic(i)}${l}${o.lock?ic('lock','lk'):''}${o.tag?`<span class="freetag">${o.tag}</span>`:''}${p==='inbox'&&MESSAGES.some(m=>m.unread)?`<span class="navcount">${MESSAGES.filter(m=>m.unread).length}</span>`:''}</button>`;
 const drop=(label,icon,items,o={})=>{const inside=items.some(x=>x[0]===cur);return `<details class="navdetails" ${inside||o.open?'open':''}><summary class="navbtn navdrop">${ic(icon)}${label}${ic('back','chev')}</summary><div class="navsub">${items.map(x=>item(x,{sub:1,lock:o.lock})).join('')}</div></details>`};
 const group=(name,badge='')=>`<div class="navgroup">${name}${badge}</div>`;
 let hub='',lab='';
 if(u.account==='basic'){
  hub=group('Digital Hub')+item(['home','Dashboard','home'])+GOV.map(x=>item(x)).join('')+item(['media','Media','play'])+item(['chapter','Local Chapter','pin']);
 } else if(u.account==='advanced'){
  hub=group('Digital Hub')+item(['home','Dashboard','home'])+drop('Your Government','scale',GOV)+item(['media','Media','play'])+item(['games','Know Your Stuff','star'])+item(['chapter','Local Chapter','pin']);
 } else {
  hub=group('Digital Hub')+drop('Dashboard','home',[['home','Home','home'],['inbox','Inbox','mail'],['team','My Team','users'],['media','Media','play'],['games','Know Your Stuff','star'],['chapter','Local Chapter','pin']],{open:1})+drop('Your Government','scale',GOV);
 }
 if(u.account!=='basic'){
  lab=group('Democracy Lab','<span class="pro">TEAM</span>')+item(['wiki','The Blue Book','book'],{tag:locked?'Open':''})+item(['workshops','Workshops','cap'],{tag:locked?'Open':''})
   +drop('Trackers','track',TRACKERS,{lock:locked})+item(['model','Election Model','chart'],{lock:locked})+item(['rolodex','Rolodex','phone'],{lock:locked});
 }
 const acct=group('Account')+item(['settings','Settings','gear'])+`<a class="navbtn" href="${DONATE_URL}" target="_blank" rel="noopener">${ic('heart')}Donate${ic('ext','lk')}</a>`;
 return `<aside class="side" id="side">
  <button class="side-head patwrap tilebg dark" ${nav('home')} aria-label="Go to dashboard"><img class="side-logo" src="img/logo-white.png" alt="Digital Ground Game"><div class="label" style="color:#9a9ca6;margin-top:18px">Ground Game Hub</div></button>
  <nav aria-label="Main">${hub}${lab}${acct}</nav>
  <div class="side-foot"><div class="avatar">${u.name.split(' ').map(x=>x[0]).join('').slice(0,2)}</div><div class="who"><b>${esc(u.name)}</b><span>${member&&u.team?TEAMS[u.team].n:ACCOUNT_LABEL[u.account]}</span></div><button class="iconbtn" hx-post="/auth/signout" hx-target="#root" aria-label="Sign out" title="Sign out">${ic('logout')}</button></div>
 </aside>`;
}
function T_joinfab(u){
 if(u.account!=='advanced')return '<div id="joinfab"></div>';
 return `<div id="joinfab">${u.join_min
  ?`<button class="joinpill" hx-post="/ui/joinfab" ${vals({min:0})} hx-target="#joinfab" hx-swap="outerHTML">${ic('users')}Join a team</button>`
  :`<div class="joinfab"><button class="iconbtn close" hx-post="/ui/joinfab" ${vals({min:1})} hx-target="#joinfab" hx-swap="outerHTML" aria-label="Minimize">${ic('x')}</button><span class="pro" style="align-self:flex-start">Democracy Lab</span><b>Join a DGG team</b><span>Unlock the Trackers, Election Model, and Rolodex, and work on real projects with other members.</span><button class="btn primary sm" ${nav('join')}>Find my team · 2 min</button></div>`}</div>`;
}
function T_shell(u,page,content){
 return T_sitenav('hub')+`<div id="app">${T_sidebar(u,page)}
 <div class="scrim" data-ui="menu-close"></div>
 <div class="main">
  <header class="topbar">
   <button class="iconbtn menubtn" data-ui="menu-open" aria-label="Open menu">${ic('menu')}</button>
   <form class="search" hx-get="/app/bills" hx-target="#root" role="search">${ic('search')}<input name="q" placeholder="Search bills…" aria-label="Search bills"></form>
  </header>
  <main class="content" id="content">${content}</main>
 </div>
 ${T_joinfab(u)}</div>`;
}

/* =====================================================================
   PAGE TEMPLATES  (templates/pages/*.html)
   ===================================================================== */
const V={};

V.home=(u)=>{
 const d=daysLeftN(),member=u.account==='member';
 const discord=`<section class="dcta discord"><div class="dicon">${ic('chat')}</div><div class="dtext"><span class="label" style="color:#9a9ca6">Community</span><b>Want to get more involved?</b><span>Join the Digital Ground Game Discord to meet volunteers, find events, and get plugged into a team.</span></div><a class="btn" href="${DISCORD_URL}" target="_blank" rel="noopener">${ic('chat')}Join our Discord</a></section>`;
 const second=u.account==='basic'
  ?`<section class="dcta up"><div class="dtext"><span class="label">Your account · Citizen Basic</span><b>Want more from the hub?</b><span>Upgrade to unlock civics games, The Blue Book, and Workshops, or join a team for the full Democracy Lab.</span></div><div class="dbtns"><button class="btn primary sm" hx-post="/settings/account" ${vals({account:'advanced',from:'home'})} hx-target="#root">Upgrade to Advanced</button><button class="btn sm" ${nav('join')}>Join the team</button></div></section>`
  :u.account==='advanced'
  ?`<section class="dcta up"><div class="dtext"><span class="label">Democracy Lab</span><b>Become a team member</b><span>Take a two-minute quiz, join a DGG team, and unlock the Trackers, Election Model, and Rolodex.</span></div><div class="dbtns"><button class="btn primary sm" ${nav('join')}>Find my team</button></div></section>`:'';
 const donate=!member&&!u.donate_dismissed?`<div class="donate" id="donatebar"><button class="iconbtn close" hx-post="/dashboard/dismiss-donate" hx-target="#donatebar" hx-swap="outerHTML" aria-label="Dismiss">${ic('x')}</button><div class="msg"><b>Keep this hub free for every voter.</b> No ads, no paywall. If you can, chip in.</div><div class="give"><a class="btn red" href="${DONATE_URL}" target="_blank" rel="noopener">${ic('heart')}Donate</a></div></div>`:'';
 return `${head('Good evening, '+esc(u.first),`${USER.precinct} · ${USER.county}, Ohio`,'<span class="sample">Sample data</span>')}
 <div class="dash-ctas ${second?'':'one'}">${discord}${second}</div>
 ${donate}
 <section class="cta ctabox"><div class="cta-h"><div><span class="label" style="color:#9a9ca6">Call to action · ${CTA.date} · ${CTA.by}</span><h2>${CTA.title.replace('Take back','<span>Take back').replace('Senate','Senate</span>')}</h2></div><a class="btn sm" href="${CTA.url}" target="_blank" rel="noopener">${ic('ext')}Read the full CTA</a></div>
  <ol class="ctasteps">${CTA.steps.map(([t,d,l])=>`<li><b>${t}</b><span>${d}</span>${l?(l[1].startsWith('#')?`<button class="btn sm primary" ${nav(l[1].slice(1))}>${l[0]}</button>`:`<a class="btn sm primary" href="${l[1]}" target="_blank" rel="noopener">${l[0]}</a>`):''}</li>`).join('')}</ol>
  <div class="ctaprev"><span class="label">Previous calls to action</span>${CTA.previous.map(([d,t,url])=>`<a href="${url}" target="_blank" rel="noopener"><span class="mono">${d}</span>${t}</a>`).join('')}</div>
 </section>
 <section class="cta"><div class="cta-h"><h2>Upcoming <span>events</span></h2><a class="btn sm" href="${DGG_CALENDAR}" target="_blank" rel="noopener">${ic('cal')}Add the DGG calendar</a></div>
  <div class="events">${UPCOMING.map(e=>`<div class="event"><div class="edate"><small>${e.m}</small><b class="tab-nums">${e.d}</b></div><div class="info"><span class="chip ${e.cls}" style="align-self:flex-start">${e.type}</span><b>${e.t}</b><span class="d">${e.when} · ${e.where}</span>${e.btn[1].startsWith('#')?`<button class="btn sm primary" ${nav(e.btn[1].slice(1))}>${e.btn[0]}</button>`:`<a class="btn sm ${e.cls==='red'?'red':'primary'}" href="${e.btn[1]}" target="_blank" rel="noopener">${e.btn[0]}</a>`}</div></div>`).join('')}</div>
  <div class="pastrow"><span class="label">Recent DGG canvasses</span>${PAST_CANVASSES.map(([c,d])=>`<span class="chip">${ic('check')}${c} · ${d}</span>`).join('')}</div>
 </section>
 <section class="hero patwrap tilebg">
  <div class="big tab-nums">${d}<small>days to go</small></div>
  <div><h2>General Election · Tue, Nov 3</h2><p>Early in-person voting is open now at the Franklin County Board of Elections. Polls open 6:30 a.m. to 7:30 p.m. on Election Day. Bring a photo ID.</p></div>
  <div style="display:flex;flex-direction:column;gap:10px"><button class="btn" ${nav('ballot')}>See my ballot</button><button class="btn" ${nav('register')}>Polling place</button></div>
 </section>
 <div class="grid g4">
  <div class="panel stat"><span class="label">Registration</span><span class="v ok">Active</span><span class="s">Verified with the Ohio Secretary of State</span></div>
  <div class="panel stat"><span class="label">Representatives</span><span class="v tab-nums">10</span><span class="s">Federal, state, and local officials for your address</span></div>
  <div class="panel stat"><span class="label">Bills you follow</span><span class="v tab-nums">${BILLS.filter(b=>b.follow).length}</span><span class="s">1 moved this week</span></div>
  <div class="panel stat"><span class="label">Turnout record</span><span class="v tab-nums">8 / 10</span><span class="s">Elections voted in since 2022</span></div>
 </div>
 <div class="grid g2">
  <section class="panel"><div class="panel-h"><h2>What changed this week</h2><button class="btn sm ghost" ${nav('bills')}>All bills</button></div><div class="rows">
   <button class="row" ${nav('bill/hr2817')}><span class="ic">${ic('doc')}</span><span><span class="t">H.R. 2817 passed the House</span><br><span class="d">Rural Broadband Access Act · your representative voted Yea</span></span><span class="chip blue">Oct 20</span></button>
   <button class="row" ${nav('bill/s904')}><span class="ic">${ic('doc')}</span><span><span class="t">S. 904 scheduled for markup</span><br><span class="d">Voter Registration Modernization Act</span></span><span class="chip">Oct 17</span></button>
   <button class="row" ${nav('rep/r6')}><span class="ic yel">${ic('users')}</span><span><span class="t">State Rep. Haines held a town hall</span><br><span class="d">Ohio House District 7 · transcript posted</span></span><span class="chip">Oct 16</span></button>
  </div></section>
  ${member?`<section class="panel"><div class="panel-h"><h2>Team briefing</h2><span class="chip blue">${u.team?TEAMS[u.team].n:''}</span></div><div class="rows">
   <button class="row" ${nav('leg')}><span class="ic red">${ic('bell')}</span><span><span class="t">HB 301 hearing on Oct 28</span><br><span class="d">High priority · ballot drop box restrictions</span></span><span class="chip red">Alert</span></button>
   <button class="row" ${nav('courts')}><span class="ic">${ic('gavel')}</span><span><span class="t">TRO granted on early voting hours</span><br><span class="d">S.D. Ohio · next hearing Oct 29</span></span><span class="chip green">Win</span></button>
   <button class="row" ${nav('team')}><span class="ic yel">${ic('users')}</span><span><span class="t">${(n=>n+(n===1?' task':' tasks'))(DB.tasks.filter(t=>t.team===u.team&&t.who==='JE'&&t.status!=='Done').length)} assigned to you</span><br><span class="d">My Team · ${u.team?TEAMS[u.team].n:''}</span></span><span class="chip yel">Tasks</span></button>
  </div></section>`:`<section class="panel"><div class="panel-h"><h2>Your next steps</h2></div><div class="rows">
   <button class="row" ${nav('ballot')}><span class="ic">${ic('ballot')}</span><span><span class="t">Review your sample ballot</span><br><span class="d">${BALLOT.length} races and ${ISSUES.length} issues on your ballot</span></span>${arrow()}</button>
   <button class="row" ${act('Early voting plan saved to your calendar')}><span class="ic">${ic('cal')}</span><span><span class="t">Make a voting plan</span><br><span class="d">Pick a day, time, and how you'll get there</span></span>${arrow()}</button>
   <button class="row" ${nav('chapter')}><span class="ic red">${ic('pin')}</span><span><span class="t">Meet your local chapter</span><br><span class="d">Columbus chapter · 412 members</span></span>${arrow()}</button>
  </div></section>`}
 </div>`;
};

V.register=()=>`${head('Voter registration','Your record as held by the Ohio Secretary of State. The live version checks this nightly.',`<button class="btn primary" ${act('Rechecked just now: no changes to your record')}>Recheck now</button>`)}
 <div class="grid g3">
  <section class="panel span2"><div class="panel-h"><h2>Your record</h2><span class="chip green">${ic('check')}Active</span></div><div class="panel-b"><div class="kv">
   <div class="k">Name</div><div class="v">${USER.name}</div>
   <div class="k">Registered address</div><div class="v">${USER.addr}</div>
   <div class="k">County</div><div class="v">${USER.county}</div>
   <div class="k">Precinct</div><div class="v">${USER.precinct} · ${USER.ward}</div>
   <div class="k">Registered since</div><div class="v">September 14, 2018</div>
   <div class="k">Party affiliation</div><div class="v">Unaffiliated (Ohio sets affiliation by the last primary ballot you chose)</div>
   <div class="k">Voter ID on file</div><div class="v mono">OH••••••4471</div>
  </div></div></section>
  <section class="panel"><div class="panel-h"><h2>Polling place</h2></div><div class="panel-b" style="display:flex;flex-direction:column;gap:12px">
   <div style="display:flex;gap:10px">${ic('pin').replace('<svg','<svg style="width:20px;flex:none;color:var(--red)"')}<div><b>Northwood Recreation Center</b><br><span style="color:var(--muted)">2000 N High St, Columbus, OH 43201</span></div></div>
   <div class="chip blue" style="align-self:flex-start">0.6 mi · 12 min walk</div>
   <button class="btn sm" ${act('Would open directions in your maps app')}>Get directions</button>
  </div></section>
 </div>
 <section class="panel"><div class="panel-h"><h2>Key dates · Nov 3 general</h2></div><div class="tbl-wrap"><table>
  <thead><tr><th>Date</th><th>What</th><th>Status</th></tr></thead><tbody>
  <tr><td class="tab-nums">Oct 5</td><td>Registration deadline</td><td><span class="chip">Passed</span></td></tr>
  <tr><td class="tab-nums">Oct 6 – Nov 1</td><td>Early in-person voting at the county board</td><td><span class="chip green">Open now</span></td></tr>
  <tr><td class="tab-nums">Oct 27</td><td>Last day to request a mail-in absentee ballot</td><td><span class="chip">Passed</span></td></tr>
  <tr><td class="tab-nums">Nov 3</td><td>Election Day, 6:30 a.m. – 7:30 p.m.</td><td><span class="chip blue">${daysLeftN()} days</span></td></tr>
 </tbody></table></div></section>
 <section class="panel"><div class="panel-h"><h2>Check someone else</h2><span class="label">All 50 states + DC</span></div>
  <form class="panel-b grid g4" style="align-items:end" hx-post="/register/lookup" hx-target="#lookup-result">
   <div class="field"><label class="label" for="lk-first">First name</label><input id="lk-first" name="first" placeholder="First"></div>
   <div class="field"><label class="label" for="lk-last">Last name</label><input id="lk-last" name="last" placeholder="Last"></div>
   <div class="field"><label class="label" for="lk-state">State</label><select id="lk-state" name="state"><option>Ohio</option><option>Michigan</option><option>Pennsylvania</option><option>Wisconsin</option><option>Georgia</option></select></div>
   <button class="btn primary" type="submit">Look up</button>
  </form><div id="lookup-result"></div></section>`;

/* ---------- ballot with expandable candidates ---------- */
const candColor=p=>p==='D'?'var(--blue)':p==='R'?'var(--red)':p==='G'?'#13824A':p==='L'?'#C99A00':'var(--black)';
const T_candidate=(c,open)=>{
 const ini=c.name.replace('Hon. ','').split(/[ /]+/).filter(Boolean).map(x=>x[0]).slice(0,2).join('');
 const rowBtn=`<button class="cand-row" hx-get="/ballot/candidates/${c.id}${open?'?collapsed=1':''}" hx-target="#cand-${c.id}" hx-swap="outerHTML" aria-expanded="${open}"><div class="avatar" style="background:${candColor(c.party)}">${ini}</div><span style="min-width:0"><span class="t">${c.name}</span>${c.inc?' <span class="chip">Incumbent</span>':''}<br><span class="d">${PARTY[c.party]} · ${c.job}</span></span>${party(c.party)}${ic('down',open?'chev open':'chev')}</button>`;
 if(!open)return `<div class="cand" id="cand-${c.id}">${rowBtn}</div>`;
 return `<div class="cand open" id="cand-${c.id}">${rowBtn}
  <div class="cand-body">
   <div class="cand-main"><span class="label">About</span><p>${c.bio}</p>
    <span class="label">Top priorities</span><ul class="cand-pos">${c.positions.map(([k,v])=>`<li><b>${k}</b><span>${v}</span></li>`).join('')}</ul></div>
   <aside class="cand-side">
    <div class="kv" style="grid-template-columns:90px 1fr"><div class="k">Age</div><div class="v tab-nums">${c.age}</div><div class="k">Lives in</div><div class="v">${c.home}</div><div class="k">Website</div><div class="v mono" style="font-size:13px">${c.site}</div></div>
    <span class="label">Raised this cycle</span><div class="disp tab-nums" style="font-size:30px">$${c.raised.toLocaleString()}K</div>
    <span class="label">Endorsements</span><div style="display:flex;gap:6px;flex-wrap:wrap">${c.endorse.map(e=>`<span class="chip">${e}</span>`).join('')}</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px"><button class="btn sm primary" ${act('Saved '+c.name+' to your ballot plan')}>Save to my plan</button><button class="btn sm ghost" ${act('Would open '+c.name+'\'s full profile and funding records')}>Full profile</button></div>
   </aside>
  </div></div>`;
};
V.ballot=()=>`${head('My ballot',`Sample ballot for ${USER.precinct}. Tap a candidate to see their background, priorities, and funding.`,'<span class="sample">Sample data</span>')}
 <div class="ballot-legend">${['Federal','State','Judicial','Local'].map(k=>`<span class="chip">${BALLOT.filter(r=>r.kind===k).length} ${k}</span>`).join('')}<span class="chip">${ISSUES.length} issues</span></div>
 <div class="ballot">${BALLOT.map(r=>`<section class="panel"><div class="panel-h"><h2 style="font-size:16px">${r.race}</h2><span class="label">${r.kind} · ${r.vote}</span></div><div class="rows">${r.cands.map(c=>T_candidate(c,false)).join('')}</div></section>`).join('')}
 ${ISSUES.map(([t,a,b])=>`<section class="panel"><div class="panel-h"><h2 style="font-size:16px">${t}</h2><span class="chip">Local</span></div><div class="panel-b"><p style="margin:0 0 8px">${a}</p><p style="margin:0;color:var(--muted);font-size:14px">${b}</p></div></section>`).join('')}
 </div>`;

/* ---------- representatives ---------- */
const T_reps_body=L=>`<div id="reps-body" style="display:flex;flex-direction:column;gap:20px"><div class="tabs" role="tablist">${['federal','state','local'].map(l=>`<button role="tab" aria-selected="${L===l}" hx-get="/reps/list?level=${l}" hx-target="#reps-body" hx-swap="outerHTML">${l} (${REPS[l].length})</button>`).join('')}</div>
 <div class="grid g3">${REPS[L].map(r=>`<button class="repcard" ${nav('rep/'+r.id)}><div class="top"><div class="portrait" style="background:${r.party==='D'?'var(--blue)':r.party==='R'?'var(--red)':'var(--black)'}">${r.ini}</div><div><b>${r.name}</b><span class="off">${r.office}</span></div></div><div class="meta">${party(r.party)}<span class="chip">${r.scope}</span><span class="chip">${r.term}</span></div></button>`).join('')}</div></div>`;
V.reps=(u,q)=>`${head('Representatives',`Everyone who represents ${USER.addr.split(',')[0]}, from Congress to the school board.`,'<span class="sample">Sample data</span>')}${T_reps_body(q.level||'federal')}`;
V.rep=(u,q,id)=>{
 const r=ALLREPS.find(x=>x.id===id)||ALLREPS[0],spons=BILLS.filter(b=>b.sponsor===r.id);
 return `${head(r.name,`${r.office} · ${r.scope}`,`<button class="btn primary" ${act('Following '+r.name+". You'll be notified of new votes and statements.")}>${ic('bell')}Follow</button>`,crumb('reps','Representatives'))}
 <div class="grid g3">
  <section class="panel"><div class="panel-h"><h2>Contact</h2>${party(r.party)}</div><div class="panel-b"><div class="kv" style="grid-template-columns:90px 1fr">
   <div class="k">Phone</div><div class="v mono tab-nums">${r.phone}</div><div class="k">Term</div><div class="v">${r.term}</div>
   <div class="k">Committees</div><div class="v">${r.committees.join(', ')||'—'}</div><div class="k">Voting</div><div class="v">${r.score}</div>
  </div><button class="btn sm" style="margin-top:12px" ${act('Would open a pre-addressed message form')}>Write to ${r.name.split(' ')[0]}</button></div></section>
  <section class="panel span2"><div class="panel-h"><h2>Recent votes</h2><span class="label">Last 30 days</span></div><div class="tbl-wrap"><table><thead><tr><th>Measure</th><th>Vote</th><th>Date</th></tr></thead><tbody>
   ${VOTES.map(([m,v,d])=>`<tr><td>${m}</td><td><span class="chip ${v==='Yea'?'green':'red'}">${v}</span></td><td class="tab-nums">${d}</td></tr>`).join('')}
  </tbody></table></div></section>
 </div>
 <section class="panel"><div class="panel-h"><h2>Sponsored legislation</h2></div><div class="rows">${spons.length?spons.map(b=>`<button class="row" ${nav('bill/'+b.id)}><span class="ic">${ic('doc')}</span><span><span class="t">${b.num} · ${b.title}</span><br><span class="d">${STAGES[b.stage]}</span></span><span style="width:120px">${pipe(b.stage)}</span></button>`).join(''):'<div class="panel-b" style="color:var(--muted)">No sponsored bills this session.</div>'}</div></section>`;
};

/* ---------- bills ---------- */
const BILL_F=[['all','All'],['Federal','Federal'],['Ohio','Ohio'],['follow','Following']];
const T_bill_filters=(f,oob)=>`<div class="filters" id="bill-filters" ${oob?'hx-swap-oob="true"':''}>${BILL_F.map(([k,l])=>`<button class="fbtn" aria-pressed="${f===k}" hx-get="/bills/list?filter=${k}" hx-include="#billq" hx-target="#bills-list" hx-swap="outerHTML">${l}</button>`).join('')}</div>`;
const T_bills_list=(f,q)=>{const s=(q||'').toLowerCase(),list=BILLS.filter(b=>(f==='all'||(f==='follow'?b.follow:b.lvl===f))&&(!s||(b.num+b.title+b.topic).toLowerCase().includes(s)));
 return `<section class="panel" id="bills-list"><input type="hidden" id="bill-f" name="filter" value="${f}"><div class="rows">${list.map(b=>`<button class="row" ${nav('bill/'+b.id)} style="grid-template-columns:110px 1fr 160px"><span class="mono" style="font-size:13px;color:var(--muted)">${b.num}</span><span style="min-width:0"><span class="t">${b.title}</span>${b.follow?' <span class="chip blue" style="margin-left:4px">Following</span>':''}<br><span class="d">${b.lvl} · ${b.topic} · updated ${b.updated}</span></span><span style="display:flex;flex-direction:column;gap:6px"><span class="label" style="font-size:11px">${STAGES[b.stage]}</span>${pipe(b.stage)}</span></button>`).join('')||'<div class="panel-b" style="color:var(--muted)">No bills match that filter.</div>'}</div></section>`};
V.bills=(u,q)=>{const f=q.filter||'all';return `${head('Bills & laws','Federal and Ohio legislation in one feed, with every version and amendment tracked.','<span class="sample">Sample data</span>')}
 <div class="filters">${T_bill_filters(f)}<label class="search" style="margin-left:auto;max-width:300px;display:flex">${ic('search')}<input id="billq" name="q" value="${esc(q.q||'')}" placeholder="Filter bills" aria-label="Filter bills" hx-get="/bills/list" hx-trigger="keyup changed delay:250ms, search" hx-include="#bill-f" hx-target="#bills-list" hx-swap="outerHTML"></label></div>
 ${T_bills_list(f,q.q)}`};
const DIFFS=[
 `<p><span class="sec">§2(a)</span>The Secretary shall award grants to eligible States for last-mile broadband deployment in counties where fewer than 80 percent of households have access to service of at least 100 megabits per second.</p><p><span class="sec">§3</span>Authorizes $4,000,000,000 for fiscal years 2027 through 2031.</p>`,
 `<p><span class="sec">§2(a)</span>The Secretary shall award grants to eligible States for last-mile broadband deployment in counties where fewer than <del>80</del> <ins>85</ins> percent of households have access to service of at least 100 megabits per second.</p><p><span class="sec">§2(c)</span><ins>A State receiving a grant shall publish a coverage map updated not less than twice per year.</ins></p><p><span class="sec">§3</span>Authorizes <del>$4,000,000,000</del> <ins>$3,200,000,000</ins> for fiscal years 2027 through 2031.</p>`,
 `<p><span class="sec">§2(a)</span>The Secretary shall award grants to eligible States for last-mile broadband deployment in counties where fewer than 85 percent of households have access to service of at least 100 megabits per second<ins>, with priority given to tribal lands</ins>.</p><p><span class="sec">§2(c)</span>A State receiving a grant shall publish a coverage map updated not less than twice per year.</p><p><span class="sec">§4(b)</span><del>Grantees may subcontract up to 100 percent of deployment.</del></p><p><span class="sec">§3</span>Authorizes $3,200,000,000 for fiscal years 2027 through 2031.</p>`];
const VERS=['Introduced · Feb 12','Committee substitute · Apr 3','Engrossed (passed House) · Oct 20'];
const T_bill_diff=(id,v)=>`<div id="diff-box" style="display:flex;flex-direction:column;gap:12px"><div class="tabs" role="tablist">${VERS.map((x,i)=>`<button role="tab" aria-selected="${v===i}" hx-get="/bills/${id}/diff?ver=${i}" hx-target="#diff-box" hx-swap="outerHTML">${x}</button>`).join('')}</div><div class="diff">${DIFFS[v]}</div></div>`;
const T_follow=b=>`<button class="btn ${b.follow?'':'primary'}" id="followbtn" hx-post="/bills/${b.id}/follow" hx-swap="outerHTML">${ic('bell')}${b.follow?'Following':'Follow bill'}</button>`;
V.bill=(u,q,id)=>{
 const b=BILLS.find(x=>x.id===id)||BILLS[0],sp=ALLREPS.find(r=>r.id===b.sponsor),tl=BILLTL[b.id]||DEFAULT_TL;
 return `${head(b.title,`${b.num} · ${b.lvl} · Sponsored by ${sp?sp.name:'—'}`,T_follow(b),crumb('bills','Bills & laws'))}
 <section class="panel"><div class="panel-b" style="display:flex;flex-direction:column;gap:14px"><p style="margin:0;max-width:75ch">${b.summary}</p>
  <div class="pipeline">${STAGES.map((s,i)=>`<div class="${i<b.stage?'on':i===b.stage?'cur':''}">${s}${i===b.stage?`<small>Current · ${b.updated}</small>`:''}</div>`).join('')}</div></div></section>
 <div class="grid g3">
  <section class="panel span2"><div class="panel-h"><h2>Text changes</h2><span class="label">${VERS.length} versions</span></div><div class="panel-b" style="display:flex;flex-direction:column;gap:12px">
   ${T_bill_diff(b.id,2)}
   <div style="display:flex;gap:14px;font-size:13px;color:var(--muted)"><span><ins style="background:var(--greenSoft);color:var(--green);text-decoration:none;padding:0 4px">added</ins> vs. previous version</span><span><del style="background:var(--redSoft);color:var(--red);padding:0 4px">removed</del></span></div>
  </div></section>
  <section class="panel"><div class="panel-h"><h2>Action history</h2></div><div class="panel-b"><div class="timeline">${tl.map(([w,t,c])=>`<div class="tl ${c}"><div class="when">${w}</div><div class="what">${t}</div></div>`).join('')}</div></div></section>
 </div>
 <section class="panel"><div class="panel-h"><h2>How your representatives voted</h2></div><div class="tbl-wrap"><table><thead><tr><th>Official</th><th>Office</th><th>Vote</th></tr></thead><tbody>
  <tr><td>Andre Coleman ${party('D')}</td><td>U.S. Representative, OH-3</td><td><span class="chip green">Yea</span></td></tr>
  <tr><td>Maria Delgado ${party('D')}</td><td>U.S. Senator</td><td><span class="chip">Pending</span></td></tr>
  <tr><td>Thomas Whitaker ${party('R')}</td><td>U.S. Senator</td><td><span class="chip">Pending</span></td></tr>
 </tbody></table></div></section>`;
};

V.history=()=>{const past=HISTORY.filter(h=>h[2]!=='upcoming'),v=past.filter(h=>h[2]==='Voted').length;
 return `${head('Voting history','Whether you voted is public record in Ohio. How you voted is always secret and never stored here.','<span class="sample">Sample data</span>')}
 <div class="grid g4">
  <div class="panel stat"><span class="label">Participation</span><span class="v tab-nums">${Math.round(v/past.length*100)}%</span><span class="s">${v} of ${past.length} elections since 2022</span></div>
  <div class="panel stat"><span class="label">General elections</span><span class="v ok tab-nums">4 / 4</span><span class="s">Never missed a November</span></div>
  <div class="panel stat"><span class="label">Most used</span><span class="v">Early</span><span class="s">3 early, 3 mail, 3 Election Day</span></div>
  <div class="panel stat"><span class="label">Streak</span><span class="v tab-nums">3</span><span class="s">Elections in a row</span></div>
 </div>
 <section class="panel"><div class="tbl-wrap"><table><thead><tr><th>Date</th><th>Election</th><th>Participation</th><th>Method</th></tr></thead><tbody>
 ${HISTORY.map(([d,e,s,m])=>`<tr><td class="tab-nums">${d}</td><td>${e}</td><td><span class="chip ${s==='Voted'?'green':s==='upcoming'?'blue':'red'}">${s==='upcoming'?'Upcoming':s}</span></td><td>${m||'—'}</td></tr>`).join('')}
 </tbody></table></div></section>`};

/* ---------- media ---------- */
const MEDIA_F=[['all','All'],['stream','Live & replays'],['interview','Interviews'],['photos','Photos']];
const T_media_body=f=>{const list=MEDIA.filter(m=>f==='all'||m.k===f),lab={stream:'Replay',interview:'Interview',photos:'Photos'};
 return `<div id="media-body" style="display:flex;flex-direction:column;gap:20px"><div class="filters">${MEDIA_F.map(([k,l])=>`<button class="fbtn" aria-pressed="${f===k}" hx-get="/media/list?filter=${k}" hx-target="#media-body" hx-swap="outerHTML">${l}</button>`).join('')}<button class="btn sm" style="margin-left:auto" ${act('Would open the upload form for event photos and video')}>${ic('cam')}Upload from an event</button></div>
 <div class="mgrid">${list.map(m=>`<button class="mcard" ${act('Would open '+(m.k==='photos'?'the photo album':'the video player'))}><div class="thumb ${m.tint}"><span class="ttag">${lab[m.k]}</span><span class="big">${m.big}</span><span class="dur">${m.k==='photos'?ic('cam').replace('<svg','<svg style="width:12px;height:12px;vertical-align:-1px;margin-right:4px"')+m.dur:m.dur}</span></div><div class="mi"><b>${m.t}</b><span class="d">${m.d}</span></div></button>`).join('')}</div></div>`};
V.media=(u,q)=>`${head('Media','Photos, live streams, and candidate interviews from our canvassing events.','<span class="sample">Sample content</span>')}
 <section class="ppbanner"><div class="ppmark">${ic('doc')}</div><div class="pptext"><span class="label">From our community · Written by DGG members</span><h2>The Pragmatic Papers</h2><p>Combating misinformation with fact-based reporting. In-depth research on elections, policy, and global affairs, written by writers from the Digital Ground Game community. Anyone can submit.</p>
  <div class="ppsections">${['Elections','Policy','International','Science','Commentary','Reporting','Political Action'].map(x=>`<span class="chip">${x}</span>`).join('')}</div></div>
  <div class="ppbtns"><a class="btn primary" href="https://pragmaticpapers.com/" target="_blank" rel="noopener">${ic('ext')}Read the Papers</a><a class="btn" href="https://pragmaticpapers.com/writing-for-us" target="_blank" rel="noopener">${ic('pen')}Submit a piece</a></div></section>
 <section class="live"><button class="thumb r" style="border:0;cursor:pointer" ${act('Would open the live stream player')}><span class="ttag on"><span class="livedot"></span>Live now</span><span class="playbtn">${ic('play')}</span><span class="dur">1,204 watching</span></button>
  <div class="side-info"><span class="label">Streaming from Columbus</span><h2>Final Weekend Canvass Launch</h2><p style="margin:0;color:var(--muted)">Organizers are briefing 150 volunteers at Goodale Park before teams head out to knock doors in the Short North.</p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:auto"><button class="btn red sm" ${act('Would open the live stream player')}>${ic('play')}Watch live</button><button class="btn sm ghost" ${act('Stream link copied')}>Share</button></div></div></section>
 ${T_media_body(q.filter||'all')}`;

/* ---------- local chapter ---------- */
const T_chapter_body=(state,sent)=>{
 const toggle=`<div class="viewas"><span>Preview</span><div class="seg" role="group" aria-label="Preview chapter state"><button aria-pressed="${state==='yes'}" hx-get="/chapter/body?state=yes" hx-target="#chapter-body" hx-swap="outerHTML">Chapter exists</button><button aria-pressed="${state==='no'}" hx-get="/chapter/body?state=no" hx-target="#chapter-body" hx-swap="outerHTML">No chapter yet</button></div></div>`;
 if(state==='no') return `<div id="chapter-body" style="display:flex;flex-direction:column;gap:24px">${head('Local Chapter','No Digital Ground Game chapter covers Lima, OH 45801 yet. The nearest one is Columbus, 78 miles away.',toggle)}
  <section class="nochap">
   <div class="pitch"><span class="label" style="color:#9a9ca6">Lima, Ohio</span><h2>Start the <span>Lima chapter</span></h2>
    <p style="margin:0;opacity:.9">City leads recruit volunteers, run canvasses and phone banks, and connect their town to the national ground game.</p>
    <ul>${['Training and a starter kit from the national team','Event tools, walk lists, and a chapter page','A regional organizer who checks in every two weeks','Leadership development you can put on a résumé'].map(x=>`<li>${ic('check')}${x}</li>`).join('')}</ul>
    <span class="d" style="font-size:13px;color:#b9bdd0">23 people near Lima have already joined DGG and would be your first members.</span></div>
   ${sent?`<div style="padding:28px;display:flex;flex-direction:column;gap:12px;justify-content:center"><span class="chip green" style="align-self:flex-start">${ic('check')}Application sent</span><h2 style="font:400 32px/1 var(--display)">Thanks, ${USER.first}.</h2><p style="margin:0;color:var(--muted)">A regional organizer will reach out within three days to set up an intro call. In the meantime, the Columbus chapter has invited you to its next meeting.</p><button class="btn sm" style="align-self:flex-start" hx-get="/chapter/body?state=no" hx-target="#chapter-body" hx-swap="outerHTML">Edit application</button></div>`
   :`<form hx-post="/chapter/apply" hx-target="#chapter-body" hx-swap="outerHTML"><span class="label">Apply to be a city lead</span>
    <div class="field"><label class="label" for="cl-name">Full name</label><input id="cl-name" name="name" value="${USER.name}"></div>
    <div class="field"><label class="label" for="cl-email">Email</label><input id="cl-email" name="email" type="email" value="jordan.ellis@example.org"></div>
    <div class="field"><label class="label" for="cl-city">City</label><input id="cl-city" name="city" value="Lima, OH"></div>
    <div class="field"><label class="label" for="cl-hours">Hours per week you can give</label><select id="cl-hours" name="hours"><option>2–4 hours</option><option selected>5–8 hours</option><option>9+ hours</option></select></div>
    <div class="field"><label class="label" for="cl-why">Why do you want to lead a chapter?</label><textarea id="cl-why" name="why" placeholder="Tell us about your community and any organizing experience"></textarea></div>
    <button class="btn red block" type="submit">Apply to start a chapter</button></form>`}
  </section></div>`;
 return `<div id="chapter-body" style="display:flex;flex-direction:column;gap:24px">${head('Columbus Chapter','Your nearest Digital Ground Game chapter, covering Franklin, Delaware, and Licking counties.',toggle)}
 <div class="grid g3">
  <section class="panel span2"><div class="panel-h"><h2>City lead</h2><span class="chip green">Active chapter</span></div><div class="panel-b lead">
   <div class="portrait">AM</div>
   <div style="display:flex;flex-direction:column;gap:10px;min-width:0"><div><h2>Alex Moreno</h2><span style="color:var(--muted)">Columbus City Lead · since March 2025</span></div>
    <div class="contact">${ic('doc').replace('<svg','<svg style="width:16px;height:16px;color:var(--muted)"')}<span class="mono">columbus@digitalgroundgame.org</span><button class="btn sm ghost" data-copy="columbus@digitalgroundgame.org">Copy</button></div>
    <div class="contact">${ic('phone').replace('<svg','<svg style="width:16px;height:16px;color:var(--muted)"')}<span class="mono tab-nums">(614) 555-0190</span></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn primary sm" ${act('Message sent to Alex. Expect a reply within a day or two.')}>Message Alex</button><button class="btn sm" ${act('You joined the Columbus chapter')}>Join chapter</button></div></div>
  </div></section>
  <section class="panel"><div class="panel-h"><h2>Chapter stats</h2></div><div class="panel-b"><div class="kv" style="grid-template-columns:1fr auto">
   <div class="k">Members</div><div class="v tab-nums">412</div><div class="k">Doors knocked, 2026</div><div class="v tab-nums">38,650</div>
   <div class="k">Calls made, 2026</div><div class="v tab-nums">21,300</div><div class="k">Events this month</div><div class="v tab-nums">9</div>
  </div></div></section>
 </div>
 <div class="grid g2">
  <section class="panel"><div class="panel-h"><h2>Next meetings</h2></div><div class="rows">
   <div class="row"><span class="ic">${ic('users')}</span><span><span class="t">Monthly chapter meeting</span><br><span class="d">Thu, Nov 5 · 7 p.m. · Columbus Metropolitan Library, Main Branch</span></span><button class="btn sm" ${act("You're on the RSVP list for the chapter meeting")}>RSVP</button></div>
   <div class="row"><span class="ic red">${ic('pin')}</span><span><span class="t">Canvass captain training</span><br><span class="d">Sat, Oct 31 · 9 a.m. · Goodale Park shelter house</span></span><span class="chip red">12 spots</span></div>
   <div class="row"><span class="ic yel">${ic('phone')}</span><span><span class="t">Election week debrief</span><br><span class="d">Thu, Nov 5 · 7 p.m. · Virtual</span></span><span class="chip">Open</span></div>
  </div></section>
  <section class="panel"><div class="panel-h"><h2>Chapter team</h2></div><div class="rows">
   ${[['JK','Jasmine Kim','Volunteer coordinator'],['TR','Tyler Reed','Canvass captain, Short North'],['OB','Omar Bashir','Data and turf lead'],['LP','Lauren Pike','Media and photos']].map(([i,n,r])=>`<div class="row" style="grid-template-columns:auto 1fr"><div class="avatar" style="background:var(--black)">${i}</div><span><span class="t">${n}</span><br><span class="d">${r}</span></span></div>`).join('')}
  </div></section>
 </div></div>`;
};
V.chapter=()=>T_chapter_body('yes',false);

/* ---------- Know Your Stuff ---------- */
const GAMES=[
 ['timeline','Timeline','Order key moments in American history.','var(--red)','1776','Playable'],
 [null,'Amendment Match','Match each amendment to the right it protects.','var(--black)','#19','In development'],
 [null,'Branch Sort','Sort powers into legislative, executive, or judicial.','var(--blue)','I·II·III','In development'],
 [null,'Preamble Fill-In','Fill in the missing words of the Preamble.','#13824A','We the','In development'],
 [null,'Civics Connections','Find four groups of four hidden among 16 civics terms.','var(--yellow)','4×4','In development'],
 [null,'Map the Vote','Name the state from its electoral vote count and shape.','var(--black)','270','In development'],
];
const backToGames=`<button class="btn" hx-get="/games/hub" hx-target="#game-area">${ic('back')}All games</button>`;
const T_games_hub=()=>`<div id="game-area-inner" style="display:flex;flex-direction:column;gap:24px">${head('Know Your Stuff','Daily games and quizzes on American civics and history. New puzzles every morning.','<span class="chip yel">'+ic('star')+'4-day streak</span>')}
 <section class="daily"><div class="art"><span class="label" style="color:#fff">Friday, October 30</span><h2>Daily <span>Civics</span> Quiz</h2><span>5 questions · about 2 minutes</span></div>
  <div class="meta"><span class="label">This week</span><div class="streak">${['M','T','W','T','F','S','S'].map((d,i)=>`<i class="${i<4?'on':''}">${d}</i>`).join('')}</div>
   <p style="margin:0;color:var(--muted);font-size:15px">Columbus chapter average yesterday: <b style="color:var(--ink)">3.8 / 5</b>. You're in the top 30%.</p>
   <button class="btn primary" style="align-self:flex-start;margin-top:auto" hx-post="/games/quiz/start" hx-target="#game-area">${ic('play')}Play today's quiz</button></div></section>
 <div class="panel-h" style="padding:0;border:0"><h2>More games</h2></div>
 <div class="games">${GAMES.map(([k,n,d,c,art,st])=>`<button class="game" ${k?`hx-post="/games/${k}/start" hx-target="#game-area"`:act(n+' is in development')}><div class="gart" style="background:${c};${c==='var(--yellow)'?'color:var(--black)':''}">${art}</div><div class="gi"><b>${n}</b><span>${d}</span><span class="chip ${k?'green':''}" style="align-self:flex-start;margin-top:4px">${st}</span></div></button>`).join('')}</div></div>`;
const T_game_quiz=g=>{
 if(g.qi>=QUIZ.length) return `${head('Daily Civics Quiz','',backToGames)}<div class="play"><div class="qcard" style="align-items:flex-start"><span class="label">Today's score</span><div class="disp tab-nums" style="font-size:96px">${g.score}/${QUIZ.length}</div>
   <p style="margin:0;color:var(--muted);font-size:18px">${g.score===QUIZ.length?'Perfect score. Your streak is now 5 days.':g.score>=3?'Solid work. Come back tomorrow for a new set.':'Good start. Each answer comes with the facts, so tomorrow will go better.'}</p>
   <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn primary" ${act('Score copied: Know Your Stuff '+g.score+'/'+QUIZ.length)}>Share score</button><button class="btn" hx-post="/games/quiz/start" hx-target="#game-area">Play again</button></div></div></div>`;
 const [q,opts,ans,why]=QUIZ[g.qi],picked=g.pick!=null;
 return `${head('Daily Civics Quiz','',backToGames)}<div class="play"><div class="qprog">${QUIZ.map((_,i)=>`<i class="${i<g.qi+(picked?1:0)?'on':''}"></i>`).join('')}</div>
  <div class="qcard"><span class="label">Question ${g.qi+1} of ${QUIZ.length}</span><h2>${q}</h2>
   <div style="display:flex;flex-direction:column;gap:10px">${opts.map((o,i)=>`<button class="opt ${picked?(i===ans?'right':i===g.pick?'wrong':''):''}" ${picked?'disabled':`hx-post="/games/quiz/answer" ${vals({choice:i})} hx-target="#game-area"`}>${o}</button>`).join('')}</div>
   ${picked?`<p style="margin:0;padding:14px 16px;background:var(--surface2);border-left:4px solid ${g.pick===ans?'var(--green)':'var(--red)'}"><b>${g.pick===ans?'Correct.':'Not quite.'}</b> ${why}</p><button class="btn primary" style="align-self:flex-start" hx-post="/games/quiz/next" hx-target="#game-area">${g.qi===QUIZ.length-1?'See score':'Next question'}</button>`:''}
  </div></div>`;
};
const T_game_timeline=g=>{const right=g.order.every((v,i)=>v===i);
 return `${head('Timeline','Put these moments in order, earliest at the top.',backToGames)}<div class="play">${g.order.map((k,i)=>{const [t,y]=TIMELINE[k];return `<div class="tlrow ${g.checked?(k===i?'right':'wrong'):''}"><span class="yr tab-nums">${g.checked?y:'?'}</span><b style="font:700 18px/1.3 var(--head)">${t}</b><span class="mv"><button aria-label="Move up" ${i===0||g.checked?'disabled':`hx-post="/games/timeline/move" ${vals({i,dir:-1})} hx-target="#game-area"`}>${ic('up')}</button><button aria-label="Move down" ${i===g.order.length-1||g.checked?'disabled':`hx-post="/games/timeline/move" ${vals({i,dir:1})} hx-target="#game-area"`}>${ic('down')}</button></span></div>`}).join('')}
  ${g.checked?`<div class="qcard" style="box-shadow:5px 5px 0 ${right?'var(--green)':'var(--red)'}"><b style="font:400 34px var(--display)">${right?'All in order.':g.order.filter((v,i)=>v===i).length+' of 5 in place.'}</b><span style="color:var(--muted)">${right?'You know your stuff.':'Green rows are in the right spot. Try again to rearrange.'}</span><button class="btn" style="align-self:flex-start" hx-post="/games/timeline/reset" hx-target="#game-area">Try again</button></div>`:`<button class="btn primary" style="align-self:flex-start" hx-post="/games/timeline/check" hx-target="#game-area">Check order</button>`}</div>`};
V.games=()=>`<div id="game-area" style="display:flex;flex-direction:column;gap:24px">${T_games_hub()}</div>`;

/* ---------- Democracy Lab ---------- */
const T_wiki_list=q=>{const s=(q||'').toLowerCase(),list=WIKI.filter(w=>!s||(w.name+w.h+w.topics).toLowerCase().includes(s));
 return `<div class="wikigrid" id="wiki-list">${list.map(w=>`<button class="wcard" ${nav('article/'+w.id)}><div class="h"><div class="avatar" style="background:${w.c};${w.c==='#FFC800'?'color:#242424':''}">${w.ini}</div><div><b>${w.name}</b><span>${w.h}</span></div></div><p>${w.blurb}</p><div style="display:flex;gap:6px;flex-wrap:wrap"><span class="chip blue">${w.reach} reach</span><span class="chip">${w.lean}</span></div></button>`).join('')||'<p style="color:var(--muted)">No articles match that search.</p>'}</div>`};
V.wiki=(u,q)=>`${head('The Blue Book','A community-edited reference on the online voices shaping political conversation, with sourced claims and accuracy records.','<span class="sample">Fictional profiles</span>')}${sampleBar(u,'The Blue Book')}
 ${modbar('The Blue Book','bluebook.digitalgroundgame.org')}
 <div class="filters"><label class="search" style="max-width:380px;display:flex">${ic('search')}<input name="q" value="${esc(q.q||'')}" placeholder="Search creators, handles, topics" aria-label="Search The Blue Book" hx-get="/wiki/list" hx-trigger="keyup changed delay:250ms, search" hx-target="#wiki-list" hx-swap="outerHTML"></label><span class="label" style="margin-left:auto">1,284 articles · 312 editors</span></div>
 ${T_wiki_list(q.q)}`;
V.article=(u,q,id)=>{const w=WIKI.find(x=>x.id===id)||WIKI[0];
 return `${head(w.name,w.h,`<button class="btn" ${act('Would open the editor with revision history')}>Edit article</button>`,crumb('wiki','The Blue Book'))}
 <div class="article">
  <article class="panel panel-b">
   <p><b>${w.name}</b> (${w.h}) is a political content creator active on ${w.plat}. ${w.blurb}<span class="cite">[1]</span></p>
   <h2>Content and audience</h2><p>Most content focuses on ${w.topics.toLowerCase()}. Audience analytics from the tracker estimate a combined reach of ${w.reach} followers, concentrated in the Midwest and among 18–34 year olds.<span class="cite">[2]</span></p>
   <h2>Accuracy record</h2><p>Editors have reviewed ${w.claims} factual claims. ${w.flag} were rated misleading or false, and ${w.flag?'corrections were issued for '+Math.max(0,w.flag-1):'none required correction'}.<span class="cite">[3]</span></p>
   <h2>Relationship to campaigns</h2><p>No paid partnerships with campaigns or PACs were disclosed in FEC or state filings during the 2026 cycle.<span class="cite">[4]</span></p>
   <p style="font-size:13px;color:var(--muted);border-top:1px solid var(--line);padding-top:10px;margin-top:18px">Last edited Oct 19, 2026 by a DGG research volunteer · 27 revisions</p>
  </article>
  <aside class="infobox"><div class="ttl">${w.name}</div><div class="kv">
   <div class="k">Handle</div><div class="v mono" style="font-size:13px">${w.h}</div><div class="k">Platforms</div><div class="v">${w.plat}</div>
   <div class="k">Reach</div><div class="v tab-nums">${w.reach}</div><div class="k">Topics</div><div class="v">${w.topics}</div>
   <div class="k">Lean</div><div class="v">${w.lean}</div><div class="k">Claims</div><div class="v tab-nums">${w.claims} reviewed · ${w.flag} flagged</div>
  </div></aside>
 </div>`};

const T_ws_body=f=>{const tn=Object.fromEntries(TRACKS.map(t=>[t[0],t])),list=WORKSHOPS.filter(w=>f==='all'||w.tr===f),stc={watched:['Watched','green'],new:['New','blue'],upcoming:['Upcoming','red']};
 return `<div id="ws-body" style="display:flex;flex-direction:column;gap:20px"><div class="tracks">${TRACKS.map(([k,n,d,c,done,tot])=>`<button class="track" aria-pressed="${f===k}" style="--track:${c}" hx-get="/workshops/list?track=${f===k?'all':k}" hx-target="#ws-body" hx-swap="outerHTML"><b>${n}</b><span>${d}</span><span class="bar"><i style="width:${done/tot*100}%;background:${c}"></i></span><span class="tab-nums">${done} of ${tot} watched</span></button>`).join('')}</div>
 <section class="panel"><div class="panel-h"><h2>${f==='all'?'All sessions':tn[f][1]}</h2>${f!=='all'?`<button class="btn sm ghost" hx-get="/workshops/list?track=all" hx-target="#ws-body" hx-swap="outerHTML">Show all</button>`:`<span class="label">${WORKSHOPS.length} sessions</span>`}</div><div class="rows">
  ${list.map(w=>`<button class="row" ${act(w.st==='upcoming'?'Registered for '+w.t:'Would open the recording, slides, and worksheet')}><div class="avatar" style="background:${tn[w.tr][3]};${tn[w.tr][3]==='var(--yellow)'?'color:var(--black)':''}">${w.ini}</div><span style="min-width:0"><span class="t">${w.t}</span><br><span class="d">${w.by} · ${w.role} · ${w.len}</span></span><span class="chip ${stc[w.st][1]}">${stc[w.st][0]}</span></button>`).join('')}
 </div></section></div>`};
V.workshops=(u,q)=>`${head('Workshops','A lecture series by DGG members on how government works, political careers, and building a political media channel.','<span class="sample">Sample sessions</span>')}${sampleBar(u,'Workshops')}
 ${modbar('Workshops','learn.digitalgroundgame.org')}
 <section class="wsfeat"><div class="wart"><span class="chip red" style="align-self:flex-start">Next live session · Nov 4</span><h2>Public comment: make your <span>three minutes</span> count</h2><span style="opacity:.8;font-size:14px">Local & State Government · Session 4 of 5</span></div>
  <div class="winfo"><div class="presenter"><div class="avatar" style="background:var(--blue)">JK</div><div><b style="font:700 16px var(--head)">Jasmine Kim</b><br><span style="color:var(--muted);font-size:14px">Volunteer coordinator, Columbus chapter</span></div></div>
   <p style="margin:0;color:var(--muted)">How to find your city council's agenda, sign up to speak, and write remarks that council members remember. Includes a live practice round with feedback.</p>
   <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:auto"><button class="btn primary sm" ${act("You're registered. A calendar invite and Zoom link are on the way.")}>Register</button><button class="btn sm ghost" ${act('Added to your calendar')}>Add to calendar</button><span class="chip" style="align-self:center">86 registered</span></div></div></section>
 ${T_ws_body(q.track||'all')}
 <section class="panel panel-b" style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap"><div><b style="font:700 17px var(--head)">Have something to teach?</b><br><span style="color:var(--muted)">Members can pitch a workshop. We help with slides, recording, and promotion.</span></div><button class="btn" ${act('Would open the workshop pitch form')}>Pitch a workshop</button></section>`;

V.leg=u=>{const cols=['Introduced','In committee','Passed one chamber','Awaiting signature'];
 const inner=`${modbar('LegisTracker','legistracker.digitalgroundgame.org')}
 <div class="grid g4">
  <div class="panel stat"><span class="label">Watchlist</span><span class="v tab-nums">${LEG.length}</span><span class="s">Bills across federal + Ohio</span></div>
  <div class="panel stat"><span class="label">High priority</span><span class="v tab-nums" style="color:var(--red)">3</span><span class="s">Need action this month</span></div>
  <div class="panel stat"><span class="label">Hearings</span><span class="v tab-nums">2</span><span class="s">Scheduled in next 14 days</span></div>
  <div class="panel stat"><span class="label">Testimony</span><span class="v tab-nums">14</span><span class="s">Members signed up to testify</span></div>
 </div>
 <div class="kanban">${cols.map((c,i)=>{const it=LEG.filter(l=>l.c===i);return `<div class="kcol"><h3>${c}<span>${it.length}</span></h3>${it.map(l=>`<button class="kcard ${l.p}" ${act('Would open '+l.id+' in LegisTracker')}><span class="id">${l.id}</span><b>${l.t}</b><span style="display:flex;gap:6px;flex-wrap:wrap"><span class="chip">${l.tag}</span>${l.p==='hi'?'<span class="chip red">High</span>':''}</span><span class="d" style="font-size:13px;color:var(--muted)">${l.note}</span></button>`).join('')}</div>`}).join('')}</div>`;
 return `${head('LegisTracker',"Your organization's watchlist, priorities, and testimony calendar.",`<button class="btn primary" ${act('Would open the add-bill dialog')}>${ic('plus')}Add bill</button>`)}${gate(u,'LegisTracker',inner)}`};

V.courts=u=>{const inner=`${modbar('Court Tracker','courts.digitalgroundgame.org')}
 <section class="panel"><div class="panel-h"><h2>Active cases</h2></div><div class="tbl-wrap"><table><thead><tr><th>Case</th><th>Court</th><th>Issue</th><th>Status</th><th>Next date</th></tr></thead><tbody>
 ${COURTS.map(c=>`<tr class="click" ${act('Would open the docket, filings, and summaries for this case')}><td style="min-width:260px"><b>${c.n}</b></td><td>${c.ct}</td><td>${c.iss}</td><td><span class="chip ${c.cls}">${c.st}</span></td><td class="tab-nums">${c.next}</td></tr>`).join('')}
 </tbody></table></div></section>
 <section class="panel"><div class="panel-h"><h2>Upcoming docket</h2></div><div class="panel-b"><div class="timeline">
  <div class="tl red"><div class="when">Nov 5, 2026</div><div class="what">Ruling expected on motion to dismiss, Midwest Tenants Union</div></div>
  <div class="tl"><div class="when">Nov 12, 2026</div><div class="what">Oral argument, Ohio Fair Districts Coalition v. State Redistricting Board</div></div>
  <div class="tl"><div class="when">Dec 3, 2026</div><div class="what">Briefing due, Citizens for Open Records v. City of Dayton</div></div>
 </div></div></section>`;
 return `${head('Court Tracker','Litigation that affects voting, housing, and open government in the states we work in.','<span class="sample">Sample cases</span>')}${gate(u,'Court Tracker',inner)}`};

V.agenda=u=>{const all=AGENDA.flatMap(([,it])=>it),tot=all.length,c=st=>all.filter(i=>i[1]===st).length,avg=Math.round(all.reduce((a,i)=>a+i[2],0)/tot);
 const inner=`${modbar('Agenda Tracker','agendatracker.digitalgroundgame.org')}
 <section class="panel panel-b" style="display:flex;flex-direction:column;gap:12px">
  <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:8px"><span><span class="label">Tracking</span><br><b style="font:400 26px var(--display);letter-spacing:.02em">Project 2025 · Mandate for Leadership</b></span><span style="text-align:right"><span class="label">Overall progress</span><br><span class="disp tab-nums" style="font-size:40px">${avg}%</span></span></div>
  <div class="bar" style="height:14px"><i style="width:${c('Implemented')/tot*100}%;background:var(--green)"></i><i style="width:${c('In progress')/tot*100}%;background:var(--blue)"></i><i style="width:${c('Blocked')/tot*100}%;background:var(--red)"></i><i style="width:${c('Proposed')/tot*100}%;background:var(--muted)"></i></div>
  <div style="display:flex;gap:8px;flex-wrap:wrap">${['Implemented','In progress','Blocked','Proposed'].map(k=>`<span class="chip ${AGCLS[k]}">${c(k)} ${k}</span>`).join('')}</div>
 </section>
 <div class="grid g2">${AGENDA.map(([area,items])=>`<section class="panel"><div class="panel-h"><h2 style="font-size:16px">${area}</h2><span class="label">${items.length} items</span></div><div class="rows">${items.map(([t,st,p])=>`<button class="row" style="grid-template-columns:1fr auto" ${act('Would open the evidence log: orders, rules, and rulings tied to this item')}><span style="display:flex;flex-direction:column;gap:8px;min-width:0"><span class="t" style="font-size:15px">${t}</span><span class="bar"><i style="width:${p}%;background:${st==='Blocked'?'var(--red)':st==='Implemented'?'var(--green)':'var(--blue)'}"></i></span></span><span class="chip ${AGCLS[st]}">${st}</span></button>`).join('')}</div></section>`).join('')}</div>`;
 return `${head('Agenda Tracker',"Item-by-item progress on an administration's published agenda, scored from orders, rules, budgets, and court rulings.",'<span class="sample">Sample statuses</span>')}${gate(u,'Agenda Tracker',inner)}`};

const T_exec_body=(tab,f)=>{const orders=tab!=='appts',list=EOS.filter(e=>f==='all'||e.st===f);
 return `<div id="exec-body" style="display:flex;flex-direction:column;gap:20px"><div class="tabs" role="tablist"><button role="tab" aria-selected="${orders}" hx-get="/exec/body?tab=orders" hx-target="#exec-body" hx-swap="outerHTML">Executive orders</button><button role="tab" aria-selected="${!orders}" hx-get="/exec/body?tab=appts" hx-target="#exec-body" hx-swap="outerHTML">Appointments</button></div>
 ${orders?`<div class="filters">${['all','In effect','Challenged','Enjoined','Revoked'].map(k=>`<button class="fbtn" aria-pressed="${f===k}" hx-get="/exec/body?tab=orders&filter=${encodeURIComponent(k)}" hx-target="#exec-body" hx-swap="outerHTML">${k==='all'?'All':k}</button>`).join('')}</div>
 <section class="panel"><div class="tbl-wrap"><table><thead><tr><th>Order</th><th>Title</th><th>Agencies</th><th>Signed</th><th>Status</th><th>Cases</th></tr></thead><tbody>
 ${list.map(e=>`<tr class="click" ${act('Would open '+e.id+' with full text, agency actions, and litigation')}><td class="mono" style="font-size:13px;white-space:nowrap">${e.id}</td><td style="min-width:240px"><b>${e.t}</b></td><td>${e.ag}</td><td class="tab-nums" style="white-space:nowrap">${e.d}</td><td><span class="chip ${e.cls}">${e.st}</span></td><td class="tab-nums">${e.cases||'—'}</td></tr>`).join('')}
 </tbody></table></div></section>`
 :`<section class="panel"><div class="tbl-wrap"><table><thead><tr><th>Position</th><th>Agency</th><th>Person</th><th>Status</th><th>Date</th><th>Senate vote</th></tr></thead><tbody>
 ${APPTS.map(a=>`<tr class="click" ${act('Would open the profile, hearing record, and financial disclosures')}><td style="min-width:220px"><b>${a.pos}</b></td><td>${a.ag}</td><td>${a.who}</td><td><span class="chip ${a.cls}">${a.st}</span></td><td class="tab-nums" style="white-space:nowrap">${a.d}</td><td class="tab-nums">${a.vote}</td></tr>`).join('')}
 </tbody></table></div></section>`}</div>`};
V.exec=(u,q)=>{const n=st=>EOS.filter(e=>e.st===st).length;
 const inner=`${modbar('ExecuTracker','executracker.digitalgroundgame.org')}
 <div class="grid g4">
  <div class="panel stat"><span class="label">Orders this year</span><span class="v tab-nums">${EOS.length}</span><span class="s">${n('Enjoined')} blocked by a court</span></div>
  <div class="panel stat"><span class="label">Challenged</span><span class="v tab-nums">${n('Challenged')+n('Enjoined')}</span><span class="s">${EOS.reduce((a,e)=>a+e.cases,0)} cases synced with Court Tracker</span></div>
  <div class="panel stat"><span class="label">Pending nominees</span><span class="v tab-nums">${APPTS.filter(a=>['Nominated','Hearing held','Committee vote'].includes(a.st)).length}</span><span class="s">Awaiting Senate action</span></div>
  <div class="panel stat"><span class="label">Vacant or acting</span><span class="v tab-nums" style="color:var(--red)">${APPTS.filter(a=>a.st==='Vacant'||a.st==='Acting').length}</span><span class="s">Senate-confirmed posts</span></div>
 </div>${T_exec_body(q.tab||'orders',q.filter||'all')}`;
 return `${head('ExecuTracker','Executive branch appointments and orders, the agencies carrying them out, and the lawsuits against them.','<span class="sample">Sample data</span>')}${gate(u,'ExecuTracker',inner)}`};

/* Election model: forecast is computed server-side from the slider values */
function T_forecast(raceId,turnout,swing){
 const r=RACES.find(x=>x.id===raceId)||RACES[0],adj=turnout*0.45+swing*2.2;
 const pts=r.trend.map((v,i)=>i===r.trend.length-1?Math.min(99,Math.max(1,v+adj)):v),fin=pts[pts.length-1],[rt,c]=rateOf(fin);
 const W=600,H=230,L=40,R=16,T=12,B=28,iw=W-L-R,ih=H-T-B,x=i=>L+i*iw/(pts.length-1),y=v=>T+ih-(v-20)/60*ih;
 const line=pts.map((v,i)=>`${i?'L':'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(''),area=line+`L${x(pts.length-1)},${y(20)}L${x(0)},${y(20)}Z`;
 const sg=v=>(v>0?'+':'')+v;
 return `<section class="panel span2" id="forecast"><div class="panel-h"><h2>${r.name}</h2><span class="chip ${c}">${rt}</span></div><div class="panel-b" style="display:flex;flex-direction:column;gap:16px">
  <div class="prob"><div style="width:${fin}%;background:var(--blue)">DEM ${fin.toFixed(1)}%</div><div style="width:${100-fin}%;background:var(--red);justify-content:flex-end">${(100-fin).toFixed(1)}% REP</div></div>
  <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block" role="img" aria-label="Win probability trend ending at ${fin.toFixed(1)} percent">
   ${[20,35,50,65,80].map(t=>`<line x1="${L}" x2="${W-R}" y1="${y(t)}" y2="${y(t)}" stroke="var(--line)" ${t===50?'stroke-dasharray="4 4" stroke-width="1.5"':''}/><text x="${L-8}" y="${y(t)+4}" text-anchor="end" font-size="11" fill="var(--muted)" font-family="Roboto Mono, monospace">${t}%</text>`).join('')}
   <path d="${area}" fill="var(--blue)" opacity=".12"/><path d="${line}" fill="none" stroke="var(--blue)" stroke-width="3" stroke-linejoin="round"/>
   <circle cx="${x(pts.length-1)}" cy="${y(fin)}" r="6" fill="var(--blue)" stroke="var(--surface)" stroke-width="2"/>
   ${pts.map((_,i)=>i%2===0?`<text x="${x(i)}" y="${H-8}" text-anchor="middle" font-size="11" fill="var(--muted)" font-family="Roboto Mono, monospace">Wk ${i+1}</text>`:'').join('')}
  </svg>
  <div class="grid g3" style="gap:10px">
   <div class="panel stat" style="padding:12px 14px"><span class="label">Democrat</span><span style="font:700 15px var(--head)">${r.dem}</span></div>
   <div class="panel stat" style="padding:12px 14px"><span class="label">Republican</span><span style="font:700 15px var(--head)">${r.rep}</span></div>
   <div class="panel stat" style="padding:12px 14px"><span class="label">DGG voter contacts</span><span class="tab-nums" style="font:700 15px var(--head)">${r.contacts}</span></div>
  </div>
  <p style="margin:0;font-size:14px;color:var(--muted)">Scenario: turnout ${sg(turnout)} pts vs. 2022, late swing ${sg(swing)} pts. The model blends polling, early vote returns, and DGG canvass contact data. The what-if sliders adjust this week only.</p>
 </div></section>`;
}
V.model=(u,q)=>{const race=q.race||'oh7';
 const inner=`${modbar('Election Model','model.digitalgroundgame.org')}
 <div class="grid g3">
  <section class="panel"><div class="panel-h"><h2>Races</h2><span class="label">${RACES.length} tracked</span></div><div class="rows">${RACES.map(r=>{const p=r.trend[r.trend.length-1],[rt,c]=rateOf(p);return `<button class="row" ${nav('model','?race='+r.id)} style="grid-template-columns:1fr auto;${race===r.id?'background:var(--blueSoft)':''}"><span style="min-width:0"><span class="t" style="font-size:15px">${r.name}</span><br><span class="chip ${c}" style="margin-top:4px">${rt}</span></span><span class="mono tab-nums" style="font-size:14px">${p.toFixed(1)}%</span></button>`}).join('')}</div>
   <form class="panel-b" style="display:flex;flex-direction:column;gap:16px;border-top:1px solid var(--line)" hx-get="/model/forecast" hx-trigger="input delay:100ms" hx-target="#forecast" hx-swap="outerHTML">
    <input type="hidden" name="race" value="${race}"><span class="label">What-if scenario</span>
    <div class="slider"><div class="top"><label for="turnout">Turnout vs. 2022</label></div><input type="range" id="turnout" name="turnout" min="-10" max="10" value="0"></div>
    <div class="slider"><div class="top"><label for="swing">Late swing toward Dems</label></div><input type="range" id="swing" name="swing" min="-5" max="5" step="0.5" value="0"></div>
    <button class="btn sm ghost" type="button" style="align-self:flex-start" ${nav('model','?race='+race)}>Reset</button>
   </form></section>
  ${T_forecast(race,0,0)}
 </div>`;
 return `${head('Election Model','Race forecasts built on DGG canvassing data and in-house turnout modeling.','<span class="sample">Sample forecasts</span>')}${gate(u,'Election Model',inner)}`};

const RX_F=[['all','All'],['Creator','Creators'],['Politician','Officials & candidates']];
const T_rx_list=(f,q)=>{const s=(q||'').toLowerCase(),rc={Partner:'green',Warm:'blue',Cold:''},list=ROLODEX.filter(r=>(f==='all'||(f==='Creator'?r.type==='Creator':r.type!=='Creator'))&&(!s||(r.n+r.what+r.topic+r.poc).toLowerCase().includes(s)));
 return `<section class="panel" id="rx-list"><input type="hidden" id="rx-f" name="filter" value="${f}"><div class="tbl-wrap"><table><thead><tr><th>Name</th><th>Type</th><th>Focus</th><th>Relationship</th><th>Last contact</th><th>DGG point of contact</th><th></th></tr></thead><tbody>
 ${list.map(r=>`<tr><td style="min-width:220px"><div style="display:flex;gap:10px;align-items:center"><div class="avatar" style="background:${r.type==='Creator'?'var(--blue)':'var(--black)'}">${r.ini}</div><div><b>${r.n}</b><br><span style="font-size:13px;color:var(--muted)">${r.what}</span></div></div></td><td><span class="chip ${r.type==='Creator'?'blue':''}">${r.type}</span></td><td style="min-width:150px">${r.topic}<br><span style="font-size:13px;color:var(--muted)">${r.where}</span></td><td><span class="chip ${rc[r.rel]}">${r.rel}</span></td><td class="tab-nums" style="white-space:nowrap">${r.last}</td><td style="min-width:160px"><b>${r.poc}</b><br><span style="font-size:13px;color:var(--muted)">${r.pocRole}</span></td><td><button class="btn sm" ${act('Intro request sent to '+r.poc+', who manages the relationship with '+r.n)}>Request intro</button></td></tr>`).join('')||'<tr><td colspan="7" style="color:var(--muted)">No contacts match that search.</td></tr>'}
 </tbody></table></div></section>`};
const T_rx_filters=(f,oob)=>`<div class="filters" id="rx-filters" ${oob?'hx-swap-oob="true"':''}>${RX_F.map(([k,l])=>`<button class="fbtn" aria-pressed="${f===k}" hx-get="/rolodex/list?filter=${k}" hx-include="#rxq" hx-target="#rx-list" hx-swap="outerHTML">${l}</button>`).join('')}</div>`;
V.rolodex=(u,q)=>`${head('Rolodex','Political creators and officials we have relationships with, and the DGG member who owns each relationship.','<span class="sample">Sample contacts</span>')}
 ${gate(u,'Rolodex',`<div class="grid g4">
  <div class="panel stat"><span class="label">Contacts</span><span class="v tab-nums">${ROLODEX.length}</span><span class="s">Across 4 states and DC</span></div>
  <div class="panel stat"><span class="label">Creators</span><span class="v tab-nums">${ROLODEX.filter(r=>r.type==='Creator').length}</span><span class="s">Combined reach 4.3M</span></div>
  <div class="panel stat"><span class="label">Officials & candidates</span><span class="v tab-nums">${ROLODEX.filter(r=>r.type!=='Creator').length}</span><span class="s">Federal, state, and local</span></div>
  <div class="panel stat"><span class="label">Active partners</span><span class="v ok tab-nums">${ROLODEX.filter(r=>r.rel==='Partner').length}</span><span class="s">Co-hosted events this cycle</span></div>
 </div>
 <div class="filters">${T_rx_filters('all')}<label class="search" style="margin-left:auto;max-width:300px;display:flex">${ic('search')}<input id="rxq" name="q" placeholder="Search names, topics, contacts" aria-label="Search the Rolodex" hx-get="/rolodex/list" hx-trigger="keyup changed delay:250ms, search" hx-include="#rx-f" hx-target="#rx-list" hx-swap="outerHTML"></label></div>
 ${T_rx_list('all','')}
 <p class="demo-note" style="max-width:72ch">Direct contact details stay with each point of contact. Members request an introduction through them so every relationship has one owner.</p>`)}`;

/* ---------- My Team ---------- */
const teamMembers=u=>[['JE',u.name,'Member · joined Oct 25'],...TEAMS[u.team].members];
const memberOpts=(u,sel)=>`<option value="">Unassigned</option>${teamMembers(u).map(m=>`<option value="${m[0]}" ${sel===m[0]?'selected':''}>${m[0]==='JE'?'Me ('+esc(m[1])+')':m[1]}</option>`).join('')}`;
function T_team_body(u,filter){
 const T=TEAMS[u.team],all=DB.tasks.filter(t=>t.team===u.team),cnt=f=>all.filter(f).length;
 const list=all.filter(t=>filter==='all'||(filter==='mine'?t.who==='JE':!t.who)).sort((a,b)=>(a.status==='Done')-(b.status==='Done'));
 return `<div id="team-body" style="display:flex;flex-direction:column;gap:24px">
 <div class="grid g4">
  <div class="panel stat"><span class="label">Open tasks</span><span class="v tab-nums">${cnt(t=>t.status!=='Done')}</span><span class="s">Across ${T.projects.length} projects</span></div>
  <div class="panel stat"><span class="label">Assigned to you</span><span class="v tab-nums">${cnt(t=>t.who==='JE'&&t.status!=='Done')}</span><span class="s">Not yet done</span></div>
  <div class="panel stat"><span class="label">Unassigned</span><span class="v tab-nums" style="color:var(--red)">${cnt(t=>!t.who&&t.status!=='Done')}</span><span class="s">Need an owner</span></div>
  <div class="panel stat"><span class="label">Done</span><span class="v ok tab-nums">${cnt(t=>t.status==='Done')}</span><span class="s">This month</span></div>
 </div>
 <section class="panel"><div class="panel-h"><div class="filters">${[['all','All'],['mine','Assigned to me'],['open','Unassigned']].map(([k,l])=>`<button class="fbtn" aria-pressed="${filter===k}" hx-get="/team/body?filter=${k}" hx-target="#team-body" hx-swap="outerHTML">${l}</button>`).join('')}</div><button class="btn primary sm" hx-get="/team/task-form" hx-target="#newtask-slot">${ic('plus')}New task</button></div>
  <div id="newtask-slot"></div>
  <div class="tbl-wrap"><table><thead><tr><th></th><th>Task</th><th>Assigned to</th><th>Status</th><th>Due</th></tr></thead><tbody>
  ${list.map(t=>`<tr class="task ${t.status==='Done'?'done':''}"><td style="width:40px"><button class="chk" role="checkbox" aria-checked="${t.status==='Done'}" aria-label="Mark done" hx-post="/tasks/${t.id}/toggle" hx-target="#team-body" hx-swap="outerHTML">${t.status==='Done'?ic('check'):''}</button></td>
   <td style="min-width:240px"><b class="tt">${esc(t.t)}</b><br><span style="font-size:13px;color:var(--muted)">${t.project}</span></td>
   <td style="min-width:200px"><div style="display:flex;gap:8px;align-items:center">${t.who?`<div class="avatar av-sm" style="background:${t.who==='JE'?'var(--red)':T.c}">${t.who}</div>`:''}<select name="who" aria-label="Assign task" hx-post="/tasks/${t.id}/assign" hx-trigger="change" hx-target="#team-body" hx-swap="outerHTML">${memberOpts(u,t.who)}</select>${!t.who?`<button class="btn sm" hx-post="/tasks/${t.id}/take" hx-target="#team-body" hx-swap="outerHTML">Take it</button>`:''}</div></td>
   <td><select name="status" aria-label="Task status" hx-post="/tasks/${t.id}/status" hx-trigger="change" hx-target="#team-body" hx-swap="outerHTML">${['To do','In progress','Done'].map(x=>`<option ${x===t.status?'selected':''}>${x}</option>`).join('')}</select></td>
   <td class="tab-nums" style="white-space:nowrap">${t.due}</td></tr>`).join('')||'<tr><td colspan="5" style="color:var(--muted)">No tasks here. Pick one from All, or add a new task.</td></tr>'}
  </tbody></table></div></section></div>`;
}
const T_task_form=u=>`<form class="newtask" hx-post="/tasks" hx-target="#team-body" hx-swap="outerHTML">
 <div class="field"><label class="label" for="nt-title">Task</label><input id="nt-title" name="title" placeholder="What needs doing?" required autofocus></div>
 <div class="field"><label class="label" for="nt-proj">Project</label><select id="nt-proj" name="project">${TEAMS[u.team].projects.map(p=>`<option>${p}</option>`).join('')}</select></div>
 <div class="field"><label class="label" for="nt-who">Assign to</label><select id="nt-who" name="who">${memberOpts(u,'JE')}</select></div>
 <div class="field"><label class="label" for="nt-due">Due</label><input id="nt-due" name="due" type="date" value="2026-11-06"></div>
 <div style="display:flex;gap:6px"><button class="btn primary sm" type="submit">Add</button><button class="btn sm ghost" type="button" hx-get="/team/task-form?close=1" hx-target="#newtask-slot">Cancel</button></div>
</form>`;
V.team=(u,q)=>{const T=TEAMS[u.team],mem=teamMembers(u);
 return `${head('My Team','Your team, its members, and the projects you are working on together.',`<form class="viewas" style="gap:8px" hx-post="/team/preview" hx-trigger="change" hx-target="#root"><label for="teamswitch">Preview team</label><select id="teamswitch" name="team" style="border:2px solid var(--line);background:var(--surface);padding:6px 8px;border-radius:2px">${TEAM_ORDER.map(k=>`<option value="${k}" ${k===u.team?'selected':''}>${TEAMS[k].n}</option>`).join('')}</select></form>`)}
 <div class="grid g3">
  <section class="teamhero span2" style="--team:${T.c}"><div class="teamicon">${ic(T.icon)}</div><div><h2>${T.n}</h2><div class="tsub">${T.sub}</div><p>${T.d}</p>
   <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><span class="chip blue">You: Member</span><span class="chip">Lead: ${T.members[0][1]}</span><span class="chip">${mem.length} members</span></div></div></section>
  <section class="panel"><div class="panel-h"><h2>Members</h2></div><div class="rows">${mem.map(([i,n,r])=>`<div class="row" style="grid-template-columns:auto 1fr;padding:9px 18px"><div class="avatar av-sm" style="background:${i==='JE'?'var(--red)':T.c}">${i}</div><span><span class="t" style="font-size:15px">${i==='JE'?esc(n)+' (you)':n}</span><br><span class="d">${r}</span></span></div>`).join('')}</div></section>
 </div>
 ${T_team_body(u,q.filter||'all')}`};

/* ---------- join a team (in-app quiz) ---------- */
V.join=(u,q,id,quiz)=>`${head('Join a team','Five quick questions match you with the DGG team that fits your skills.')}<div class="play">${T_quiz(quiz)}</div>`;

/* ---------- settings ---------- */
const T_theme_seg=t=>`<div class="freqseg" id="theme-seg" role="group" aria-label="Theme">${[['light','Light',ic('sun')],['dark','Dark',ic('moon')],['system','Match my device','']].map(([k,l,i])=>`<button aria-pressed="${t===k}" hx-post="/settings/theme" ${vals({theme:k})} hx-target="#theme-seg" hx-swap="outerHTML">${i}${l}</button>`).join('')}</div>`;
V.settings=u=>`${head('Settings','Manage your account type, appearance, and profile.')}
 <section class="panel"><div class="panel-h"><h2>Account type</h2><span class="chip blue">${ACCOUNT_LABEL[u.account]}</span></div><div class="panel-b" style="display:flex;flex-direction:column;gap:14px">
  <div class="acctcards row3">${ACCOUNTS.map(([k,qq,n,d])=>`<button class="acctcard" aria-pressed="${u.account===k}" ${u.account===k?'disabled':`hx-post="/settings/account" ${vals({account:k})} hx-target="#root"`}><b>${qq}</b><span class="label">${n}</span><small>${d}</small>${u.account===k?`<span class="chip green" style="align-self:flex-start">${ic('check')}Current</span>`:`<span class="chip" style="align-self:flex-start">Switch</span>`}</button>`).join('')}</div>
  <p class="demo-note" style="margin:0">Switching is instant and you can switch back anytime. Choosing Team Member takes you through the short team quiz if you aren't on a team yet.</p>
 </div></section>
 ${u.account==='member'?`<section class="panel"><div class="panel-h"><h2>Your team</h2></div><div class="panel-b" style="display:flex;align-items:center;gap:16px;flex-wrap:wrap"><div class="teamicon" style="--team:${TEAMS[u.team].c}">${ic(TEAMS[u.team].icon)}</div><div style="flex:1;min-width:200px"><b style="font:700 18px var(--head)">${TEAMS[u.team].n}</b><br><span style="color:var(--muted)">${TEAMS[u.team].sub}</span></div><button class="btn sm" ${nav('team')}>Open My Team</button><button class="btn sm ghost" ${nav('join')}>Retake the team quiz</button></div></section>`:''}
 <section class="panel"><div class="panel-h"><h2>Appearance</h2></div><div class="panel-b">${T_theme_seg(u.theme)}</div></section>
 <section class="panel"><div class="panel-h"><h2>Profile</h2></div><form class="panel-b grid g3" style="align-items:end" hx-post="/settings/profile" hx-swap="none">
  <div class="field"><label class="label" for="s-name">Full name</label><input id="s-name" name="name" value="${esc(u.name)}"></div>
  <div class="field"><label class="label" for="s-email">Email</label><input id="s-email" name="email" type="email" value="${esc(u.email)}"></div>
  <div class="field"><label class="label" for="s-zip">Home ZIP code</label><input id="s-zip" name="zip" value="${esc(u.zip)}" inputmode="numeric"></div>
  <button class="btn primary" type="submit" style="justify-self:start">Save profile</button>
 </form></section>
 <section class="panel panel-b" style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"><div><b style="font:700 17px var(--head)">Support Digital Ground Game</b><br><span style="color:var(--muted)">Donations go through ActBlue and keep the hub free.</span></div><div style="display:flex;gap:8px;flex-wrap:wrap"><a class="btn red" href="${DONATE_URL}" target="_blank" rel="noopener">${ic('heart')}Donate</a><button class="btn ghost" hx-post="/auth/signout" hx-target="#root">${ic('logout')}Sign out</button></div></section>`;

V.notavailable=(u,q,page)=>`${head('Not on your plan',"This section isn't part of a Citizen Basic account.")}
 <section class="panel panel-b" style="display:flex;flex-direction:column;gap:12px;align-items:flex-start;max-width:640px"><p style="margin:0">Upgrade to Citizen Advanced for civics games and a Democracy Lab preview, or join a team for everything. You can switch back anytime.</p>
 <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn primary" hx-post="/settings/account" ${vals({account:'advanced',from:'home'})} hx-target="#root">Upgrade to Advanced</button><button class="btn" ${nav('join')}>Join the team</button><button class="btn ghost" ${nav('home')}>Back to dashboard</button></div></section>`;

/* =====================================================================
   PUBLIC SITE  (templates/site/*.html) — replaces digitalgroundgame.org
   ===================================================================== */
function T_sitenav(active){
 const L=(key,label,attrs)=>`<button class="slink" ${attrs} ${active===key?'aria-current="page"':''}>${label}</button>`;
 return `<header class="sitenav"><div class="sitenav-in">
  <button class="brand" hx-get="/" hx-target="#root" aria-label="Digital Ground Game home"><img src="img/logo-white.png" alt=""><span>Digital Ground Game</span></button>
  <nav class="sitelinks" aria-label="Site">
   ${L('hub','Hub','hx-get="/" hx-target="#root" hx-swap="innerHTML show:window:top"')}
   ${L('about','About us','hx-get="/site/about" hx-target="#root" hx-swap="innerHTML show:window:top"')}
   <details class="sdrop"><summary class="slink" ${active==='regions'?'aria-current="page"':''}>Regions${ic('down','sdrop-chev')}</summary>
    <div class="sdrop-menu"><button hx-get="/site/regions" hx-target="#root" hx-swap="innerHTML show:window:top"><b>All regions</b><span>Find your squad</span></button>${REGIONS.map(r=>`<button hx-get="/site/regions/${r.slug}" hx-target="#root" hx-swap="innerHTML show:window:top"><b>${r.name}</b><span>${r.slug==='international'?'Americans abroad':r.states.length+' states'}</span></button>`).join('')}</div></details>
   ${L('mail','Mailing list','hx-get="/site/mailing-list" hx-target="#root" hx-swap="innerHTML show:window:top"')}
  </nav>
  <div class="siteacts"><a class="btn sm discordbtn" href="${DISCORD_URL}" target="_blank" rel="noopener">${ic('chat')}Join Discord</a><a class="btn sm red" href="${DONATE_URL}" target="_blank" rel="noopener">${ic('heart')}Donate</a></div>
 </div></header>`;
}
const T_sitefoot=()=>`<footer class="sitefoot"><div class="sitefoot-in">
 <div><img src="img/logo-white.png" alt="Digital Ground Game" style="width:120px"><p>${ABOUT.tagline}</p><p class="small">Digital Ground Game is a 501(c)(4) nonprofit organization.</p></div>
 <div><span class="label" style="color:#9a9ca6">Follow us</span><div class="socials">${SOCIALS.map(([n,u])=>`<a href="${u}" target="_blank" rel="noopener">${n}</a>`).join('')}</div></div>
 <div><span class="label" style="color:#9a9ca6">Get involved</span><div class="socials col"><a href="${DISCORD_URL}" target="_blank" rel="noopener">Join the Discord</a><a href="${DONATE_URL}" target="_blank" rel="noopener">Donate</a><button class="linkbtn" hx-get="/site/mailing-list" hx-target="#root">Join the mailing list</button><a href="${SITE_URL}" target="_blank" rel="noopener">digitalgroundgame.org</a></div></div>
</div></footer>`;
const T_public=(active,inner)=>`${T_sitenav(active)}<main class="public">${inner}</main>${T_sitefoot()}`;
const T_pubhero=(eyebrow,title,sub,extra='')=>`<section class="pubhero patwrap tilebg"><div class="pubwrap"><span class="label" style="color:#fff">${eyebrow}</span><h1>${title}</h1>${sub?`<p>${sub}</p>`:''}${extra}</div></section>`;

V.about=()=>T_public('about',`${T_pubhero('About us','Vote loud, <span>lead louder</span>',ABOUT.mission,`<div class="herobtns"><a class="btn" href="${DISCORD_URL}" target="_blank" rel="noopener">${ic('chat')}Become a volunteer</a><button class="btn ghosty" hx-get="/site/regions" hx-target="#root">Find your region</button></div>`)}
 <div class="pubwrap pubbody">
  <section class="pubsplit"><div><h2 class="pubh">What we stand for</h2><p class="lead-p">${ABOUT.values}</p><p class="lead-p">${ABOUT.model}</p></div>
   <div class="grid g3 statrow">${ABOUT.stats.map(([v,l,s])=>`<div class="panel stat"><span class="v tab-nums">${v}</span><span class="label">${l}</span><span class="s">${s}</span></div>`).join('')}</div></section>
  <section><h2 class="pubh">Our accomplishments</h2><div class="wins">${ABOUT.wins.map(([v,t])=>`<div class="win"><b class="tab-nums">${v}</b><span>${t}</span></div>`).join('')}</div></section>
  <section><h2 class="pubh">Our teams</h2><div class="teamgrid">${TEAM_ORDER.map(k=>{const T=TEAMS[k];return `<div class="teamcard" style="--team:${T.c}"><div class="teamicon">${ic(T.icon)}</div><div><h3>${T.n}</h3><div class="tsub">${T.sub}</div><p>${T.d}</p></div></div>`}).join('')}</div></section>
  <section class="benefits"><h2 class="pubh" style="color:var(--red)">What you will gain</h2><div class="grid g3">${ABOUT.benefits.map(([t,d],i)=>`<div class="benefit">${ic(['track','star','search'][i])}<b>${t}</b><span>${d}</span></div>`).join('')}</div></section>
  <section class="joinband"><div><h2>Ready to get in the ground game?</h2><p>Join thousands of volunteers on Discord, or get updates by email first.</p></div><div class="herobtns"><a class="btn discordbtn" href="${DISCORD_URL}" target="_blank" rel="noopener">${ic('chat')}Join Discord</a><button class="btn" hx-get="/site/mailing-list" hx-target="#root">Join the mailing list</button></div></section>
 </div>`);

V.regions=()=>T_public('regions',`${T_pubhero('Regions','Find your <span>squad</span>','Members organize through five regional squads. Each squad runs local events, canvasses, and news dispatches, then joins national mobilizations.')}
 <div class="pubwrap pubbody"><div class="regiongrid">${REGIONS.map(r=>`<button class="regioncard" hx-get="/site/regions/${r.slug}" hx-target="#root" hx-swap="innerHTML show:window:top"><span class="label">${r.slug==='international'?'Worldwide':r.states.length+' states'}</span><h2>${r.name}</h2><p>${r.tag}</p>
  <div class="rmeta">${r.team.length?`<span class="chip">${r.team.length} leads & organizers</span>`:''}${r.cities.length?`<span class="chip blue">${r.cities.slice(0,3).join(' · ')}</span>`:''}</div>${arrow()}</button>`).join('')}</div></div>`);

V.region=(u,q,slug)=>{const r=REGIONS.find(x=>x.slug===slug)||REGIONS[0];
 return T_public('regions',`${T_pubhero(r.slug==='international'?'International Squad':r.name+' Region',r.name,r.tag,`<div class="herobtns"><a class="btn" href="${DISCORD_URL}" target="_blank" rel="noopener">${ic('chat')}Join #${r.slug} on Discord</a>${r.next?`<a class="btn ghosty" href="${r.next[1]}" target="_blank" rel="noopener">${r.next[0]}</a>`:''}</div>`)}
 <div class="pubwrap pubbody">
  <button class="crumb" hx-get="/site/regions" hx-target="#root">${ic('back')}All regions</button>
  <div class="grid g3">
   <section class="panel span2"><div class="panel-h"><h2>${r.slug==='international'?'Who we are':'States covered'}</h2><span class="label">${r.slug==='international'?'Worldwide':r.states.length+' states'}</span></div><div class="panel-b"><div class="statechips">${r.states.map(s=>`<span class="chip">${s}</span>`).join('')}</div></div></section>
   <section class="panel"><div class="panel-h"><h2>Contact</h2></div><div class="panel-b" style="display:flex;flex-direction:column;gap:10px">
    <div class="contact"><span class="mono">info@digitalgroundgame.org</span><button class="btn sm ghost" data-copy="info@digitalgroundgame.org">Copy</button></div>
    <a class="btn sm" href="${r.ig}" target="_blank" rel="noopener">${r.ig.includes('.'+r.slug)?r.name+' Instagram':'DGG Instagram'}</a>
    <a class="btn sm discordbtn" href="${DISCORD_URL}" target="_blank" rel="noopener">${ic('chat')}Discord</a></div></section>
  </div>
  ${r.team.length?`<section class="panel"><div class="panel-h"><h2>Regional team</h2><span class="label">${r.team.length} people</span></div><div class="leadgrid">${r.team.map(([n,role])=>`<div class="leadcard"><div class="avatar" style="background:var(--blue)">${n.replace(/[^A-Za-z ]/g,'').split(' ').filter(Boolean).map(x=>x[0]).join('').slice(0,2)}</div><div><b>${n}</b><span>${role}</span></div></div>`).join('')}</div></section>`:''}
  <div class="grid g2">
   ${r.cities.length?`<section class="panel"><div class="panel-h"><h2>Cities & chapters</h2></div><div class="rows">${r.cities.map(c=>`<div class="row" style="grid-template-columns:auto 1fr"><span class="ic red">${ic('pin')}</span><span class="t">${c}</span></div>`).join('')}</div></section>`:''}
   <section class="panel" ${r.cities.length?'':'style="grid-column:1/-1"'}><div class="panel-h"><h2>What's happening</h2></div><div class="rows">${r.notes.map(([t,d])=>`<div class="row" style="grid-template-columns:1fr"><span><span class="t">${t}</span><br><span class="d">${d}</span></span></div>`).join('')}</div></section>
  </div>
 </div>`)};

const T_mail_form=(done,email)=>done?`<div class="mailbox" id="mailbox"><span class="chip green" style="align-self:flex-start">${ic('check')}You're on the list</span><h2>Thanks for signing up.</h2><p>We'll send updates to <b>${esc(email)}</b>. You can unsubscribe anytime from any email.</p><button class="btn sm ghost" style="align-self:flex-start" hx-get="/site/mailing-list/form" hx-target="#mailbox" hx-swap="outerHTML">Sign up another email</button></div>`
 :`<form class="mailbox" id="mailbox" hx-post="/site/mailing-list" hx-target="#mailbox" hx-swap="outerHTML">
  <div class="grid g2" style="gap:14px"><div class="field"><label class="label" for="ml-first">First name</label><input id="ml-first" name="first" autocomplete="given-name"></div><div class="field"><label class="label" for="ml-zip">ZIP code</label><input id="ml-zip" name="zip" inputmode="numeric" autocomplete="postal-code"></div></div>
  <div class="field"><label class="label" for="ml-email">Email</label><input id="ml-email" name="email" type="email" required autocomplete="email" placeholder="you@example.com"></div>
  <div class="field"><label class="label" for="ml-region">Your region</label><select id="ml-region" name="region"><option value="">Choose a region</option>${REGIONS.map(r=>`<option value="${r.slug}">${r.name}</option>`).join('')}</select></div>
  <fieldset class="field" style="border:0;padding:0;margin:0"><legend class="label" style="margin-bottom:8px">Send me</legend><div class="checks">${[['cta','Calls to action'],['events','Events near me'],['dispatch','Regional news dispatches']].map(([k,l])=>`<label class="checkrow"><input type="checkbox" name="topic_${k}" checked>${l}</label>`).join('')}</div></fieldset>
  <button class="btn primary block" type="submit">Join the mailing list</button>
  <p class="demo-note" style="margin:0">Prototype: signups aren't sent anywhere yet. In production this form posts to your email provider.</p>
 </form>`;
V.mailing=()=>T_public('mail',`${T_pubhero('Mailing list','Stay in the <span>loop</span>','Get calls to action, event announcements, and regional news from Digital Ground Game in your inbox.')}
 <div class="pubwrap pubbody"><div class="pubsplit">
  <div><h2 class="pubh">What you'll get</h2><div class="rows panel">${[['bell','Calls to action','Our latest asks, like canvasses, phone banks, and poll-watching drives.'],['cal','Events','Canvassing weekends, workshops, and squad meetups in your region.'],['doc','Regional dispatches','News and wins from your region\'s squad.']].map(([i,t,d])=>`<div class="row" style="grid-template-columns:auto 1fr"><span class="ic">${ic(i)}</span><span><span class="t">${t}</span><br><span class="d">${d}</span></span></div>`).join('')}</div>
   <p class="lead-p" style="margin-top:16px">Want to talk with organizers in real time? <a href="${DISCORD_URL}" target="_blank" rel="noopener">Join the Discord.</a></p></div>
  ${T_mail_form(false)}
 </div></div>`);

/* ---------- inbox (member accounts) ---------- */
const KIND={direct:['Direct','blue'],team:['Team','green'],broadcast:['Announcement','red']};
const T_inbox_list=(f,sel)=>{const list=MESSAGES.filter(m=>f==='all'||m.kind===f);
 return `<div class="inlist" id="inlist"><div class="filters inbox-f">${[['all','All'],['direct','Direct'],['team','Team'],['broadcast','Announcements']].map(([k,l])=>`<button class="fbtn" aria-pressed="${f===k}" hx-get="/inbox/list?filter=${k}" hx-target="#inlist" hx-swap="outerHTML">${l}</button>`).join('')}</div>
 <div class="threads">${list.map(m=>`<button class="thread ${m.unread?'unread':''}" aria-current="${sel===m.id}" hx-get="/inbox/thread/${m.id}?filter=${f}" hx-target="#inbox-body" hx-swap="outerHTML"><div class="avatar av-sm" style="background:${m.c}">${m.ini}</div><span class="tmain"><span class="trow"><b>${m.from}</b><span class="ttime">${m.time}</span></span><span class="tsubj">${m.kind==='broadcast'?ic('mega2'):''}${m.subject}</span><span class="tprev">${m.body[0].replace(/^(Team,|Hey Jordan, |Hi Jordan, )/,'')}</span></span></button>`).join('')||'<p class="panel-b" style="color:var(--muted)">Nothing here yet.</p>'}</div></div>`};
const T_reader=m=>`<article class="reader"><div class="rhead"><div class="avatar" style="background:${m.c}">${m.ini}</div><div style="flex:1;min-width:0"><span class="chip ${KIND[m.kind][1]}">${KIND[m.kind][0]}</span><h2>${m.subject}</h2><span class="d"><b>${m.from}</b> · ${m.fromRole} · to ${m.to} · ${m.date}</span></div></div>
 <div class="rbody">${m.body.map(p=>`<p>${p}</p>`).join('')}</div>
 ${m.kind==='broadcast'?`<div class="rstats"><span class="chip">${ic('users')}Sent to 1,284 members</span><span class="chip green">${ic('check')}68% opened</span></div><div class="rreply"><span class="d">Announcements are one-way. Questions? Reply in the Discord.</span><a class="btn sm discordbtn" href="${DISCORD_URL}" target="_blank" rel="noopener">${ic('chat')}Open Discord</a></div>`
 :`<form class="rreply" hx-post="/actions/notify" ${vals({msg:'Reply sent to '+m.from})} hx-swap="none"><textarea name="reply" aria-label="Reply" placeholder="Reply to ${m.from}…"></textarea><button class="btn primary sm" type="submit">${ic('send')}Send</button></form>`}
</article>`;
const T_compose=()=>`<form class="reader compose" hx-post="/inbox/send" hx-target="#inbox-body" hx-swap="outerHTML">
 <div class="rhead"><div style="flex:1"><span class="label">New message</span><h2>Compose</h2></div></div>
 <div class="field"><label class="label" for="c-mode">Message type</label><div class="freqseg" role="radiogroup" id="c-mode">
  <label class="radioseg"><input type="radio" name="mode" value="direct" checked>Direct message</label>
  <label class="radioseg"><input type="radio" name="mode" value="broadcast">Mass announcement</label></div></div>
 <div class="field"><label class="label" for="c-to">To</label><select id="c-to" name="to">
  <optgroup label="People"><option>Lauren Pike · Media Team Lead</option><option>Alex Moreno · Columbus City Lead</option><option>Sam Ortega · Dev Team Lead</option><option>Jasmine Kim · Events Team Lead</option></optgroup>
  <optgroup label="Groups"><option>My team</option><option>Columbus chapter (412)</option></optgroup>
  <optgroup label="Leadership only"><option>Midwest Squad members</option><option>All Team Members</option><option>Everyone using the hub (1,284)</option></optgroup></select></div>
 <div class="field"><label class="label" for="c-subj">Subject</label><input id="c-subj" name="subject" placeholder="What's this about?"></div>
 <div class="field"><label class="label" for="c-body">Message</label><textarea id="c-body" name="body" rows="7" placeholder="Write your message…"></textarea></div>
 <p class="demo-note" style="margin:0">Mass announcements and "Leadership only" groups are limited to squad and national leads. Recipients also get an email and a Discord ping.</p>
 <div style="display:flex;gap:8px"><button class="btn primary" type="submit">${ic('send')}Send</button><button class="btn ghost" type="button" hx-get="/inbox/thread/m1" hx-target="#inbox-body" hx-swap="outerHTML">Cancel</button></div>
</form>`;
const T_inbox_body=(f,sel,compose)=>{const m=MESSAGES.find(x=>x.id===sel)||MESSAGES[0];
 return `<div class="inbox" id="inbox-body">${T_inbox_list(f,compose?null:m.id)}${compose?T_compose():T_reader(m)}</div>`};
V.inbox=(u,q)=>(MESSAGES[0].unread=false,'')+`${head('Inbox','Messages from teammates, your chapter, and DGG leadership.',`<button class="btn primary" hx-get="/inbox/compose" hx-target="#inbox-body" hx-swap="outerHTML">${ic('pen')}New message</button>`)}
 <div class="grid g4">
  <div class="panel stat"><span class="label">Unread</span><span class="v tab-nums" style="color:var(--red)">${MESSAGES.filter(m=>m.unread).length}</span><span class="s">Since your last visit</span></div>
  <div class="panel stat"><span class="label">Direct</span><span class="v tab-nums">${MESSAGES.filter(m=>m.kind==='direct').length}</span><span class="s">From other members</span></div>
  <div class="panel stat"><span class="label">Team</span><span class="v tab-nums">${MESSAGES.filter(m=>m.kind==='team').length}</span><span class="s">${u.team?TEAMS[u.team].n:'Your team'} channel</span></div>
  <div class="panel stat"><span class="label">Announcements</span><span class="v tab-nums">${MESSAGES.filter(m=>m.kind==='broadcast').length}</span><span class="s">From national and regional leads</span></div>
 </div>
 ${T_inbox_body('all','m1',false)}`;
