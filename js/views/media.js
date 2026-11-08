/* ---------- media ---------- */
const MEDIA_F=[['all','All'],['stream','Live & replays'],['interview','Interviews'],['photos','Photos']];
const T_media_body=f=>{const list=MEDIA.filter(m=>f==='all'||m.k===f),lab={stream:'Replay',interview:'Interview',photos:'Photos'};
 return `<div id="media-body" style="display:flex;flex-direction:column;gap:20px"><div class="filters">${MEDIA_F.map(([k,l])=>`<button class="fbtn" aria-pressed="${f===k}" hx-get="/media/list?filter=${k}" hx-target="#media-body" hx-swap="outerHTML">${l}</button>`).join('')}<button class="btn sm" style="margin-left:auto" ${act('Would open the upload form for event photos and video')}>${ic('cam')}Upload from an event</button></div>
 <div class="mgrid">${list.map(m=>`<button class="mcard" ${act('Would open '+(m.k==='photos'?'the photo album':'the video player'))}><div class="thumb ${m.tint}"><span class="ttag">${lab[m.k]}</span><span class="big">${m.big}</span><span class="dur">${m.k==='photos'?ic('cam').replace('<svg','<svg style="width:12px;height:12px;vertical-align:-1px;margin-right:4px"')+m.dur:m.dur}</span></div><div class="mi"><b>${m.t}</b><span class="d">${m.d}</span></div></button>`).join('')}</div></div>`};

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

/* ---------- Political Media: DGG Media · Your Politics · Approved Creators ---------- */
const MEDIA_TABS=[['dgg','DGG Media','play'],['local','Your Politics','pin'],['creators','Approved Creators','star']];
const LOCAL_NEWS=[
 ['City council approves $40M library bond for the November ballot','Capital City Ledger','Nov 6','Local government'],
 ['What the statehouse\'s new redistricting proposal would change','Buckeye Civic Report','Nov 5','State legislature'],
 ['School board weighs later start times for high schools','Northside Neighbor','Nov 4','Schools'],
 ['County commissioners extend rental assistance through spring','Capital City Ledger','Nov 2','Housing'],
 ['Turnout in your county topped 2022 by 6 points','Buckeye Civic Report','Nov 4','Elections'],
];
const LOCAL_MEETINGS=[['Nov 10','City Council regular meeting','6:00 p.m. · City Hall chambers'],['Nov 12','Board of Education work session','5:30 p.m. · District offices'],['Nov 17','County Commission hearing on the 2027 budget','10:00 a.m. · County building'],['Nov 19','Statehouse committee: Elections & Ethics','1:00 p.m. · Senate hearing room']];
function T_media_dgg(u){
 return `<section class="ppbanner"><div class="ppmark">${ic('doc')}</div><div class="pptext"><span class="label">From our community · Written by DGG members</span><h2>The Pragmatic Papers</h2><p>Combating misinformation with fact-based reporting. In-depth research on elections, policy, and global affairs from writers in the DGG community. Anyone can submit.</p></div>
  <div class="ppbtns"><a class="btn primary" href="https://pragmaticpapers.com/" target="_blank" rel="noopener">${ic('ext')}Read the Papers</a><a class="btn" href="https://pragmaticpapers.com/writing-for-us" target="_blank" rel="noopener">${ic('pen')}Submit a piece</a></div></section>
 <div class="sechead"><h2>Videos & photos</h2></div>
 <section class="live"><button class="thumb r" style="border:0;cursor:pointer" ${act('Would open the live stream player')}><span class="ttag on"><span class="livedot"></span>Live now</span><span class="playbtn">${ic('play')}</span><span class="dur">1,204 watching</span></button>
  <div class="side-info"><span class="label">Streaming from Columbus</span><h2>Post-Election Debrief</h2><p style="margin:0;color:var(--muted)">Organizers recap the midterm ground game and what's next for the Georgia runoff.</p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:auto"><button class="btn red sm" ${act('Would open the live stream player')}>${ic('play')}Watch live</button></div></div></section>
 ${T_media_body('all')}
 <div class="sechead" style="margin-top:12px"><h2>Workshops</h2><span class="label">Lecture series by DGG members</span></div>
 <section class="wsfeat"><div class="wart"><span class="chip red" style="align-self:flex-start">Next live session · Nov 12</span><h2>Public comment: make your <span>three minutes</span> count</h2><span style="opacity:.8;font-size:14px">Local & State Government · Session 4 of 5</span></div>
  <div class="winfo"><div class="presenter"><div class="avatar" style="background:var(--blue)">JK</div><div><b style="font:700 16px var(--head)">Jasmine Kim</b><br><span style="color:var(--muted);font-size:14px">Volunteer coordinator, Columbus chapter</span></div></div>
   <p style="margin:0;color:var(--muted)">How to find your city council's agenda, sign up to speak, and write remarks that council members remember.</p>
   <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:auto"><button class="btn primary sm" ${act("You're registered. A calendar invite and Zoom link are on the way.")}>Register</button><span class="chip" style="align-self:center">86 registered</span></div></div></section>
 ${T_ws_body('all')}`;
}
function T_media_local(u){
 const st=(u.location&&STATE_BY[u.location.state])?u.location.state:'OH',S=STATE_BY[st],city=(u.location&&u.location.city)||citiesOf(st)[0];
 const legis=repsFor('state',{state:st,district:st==='OH'?15:1}).filter(r=>/State Senator|State Representative|Governor/.test(r.office));
 const bills=billsForState(st).slice().sort((a,b)=>b.ts-a.ts).slice(0,4);
 const next=ELECTIONS.filter(e=>e.states.includes(st)&&daysUntil(e.date)>=0)[0];
 return `<div class="localhead"><div>${ic('pin')}<span>Your political scene in <b>${esc(city)}, ${S[1]}</b></span></div><button class="linkbtn" ${nav('settings')}>Change location</button></div>
 <div class="grid g3">
  <section class="panel span2">${ph('Local news','<span class="label">Sample headlines</span>')}<div class="rows">${LOCAL_NEWS.map(([t,src,d,tag])=>`<button class="row newsrow" ${act('Would open the full article')}><span class="ic">${ic('doc')}</span><span><span class="t">${t}</span><br><span class="d">${src} · ${d}</span></span><span class="chip">${tag}</span></button>`).join('')}</div></section>
  <section class="panel">${ph('Your state legislators')}<div class="replist">${legis.map(r=>repMini(u,r)).join('')}</div></section>
 </div>
 <div class="grid g3">
  <section class="panel">${ph('On the local agenda')}<div class="rows">${LOCAL_MEETINGS.map(([d,t,w])=>`<div class="row" style="grid-template-columns:64px 1fr"><b class="mono" style="font-size:13px">${d}</b><span><span class="t" style="font-size:15px">${t}</span><br><span class="d">${w}</span></span></div>`).join('')}</div></section>
  <section class="panel">${ph('Moving in your statehouse',`<button class="btn sm ghost" ${nav('bills','?scope=state')}>All</button>`)}<div class="rows">${bills.map(b=>`<button class="row" ${nav('bill/'+b.id)} style="grid-template-columns:1fr auto"><span><span class="t" style="font-size:15px">${b.num} · ${b.title}</span><br><span class="d">${STAGES[b.stage]} · ${b.updated}</span></span>${partyChip(b.party)}</button>`).join('')}</div></section>
  <section class="panel">${ph('Next on your ballot')}<div class="panel-b" style="display:flex;flex-direction:column;gap:10px">${next?`<div class="edate" style="width:60px"><small>${fmtDate(next.date).m}</small><b class="tab-nums">${fmtDate(next.date).d}</b></div><b style="font:700 17px var(--head)">${next.name}</b><span class="d">${fmtDate(next.date).long} · ${daysUntil(next.date)} days away</span>`:`<span class="d">No elections scheduled in ${S[1]} yet. We'll add them as dates are set.</span>`}<button class="btn sm" style="align-self:flex-start" ${nav('register')}>Check my registration</button></div></section>
 </div>
 <p class="demo-note">Sample content. The live version pulls local news, meeting agendas, and statehouse activity for your address.</p>`;
}
function T_media_creators(u){
 return `<section class="panel panel-b creatorcrit"><span class="label">How a creator gets approved</span><ul>${CREATOR_CRITERIA.map(c=>`<li>${ic('check')}${c}</li>`).join('')}</ul></section>
  <div class="wikigrid">${CREATORS.map(c=>`<div class="wcard creatorcard"><div class="h"><div class="avatar" style="background:${c.c};${c.c==='#C99A00'?'color:#242424':''}">${c.ini}</div><div><b>${c.n}</b><span>${c.h}</span></div></div><p><b style="color:var(--ink)">${c.focus}.</b> ${c.why}</p><div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:auto"><span class="chip green">${ic('check')}Approved</span><span class="chip blue">${c.reach} reach</span><span class="chip">${c.plat}</span></div></div>`).join('')}</div>
  <p class="demo-note">Sample profiles. The Media Team replaces these with real, vetted creators.</p>`;
}
const T_media_body2=(u,t)=>`<div id="media-tabbody" style="display:flex;flex-direction:column;gap:22px">
 <div class="bigtabs" role="tablist" aria-label="Political Media sections">${MEDIA_TABS.map(([k,l,i])=>`<button role="tab" aria-selected="${t===k}" hx-get="/media/tab?t=${k}" hx-target="#media-tabbody" hx-swap="outerHTML">${ic(i)}${l}</button>`).join('')}</div>
 ${t==='local'?T_media_local(u):t==='creators'?T_media_creators(u):T_media_dgg(u)}</div>`;
V.media=(u,q)=>`${head('Political Media','DGG videos and workshops, your local political scene, and creators we trust.','<span class="sample">Sample content</span>')}
 ${T_media_body2(u,MEDIA_TABS.some(x=>x[0]===q.t)?q.t:'dgg')}`;
