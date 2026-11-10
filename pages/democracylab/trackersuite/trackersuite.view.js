/* Live app links. A tracker missing from this list shows "Not Finished" on the Overview. */
const TRACKER_URL={leg:'https://huggingface.co/spaces/My-Name1/CongressionalReport',courts:'https://digitalgroundgame.github.io/court-tracker/',exec:'https://huggingface.co/spaces/My-Name1/CongressionalReport'};
V.leg=u=>`${head('LegisTracker',"Your organization's watchlist, priorities, and testimony calendar.")}${gate(u,'LegisTracker',modbar('LegisTracker','huggingface.co/spaces/My-Name1',TRACKER_URL.leg))}`;
V.courts=u=>`${head('Court Tracker','Litigation that affects voting, housing, and open government in the states we work in.')}${gate(u,'Court Tracker',modbar('Court Tracker','digitalgroundgame.github.io/court-tracker',TRACKER_URL.courts))}`;
V.agenda=u=>`${head('Agenda Tracker',"Item-by-item progress on an administration's published agenda, scored from orders, rules, budgets, and court rulings.")}${gate(u,'Agenda Tracker',modbar('Agenda Tracker','agendatracker.digitalgroundgame.org',TRACKER_URL.agenda))}`;
V.exec=u=>`${head('ExecuTracker','Executive branch appointments and orders, the agencies carrying them out, and the lawsuits against them.')}${gate(u,'ExecuTracker',modbar('ExecuTracker','huggingface.co/spaces/My-Name1',TRACKER_URL.exec))}`;

const TRACKER_TABS=[['overview','Overview'],['leg','LegisTracker'],['courts','Court Tracker'],['agenda','Agenda Tracker'],['exec','ExecuTracker']];
/* Overview: the Tracker Suite's landing tab, one card per tracker. [tab, name, icon, color, description, stat] */
const TRACKERS=()=>{const ag=AGENDA.flatMap(([,it])=>it);
 return [
  ['courts','Court Tracker','gavel','red','Lawsuits over voting, housing, and open government, with case status and upcoming court dates.',`<b>${COURTS.length}</b> active cases`],
  ['leg','LegisTracker','doc','blue','Follow bills through Congress and the Ohio statehouse: your watchlist, priorities, and hearing dates.',`<b>${LEG.length}</b> bills on the watchlist`],
  ['exec','ExecuTracker','flag','green','Executive orders and appointments, the agencies carrying them out, and the lawsuits against them.',`<b>${EOS.length}</b> orders · <b>${APPTS.length}</b> appointments`],
  ['agenda','Agenda Tracker','target','yel','Item-by-item progress on Project 2025, scored from executive orders, rules, budgets, and court rulings.',`<b>${Math.round(ag.reduce((a,i)=>a+i[2],0)/ag.length)}%</b> carried out`],
 ]};
const T_trk_overview=()=>`<div class="trkgrid">${TRACKERS().map(([k,n,i,c,d,stat])=>`<button class="trkcard c-${c}" hx-get="/trackers/tab?t=${k}" hx-target="#tracker-body" hx-swap="outerHTML"><span class="ic">${ic(i)}</span><b class="trk-name">${n}</b><span class="trk-desc">${d}</span><span class="trk-foot"><span class="trk-stat tab-nums">${stat}</span><span class="trk-open">${TRACKER_URL[k]?`Open${arrow()}`:'Not Finished'}</span></span></button>`).join('')}</div>`;
const T_tracker_body=t=>`<div id="tracker-body" style="display:flex;flex-direction:column;gap:20px"><div class="tabs" role="tablist">${TRACKER_TABS.map(([k,l])=>`<button role="tab" aria-selected="${t===k}" hx-get="/trackers/tab?t=${k}" hx-target="#tracker-body" hx-swap="outerHTML">${l}</button>`).join('')}</div>${t==='overview'?T_trk_overview():V[t](AS_MEMBER,{})}</div>`;
V.trackers=(u,q)=>`${head('Tracker Suite','Legislation, court cases, administration agendas, and executive actions, all in one place.')}${gate(u,'The Tracker Suite',T_tracker_body(TRACKER_TABS.some(x=>x[0]===q.t)?q.t:'overview'))}`;
