/* =====================================================================
   ROUTES  (becomes main.py / routers/*.py in FastAPI)
   ---------------------------------------------------------------------
   Every route() below is one endpoint. Handlers read the session and DB,
   change data, and return an HTML fragment rendered by a template in
   views.js. Pattern for FastAPI:

     @router.post("/tasks/{task_id}/assign", response_class=HTMLResponse)
     def assign(task_id: int, who: str = Form(""), user = Depends(current_user)):
         ...update SQLite...
         return templates.TemplateResponse("partials/team_body.html", {...})

   Response headers used: HX-Trigger (toast, set-theme), HX-Retarget.
   ===================================================================== */

/* ---------- session (becomes a signed cookie session) ---------- */
const SESSION={user_id:null,quiz:null,game:null,timeline:null,chapterSent:false,taskFilter:'all'};
const currentUser=()=>DB.users.find(u=>u.id===SESSION.user_id)||null;
const newQuiz=ctx=>({ctx,step:0,answers:[],pick:null});

/* Which pages each account type can open */
const BASIC_PAGES=['home','register','ballot','reps','rep','bills','bill','history','media','chapter','settings','join'];
const ADVANCED_PAGES=[...BASIC_PAGES,'games','wiki','article','workshops','leg','courts','agenda','exec','model','rolodex'];
const ALLOWED={basic:BASIC_PAGES,advanced:ADVANCED_PAGES,member:[...ADVANCED_PAGES,'team','inbox']};

function renderPage(page,{query={},id=null,res}={}){
 const u=currentUser();
 if(!u) return T_auth_landing();
 if(page==='join') SESSION.quiz=SESSION.quiz&&SESSION.quiz.ctx==='app'&&query.keep?SESSION.quiz:newQuiz('app');
 if(page==='team'&&u.account!=='member') page='home';
 let body;
 if(!V[page]) page='home';
 if(!ALLOWED[u.account].includes(page)) body=V.notavailable(u,query,page);
 else body=V[page](u,query,id,SESSION.quiz);
 res&&res.trigger('set-theme',u.theme);
 return T_shell(u,page,body);
}

/* ---------- entry + full pages ---------- */
route('GET','/',({res})=>renderPage('home',{res}));
route('GET','/app/{page}',({params,query,res})=>renderPage(params.page,{query,res}));
route('GET','/app/{page}/{id}',({params,query,res})=>renderPage(params.page,{query,id:params.id,res}));

/* ---------- auth ---------- */
route('GET','/auth',()=>T_auth_landing());
route('GET','/auth/signin',()=>T_auth_signin());
route('POST','/auth/signin',({form,res})=>{
 const u=DB.users.find(x=>x.email===form.email)||DB.users[0];
 SESSION.user_id=u.id; res.toast('Signed in. Welcome back, '+u.first+'.');
 return renderPage('home',{res});
});
route('GET','/auth/signup',()=>T_auth_signup());
route('GET','/auth/signup/{account}',({params})=>T_auth_details(['basic','advanced','member'].includes(params.account)?params.account:'basic'));
route('POST','/auth/signup',({form,res})=>{
 const account=['basic','advanced','member'].includes(form.account)?form.account:'basic';
 const name=(form.name||'New Member').trim();
 const u={id:DB.users.length+1,name,first:name.split(' ')[0],email:form.email||'',zip:form.zip||'',account:account==='member'?'advanced':account,team:null,theme:'system',donate_dismissed:false,join_min:false};
 DB.users.push(u); SESSION.user_id=u.id;
 if(account==='member'){SESSION.quiz=newQuiz('auth');return T_auth_quiz(SESSION.quiz)}
 res.toast('Account created. Welcome, '+u.first+'.');
 return renderPage('home',{res});
});
route('POST','/auth/signout',({res})=>{SESSION.user_id=null;SESSION.quiz=null;return T_auth_landing()});

/* ---------- team-matching quiz ---------- */
route('POST','/quiz/answer',({form})=>{const q=SESSION.quiz;q.answers[q.step]=+form.choice;q.step=Math.min(TEAMQUIZ.length,q.step+1);q.pick=null;return T_quiz(q)});
route('POST','/quiz/back',()=>{const q=SESSION.quiz;q.step=Math.max(0,q.step-1);return T_quiz(q)});
route('POST','/quiz/pick',({form})=>{SESSION.quiz.pick=TEAMS[form.team]?form.team:null;return T_quiz(SESSION.quiz)});
route('POST','/quiz/restart',()=>{SESSION.quiz=newQuiz(SESSION.quiz.ctx);return T_quiz(SESSION.quiz)});
route('POST','/quiz/skip',({res})=>{
 const u=currentUser(),ctx=SESSION.quiz&&SESSION.quiz.ctx;SESSION.quiz=null;
 if(ctx==='auth'){u.account='member';u.team='welcome';res.toast('Account created. The Welcome Team will help you find a fit.')}
 return renderPage('home',{res});
});
route('POST','/quiz/join',({res})=>{
 const u=currentUser(),q=SESSION.quiz,sc=teamScores(q.answers);
 u.team=q.pick||TEAM_ORDER.slice().sort((a,b)=>sc[b]-sc[a])[0];u.account='member';SESSION.quiz=null;
 if(q.ctx==='auth'){res.toast(`Account created. Welcome to the ${TEAMS[u.team].n}, ${u.first}.`);return renderPage('home',{res})}
 res.toast(`You joined the ${TEAMS[u.team].n}. The Democracy Lab is unlocked.`);
 return renderPage('team',{res});
});

/* ---------- settings ---------- */
route('POST','/settings/account',({form,res})=>{
 const u=currentUser(),acct=form.account;
 if(!['basic','advanced','member'].includes(acct)) return renderPage('settings',{res});
 if(acct==='member'&&!u.team){SESSION.quiz=newQuiz('app');res.toast('Answer five quick questions to finish joining a team.');return renderPage('join',{query:{keep:1},res})}
 u.account=acct;res.toast('Switched to '+ACCOUNT_LABEL[acct]+'. You can change this anytime.');
 return renderPage(form.from||'settings',{res});
});
route('POST','/settings/theme',({form,res})=>{const u=currentUser();u.theme=['light','dark','system'].includes(form.theme)?form.theme:'system';res.trigger('set-theme',u.theme);return T_theme_seg(u.theme)});
route('POST','/settings/profile',({form,res})=>{const u=currentUser();if(form.name){u.name=form.name.trim();u.first=u.name.split(' ')[0]}u.email=form.email||u.email;u.zip=form.zip||u.zip;res.toast('Profile saved');return ''});

/* ---------- dashboard + global UI ---------- */
route('POST','/dashboard/dismiss-donate',()=>{currentUser().donate_dismissed=true;return ''});
route('POST','/ui/joinfab',({form})=>{const u=currentUser();u.join_min=form.min==='1';return T_joinfab(u)});
route('POST','/actions/notify',({form,res})=>{res.toast(form.msg||'Done');return ''});   // placeholder for future real actions

/* ---------- your government ---------- */
route('POST','/register/lookup',({form})=>{const n=[form.first,form.last].filter(Boolean).join(' ')||'That voter';
 return `<div class="panel-b" style="border-top:1px solid var(--line);display:flex;gap:10px;align-items:center"><span class="chip green">${ic('check')}Active</span><span><b>${esc(n)}</b> has an active registration in ${esc(form.state)}. <span style="color:var(--muted)">(Sample result)</span></span></div>`});
route('GET','/ballot/candidates/{id}',({params,query})=>{const c=BALLOT.flatMap(r=>r.cands).find(x=>x.id===params.id);return c?T_candidate(c,!query.collapsed):''});
route('GET','/reps/list',({query})=>T_reps_body(REPS[query.level]?query.level:'federal'));
route('GET','/bills/list',({query})=>{const f=query.filter||'all';return T_bills_list(f,query.q)+T_bill_filters(f,true)});
route('GET','/bills/{id}/diff',({params,query})=>T_bill_diff(params.id,Math.max(0,Math.min(2,+query.ver||0))));
route('POST','/bills/{id}/follow',({params,res})=>{const b=BILLS.find(x=>x.id===params.id);b.follow=!b.follow;res.toast(b.follow?`Following ${b.num}. You'll get an alert when it moves.`:'Unfollowed '+b.num);return T_follow(b)});

/* ---------- media, chapter, games ---------- */
route('GET','/media/list',({query})=>T_media_body(query.filter||'all'));
route('GET','/chapter/body',({query})=>T_chapter_body(query.state==='no'?'no':'yes',false));
route('POST','/chapter/apply',({res})=>{SESSION.chapterSent=true;res.toast('Application sent');return T_chapter_body('no',true)});

route('GET','/games/hub',()=>T_games_hub());
route('POST','/games/quiz/start',()=>{SESSION.game={qi:0,score:0,pick:null};return T_game_quiz(SESSION.game)});
route('POST','/games/quiz/answer',({form})=>{const g=SESSION.game;if(g.pick==null){g.pick=+form.choice;if(g.pick===QUIZ[g.qi][2])g.score++}return T_game_quiz(g)});
route('POST','/games/quiz/next',()=>{const g=SESSION.game;g.qi++;g.pick=null;return T_game_quiz(g)});
route('POST','/games/timeline/start',()=>{SESSION.timeline={order:[2,0,4,1,3],checked:false};return T_game_timeline(SESSION.timeline)});
route('POST','/games/timeline/move',({form})=>{const g=SESSION.timeline,i=+form.i,j=i+(+form.dir);if(j>=0&&j<g.order.length)[g.order[i],g.order[j]]=[g.order[j],g.order[i]];return T_game_timeline(g)});
route('POST','/games/timeline/check',()=>{SESSION.timeline.checked=true;return T_game_timeline(SESSION.timeline)});
route('POST','/games/timeline/reset',()=>{SESSION.timeline.checked=false;return T_game_timeline(SESSION.timeline)});

/* ---------- democracy lab ---------- */
route('GET','/wiki/list',({query})=>T_wiki_list(query.q));
route('GET','/workshops/list',({query})=>T_ws_body(TRACKS.some(t=>t[0]===query.track)?query.track:'all'));
route('GET','/exec/body',({query})=>T_exec_body(query.tab||'orders',query.filter||'all'));
route('GET','/model/forecast',({query})=>T_forecast(query.race,+query.turnout||0,+query.swing||0));
route('GET','/rolodex/list',({query})=>{const f=query.filter||'all';return T_rx_list(f,query.q)+T_rx_filters(f,true)});

/* ---------- my team + tasks ---------- */
const teamBody=()=>T_team_body(currentUser(),SESSION.taskFilter);
const findTask=id=>DB.tasks.find(t=>t.id===+id);
route('GET','/team/body',({query})=>{SESSION.taskFilter=['all','mine','open'].includes(query.filter)?query.filter:'all';return teamBody()});
route('GET','/team/task-form',({query})=>query.close?'':T_task_form(currentUser()));
route('POST','/team/preview',({form,res})=>{const u=currentUser();if(TEAMS[form.team])u.team=form.team;res.toast('Previewing the '+TEAMS[u.team].n);return renderPage('team',{res})});
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

/* ---------- public site (no login needed) ---------- */
route('GET','/site/about',()=>V.about());
route('GET','/site/regions',()=>V.regions());
route('GET','/site/regions/{slug}',({params})=>V.region(null,{},params.slug));
route('GET','/site/mailing-list',()=>V.mailing());
route('GET','/site/mailing-list/form',()=>T_mail_form(false));
route('POST','/site/mailing-list',({form,res})=>{
 const email=(form.email||'').trim();
 if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){res.toast('Enter a valid email address to sign up');return T_mail_form(false)}
 (DB.mailing_list=DB.mailing_list||[]).push({email,first:form.first||'',zip:form.zip||'',region:form.region||'',topics:Object.keys(form).filter(k=>k.startsWith('topic_')).map(k=>k.slice(6))});
 res.toast('Subscribed '+email);return T_mail_form(true,email);
});

/* ---------- inbox (presentation only) ---------- */
route('GET','/inbox/list',({query})=>T_inbox_list(query.filter||'all',null));
route('GET','/inbox/thread/{id}',({params,query})=>{const m=MESSAGES.find(x=>x.id===params.id);if(m)m.unread=false;return T_inbox_body(query.filter||'all',params.id,false)});
route('GET','/inbox/compose',()=>T_inbox_body('all',null,true));
route('POST','/inbox/send',({form,res})=>{res.toast((form.mode==='broadcast'?'Announcement sent to ':'Message sent to ')+(form.to||'recipient'));return T_inbox_body('all','m1',false)});
