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
