/* Sample Ballot: routes. */
route('POST','/ballot/lookup',({form,res})=>{const u=currentUser();u.lookups.ballot=true;if(u.account==='visitor'&&form.state)u.location=u.location||{address:form.address||'',city:form.city||'',state:form.state,zip:form.zip||''};
 return renderPage('ballot',{res,modal:promptAccount('ballot')})});

route('GET','/ballot/candidates/{id}',({params,query})=>{const c=BALLOT.flatMap(r=>r.cands).find(x=>x.id===params.id);return c?T_candidate(c,!query.collapsed):''});

route('GET','/ballot/breakdown/{id}',({params,query,res})=>{const u=currentUser(),c=BALLOT.flatMap(r=>r.cands).find(x=>x.id===params.id);
 if(query.close||!c)return '';
 if(u.account==='visitor'){const m=promptAccount('breakdown');return m||quietNote(res,'breakdown')}
 return T_breakdown(u,c)});
