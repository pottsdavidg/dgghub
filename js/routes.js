/* =====================================================================
   ROUTES  (becomes main.py / routers/*.py in FastAPI)
   ---------------------------------------------------------------------
   Every route() is one endpoint. Handlers read the session and DB, change
   data, and return HTML rendered by a template in views.js.
   Access levels: visitor (no account) · account · member (on a DGG team).
   Pop-ups are sent as an out-of-band swap into #modal.
   ===================================================================== */

/* ---------- session (becomes a signed cookie session) ---------- */
const SESSION={user_id:null,quiz:null,game:null,timeline:null,chapterSent:false,taskFilter:'all',mapPicks:{},prompted:{},
 visitor:null};
const newVisitor=()=>({account:'visitor',name:'Visitor',first:'there',pins:[],location:null,lookups:{},noPrompts:false,donate_dismissed:false,theme:'system'});
SESSION.visitor=newVisitor();
const currentUser=()=>DB.users.find(u=>u.id===SESSION.user_id)||SESSION.visitor;
function CTX(){return currentUser()}
const newQuiz=ctx=>({ctx,step:0,answers:[],pick:null});
DB.users.forEach(u=>{u.account=u.account==='member'?'member':'account';u.pins=u.pins||['rep:r3','bill:hr2817','reg:polling'];u.location=u.location||{address:'1420 Neil Ave',city:'Columbus',state:'OH',zip:'43201'};u.lookups={};u.noTeamPrompts=false});

/* Which pages each access level can open */
const VISITOR_PAGES=['home','register','ballot','reps','rep','bills','bill','history','civics','resources','help','about','regions','region','mailing'];
const ACCOUNT_PAGES=[...VISITOR_PAGES,'media','chapter','elections','wiki','article','model','trackers','rolodex','settings','join'];
const MEMBER_PAGES=[...ACCOUNT_PAGES,'contact','inbox','tasks','ops'];
const ALLOWED={visitor:VISITOR_PAGES,account:ACCOUNT_PAGES,member:MEMBER_PAGES};

/* Pop-up helpers: account prompts for visitors, team prompts for accounts.
   Each reason shows once per session, and never after "don't show again". */
const PROMPTS={
 location:['Save your location','Create a free account and we\'ll remember where you vote, so your ballot, representatives, and dates are ready every time.'],
 register:['Save your registration','With a free account, your registration status is saved and checked for changes, so you never have to look it up again.'],
 ballot:['Keep your ballot handy','Create a free account to save your ballot, pin races to your dashboard, and read DGG\'s community breakdowns.'],
 breakdown:['Community breakdowns are for members','Create a free account to read DGG members\' breakdowns of each candidate: our take, recent controversies, and suggested votes.'],
 history:['Track your voting streak','Create a free account to save your voting history and keep your turnout streak on your dashboard.'],
 pin:['Keep your pins','Pins on a guest dashboard disappear when you leave. Create a free account to keep them.'],
 dates:['Dates for where you live','Create a free account and we\'ll show registration deadlines and elections for your state.'],
 statebills:['Follow your state\'s bills','Create a free account to switch between federal bills and bills in your state legislature.'],
 trackers:['The Tracker Suite is for DGG teams','Create a free account, then join a DGG team, to use our legislation, court, agenda, and executive order trackers.'],
 contribute:['Help fill in the gaps','Create a free account and join a DGG team to add missing information to the hub.'],
 games:['Save your score','Create a free account to keep your game history and share scores with friends.'],
};
const TEAM_PROMPTS={
 trackers:['Join a team to use the Tracker Suite','The Tracker Suite is part of the Democracy Lab, which opens up when you join a DGG team.'],
 contribute:['Help fill in the gaps','Team members add missing bill details and write community ballot breakdowns. Join a team to contribute.'],
};
function promptAccount(why,res){
 const u=currentUser();
 if(u.account!=='visitor'||u.noPrompts)return '';
 if(SESSION.prompted[why]&&!['trackers','contribute','breakdown','statebills','dates'].includes(why))return '';
 SESSION.prompted[why]=true;
 const [t,x]=PROMPTS[why]||PROMPTS.location;return T_prompt_account(t,x);
}
function promptTeam(why){
 const u=currentUser();
 if(u.account!=='account'||u.noTeamPrompts)return '';
 const [t,x]=TEAM_PROMPTS[why]||TEAM_PROMPTS.contribute;return T_prompt_team(t,x);
}

function renderPage(page,{query={},id=null,res,modal=''}={}){
 const u=currentUser();
 if(page==='join'){
  if(u.account==='visitor'){page='home';modal=T_auth_modal('signup',true)}
  else SESSION.quiz=SESSION.quiz&&SESSION.quiz.ctx==='app'&&query.keep?SESSION.quiz:newQuiz('app');
 }
 if(!V[page]) page='home';
 let body;
 if(!ALLOWED[u.account].includes(page)){
  if(u.account==='visitor'){body=V.needaccount(u,query,page)}
  else {page='home';body=V.home(u,query)}
 } else body=V[page](u,query,id,SESSION.quiz);
 res&&res.trigger('set-theme',u.theme);
 return T_shell(u,page,body)+(modal||T_modal_clear());
}
const toRoot=(res)=>res.retarget('#root','innerHTML');

/* ---------- entry + full pages ---------- */
route('GET','/',({res})=>renderPage('home',{res}));
route('GET','/app/{page}',({params,query,res})=>renderPage(params.page,{query,res}));
route('GET','/app/{page}/{id}',({params,query,res})=>renderPage(params.page,{query,id:params.id,res}));

/* ---------- auth (modal) ---------- */
route('GET','/auth/modal/signin',()=>T_auth_modal('signin'));
route('GET','/auth/modal/signup',({query})=>T_auth_modal('signup',!!query.join));
route('POST','/auth/signin',({form,res})=>{
 const u=DB.users.find(x=>x.email===form.email)||DB.users[0];
 SESSION.user_id=u.id;toRoot(res);res.toast('Signed in. Welcome back, '+u.first+'.');
 return renderPage('home',{res});
});
route('POST','/auth/signup',({form,res})=>{
 const v=SESSION.visitor,name=(form.name||'New Member').trim();
 const u={id:DB.users.length+1,name,first:name.split(' ')[0],email:form.email||'',account:'account',team:null,theme:v.theme,donate_dismissed:false,
  pins:[...v.pins],location:v.location,lookups:{},noTeamPrompts:false};
 DB.users.push(u);SESSION.user_id=u.id;SESSION.visitor=newVisitor();toRoot(res);
 if(form.join){res.toast('Account created. Now let\'s find your team.');return renderPage('join',{res})}
 res.toast('Account created. Your info is saved.');return renderPage('home',{res});
});
route('POST','/auth/signout',({res})=>{SESSION.user_id=null;SESSION.quiz=null;SESSION.visitor=newVisitor();res.toast('Signed out');return renderPage('home',{res})});

/* ---------- pop-ups ---------- */
route('POST','/ui/modal/close',({form})=>{const u=currentUser();
 if(form.dont_show==='account')u.noPrompts=true;
 if(form.dont_show==='team')u.noTeamPrompts=true;
 return T_modal_clear()});
route('POST','/ui/modal/join',({res})=>{toRoot(res);return renderPage('join',{res})});
const quietNote=(res,why)=>{res.toast((PROMPTS[why]||PROMPTS.location)[0]+': sign in or create a free account to use this.');return T_modal_clear()};
route('POST','/prompt/account',({form,res})=>promptAccount(form.why)||quietNote(res,form.why));
route('POST','/prompt/team',({form,res})=>{const u=currentUser();
 if(u.account==='visitor')return promptAccount(form.why)||quietNote(res,form.why);
 if(u.account==='member'){toRoot(res);return renderPage('trackers',{res})}
 return promptTeam(form.why)||(()=>{res.toast('Join a team from the sidebar to unlock this.');return T_modal_clear()})()});

/* ---------- pins ---------- */
route('POST','/pins/toggle',({form,res})=>{
 const u=currentUser(),k=form.key,i=u.pins.indexOf(k);
 if(i>=0)u.pins.splice(i,1);else u.pins.push(k);
 const on=i<0;res.toast(on?'Pinned to your dashboard':'Removed from your dashboard');
 if(form.from==='dash')return T_pins(u);
 const btn=form.style==='flag'?flagBtn(u,k):pinBtn(u,k);
 return btn+(on?promptAccount('pin'):'');
});

/* ---------- dashboard ---------- */
route('POST','/dash/location',({form,res})=>{
 const u=currentUser();
 if(!form.state){res.toast('Choose your state to continue');return renderPage(u.account==='visitor'?'home':'settings',{res})}
 u.location={address:form.address||'',city:form.city||'',state:form.state,zip:form.zip||''};
 res.toast('Location saved for this visit');
 const from=u.account!=='visitor'&&form.address!==undefined&&false;
 return renderPage('home',{res,modal:promptAccount('location')});
});
route('GET','/dash/locform',()=>T_locform(currentUser(),true));
route('POST','/dashboard/dismiss-donate',()=>{currentUser().donate_dismissed=true;return ''});
route('POST','/actions/notify',({form,res})=>{res.toast(form.msg||'Done');return ''});   // placeholder for future real actions

/* ---------- lookups (registration, ballot, history) ---------- */
route('POST','/register/lookup',({form,res})=>{const u=currentUser();u.lookups.register=true;
 if(u.account!=='visitor'&&form.first&&form.first!=='Jordan')res.toast(`${form.first} ${form.last||''}: active registration found in ${STATE_BY[form.state]?.[1]||'that state'} (sample result)`);
 return renderPage('register',{res,modal:promptAccount('register')})});
route('POST','/ballot/lookup',({form,res})=>{const u=currentUser();u.lookups.ballot=true;if(u.account==='visitor'&&form.state)u.location=u.location||{address:form.address||'',city:form.city||'',state:form.state,zip:form.zip||''};
 return renderPage('ballot',{res,modal:promptAccount('ballot')})});
route('POST','/history/lookup',({res})=>{const u=currentUser();u.lookups.history=true;return renderPage('history',{res,modal:promptAccount('history')})});
route('GET','/ballot/candidates/{id}',({params,query})=>{const c=BALLOT.flatMap(r=>r.cands).find(x=>x.id===params.id);return c?T_candidate(c,!query.collapsed):''});
route('GET','/ballot/breakdown/{id}',({params,query,res})=>{const u=currentUser(),c=BALLOT.flatMap(r=>r.cands).find(x=>x.id===params.id);
 if(query.close||!c)return '';
 if(u.account==='visitor'){const m=promptAccount('breakdown');return m||quietNote(res,'breakdown')}
 return T_breakdown(u,c)});

/* ---------- representation + bills ---------- */
route('GET','/reps/col/{kind}',({params,query})=>{const u=currentUser(),kind=params.kind,st=STATE_BY[query.state]?query.state:'AL';
 const p={branch:['legislative','executive','judicial'].includes(query.branch)?query.branch:'legislative',state:st,district:Math.max(1,Math.min(kind==='state'?stateSenateDistricts(st):STATE_BY[st][2],+query.district||1)),city:citiesOf(st).includes(query.city)?query.city:citiesOf(st)[0]};
 return T_rep_col(u,kind,p)});
route('GET','/reps/search',({query})=>{const u=currentUser(),s=(query.q||'').trim().toLowerCase();
 if(s.length<2)return '';
 const all=[...ALLREPS,...Object.values(REP_INDEX)],seen=new Set();
 const hits=all.filter(r=>!seen.has(r.id)&&seen.add(r.id)&&(r.name+' '+r.office+' '+r.scope).toLowerCase().includes(s)).slice(0,8);
 return hits.length?`<div class="represults">${hits.map(r=>repMini(u,r)).join('')}</div>`:`<p class="d" style="margin:8px 0 0">No politicians match "${esc(query.q)}".</p>`});
route('GET','/bills/table',({query,res})=>{const u=currentUser();const scope=u.account==='visitor'?'federal':(query.scope==='state'?'state':'federal');
 return T_bills_table(u,scope,query.q,[10,25,50].includes(+query.limit)?+query.limit:10)});
route('GET','/bills/{id}/diff',({params,query})=>T_bill_diff(params.id,Math.max(0,Math.min(2,+query.ver||0))));

/* ---------- civics, media, election data, resources ---------- */
route('GET','/civics/tab',({query})=>T_civics_body(currentUser(),CIVICS_TABS.some(t=>t[0]===query.t)?query.t:'overview'));
route('GET','/help/search',({query})=>T_faq(query.q));
route('GET','/media/tab',({query})=>T_media_body2(currentUser(),MEDIA_TABS.some(t=>t[0]===query.t)?query.t:'videos'));
route('GET','/media/list',({query})=>T_media_body(query.filter||'all'));
route('POST','/elections/flip',({form})=>{const p=SESSION.mapPicks,cur=p[form.st]||'T';p[form.st]={T:'D',D:'R',R:'T'}[cur];return T_evmap('build',p)});
route('POST','/elections/reset',()=>{SESSION.mapPicks={};return T_evmap('build',{})});
route('GET','/chapter/body',({query})=>T_chapter_body(query.state==='no'?'no':'yes',false));
route('POST','/chapter/apply',({res})=>{SESSION.chapterSent=true;res.toast('Application sent');return T_chapter_body('no',true)});

/* ---------- games ---------- */
route('GET','/games/hub',()=>T_games_hub());
route('POST','/games/quiz/start',()=>{SESSION.game={qi:0,score:0,pick:null};return T_game_quiz(SESSION.game)});
route('POST','/games/quiz/answer',({form})=>{const g=SESSION.game;if(g.pick==null){g.pick=+form.choice;if(g.pick===QUIZ[g.qi][2])g.score++}return T_game_quiz(g)});
route('POST','/games/quiz/next',()=>{const g=SESSION.game;g.qi++;g.pick=null;return T_game_quiz(g)+(g.qi>=QUIZ.length?promptAccount('games'):'')});
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
route('GET','/trackers/tab',({query})=>T_tracker_body(TRACKER_TABS.some(x=>x[0]===query.t)?query.t:'leg'));

/* ---------- team-matching quiz ---------- */
route('POST','/quiz/answer',({form})=>{const q=SESSION.quiz;q.answers[q.step]=+form.choice;q.step=Math.min(TEAMQUIZ.length,q.step+1);q.pick=null;return T_quiz(q)});
route('POST','/quiz/back',()=>{const q=SESSION.quiz;q.step=Math.max(0,q.step-1);return T_quiz(q)});
route('POST','/quiz/pick',({form})=>{SESSION.quiz.pick=TEAMS[form.team]?form.team:null;return T_quiz(SESSION.quiz)});
route('POST','/quiz/restart',()=>{SESSION.quiz=newQuiz(SESSION.quiz.ctx);return T_quiz(SESSION.quiz)});
route('POST','/quiz/skip',({res})=>{SESSION.quiz=null;return renderPage('home',{res})});
route('POST','/quiz/join',({res})=>{
 const u=currentUser(),q=SESSION.quiz,sc=teamScores(q.answers);
 u.team=q.pick||TEAM_ORDER.slice().sort((a,b)=>sc[b]-sc[a])[0];u.account='member';SESSION.quiz=null;
 res.toast(`You joined the ${TEAMS[u.team].n}. The Democracy Lab and DGG Team tools are unlocked.`);
 return renderPage('contact',{res});
});

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

/* ---------- settings ---------- */
route('POST','/settings/theme',({form,res})=>{const u=currentUser();u.theme=['light','dark','system'].includes(form.theme)?form.theme:'system';res.trigger('set-theme',u.theme);return T_theme_seg(u.theme)});
route('POST','/settings/profile',({form,res})=>{const u=currentUser();if(form.name){u.name=form.name.trim();u.first=u.name.split(' ')[0]}u.email=form.email||u.email;res.toast('Profile saved');return ''});
route('POST','/settings/prompts',({form,res})=>{const u=currentUser();u.noTeamPrompts=!form.team;res.toast('Pop-up preferences saved');return ''});
route('POST','/settings/leave-team',({res})=>{const u=currentUser();u.account='account';res.toast('You left the team. You can rejoin anytime.');return renderPage('settings',{res})});
route('POST','/settings/viewas',({form,res})=>{
 if(form.as==='visitor'){SESSION.user_id=null;SESSION.visitor=newVisitor();res.toast('Viewing as a visitor. Sign in to return.');return renderPage('home',{res})}
 const u=DB.users.find(x=>x.id===SESSION.user_id)||DB.users[0];SESSION.user_id=u.id;
 if(form.as==='member'){u.account='member';u.team=u.team||'media'}else u.account='account';
 res.toast('Viewing as '+(u.account==='member'?'a team member':'an account holder'));return renderPage('settings',{res})});

/* ---------- public pages (about, regions, mailing list) ---------- */
route('GET','/site/about',({res})=>renderPage('about',{res}));
route('GET','/site/regions',({res})=>renderPage('regions',{res}));
route('GET','/site/regions/{slug}',({params,res})=>renderPage('region',{id:params.slug,res}));
route('GET','/site/mailing-list',({res})=>renderPage('mailing',{res}));
route('GET','/site/mailing-list/form',()=>T_mail_form(false));
route('POST','/site/mailing-list',({form,res})=>{
 const email=(form.email||'').trim();
 if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){res.toast('Enter a valid email address to sign up');return T_mail_form(false)}
 (DB.mailing_list=DB.mailing_list||[]).push({email,first:form.first||'',zip:form.zip||'',region:form.region||'',topics:Object.keys(form).filter(k=>k.startsWith('topic_')).map(k=>k.slice(6))});
 res.toast('Subscribed '+email);return T_mail_form(true,email);
});

