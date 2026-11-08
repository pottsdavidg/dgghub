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
