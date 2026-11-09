/* ---------- pop-ups ---------- */
// sidebar light/dark switch: the browser sends the theme it's showing now as `current`
route('POST','/ui/theme/toggle',({form,res})=>{const u=currentUser();u.theme=form.current==='dark'?'light':'dark';res.trigger('set-theme',u.theme);return ''});

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

route('POST','/actions/notify',({form,res})=>{res.toast(form.msg||'Done');return ''});   // placeholder for future real actions
