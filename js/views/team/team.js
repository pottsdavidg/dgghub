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
