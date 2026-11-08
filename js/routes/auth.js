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
  pins:[...v.pins],location:STATE_BY[form.state]?{address:form.address||'',city:form.city||'',state:form.state,zip:form.zip||''}:v.location,lookups:{},noTeamPrompts:false};
 DB.users.push(u);SESSION.user_id=u.id;SESSION.visitor=newVisitor();toRoot(res);
 if(form.join){res.toast('Account created. Now let\'s find your team.');return renderPage('join',{res})}
 res.toast('Account created. Your info is saved.');return renderPage('home',{res});
});
route('POST','/auth/signout',({res})=>{SESSION.user_id=null;SESSION.quiz=null;SESSION.visitor=newVisitor();res.toast('Signed out');return renderPage('home',{res})});
