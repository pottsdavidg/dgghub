/* ---------- representation + bills ---------- */
route('GET','/reps/col/{kind}',({params,query})=>{const u=currentUser(),kind=params.kind,st=STATE_BY[query.state]?query.state:'AL';
 const p={branch:['legislative','executive','judicial'].includes(query.branch)?query.branch:'legislative',state:st,district:Math.max(1,Math.min(kind==='state'?stateSenateDistricts(st):STATE_BY[st][2],+query.district||1)),city:citiesOf(st).includes(query.city)?query.city:citiesOf(st)[0]};
 return T_rep_col(u,kind,p)});
route('GET','/reps/search',({query})=>{const u=currentUser(),s=(query.q||'').trim().toLowerCase();
 if(s.length<2)return '';
 const all=[...ALLREPS,...Object.values(REP_INDEX)],seen=new Set();
 const hits=all.filter(r=>!seen.has(r.id)&&seen.add(r.id)&&(r.name+' '+r.office+' '+r.scope).toLowerCase().includes(s)).slice(0,8);
 return hits.length?`<div class="represults">${hits.map(r=>repMini(u,r)).join('')}</div>`:`<p class="d" style="margin:8px 0 0">No politicians match "${esc(query.q)}".</p>`});
route('GET','/bills/table',({query})=>{const u=currentUser();let scope=u.account==='visitor'?'federal':(query.scope==='state'?'state':'federal');
 // picking a different state in the dropdown switches the table to that state's bills
 if(u.account!=='visitor'&&query.st&&STATE_BY[query.st]){if(query.st!==u.billState)scope='state';u.billState=query.st}
 return T_bills_table(u,scope,query.q,[10,25,50].includes(+query.limit)?+query.limit:10)+T_scopeseg(u,scope,true)});
route('GET','/bills/{id}/diff',({params,query})=>T_bill_diff(params.id,Math.max(0,Math.min(2,+query.ver||0))));
