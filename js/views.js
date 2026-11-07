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
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
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
const modbar=(name,host)=>`<div class="modbar"><span class="dot"></span><b class="label" style="color:#fff">Connected module</b><span>${name}</span><code>${host}</code><button class="btn sm" ${act('Would open the full '+name+' app in a new tab')}>${ic('ext')}Open full app</button></div>`;
const sampleBar=(u,n)=>u.account==='member'?'':`<div class="samplebar"><span class="pro">Open preview</span><span class="msg"><b>${n} is open to everyone.</b> Join a team to unlock the rest of the Democracy Lab: four trackers, the Election Model, and the Rolodex.</span><button class="btn primary" ${nav('join')}>Join a team</button></div>`;
function gate(u,title,inner){
 if(u.account==='member')return inner;
 const v=u.account==='visitor';
 return `<div class="locked"><div class="ghost" aria-hidden="true" inert>${inner}</div><div class="lockcard"><div>
  <span class="chip yel">${ic('flask')}Democracy Lab</span><h2>${title} is for team members</h2>
  <p>${v?'Create a free account, then join a DGG team':'Join a DGG team'} to unlock the Democracy Lab: The Blue Book, Election Models, the Tracker Suite, and the Rolodex. A two-minute quiz finds where you fit.</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap">${v?`<button class="btn primary" hx-get="/auth/modal/signup" hx-swap="none">Create free account</button>`:`<button class="btn primary" ${nav('join')}>Join a team</button>`}</div></div></div></div>`;
}

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

const DIFFS=[
 `<p><span class="sec">§2(a)</span>The Secretary shall award grants to eligible States for last-mile broadband deployment in counties where fewer than 80 percent of households have access to service of at least 100 megabits per second.</p><p><span class="sec">§3</span>Authorizes $4,000,000,000 for fiscal years 2027 through 2031.</p>`,
 `<p><span class="sec">§2(a)</span>The Secretary shall award grants to eligible States for last-mile broadband deployment in counties where fewer than <del>80</del> <ins>85</ins> percent of households have access to service of at least 100 megabits per second.</p><p><span class="sec">§2(c)</span><ins>A State receiving a grant shall publish a coverage map updated not less than twice per year.</ins></p><p><span class="sec">§3</span>Authorizes <del>$4,000,000,000</del> <ins>$3,200,000,000</ins> for fiscal years 2027 through 2031.</p>`,
 `<p><span class="sec">§2(a)</span>The Secretary shall award grants to eligible States for last-mile broadband deployment in counties where fewer than 85 percent of households have access to service of at least 100 megabits per second<ins>, with priority given to tribal lands</ins>.</p><p><span class="sec">§2(c)</span>A State receiving a grant shall publish a coverage map updated not less than twice per year.</p><p><span class="sec">§4(b)</span><del>Grantees may subcontract up to 100 percent of deployment.</del></p><p><span class="sec">§3</span>Authorizes $3,200,000,000 for fiscal years 2027 through 2031.</p>`];
const VERS=['Introduced · Feb 12','Committee substitute · Apr 3','Engrossed (passed House) · Oct 20'];
const T_bill_diff=(id,v)=>`<div id="diff-box" style="display:flex;flex-direction:column;gap:12px"><div class="tabs" role="tablist">${VERS.map((x,i)=>`<button role="tab" aria-selected="${v===i}" hx-get="/bills/${id}/diff?ver=${i}" hx-target="#diff-box" hx-swap="outerHTML">${x}</button>`).join('')}</div><div class="diff">${DIFFS[v]}</div></div>`;
const T_follow=b=>`<button class="btn ${b.follow?'':'primary'}" id="followbtn" hx-post="/bills/${b.id}/follow" hx-swap="outerHTML">${ic('bell')}${b.follow?'Following':'Follow bill'}</button>`;
V.bill=(u,q,id)=>{
 const b=findBill(id)||BILLS[0],sp=ALLREPS.find(r=>r.id===b.sponsor),tl=BILLTL[b.id]||DEFAULT_TL;
 return `${head(b.title,`${b.num} · ${b.lvl} · ${b.party?({D:'Introduced by Democrats',R:'Introduced by Republicans',B:'Bipartisan'})[b.party]:'Sponsor unknown'}`,pinBtn(CTX(),'bill:'+b.id),crumb('bills','Bills & Laws'))}
 <section class="panel"><div class="panel-b" style="display:flex;flex-direction:column;gap:14px"><p style="margin:0;max-width:75ch">${b.summary}</p>
  <div class="pipeline">${STAGES.map((s,i)=>`<div class="${i<b.stage?'on':i===b.stage?'cur':''}">${s}${i===b.stage?`<small>Current · ${b.updated}</small>`:''}</div>`).join('')}</div></div></section>
 <div class="grid g3">
  <section class="panel span2"><div class="panel-h"><h2>Text changes</h2><span class="label">${VERS.length} versions</span></div><div class="panel-b" style="display:flex;flex-direction:column;gap:12px">
   ${b.id==='hr2817'?T_bill_diff(b.id,2):`<p style="margin:0;color:var(--muted)">Version-by-version text changes will appear here once the live data connection is built.</p>`}
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
const T_games_hub=()=>`<div id="game-area-inner" style="display:flex;flex-direction:column;gap:24px">${head('Games','Daily games and quizzes on American civics and history. New puzzles every morning.','<span class="chip yel">'+ic('star')+'4-day streak</span>')}
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
/* ---------- join a team (in-app quiz) ---------- */
V.join=(u,q,id,quiz)=>`${head('Join a team','Five quick questions match you with the DGG team that fits your skills.')}<div class="play">${T_quiz(quiz)}</div>`;

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
  ${su?`<label class="checkrow"><input type="checkbox" name="join" value="1" ${join?'checked':''}>I want to join a Digital Ground Game team</label>`:''}
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
const GOV=[['register','Registration','badge'],['ballot','Sample Ballot','ballot'],['reps','Representation','users'],['bills','Bills & Laws','doc'],['history','Voting History','history'],['civics','Civics 101','cap']];
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
  top=group('Digital Hub')+item(['home','Dashboard','home'])+GOV.map(x=>item(x)).join('');
  bottom=item(['resources','Resources','info'])+item(['help','Help','help']);
 } else {
  top=group('Digital Hub')+item(['home','Dashboard','home'])+drop('Your Government','scale',GOV)
   +group('Digital Tools')+drop('Resources','info',[['resources','Resources','info'],['help','Help & FAQ','help']])+item(['media','DGG Media','play'])
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

/* ---------- pinned dashboard cards ---------- */
function pinCard(u,k){
 let t,page,body;
 if(k.startsWith('bill:')){const b=findBill(k.slice(5));if(!b)return '';t=b.num;page='bill/'+b.id;body=`<b class="pc-t">${b.title}</b><div class="pc-row">${pipe(b.stage)}<span class="label">${STAGES[b.stage]}</span></div><span class="d">Updated ${b.updated} ${partyChip(b.party)}</span>`}
 else if(k.startsWith('rep:')){const r=REP_INDEX[k.slice(4)]||ALLREPS.find(x=>x.id===k.slice(4));if(!r)return '';t=r.office;page='rep/'+r.id;body=`<div class="pc-rep"><div class="avatar" style="background:${candColor(r.party)}">${r.ini}</div><span><b>${r.name}</b><span class="d">${r.scope}</span><span class="d mono">${r.phone}</span></span></div>`}
 else if(k.startsWith('race:')){const r=BALLOT[+k.slice(5)];if(!r)return '';t='Ballot race';page='ballot';body=`<b class="pc-t">${r.race}</b><span class="d">${r.cands.map(c=>c.name+' ('+c.party+')').join(' · ')}</span>`}
 else {
  const D={
   'reg:record':['Your registration','register',`<span class="chip green">${ic('check')}Active</span><span class="d">${USER.name} · ${USER.precinct}</span><span class="d">Registered since Sept 14, 2018</span>`],
   'reg:polling':['Polling place','register',`<b class="pc-t">Northwood Recreation Center</b><span class="d">2000 N High St, Columbus, OH 43201</span>`],
   'reg:dates':['Key election dates','register',IMPORTANT_DATES.filter(x=>!x[4]||x[4]==='OH').slice(0,3).map(([d,l])=>`<span class="d"><b class="mono">${fmtDate(d).m} ${fmtDate(d).d}</b> · ${l}</span>`).join('')],
   'hist:stats':['Turnout record','history',`<div class="pc-stats"><span><b class="disp">80%</b><small>turnout</small></span><span><b class="disp">3</b><small>in a row</small></span><span><b class="disp">4/4</b><small>generals</small></span></div>`],
   'hist:table':['Recent elections','history',HISTORY.slice(1,4).map(([d,e,s])=>`<span class="d"><b>${d}</b> · ${e} · <span class="chip ${s==='Voted'?'green':'red'}">${s}</span></span>`).join('')],
   'civics:progress':['Civics 101 progress','civics',`<div class="bar" style="height:10px"><i style="width:40%;background:var(--blue)"></i></div><span class="d">2 of 5 units · 4-day game streak</span>`],
   'chapter:lead':['Local chapter','chapter',`<b class="pc-t">Alex Moreno · Columbus City Lead</b><span class="d mono">columbus@digitalgroundgame.org</span>`],
  };
  if(!D[k])return '';[t,page,body]=D[k];
 }
 return `<section class="panel pincard"><div class="panel-h"><h2>${t}</h2><div class="ph-r"><button class="btn sm ghost" ${nav(page)}>Open</button><button class="iconbtn" hx-post="/pins/toggle" ${vals({key:k,from:'dash'})} hx-target="#pins" hx-swap="outerHTML" aria-label="Unpin ${esc(t)}" title="Unpin">${ic('x')}</button></div></div><div class="panel-b pc-body">${body}</div></section>`;
}
function T_pins(u){
 const cards=(u.pins||[]).map(k=>pinCard(u,k)).join('');
 if(!cards)return `<div id="pins" class="pinhint">${ic('pin')}<span><b>Make this dashboard yours.</b> Pin cards from any section (your representatives, bills, registration, voting history) and they'll show up here.</span></div>`;
 return `<section id="pins"><div class="sechead"><h2>Pinned</h2><span class="label">${u.pins.length} item${u.pins.length===1?'':'s'}</span></div><div class="pingrid">${cards}</div></section>`;
}

/* ---------- dashboard ---------- */
function nextElection(u){
 const st=u.location&&u.location.state;
 return ELECTIONS.filter(e=>!st||e.states.includes(st)).map(e=>({...e,days:daysUntil(e.date)})).find(e=>e.days>=0&&e.days<=100)||null;
}
const STATE_OPTS=sel=>STATES.map(([c,n])=>`<option value="${c}" ${sel===c?'selected':''}>${n}</option>`).join('');
const T_locform=(u,compact)=>`<form class="locform ${compact?'compact':''}" hx-post="/dash/location" hx-target="#root" hx-swap="innerHTML show:window:top">
 <div class="field lf-addr"><label class="sr" for="lf-addr">Street address</label><input id="lf-addr" name="address" placeholder="Address" autocomplete="street-address" value="${esc(u.location?.address||'')}"></div>
 <div class="field"><label class="sr" for="lf-city">City</label><input id="lf-city" name="city" placeholder="City" autocomplete="address-level2" value="${esc(u.location?.city||'')}"></div>
 <div class="field"><label class="sr" for="lf-state">State</label><select id="lf-state" name="state" required><option value="">State</option>${STATE_OPTS(u.location?.state)}</select></div>
 <div class="field lf-zip"><label class="sr" for="lf-zip">ZIP</label><input id="lf-zip" name="zip" placeholder="ZIP" inputmode="numeric" autocomplete="postal-code" value="${esc(u.location?.zip||'')}"></div>
 <button class="btn primary lf-go" type="submit">Get info</button></form>`;
const DASH_TOOLS=[
 ['ballot','See my ballot','Every race and issue on your ballot','ballot',null],
 ['civics','Civics 101','How government works, games, and lectures','cap',null],
 ['reps','Find my representatives','Federal, state, and local officials','users',null],
 ['register','Check my registration','Status, polling place, and deadlines','badge',null],
 ['trackers','Tracker Suite','Legislation, courts, agendas, and executive orders','track','team'],
];
V.home=u=>{
 const next=nextElection(u),loc=u.location;
 const greet=isV(u)?'Welcome!':`Welcome back, ${esc(u.first)}!`;
 const donate=!isMember(u)&&!u.donate_dismissed?`<div class="donate" id="donatebar"><button class="iconbtn close" hx-post="/dashboard/dismiss-donate" hx-target="#donatebar" hx-swap="outerHTML" aria-label="Dismiss">${ic('x')}</button><div class="msg"><b>Keep this hub free for every voter.</b> No ads, no paywall. If you can, chip in.</div><div class="give"><a class="btn red" href="${DONATE_URL}" target="_blank" rel="noopener">${ic('heart')}Donate</a></div></div>`:'';
 const dates=IMPORTANT_DATES.filter(x=>!x[4]||(loc&&!isV(u)&&x[4]===loc.state)).filter(x=>daysUntil(x[0])>=0).sort((a,b)=>a[0].localeCompare(b[0])).slice(0,5);
 const tool=([p,t,d,i,lock])=>{const locked=lock&&!isMember(u);return `<button class="row" ${locked?`hx-post="/prompt/team" ${vals({why:'trackers'})} hx-swap="none"`:nav(p)}><span class="ic ${locked?'yel':''}">${ic(i)}</span><span><span class="t">${t}</span>${locked?ic('lock','inlock'):''}<br><span class="d">${d}</span></span>${arrow()}</button>`};
 return `<div class="dash-top"><h1 class="welcome">${greet}</h1>${donate}</div>
 ${loc?`<div class="locline">${ic('pin')}<span>Showing information for <b>${esc(loc.city||'')}${loc.city?', ':''}${esc(STATE_BY[loc.state]?.[1]||loc.state)}</b></span><button class="linkbtn" hx-get="/dash/locform" hx-target="#locbox">Change location</button></div><div id="locbox"></div>`
  :`<p class="locprompt">Please enter your location for the most accurate and relevant information to you!</p>${T_locform(u)}`}
 ${next?`<section class="hero patwrap tilebg countdown"><div class="big tab-nums">${next.days}<small>day${next.days===1?'':'s'} to go</small></div><div><h2>${next.name}</h2><p>${fmtDate(next.date).long}. Check your registration and make a plan to vote.</p></div><div style="display:flex;flex-direction:column;gap:10px"><button class="btn" ${nav('ballot')}>See my ballot</button><button class="btn" ${nav('register')}>Check registration</button></div></section>`:''}
 ${T_pins(u)}
 ${u.account==='account'?`<section class="dcta up"><div class="dtext"><span class="label">DGG Team</span><b>Help build this hub. Join the team.</b><span>Team members write ballot breakdowns, fill in missing bill info, and get the full Democracy Lab. A two-minute quiz finds where you fit.</span></div><div class="dbtns"><button class="btn primary sm" ${nav('join')}>Find my team</button></div></section>`:''}
 ${isMember(u)?`<section class="panel"><div class="panel-h"><h2>Team briefing</h2><span class="chip blue">${TEAMS[u.team].n}</span></div><div class="rows rows3">
   <button class="row" ${nav('ops')}><span class="ic red">${ic('target')}</span><span><span class="t">Georgia Runoff Support is recruiting</span><br><span class="d">Operations · 74 of 120 volunteers signed up</span></span><span class="chip red">Op</span></button>
   <button class="row" ${nav('inbox')}><span class="ic">${ic('mail')}</span><span><span class="t">${MESSAGES.filter(m=>m.unread).length} unread messages</span><br><span class="d">Inbox · latest from DGG Leadership</span></span><span class="chip blue">Inbox</span></button>
   <button class="row" ${nav('tasks')}><span class="ic yel">${ic('check')}</span><span><span class="t">${(n=>n+(n===1?' task':' tasks'))(DB.tasks.filter(t=>t.team===u.team&&t.who==='JE'&&t.status!=='Done').length)} assigned to you</span><br><span class="d">Tasks · ${TEAMS[u.team].n}</span></span><span class="chip yel">Tasks</span></button>
  </div></section>`:''}
 <div class="dash-grid">
  <section class="panel">${ph('What changed this week',`<button class="btn sm ghost" ${nav('bills')}>All bills</button>`)}<div class="rows">
   <button class="row" ${nav('bill/hr2817')}><span class="ic">${ic('doc')}</span><span><span class="t">H.R. 2817 passed the House</span><br><span class="d">Rural Broadband Access Act · ${isV(u)?'251–178':'your representative voted Yea'}</span></span><span class="chip blue">Oct 20</span></button>
   <button class="row" ${nav('bill/s904')}><span class="ic">${ic('doc')}</span><span><span class="t">S. 904 scheduled for markup</span><br><span class="d">Voter Registration Modernization Act</span></span><span class="chip">Oct 17</span></button>
   ${ALL_FED.slice(3,5).map(b=>`<button class="row" ${nav('bill/'+b.id)}><span class="ic">${ic('doc')}</span><span><span class="t">${b.num} · ${STAGES[b.stage]}</span><br><span class="d">${b.title}</span></span><span class="chip">${b.updated}</span></button>`).join('')}
  </div></section>
  <section class="panel">${ph('Explore tools')}<div class="rows">${DASH_TOOLS.map(tool).join('')}</div></section>
  <section class="panel">${ph('Upcoming dates',`<a class="btn sm ghost" href="${DGG_CALENDAR}" target="_blank" rel="noopener">${ic('cal')}DGG calendar</a>`)}<div class="rows">
   ${dates.map(([d,l,k,c,st])=>`<div class="row daterow"><div class="edate"><small>${fmtDate(d).m}</small><b class="tab-nums">${fmtDate(d).d}</b></div><span><span class="t">${l}</span><br><span class="chip ${c}">${k}${st?' · '+st:''}</span></span><span class="d tab-nums">${daysUntil(d)}d</span></div>`).join('')}
   ${isV(u)||!loc?`<button class="row note-row" ${isV(u)?'hx-post="/prompt/account" '+vals({why:'dates'})+' hx-swap="none"':nav('settings')}><span class="ic yel">${ic('pin')}</span><span><span class="t">Want dates for your state?</span><br><span class="d">${isV(u)?'Create a free account to see deadlines where you live.':'Add your location in Settings.'}</span></span>${arrow()}</button>`:''}
  </div></section>
 </div>
 <section class="cta ctabox"><div class="cta-h"><div><span class="label" style="color:#9a9ca6">Call to action · ${CTA.date} · ${CTA.by}</span><h2>${CTA.title.replace('Take back','<span>Take back').replace('Senate','Senate</span>')}</h2></div><a class="btn sm" href="${CTA.url}" target="_blank" rel="noopener">${ic('ext')}Read the full CTA</a></div>
  <ol class="ctasteps">${CTA.steps.map(([t,d,l])=>`<li><b>${t}</b><span>${d}</span>${l?(l[1].startsWith('#')?`<button class="btn sm primary" ${nav(l[1].slice(1))}>${l[0]}</button>`:`<a class="btn sm primary" href="${l[1]}" target="_blank" rel="noopener">${l[0]}</a>`):''}</li>`).join('')}</ol>
  <div class="ctaprev"><span class="label">Previous calls to action</span>${CTA.previous.map(([d,t,url])=>`<a href="${url}" target="_blank" rel="noopener"><span class="mono">${d}</span>${t}</a>`).join('')}</div>
 </section>`;
};

/* ---------- registration ---------- */
const T_reg_form=(u,again)=>`<section class="panel"><div class="panel-h"><h2>${again?'Check someone else':'Look up your registration'}</h2><span class="label">All 50 states + DC</span></div>
 <form class="panel-b lookupform" hx-post="/register/lookup" hx-target="#root" hx-swap="innerHTML show:window:top">
  <div class="field"><label class="label" for="rg-first">First name</label><input id="rg-first" name="first" value="${again?'':'Jordan'}" autocomplete="given-name"></div>
  <div class="field"><label class="label" for="rg-last">Last name</label><input id="rg-last" name="last" value="${again?'':'Ellis'}" autocomplete="family-name"></div>
  <div class="field"><label class="label" for="rg-dob">Date of birth</label><input id="rg-dob" name="dob" type="date" value="${again?'':'1996-04-12'}"></div>
  <div class="field"><label class="label" for="rg-zip">ZIP code</label><input id="rg-zip" name="zip" value="${again?'':'43201'}" inputmode="numeric" autocomplete="postal-code"></div>
  <div class="field"><label class="label" for="rg-state">State</label><select id="rg-state" name="state">${STATE_OPTS('OH')}</select></div>
  <button class="btn primary" type="submit">Look up</button>
 </form></section>`;
V.register=u=>{
 const show=!isV(u)||u.lookups?.register;
 const top=head('Registration',show?'Your record as held by your state\'s election office. The live version checks it nightly.':'Enter your information to check your voter registration, polling place, and deadlines.','<span class="sample">Sample data</span>');
 if(!show)return top+T_reg_form(u)+`<p class="demo-note">${ic('lock')} We only use this to look up your public voter record. ${isV(u)?'With a free account, we save it so you won\'t need to enter it again.':''}</p>`;
 return `${top}<div class="grid g3">
  <section class="panel span2">${ph('Your record',`<span class="chip green">${ic('check')}Active</span>${pinBtn(u,'reg:record')}`)}<div class="panel-b"><div class="kv">
   <div class="k">Name</div><div class="v">${USER.name}</div><div class="k">Registered address</div><div class="v">${USER.addr}</div>
   <div class="k">County</div><div class="v">${USER.county}</div><div class="k">Precinct</div><div class="v">${USER.precinct} · ${USER.ward}</div>
   <div class="k">Registered since</div><div class="v">September 14, 2018</div><div class="k">Party affiliation</div><div class="v">Unaffiliated (Ohio sets affiliation by the last primary ballot you chose)</div>
   <div class="k">Voter ID on file</div><div class="v mono">OH••••••4471</div></div></div></section>
  <section class="panel">${ph('Polling place',pinBtn(u,'reg:polling'))}<div class="panel-b" style="display:flex;flex-direction:column;gap:12px">
   <div style="display:flex;gap:10px">${ic('pin').replace('<svg','<svg style="width:20px;flex:none;color:var(--red)"')}<div><b>Northwood Recreation Center</b><br><span style="color:var(--muted)">2000 N High St, Columbus, OH 43201</span></div></div>
   <div class="chip blue" style="align-self:flex-start">0.6 mi · 12 min walk</div><button class="btn sm" ${act('Would open directions in your maps app')}>Get directions</button></div></section>
 </div>
 <section class="panel">${ph('Key dates',pinBtn(u,'reg:dates'))}<div class="tbl-wrap"><table><thead><tr><th>Date</th><th>What</th><th>Days away</th></tr></thead><tbody>
  ${IMPORTANT_DATES.filter(x=>!x[4]||x[4]==='OH').sort((a,b)=>a[0].localeCompare(b[0])).map(([d,l,k,c])=>`<tr><td class="tab-nums" style="white-space:nowrap">${fmtDate(d).long}</td><td>${l} <span class="chip ${c}">${k}</span></td><td class="tab-nums">${daysUntil(d)}</td></tr>`).join('')}
 </tbody></table></div></section>
 ${T_reg_form(u,true)}`;
};

/* ---------- sample ballot ---------- */
const candColor=p=>p==='D'?'var(--blue)':p==='R'?'var(--red)':p==='G'?'#13824A':p==='L'?'#C99A00':'#596079';
const T_candidate=(c,open)=>{
 const ini=c.name.replace('Hon. ','').split(/[ /]+/).filter(Boolean).map(x=>x[0]).slice(0,2).join('');
 const row=`<div class="cand-row"><button class="cand-toggle" hx-get="/ballot/candidates/${c.id}${open?'?collapsed=1':''}" hx-target="#cand-${c.id}" hx-swap="outerHTML" aria-expanded="${open}"><div class="avatar" style="background:${candColor(c.party)}">${ini}</div><span style="min-width:0"><span class="t">${c.name}</span>${c.inc?' <span class="chip">Incumbent</span>':''}<br><span class="d">${PARTY[c.party]} · ${c.job}</span></span>${party(c.party)}${ic('down',open?'chev open':'chev')}</button>
  <button class="infobtn" hx-get="/ballot/breakdown/${c.id}" hx-target="#bd-${c.id}" aria-label="DGG community breakdown of ${esc(c.name)}" title="DGG community breakdown">${ic('info')}</button></div>`;
 if(!open)return `<div class="cand" id="cand-${c.id}">${row}<div id="bd-${c.id}"></div></div>`;
 return `<div class="cand open" id="cand-${c.id}">${row}<div id="bd-${c.id}"></div>
  <div class="cand-body"><div class="cand-main"><span class="label">About</span><p>${c.bio}</p><span class="label">Top priorities</span><ul class="cand-pos">${c.positions.map(([k,v])=>`<li><b>${k}</b><span>${v}</span></li>`).join('')}</ul></div>
   <aside class="cand-side"><div class="kv" style="grid-template-columns:90px 1fr"><div class="k">Age</div><div class="v tab-nums">${c.age}</div><div class="k">Lives in</div><div class="v">${c.home}</div><div class="k">Website</div><div class="v mono" style="font-size:13px">${c.site}</div></div>
    <span class="label">Raised this cycle</span><div class="disp tab-nums" style="font-size:30px">$${c.raised.toLocaleString()}K</div>
    <span class="label">Endorsements</span><div style="display:flex;gap:6px;flex-wrap:wrap">${c.endorse.map(e=>`<span class="chip">${e}</span>`).join('')}</div></aside></div></div>`;
};
function T_breakdown(u,c){
 const b=BREAKDOWNS[c.id];
 const close=`<button class="iconbtn" hx-get="/ballot/breakdown/${c.id}?close=1" hx-target="#bd-${c.id}" aria-label="Close breakdown">${ic('x')}</button>`;
 if(!b)return `<div class="breakdown empty"><div class="bd-h"><span class="label">DGG community breakdown</span>${close}</div><p>No one in DGG has written a breakdown of <b>${c.name}</b> yet.</p>
  ${isMember(u)?`<button class="btn sm primary" ${act('Would open the breakdown editor for '+c.name)}>${ic('pen')}Write this breakdown</button>`:`<p class="d">Breakdowns are written by DGG team members. Join a team to contribute to the community database.</p><button class="btn sm primary" ${nav('join')}>Join a team to contribute</button>`}</div>`;
 return `<div class="breakdown"><div class="bd-h"><span class="label">DGG community breakdown · ${b.by} · updated ${b.updated}</span>${close}</div>
  <div class="bd-verdict"><span class="chip ${b.verdict==='Recommended'?'green':'red'}">${b.verdict==='Recommended'?ic('check'):''}${b.verdict}</span></div>
  <p>${b.take}</p>${b.flags.length?`<span class="label">Recent controversies</span><ul class="bd-flags">${b.flags.map(f=>`<li>${f}</li>`).join('')}</ul>`:'<p class="d">No recent controversies found.</p>'}
  <p class="d">Community breakdowns reflect DGG members' views, not official endorsements.</p></div>`;
}
V.ballot=u=>{
 const show=!isV(u)||u.lookups?.ballot;
 const top=head('Sample Ballot',show?`Sample ballot for ${USER.precinct}, Nov 3, 2026 general election. Tap a candidate for their background; tap ${ic('info').replace('<svg','<svg style="width:15px;vertical-align:-2px"')} for the DGG community breakdown.`:'Enter your address to see the races and issues on your ballot.','<span class="sample">Sample data</span>');
 if(!show)return top+`<section class="panel"><div class="panel-h"><h2>Find your ballot</h2></div><div class="panel-b">${T_locform(u).replace('hx-post="/dash/location"','hx-post="/ballot/lookup"').replace('Get info','See my ballot')}</div></section>`;
 return `${top}<div class="ballot-legend">${['Federal','State','Judicial','Local'].map(k=>`<span class="chip">${BALLOT.filter(r=>r.kind===k).length} ${k}</span>`).join('')}<span class="chip">${ISSUES.length} issues</span></div>
 <div class="ballot">${BALLOT.map((r,i)=>`<section class="panel">${ph(r.race,`<span class="label">${r.kind} · ${r.vote}</span>${pinBtn(u,'race:'+i)}`)}<div class="rows">${r.cands.map(c=>T_candidate(c,false)).join('')}</div></section>`).join('')}
 ${ISSUES.map(([t,a,b])=>`<section class="panel">${ph(t,'<span class="chip">Local</span>')}<div class="panel-b"><p style="margin:0 0 8px">${a}</p><p style="margin:0;color:var(--muted);font-size:14px">${b}</p></div></section>`).join('')}</div>`;
};

/* ---------- representation ---------- */
const BRANCHES_SEL=[['legislative','Legislative (Congress)'],['executive','Executive'],['judicial','Judicial (Supreme Court)']];
const stateSenateDistricts=st=>st==='OH'?33:st==='NE'?49:Math.max(20,Math.min(40,STATE_BY[st][2]*3));
function repsFor(kind,p){
 const st=p.state,S=STATE_BY[st];
 if(kind==='federal'){
  if(p.branch==='executive')return FED_EXEC;
  if(p.branch==='judicial')return FED_JUD;
  if(st==='OH'&&+p.district===3)return REPS.federal;
  const d=+p.district||1,out=[];
  if(st!=='DC'){out.push(sampleRep(`sen-${st}-1`,'U.S. Senator',S[1]),sampleRep(`sen-${st}-2`,'U.S. Senator',S[1]))}
  out.push(sampleRep(`h-${st}-${d}`,st==='DC'?'Delegate to Congress':'U.S. Representative',S[2]===1?`${S[1]} at-large`:`${S[1]} District ${d}`));
  return out;
 }
 if(kind==='state'){
  if(st==='OH'&&+p.district===15)return REPS.state;
  const d=+p.district||1,gp=sampleRep(`gov-${st}`,'Governor',S[1]).party;
  return [sampleRep(`gov-${st}`,'Governor',S[1]),sampleRep(`ltg-${st}`,'Lieutenant Governor',S[1],gp),sampleRep(`ag-${st}`,'Attorney General',S[1]),sampleRep(`sos-${st}`,'Secretary of State',S[1]),
   sampleRep(`ss-${st}-${d}`,'State Senator',`${S[1]} Senate District ${d}`),sampleRep(`sr-${st}-${d}`,'State Representative',`${S[1]} House District ${d*2}`)];
 }
 const city=p.city||citiesOf(st)[0];
 if(st==='OH'&&city==='Columbus')return REPS.local;
 const k=`${st}-${city}`;
 return [sampleRep(`may-${k}`,'Mayor',`City of ${city}`),sampleRep(`ccp-${k}`,'City Council President',`${city} City Council`),sampleRep(`cc1-${k}`,'City Council Member',`${city} City Council`),sampleRep(`cc2-${k}`,'City Council Member',`${city} City Council`),sampleRep(`sb-${k}`,'School Board President',`${city} Public Schools`,'N'),sampleRep(`com-${k}`,'County Commissioner',`County serving ${city}`)];
}
const repMini=(u,r)=>`<div class="repmini"><button class="repmini-main" ${nav('rep/'+r.id)}><div class="avatar" style="background:${candColor(r.party)}">${r.ini}</div><span style="min-width:0"><b>${r.name}</b><span class="d">${r.office}</span><span class="d">${r.scope}</span></span>${party(r.party)}</button>${pinBtn(u,'rep:'+r.id)}</div>`;
function T_rep_col(u,kind,p){
 const S=STATE_BY[p.state],list=repsFor(kind,p);
 const sel=(name,opts,v,label)=>`<label class="field"><span class="label">${label}</span><select name="${name}">${opts.map(([val,l])=>`<option value="${val}" ${String(v)===String(val)?'selected':''}>${l}</option>`).join('')}</select></label>`;
 const stateSel=sel('state',STATES.map(s=>[s[0],s[1]]),p.state,'State');
 let controls='';
 if(kind==='federal'){controls=sel('branch',BRANCHES_SEL,p.branch,'Branch')+(p.branch==='legislative'?stateSel+sel('district',Array.from({length:S[2]},(_,i)=>[i+1,S[2]===1?'At-large':'District '+(i+1)]),p.district,'House district'):'')}
 else if(kind==='state'){controls=stateSel+sel('district',Array.from({length:stateSenateDistricts(p.state)},(_,i)=>[i+1,'District '+(i+1)]),p.district,'State senate district')}
 else {controls=stateSel+sel('city',citiesOf(p.state).map(c=>[c,c]),p.city,'City')}
 const title={federal:'Federal',state:'State',local:'Local'}[kind];
 return `<section class="panel repcol" id="col-${kind}"><div class="panel-h"><h2>${title}</h2><span class="label">${list.length} officials</span></div>
  <form class="repctl" hx-get="/reps/col/${kind}" hx-trigger="change" hx-target="#col-${kind}" hx-swap="outerHTML">${controls}</form>
  <div class="replist">${list.map(r=>repMini(u,r)).join('')}</div></section>`;
}
function repDefaults(u){
 if(!isV(u)&&u.location&&u.location.state==='OH')return {federal:{branch:'legislative',state:'OH',district:3},state:{state:'OH',district:15},local:{state:'OH',city:'Columbus'}};
 const st=(!isV(u)&&u.location?.state)||STATES[0][0];
 return {federal:{branch:'legislative',state:st,district:1},state:{state:st,district:1},local:{state:st,city:citiesOf(st)[0]}};
}
V.reps=u=>{const d=repDefaults(u);
 return `${head('Representation','Every elected official, from Congress to city council. Pick a state and district in each column.','<span class="sample">Sample data</span>')}
 <div class="repsearch"><label class="search">${ic('search')}<input name="q" placeholder="Search politicians by name, office, or state" aria-label="Search politicians" hx-get="/reps/search" hx-trigger="keyup changed delay:250ms, search" hx-target="#rep-results"></label><div id="rep-results"></div></div>
 ${isV(u)?`<div class="note">${ic('users')}<span>Showing <b>${STATE_BY[d.federal.state][1]}</b>, the first state alphabetically. <button class="linkbtn" hx-get="/auth/modal/signup" hx-swap="none">Create a free account</button> and this page will default to your own representatives.</span></div>`:''}
 <div class="repcols">${T_rep_col(u,'federal',d.federal)}${T_rep_col(u,'state',d.state)}${T_rep_col(u,'local',d.local)}</div>
 <p class="demo-note">President, Vice President, Cabinet, and Supreme Court are real officeholders as of 2025. Legislators and local officials are generated sample names until the Congress.gov and Open States connections are built.</p>`;
};
V.rep=(u,q,id)=>{
 const r=REP_INDEX[id]||ALLREPS.find(x=>x.id===id)||ALLREPS[0],spons=BILLS.filter(b=>b.sponsor===r.id);
 return `${head(r.name,`${r.office} · ${r.scope}`,`<div class="ph-r">${pinBtn(u,'rep:'+r.id)}<button class="btn primary" ${act('Following '+r.name+". You'll be notified of new votes and statements.")}>${ic('bell')}Follow</button></div>`,crumb('reps','Representation'))}
 <div class="grid g3">
  <section class="panel">${ph('Contact',party(r.party))}<div class="panel-b"><div class="kv" style="grid-template-columns:90px 1fr">
   <div class="k">Phone</div><div class="v mono tab-nums">${r.phone}</div><div class="k">Term</div><div class="v">${r.term}</div>
   <div class="k">Committees</div><div class="v">${r.committees.join(', ')||'—'}</div><div class="k">Party</div><div class="v">${PARTY[r.party]||'—'}</div>
  </div><button class="btn sm" style="margin-top:12px" ${act('Would open a pre-addressed message form')}>Write to ${r.name.split(' ')[0]}</button></div></section>
  <section class="panel span2">${ph('Recent votes','<span class="label">Last 30 days</span>')}<div class="tbl-wrap"><table><thead><tr><th>Measure</th><th>Vote</th><th>Date</th></tr></thead><tbody>
   ${VOTES.map(([m,v,d])=>`<tr><td>${m}</td><td><span class="chip ${v==='Yea'?'green':'red'}">${v}</span></td><td class="tab-nums">${d}</td></tr>`).join('')}
  </tbody></table></div></section>
 </div>
 <section class="panel">${ph('Sponsored legislation')}<div class="rows">${spons.length?spons.map(b=>`<button class="row" ${nav('bill/'+b.id)}><span class="ic">${ic('doc')}</span><span><span class="t">${b.num} · ${b.title}</span><br><span class="d">${STAGES[b.stage]}</span></span><span style="width:120px">${pipe(b.stage)}</span></button>`).join(''):`<div class="panel-b" style="color:var(--muted)">No sponsored bills on file. <button class="linkbtn" ${isV(u)?'hx-post="/prompt/account" '+vals({why:'contribute'})+' hx-swap="none"':nav('join')}>Join a DGG team to help fill this in.</button></div>`}</div></section>`;
};

/* ---------- bills & laws ---------- */
function T_bills_table(u,scope,q,limit){
 const s=(q||'').toLowerCase(),src=scope==='state'?ALL_OH:ALL_FED;
 const list=src.filter(b=>!s||(b.num+' '+b.title).toLowerCase().includes(s)).sort((a,b)=>b.ts-a.ts).slice(0,limit);
 const help=isV(u)?`hx-post="/prompt/account" ${vals({why:'contribute'})} hx-swap="none"`:isMember(u)?act('Would open the bill editor so you can fill in the missing details'):`hx-post="/prompt/team" ${vals({why:'contribute'})} hx-swap="none"`;
 return `<div id="bills-table"><div class="tbl-wrap"><table class="billtbl"><thead><tr><th style="width:44px"><span class="sr">Pin</span></th><th>Bill</th><th>Title</th><th>Progress</th><th>Introduced by</th></tr></thead><tbody>
 ${list.map(b=>`<tr><td>${flagBtn(u,'bill:'+b.id)}</td><td class="mono" style="white-space:nowrap;font-size:13px">${b.num}</td><td style="min-width:240px"><button class="linkbtn tlink" ${nav('bill/'+b.id)}>${b.title}</button><br><span class="d">Updated ${b.updated}</span></td>
  <td style="min-width:170px"><div style="display:flex;flex-direction:column;gap:6px"><span class="label" style="font-size:11px">${STAGES[b.stage]}</span>${pipe(b.stage)}</div></td>
  <td>${b.party?partyChip(b.party):`<button class="chip yel helpchip" ${help}>${ic('pen')}Missing · help fill in</button>`}</td></tr>`).join('')||'<tr><td colspan="5" style="color:var(--muted)">No bills match that search.</td></tr>'}
 </tbody></table></div><div class="tblfoot"><span class="d">Showing ${list.length} of ${src.length} ${scope==='state'?'Ohio':'federal'} bills, most recently updated first</span></div></div>`;
}
V.bills=(u,q)=>{const scope=isV(u)?'federal':(q.scope==='state'?'state':'federal'),limit=[10,25,50].includes(+q.limit)?+q.limit:10;
 return `${head('Bills & Laws','Legislation sorted by latest activity. Flag a bill to pin it to your dashboard.','<span class="sample">Sample data</span>')}
 <form class="billctl" id="billctl" hx-get="/bills/table" hx-target="#bills-table" hx-swap="outerHTML" hx-trigger="change, keyup changed delay:250ms from:#billq, search from:#billq">
  <label class="search grow">${ic('search')}<input id="billq" name="q" type="search" value="${esc(q.q||'')}" placeholder="Search bills by number or title" aria-label="Search bills"></label>
  <div class="seg scopeseg" role="radiogroup" aria-label="Federal or state bills">
   <label><input type="radio" name="scope" value="federal" ${scope==='federal'?'checked':''}>Federal</label>
   ${isV(u)?`<button type="button" class="lockedopt" hx-post="/prompt/account" ${vals({why:'statebills'})} hx-swap="none">${ic('lock')}My state</button>`:`<label><input type="radio" name="scope" value="state" ${scope==='state'?'checked':''}>${u.location?.state==='OH'||!u.location?'Ohio':STATE_BY[u.location.state][1]}</label>`}
  </div>
  <label class="field inline"><span class="label">Show</span><select name="limit">${[10,25,50].map(n=>`<option ${n===limit?'selected':''}>${n}</option>`).join('')}</select></label>
 </form>
 <section class="panel">${T_bills_table(u,scope,q.q,limit)}</section>`;
};

/* ---------- voting history ---------- */
V.history=u=>{
 const show=!isV(u)||u.lookups?.history;
 const top=head('Voting History','Whether you voted is public record in most states. How you voted is always secret and never stored here.','<span class="sample">Sample data</span>');
 if(!show)return top+`<section class="panel"><div class="panel-h"><h2>Look up your voting history</h2></div><form class="panel-b lookupform" hx-post="/history/lookup" hx-target="#root" hx-swap="innerHTML show:window:top">
  <div class="field"><label class="label" for="vh-first">First name</label><input id="vh-first" name="first" value="Jordan"></div><div class="field"><label class="label" for="vh-last">Last name</label><input id="vh-last" name="last" value="Ellis"></div>
  <div class="field"><label class="label" for="vh-dob">Date of birth</label><input id="vh-dob" name="dob" type="date" value="1996-04-12"></div><div class="field"><label class="label" for="vh-state">State</label><select id="vh-state" name="state">${STATE_OPTS('OH')}</select></div>
  <button class="btn primary" type="submit">Look up</button></form></section>`;
 const past=HISTORY.filter(h=>h[2]!=='upcoming'),v=past.filter(h=>h[2]==='Voted').length;
 return `${top}<section class="panel">${ph('Your turnout',pinBtn(u,'hist:stats'))}<div class="panel-b"><div class="grid g4">
  <div class="stat"><span class="label">Turnout</span><span class="v tab-nums">${Math.round(v/past.length*100)}%</span><span class="s">${v} of ${past.length} elections since 2022</span></div>
  <div class="stat"><span class="label">Voting streak</span><span class="v tab-nums">3</span><span class="s">Elections in a row</span></div>
  <div class="stat"><span class="label">General elections</span><span class="v ok tab-nums">4 / 4</span><span class="s">Never missed a November</span></div>
  <div class="stat"><span class="label">Most used</span><span class="v">Early</span><span class="s">3 early, 3 mail, 3 Election Day</span></div></div></div></section>
 <section class="panel">${ph('Election by election',pinBtn(u,'hist:table'))}<div class="tbl-wrap"><table><thead><tr><th>Date</th><th>Election</th><th>Participation</th><th>Method</th></tr></thead><tbody>
 ${HISTORY.map(([d,e,s,m])=>`<tr><td class="tab-nums">${d}</td><td>${e}</td><td><span class="chip ${s==='Voted'?'green':s==='upcoming'?'blue':'red'}">${s==='upcoming'?'Upcoming':s}</span></td><td>${m||'—'}</td></tr>`).join('')}
 </tbody></table></div></section>`;
};

/* ---------- civics 101 ---------- */
const CIVICS_TABS=[['overview','Overview'],['government','Government'],['constitution','Constitution'],['congress','Congress'],['games','Games'],['lectures','Lectures']];
function T_civics(u,t){
 if(t==='government')return `<div class="branches">${BRANCHES.map(([n,who,art,d,pts],i)=>`<section class="branch b${i}"><span class="label">${art}</span><h3>${n}</h3><b class="bwho">${who}</b><p>${d}</p><ul>${pts.map(x=>`<li>${x}</li>`).join('')}</ul></section>`).join('')}</div>
  <section class="panel panel-b"><h3 class="civh">Checks and balances</h3><p class="lead-p" style="margin:0">Each branch can limit the others. Congress writes laws, but the President can veto them. The President appoints judges, but the Senate must confirm them. The courts can strike down laws and executive actions that break the Constitution.</p></section>`;
 if(t==='constitution')return `<div class="grid g2"><section class="panel">${ph('The seven articles')}<div class="rows">${ARTICLES.map(([n,d])=>`<div class="row" style="grid-template-columns:56px 1fr"><b class="disp" style="font-size:26px;color:var(--link)">${n}</b><span>${d}</span></div>`).join('')}</div></section>
  <section class="panel">${ph('The Bill of Rights','<span class="label">Ratified 1791</span>')}<div class="rows">${BILL_OF_RIGHTS.map(([n,d])=>`<div class="row" style="grid-template-columns:56px 1fr"><b class="disp" style="font-size:22px;color:var(--red)">${n}</b><span>${d}</span></div>`).join('')}</div></section></div>
  <section class="panel">${ph('Amendments that expanded the vote')}<div class="tbl-wrap"><table><thead><tr><th>Amendment</th><th>Year</th><th>What it did</th></tr></thead><tbody>${KEY_AMENDMENTS.map(([a,y,d])=>`<tr><td><b>${a}</b></td><td class="tab-nums">${y}</td><td>${d}</td></tr>`).join('')}</tbody></table></div></section>`;
 if(t==='congress')return `<section class="panel panel-b"><div class="timeline">${CONGRESS_HISTORY.map(([y,d],i)=>`<div class="tl ${i===CONGRESS_HISTORY.length-1?'red':''}"><div class="when">${y}</div><div class="what">${d}</div></div>`).join('')}</div></section>
  <div class="grid g3"><div class="panel stat"><span class="label">Senators</span><span class="v">100</span><span class="s">Two per state, six-year terms</span></div><div class="panel stat"><span class="label">Representatives</span><span class="v">435</span><span class="s">By population, two-year terms</span></div><div class="panel stat"><span class="label">Non-voting delegates</span><span class="v">6</span><span class="s">DC and five territories</span></div></div>`;
 if(t==='games')return `<div id="game-area" style="display:flex;flex-direction:column;gap:24px">${T_games_hub()}</div>`;
 if(t==='lectures')return `<div class="mgrid">${LECTURES.map(([ti,by,len,done],i)=>`<button class="mcard" ${act(isV(u)?'Create a free account to track which lectures you\'ve watched':'Would open the lecture video')}><div class="thumb ${['','k','r','y',''][i]}"><span class="ttag">Lecture ${i+1}</span><span class="playbtn">${ic('play')}</span><span class="dur">${len}</span></div><div class="mi"><b>${ti}</b><span class="d">${by}</span>${done&&!isV(u)?`<span class="chip green" style="align-self:flex-start">${ic('check')}Watched</span>`:''}</div></button>`).join('')}</div>`;
 return `<div class="civgrid">${[['government','Government','The three branches and how they check each other.','scale'],['constitution','Constitution','The seven articles, the Bill of Rights, and voting amendments.','doc'],['congress','Congress','How Congress works and its history since 1789.','users'],['games','Games','Daily civics quiz and timeline challenges.','star'],['lectures','Lectures','A video series taught by DGG members.','play']].map(([k,n,d,i])=>`<button class="civcard" hx-get="/civics/tab?t=${k}" hx-target="#civics-body" hx-swap="outerHTML"><span class="ic">${ic(i)}</span><b>${n}</b><span>${d}</span></button>`).join('')}</div>`;
}
const T_civics_body=(u,t)=>`<div id="civics-body" style="display:flex;flex-direction:column;gap:20px"><div class="tabs" role="tablist">${CIVICS_TABS.map(([k,l])=>`<button role="tab" aria-selected="${t===k}" hx-get="/civics/tab?t=${k}" hx-target="#civics-body" hx-swap="outerHTML">${l}</button>`).join('')}</div>${T_civics(u,t)}</div>`;
V.civics=(u,q)=>`${head('Civics 101','How American government works, with games and a lecture series taught by DGG members.',isV(u)?'':`<div class="ph-r"><div class="civprog"><span class="label">Your progress</span><div class="bar"><i style="width:40%;background:var(--blue)"></i></div><span class="d">2 of 5 units</span></div>${pinBtn(u,'civics:progress')}</div>`)}
 ${isV(u)?`<div class="note">${ic('star')}<span><b>Playing as a guest.</b> <button class="linkbtn" hx-get="/auth/modal/signup" hx-swap="none">Create a free account</button> to save your progress, keep your game history, and share games with friends.</span></div>`:''}
 ${T_civics_body(u,q.t||'overview')}`;

/* ---------- resources + help ---------- */
V.resources=u=>`${head('Resources','Trusted tools and partner organizations for voting, organizing, and research.')}
 ${!isV(u)?`<button class="helpcard" ${nav('help')}><span class="ic">${ic('help')}</span><span><b>Need help?</b><span class="d">Search the FAQ or ask the team on Discord.</span></span>${arrow()}</button>`:''}
 ${RESOURCES.map(([g,items])=>`<section><div class="sechead"><h2>${g}</h2></div><div class="resgrid">${items.map(([n,d,url])=>`<a class="rescard" href="${url}" target="_blank" rel="noopener"><b>${n}${ic('ext')}</b><span>${d}</span><span class="mono rurl">${url.replace(/^https?:\/\/(www\.)?/,'').replace(/\/$/,'')}</span></a>`).join('')}</div></section>`).join('')}
 <section><div class="sechead"><h2>Partners</h2></div><div class="resgrid">${PARTNERS.map(([n,d,url])=>`<a class="rescard partner" href="${url}" target="_blank" rel="noopener"><span class="chip blue" style="align-self:flex-start">DGG partner</span><b>${n}${ic('ext')}</b><span>${d}</span></a>`).join('')}</div></section>
 ${isMember(u)?`<section><div class="sechead"><h2>Team resources</h2></div><div class="resgrid"><a class="rescard" href="https://drive.google.com/" target="_blank" rel="noopener"><b>Shared Google Drive${ic('ext')}</b><span>Talking points, walk lists, graphics, and training videos for team members.</span></a></div></section>`:''}`;
const T_faq=q=>{const s=(q||'').toLowerCase(),list=FAQ.filter(([g,qq,a])=>!s||(qq+' '+a).toLowerCase().includes(s)),groups=[...new Set(list.map(x=>x[0]))];
 return `<div id="faq-list" class="faq">${groups.map(g=>`<section><div class="sechead"><h2>${g}</h2></div>${list.filter(x=>x[0]===g).map(([,qq,a])=>`<details class="faqitem" ${s?'open':''}><summary>${qq}${ic('down')}</summary><p>${a}</p></details>`).join('')}</section>`).join('')||'<p class="d">No answers match that search. Ask the team on Discord.</p>'}</div>`};
V.help=()=>`${head('Help','Answers about the Political Hub and Digital Ground Game.')}
 <section class="dcta discord"><div class="dicon">${ic('chat')}</div><div class="dtext"><span class="label" style="color:#9a9ca6">Real people, fast answers</span><b>Can't find what you need?</b><span>Our Welcome Team answers questions on Discord every day.</span></div><a class="btn" href="${DISCORD_URL}" target="_blank" rel="noopener">${ic('chat')}Ask on Discord</a></section>
 <label class="search" style="max-width:none">${ic('search')}<input name="q" type="search" placeholder="Search questions" aria-label="Search the FAQ" hx-get="/help/search" hx-trigger="keyup changed delay:200ms, search" hx-target="#faq-list" hx-swap="outerHTML"></label>
 ${T_faq('')}`;

/* ---------- DGG Media (with Workshops and Approved Creators) ---------- */
const MEDIA_TABS=[['videos','Videos & photos'],['workshops','Workshops'],['creators','Approved creators']];
function T_media_tab(u,t){
 if(t==='workshops')return `<section class="wsfeat"><div class="wart"><span class="chip red" style="align-self:flex-start">Next live session · Nov 12</span><h2>Public comment: make your <span>three minutes</span> count</h2><span style="opacity:.8;font-size:14px">Local & State Government · Session 4 of 5</span></div>
  <div class="winfo"><div class="presenter"><div class="avatar" style="background:var(--blue)">JK</div><div><b style="font:700 16px var(--head)">Jasmine Kim</b><br><span style="color:var(--muted);font-size:14px">Volunteer coordinator, Columbus chapter</span></div></div>
   <p style="margin:0;color:var(--muted)">How to find your city council's agenda, sign up to speak, and write remarks that council members remember.</p>
   <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:auto"><button class="btn primary sm" ${act("You're registered. A calendar invite and Zoom link are on the way.")}>Register</button><span class="chip" style="align-self:center">86 registered</span></div></div></section>${T_ws_body('all')}`;
 if(t==='creators')return `<section class="panel panel-b creatorcrit"><span class="label">How a creator gets approved</span><ul>${CREATOR_CRITERIA.map(c=>`<li>${ic('check')}${c}</li>`).join('')}</ul></section>
  <div class="wikigrid">${CREATORS.map(c=>`<div class="wcard"><div class="h"><div class="avatar" style="background:${c.c};${c.c==='#C99A00'?'color:#242424':''}">${c.ini}</div><div><b>${c.n}</b><span>${c.h}</span></div><span class="chip green" style="margin-left:auto">${ic('check')}Approved</span></div><p><b style="color:var(--ink)">${c.focus}.</b> ${c.why}</p><div style="display:flex;gap:6px;flex-wrap:wrap"><span class="chip blue">${c.reach} reach</span><span class="chip">${c.plat}</span></div></div>`).join('')}</div>
  <p class="demo-note">Sample profiles. The Media Team replaces these with real, vetted creators.</p>`;
 return `<section class="live"><button class="thumb r" style="border:0;cursor:pointer" ${act('Would open the live stream player')}><span class="ttag on"><span class="livedot"></span>Live now</span><span class="playbtn">${ic('play')}</span><span class="dur">1,204 watching</span></button>
  <div class="side-info"><span class="label">Streaming from Columbus</span><h2>Post-Election Debrief</h2><p style="margin:0;color:var(--muted)">Organizers recap the midterm ground game and what's next for the Georgia runoff.</p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:auto"><button class="btn red sm" ${act('Would open the live stream player')}>${ic('play')}Watch live</button></div></div></section>${T_media_body('all')}`;
}
const T_media_body2=(u,t)=>`<div id="media-tabbody" style="display:flex;flex-direction:column;gap:20px"><div class="tabs" role="tablist">${MEDIA_TABS.map(([k,l])=>`<button role="tab" aria-selected="${t===k}" hx-get="/media/tab?t=${k}" hx-target="#media-tabbody" hx-swap="outerHTML">${l}</button>`).join('')}</div>${T_media_tab(u,t)}</div>`;
V.media=(u,q)=>`${head('DGG Media','Event photos, live streams, interviews, workshops, and creators we trust.','<span class="sample">Sample content</span>')}
 <section class="ppbanner"><div class="ppmark">${ic('doc')}</div><div class="pptext"><span class="label">From our community · Written by DGG members</span><h2>The Pragmatic Papers</h2><p>Combating misinformation with fact-based reporting. In-depth research on elections, policy, and global affairs from writers in the DGG community. Anyone can submit.</p></div>
  <div class="ppbtns"><a class="btn primary" href="https://pragmaticpapers.com/" target="_blank" rel="noopener">${ic('ext')}Read the Papers</a><a class="btn" href="https://pragmaticpapers.com/writing-for-us" target="_blank" rel="noopener">${ic('pen')}Submit a piece</a></div></section>
 ${T_media_body2(u,q.t||'videos')}`;

/* ---------- election data (future feature preview) ---------- */
function T_evmap(mode,picks){
 const col=st=>mode==='2024'?(RESULTS_2024_D.has(st)?'D':'R'):(picks[st]||'T');
 const tot={D:0,R:0,T:0};EV_TILES.forEach(([st,,,ev])=>tot[col(st)]+=ev);
 const W=12*58,H=8*58;
 return `<div id="evmap" class="evwrap">
  <div class="evbar"><div class="evD" style="width:${tot.D/5.38}%"><b class="tab-nums">${tot.D}</b>${mode==='2024'?'Harris':'Dem'}</div><div class="evT" style="width:${tot.T/5.38}%">${tot.T?`<b class="tab-nums">${tot.T}</b>`:''}</div><div class="evR" style="width:${tot.R/5.38}%"><b class="tab-nums">${tot.R}</b>${mode==='2024'?'Trump':'Rep'}</div><i class="ev270" aria-hidden="true"></i></div>
  <div class="evmid"><span class="label">270 to win</span></div>
  <div class="tbl-wrap"><svg class="evsvg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Electoral map: Democrats ${tot.D}, Republicans ${tot.R}${tot.T?', undecided '+tot.T:''}">
   ${EV_TILES.map(([st,c,r,ev])=>{const k=col(st);return `<g class="evtile ${k}" ${mode==='build'?`hx-post="/elections/flip" ${vals({st})} hx-target="#evmap" hx-swap="outerHTML" role="button" tabindex="0" aria-label="${STATE_BY[st][1]}, ${ev} votes"`:''}><rect x="${c*58+3}" y="${r*58+3}" width="52" height="52" rx="3"/><text x="${c*58+29}" y="${r*58+27}" text-anchor="middle" class="evst">${st}</text><text x="${c*58+29}" y="${r*58+44}" text-anchor="middle" class="evn">${ev}</text></g>`}).join('')}
  </svg></div>
  <p class="demo-note" style="margin:0">${mode==='2024'?'2024 presidential results. Maine (3–1) and Nebraska (4–1) split their electoral votes; tiles show the statewide winner.':'Click a state to cycle it: undecided → Democrat → Republican.'}</p></div>`;
}
V.elections=(u,q)=>{const mode=q.mode==='build'?'build':'2024';
 return `${head('Election Data','Maps and results from past elections, plus a build-your-own map for 2028.','<span class="chip yel">Preview · future feature</span>')}
 <div class="tabs" role="tablist"><button role="tab" aria-selected="${mode==='2024'}" ${nav('elections','?mode=2024')}>2024 results</button><button role="tab" aria-selected="${mode==='build'}" ${nav('elections','?mode=build')}>Build your 2028 map</button>${mode==='build'?`<button class="btn sm ghost" style="margin-left:auto;align-self:center" hx-post="/elections/reset" hx-target="#evmap" hx-swap="outerHTML">Reset map</button>`:''}</div>
 <section class="panel panel-b">${T_evmap(mode,SESSION.mapPicks||{})}</section>
 <section class="panel panel-b"><b>Coming soon:</b> House, Senate, and governor results by state and district, past turnout by county, and side-by-side comparisons of the last five elections.</section>`;
};

/* ---------- Democracy Lab wrappers (locked for non-members) ---------- */
const AS_MEMBER={account:'member'};
const _wiki=V.wiki,_model=V.model,_rolodex=V.rolodex;
V.wiki=(u,q)=>isMember(u)?_wiki(u,q):`${head('The Blue Book','A community-edited reference on the online voices shaping political conversation.')}${gate(u,'The Blue Book',_wiki(AS_MEMBER,q))}`;
V.model=(u,q)=>_model(u,q);
V.rolodex=(u,q)=>_rolodex(u,q);
const TRACKER_TABS=[['leg','LegisTracker'],['courts','Court Tracker'],['agenda','Agenda Tracker'],['exec','ExecuTracker']];
const T_tracker_body=t=>`<div id="tracker-body" style="display:flex;flex-direction:column;gap:20px"><div class="tabs" role="tablist">${TRACKER_TABS.map(([k,l])=>`<button role="tab" aria-selected="${t===k}" hx-get="/trackers/tab?t=${k}" hx-target="#tracker-body" hx-swap="outerHTML">${l}</button>`).join('')}</div>${V[t](AS_MEMBER,{})}</div>`;
V.trackers=(u,q)=>`${head('Tracker Suite','Legislation, court cases, administration agendas, and executive actions, all in one place.')}${gate(u,'The Tracker Suite',T_tracker_body(TRACKER_TABS.some(x=>x[0]===q.t)?q.t:'leg'))}`;

/* ---------- DGG Team ---------- */
V.contact=u=>{const T=TEAMS[u.team],lead=T.members[0],mid=REGIONS.find(r=>r.slug==='midwest');
 const handle=n=>'@'+n.toLowerCase().replace(/[^a-z]+/g,'');
 const email=n=>n.toLowerCase().split(' ')[0]+'.'+(n.split(' ')[1]||'dgg').toLowerCase().replace(/[^a-z]/g,'')+'@digitalgroundgame.org';
 const person=([i,n,r],big)=>`<div class="person ${big?'big':''}"><div class="avatar" style="background:${T.c}">${i}</div><div class="pinfo"><b>${n}</b><span class="d">${r}</span><span class="mono d">${handle(n)} on Discord</span></div><div class="pacts"><a class="btn sm discordbtn" href="${DISCORD_URL}" target="_blank" rel="noopener">${ic('chat')}Message</a><button class="btn sm ghost" data-copy="${email(n)}">${ic('mail')}Copy email</button></div></div>`;
 return `${head('Contact',`Reach your team lead and teammates on the ${T.n}.`,'<span class="sample">Sample contacts</span>')}
 <section class="panel">${ph('Team lead',`<span class="chip blue">${T.n}</span>`)}<div class="panel-b">${person(lead,true)}</div></section>
 <section class="panel">${ph('Teammates',`<span class="label">${T.members.length-1} people</span>`)}<div class="people">${T.members.slice(1).map(m=>person(m)).join('')}</div></section>
 <section class="panel">${ph('Regional and chapter leads','<span class="label">Midwest</span>')}<div class="people">${mid.team.slice(0,3).map(([n,r])=>person([n.replace(/[^A-Za-z ]/g,'').split(' ').map(x=>x[0]).join('').slice(0,2),n,r])).join('')}${person(['AM','Alex Moreno','Columbus City Lead'])}</div></section>`;
};
function projectProgress(u){const all=DB.tasks.filter(t=>t.team===u.team),ps=[...new Set(all.map(t=>t.project))];
 return ps.map(p=>{const ts=all.filter(t=>t.project===p),d=ts.filter(t=>t.status==='Done').length,ip=ts.filter(t=>t.status==='In progress').length;return {p,total:ts.length,done:d,ip}})}
V.tasks=(u,q)=>{const T=TEAMS[u.team];
 return `${head('Tasks',`Claim a task, add new ones, and see what's next for the ${T.n}.`,`<form class="viewas" style="gap:8px" hx-post="/team/preview" hx-trigger="change" hx-target="#root"><label for="teamswitch" class="label">Preview team</label><select id="teamswitch" name="team" style="border:2px solid var(--line);background:var(--surface);padding:6px 8px;border-radius:2px">${TEAM_ORDER.map(k=>`<option value="${k}" ${k===u.team?'selected':''}>${TEAMS[k].n}</option>`).join('')}</select></form>`)}
 <section class="panel">${ph('Projects','<span class="label">Done · in progress · to do</span>')}<div class="projgrid">${projectProgress(u).map(x=>`<div class="proj"><div class="projh"><b>${x.p}</b><span class="mono d">${x.done}/${x.total} done</span></div><div class="bar" style="height:10px"><i style="width:${x.done/x.total*100}%;background:var(--green)"></i><i style="width:${x.ip/x.total*100}%;background:var(--blue)"></i></div></div>`).join('')}</div></section>
 ${T_team_body(u,SESSION.taskFilter||'all')}`;
};
function T_op_detail(op){
 const pct=Math.min(100,Math.round(op.signed/op.goal*100));
 return `<div id="op-detail" class="opdetail">
  <div class="ophead"><div><span class="chip ${op.cls}">${op.status}</span><h2>${op.name}</h2><span class="d">${op.dates} · ${op.where} · Lead: ${op.lead}</span></div>
   <div class="opgoal"><span class="label">Volunteers</span><b class="disp tab-nums">${op.signed}<small>/${op.goal}</small></b><div class="bar" style="height:10px"><i style="width:${pct}%;background:${pct>=100?'var(--green)':'var(--blue)'}"></i></div></div></div>
  <div class="grid g2">
   <section class="panel">${ph('Roles needed')}<div class="rows">${op.roles.map(([r,need,have])=>`<div class="row" style="grid-template-columns:1fr 140px"><span class="t" style="font-size:15px">${r}</span><span style="display:flex;flex-direction:column;gap:4px"><span class="mono d" style="text-align:right">${have}/${need}</span><span class="bar"><i style="width:${Math.min(100,have/need*100)}%;background:${have>=need?'var(--green)':'var(--blue)'}"></i></span></span></div>`).join('')}</div></section>
   <section class="panel">${ph('Logistics checklist',`<span class="label">${op.checklist.filter(c=>c[1]).length}/${op.checklist.length}</span>`)}<div class="rows">${op.checklist.map(([c,done],i)=>`<div class="row" style="grid-template-columns:auto 1fr"><button class="chk" role="checkbox" aria-checked="${done}" aria-label="${esc(c)}" hx-post="/ops/${op.id}/check/${i}" hx-target="#op-detail" hx-swap="outerHTML">${done?ic('check'):''}</button><span style="${done?'text-decoration:line-through;color:var(--muted)':''}">${c}</span></div>`).join('')}</div></section>
  </div>
  ${op.shifts.length?`<section class="panel">${ph('Shifts','<span class="label">Claim a shift</span>')}<div class="tbl-wrap"><table><thead><tr><th>Day</th><th>Time</th><th>Staging site</th><th>Filled</th><th></th></tr></thead><tbody>${op.shifts.map(([d,t,w,need,have,mine],i)=>`<tr><td style="white-space:nowrap">${d}</td><td style="white-space:nowrap">${t}</td><td>${w}</td><td style="min-width:120px"><span class="mono d">${have}/${need}</span><div class="bar"><i style="width:${have/need*100}%;background:var(--blue)"></i></div></td><td>${mine?`<button class="btn sm ghost" hx-post="/ops/${op.id}/shift/${i}" hx-target="#op-detail" hx-swap="outerHTML">${ic('check')}You're in · drop</button>`:`<button class="btn sm primary" ${have>=need?'disabled':''} hx-post="/ops/${op.id}/shift/${i}" hx-target="#op-detail" hx-swap="outerHTML">Claim shift</button>`}</td></tr>`).join('')}</tbody></table></div></section>`:''}
  ${op.turf.length?`<section class="panel">${ph('Turf packets')}<div class="tbl-wrap"><table><thead><tr><th>Packet</th><th>Area</th><th>Doors</th><th>Status</th></tr></thead><tbody>${op.turf.map(([id,a,doors,st])=>`<tr><td class="mono">${id}</td><td>${a}</td><td class="tab-nums">${doors||'—'}</td><td><span class="chip ${st==='Assigned'?'green':st==='Open'?'blue':''}">${st}</span></td></tr>`).join('')}</tbody></table></div></section>`:''}
 </div>`;
}
V.ops=(u,q)=>{const sel=OPERATIONS.find(o=>o.id===q.op)||OPERATIONS[0];
 return `${head('Operations','Plan and staff mass canvasses and events: volunteers, shifts, logistics, and turf.',`<button class="btn primary" ${act('Would open the new operation form')}>${ic('plus')}New operation</button>`)}
 <div class="opslayout"><div class="oplist">${OPERATIONS.map(o=>`<button class="opcard" aria-current="${o.id===sel.id}" ${nav('ops','?op='+o.id)}><span class="chip ${o.cls}" style="align-self:flex-start">${o.status}</span><b>${o.name}</b><span class="d">${o.dates}</span><span class="d">${o.where}</span><div class="bar"><i style="width:${Math.min(100,o.signed/o.goal*100)}%;background:${o.signed>=o.goal?'var(--green)':'var(--blue)'}"></i></div><span class="mono d">${o.signed}/${o.goal} volunteers</span></button>`).join('')}</div>
 ${T_op_detail(sel)}</div>`;
};

/* ---------- settings ---------- */
const T_theme_seg=t=>`<div class="freqseg" id="theme-seg" role="group" aria-label="Theme">${[['light','Light',ic('sun')],['dark','Dark',ic('moon')],['system','Match my device','']].map(([k,l,i])=>`<button aria-pressed="${t===k}" hx-post="/settings/theme" ${vals({theme:k})} hx-target="#theme-seg" hx-swap="outerHTML">${i}${l}</button>`).join('')}</div>`;
V.settings=u=>`${head('Settings','Manage your profile, location, team, and pop-ups.')}
 <section class="panel">${ph('Account status',`<span class="chip blue">${ACCOUNT_LABEL[u.account]}</span>`)}<div class="panel-b" style="display:flex;flex-direction:column;gap:14px">
  ${isMember(u)?`<div class="teamrow"><div class="teamicon" style="--team:${TEAMS[u.team].c}">${ic(TEAMS[u.team].icon)}</div><div style="flex:1;min-width:200px"><b style="font:700 18px var(--head)">${TEAMS[u.team].n}</b><br><span style="color:var(--muted)">${TEAMS[u.team].sub}</span></div><button class="btn sm ghost" ${nav('join')}>Switch teams</button><button class="btn sm ghost" hx-post="/settings/leave-team" hx-target="#root">Leave team</button></div>`
  :`<div class="teamrow"><div style="flex:1;min-width:200px"><b style="font:700 18px var(--head)">You're not on a team yet</b><br><span style="color:var(--muted)">Join a team to unlock the Democracy Lab, tasks, inbox, and operations.</span></div><button class="btn primary" ${nav('join')}>Join a team</button></div>`}
 </div></section>
 <section class="panel">${ph('Presentation mode','<span class="label">Demo only</span>')}<div class="panel-b" style="display:flex;flex-direction:column;gap:10px"><span class="d">Preview the hub at each access level without signing out.</span>
  <div class="freqseg" role="group" aria-label="View as">${[['visitor','Visitor (no account)'],['account','Account'],['member','Team member']].map(([k,l])=>`<button aria-pressed="${u.account===k}" hx-post="/settings/viewas" ${vals({as:k})} hx-target="#root">${l}</button>`).join('')}</div></div></section>
 <section class="panel">${ph('Profile')}<form class="panel-b grid g3" style="align-items:end" hx-post="/settings/profile" hx-swap="none">
  <div class="field"><label class="label" for="s-name">Full name</label><input id="s-name" name="name" value="${esc(u.name)}"></div>
  <div class="field"><label class="label" for="s-email">Email</label><input id="s-email" name="email" type="email" value="${esc(u.email)}"></div>
  <button class="btn primary" type="submit" style="justify-self:start">Save profile</button></form></section>
 <section class="panel">${ph('Location','<span class="label">Used for your ballot, representatives, and dates</span>')}<div class="panel-b">${T_locform(u,true).replace('Get info','Save location')}</div></section>
 <section class="panel">${ph('Appearance')}<div class="panel-b">${T_theme_seg(u.theme)}</div></section>
 <section class="panel">${ph('Pop-ups')}<form class="panel-b checks" hx-post="/settings/prompts" hx-trigger="change" hx-swap="none">
  <label class="checkrow"><input type="checkbox" name="team" ${u.noTeamPrompts?'':'checked'} ${isMember(u)?'disabled':''}>Remind me about joining a DGG team</label>
 </form></section>
 <section class="panel panel-b" style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"><div><b style="font:700 17px var(--head)">Support Digital Ground Game</b><br><span style="color:var(--muted)">Donations go through ActBlue and keep the hub free.</span></div><div style="display:flex;gap:8px;flex-wrap:wrap"><a class="btn red" href="${DONATE_URL}" target="_blank" rel="noopener">${ic('heart')}Donate</a><button class="btn ghost" hx-post="/auth/signout" hx-target="#root">${ic('logout')}Sign out</button></div></section>`;

/* ---------- sign-in required (visitor opening an account page) ---------- */
V.needaccount=(u,q,page)=>`${head('Create a free account','This section is part of a free Political Hub account.')}
 <section class="panel panel-b" style="display:flex;flex-direction:column;gap:14px;align-items:flex-start;max-width:720px">
  <ul class="mbenefits">${BENEFITS.map(([i,t,d])=>`<li>${ic(i)}<span><b>${t}</b>${d}</span></li>`).join('')}</ul>
  <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn primary" hx-get="/auth/modal/signup" hx-swap="none">Create free account</button><button class="btn ghost" hx-get="/auth/modal/signin" hx-swap="none">Sign in</button></div></section>`;

/* public pages render inside the app shell */
const T_public=(active,inner)=>`<div class="pubpage">${inner}</div>`;
