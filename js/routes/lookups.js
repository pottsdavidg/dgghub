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
