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
