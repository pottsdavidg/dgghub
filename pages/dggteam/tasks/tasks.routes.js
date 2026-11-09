/* Team tasks: routes. */
const teamBody=()=>T_team_body(currentUser(),SESSION.taskFilter);

const findTask=id=>DB.tasks.find(t=>t.id===+id);

route('GET','/team/body',({query})=>{SESSION.taskFilter=['all','mine','open'].includes(query.filter)?query.filter:'all';return teamBody()});

route('GET','/team/task-form',({query})=>query.close?'':T_task_form(currentUser()));

route('POST','/team/preview',({form,res})=>{const u=currentUser();if(TEAMS[form.team])u.team=form.team;res.toast('Previewing the '+TEAMS[u.team].n);return renderPage('tasks',{res})});

route('POST','/tasks',({form,res})=>{
 const u=currentUser(),title=(form.title||'').trim();
 if(!title){res.toast('Give the task a name first');return teamBody()}
 const d=form.due?new Date(form.due+'T12:00:00'):null;
 DB.tasks.unshift({id:TID++,team:u.team,t:title,project:form.project,status:'To do',who:form.who||null,due:d?d.toLocaleDateString('en-US',{month:'short',day:'numeric'}):'—'});
 res.toast('Task added');return teamBody();
});

route('POST','/tasks/{id}/assign',({params,form,res})=>{const t=findTask(params.id),u=currentUser();t.who=form.who||null;
 const m=teamMembers(u).find(x=>x[0]===t.who);res.toast(!t.who?'Task unassigned':t.who==='JE'?'Assigned to you':'Assigned to '+m[1]);return teamBody()});

route('POST','/tasks/{id}/take',({params,res})=>{const t=findTask(params.id);t.who='JE';if(t.status==='To do')t.status='In progress';res.toast('You took "'+t.t+'"');return teamBody()});

route('POST','/tasks/{id}/status',({params,form})=>{findTask(params.id).status=form.status;return teamBody()});

route('POST','/tasks/{id}/toggle',({params,res})=>{const t=findTask(params.id);t.status=t.status==='Done'?'To do':'Done';if(t.status==='Done')res.toast('Marked done');return teamBody()});
