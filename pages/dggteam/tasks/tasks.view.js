/* Team tasks: view. */
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

function projectProgress(u){const all=DB.tasks.filter(t=>t.team===u.team),ps=[...new Set(all.map(t=>t.project))];
 return ps.map(p=>{const ts=all.filter(t=>t.project===p),d=ts.filter(t=>t.status==='Done').length,ip=ts.filter(t=>t.status==='In progress').length;return {p,total:ts.length,done:d,ip}})}

V.tasks=(u,q)=>{const T=TEAMS[u.team];
 return `${head('Tasks',`Claim a task, add new ones, and see what's next for the ${T.n}.`,`<form class="viewas" style="gap:8px" hx-post="/team/preview" hx-trigger="change" hx-target="#root"><label for="teamswitch" class="label">Preview team</label><select id="teamswitch" name="team" style="border:2px solid var(--line);background:var(--surface);padding:6px 8px;border-radius:2px">${TEAM_ORDER.map(k=>`<option value="${k}" ${k===u.team?'selected':''}>${TEAMS[k].n}</option>`).join('')}</select></form>`)}
 <section class="panel">${ph('Projects','<span class="label">Done · in progress · to do</span>')}<div class="projgrid">${projectProgress(u).map(x=>`<div class="proj"><div class="projh"><b>${x.p}</b><span class="mono d">${x.done}/${x.total} done</span></div><div class="bar" style="height:10px"><i style="width:${x.done/x.total*100}%;background:var(--green)"></i><i style="width:${x.ip/x.total*100}%;background:var(--blue)"></i></div></div>`).join('')}</div></section>
 ${T_team_body(u,SESSION.taskFilter||'all')}`;
};
