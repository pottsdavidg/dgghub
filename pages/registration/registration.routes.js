/* Registration lookup: routes. */
route('POST','/register/lookup',({form,res})=>{const u=currentUser();u.lookups.register=true;
 if(u.account!=='visitor'&&form.first&&form.first!=='Jordan')res.toast(`${form.first} ${form.last||''}: active registration found in ${STATE_BY[form.state]?.[1]||'that state'} (sample result)`);
 return renderPage('register',{res,modal:promptAccount('register')})});
