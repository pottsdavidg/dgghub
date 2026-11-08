/* ---------- DGG team: tasks, operations, inbox ---------- */
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
route('POST','/ops/{id}/shift/{i}',({params,res})=>{const op=OPERATIONS.find(o=>o.id===params.id),s=op.shifts[+params.i];
 s[5]=!s[5];s[4]+=s[5]?1:-1;op.signed+=s[5]?1:-1;res.toast(s[5]?`You claimed ${s[0]}, ${s[1]} in ${s[2]}`:'Shift dropped');return T_op_detail(op)});
route('POST','/ops/{id}/check/{i}',({params})=>{const op=OPERATIONS.find(o=>o.id===params.id),c=op.checklist[+params.i];c[1]=!c[1];return T_op_detail(op)});
route('GET','/inbox/list',({query})=>T_inbox_list(query.filter||'all',null));
route('GET','/inbox/thread/{id}',({params,query})=>{const m=MESSAGES.find(x=>x.id===params.id);if(m)m.unread=false;return T_inbox_body(query.filter||'all',params.id,false)});
route('GET','/inbox/compose',()=>T_inbox_body('all',null,true));
route('POST','/inbox/send',({form,res})=>{res.toast((form.mode==='broadcast'?'Announcement sent to ':'Message sent to ')+(form.to||'recipient'));return T_inbox_body('all','m1',false)});
