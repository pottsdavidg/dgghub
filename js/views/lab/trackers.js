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

const TRACKER_TABS=[['leg','LegisTracker'],['courts','Court Tracker'],['agenda','Agenda Tracker'],['exec','ExecuTracker']];
const T_tracker_body=t=>`<div id="tracker-body" style="display:flex;flex-direction:column;gap:20px"><div class="tabs" role="tablist">${TRACKER_TABS.map(([k,l])=>`<button role="tab" aria-selected="${t===k}" hx-get="/trackers/tab?t=${k}" hx-target="#tracker-body" hx-swap="outerHTML">${l}</button>`).join('')}</div>${V[t](AS_MEMBER,{})}</div>`;
V.trackers=(u,q)=>`${head('Tracker Suite','Legislation, court cases, administration agendas, and executive actions, all in one place.')}${gate(u,'The Tracker Suite',T_tracker_body(TRACKER_TABS.some(x=>x[0]===q.t)?q.t:'leg'))}`;
