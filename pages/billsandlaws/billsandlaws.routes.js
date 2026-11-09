/* Bills & Laws (table + bill detail): routes. */
route('GET','/bills/table',({query})=>{const u=currentUser();let scope=u.account==='visitor'?'federal':(query.scope==='state'?'state':'federal');
 // picking a different state in the dropdown switches the table to that state's bills
 if(u.account!=='visitor'&&query.st&&STATE_BY[query.st]){if(query.st!==u.billState)scope='state';u.billState=query.st}
 return T_bills_table(u,scope,query.q,[10,25,50].includes(+query.limit)?+query.limit:10)+T_scopeseg(u,scope,true)});

route('GET','/bills/{id}/diff',({params,query})=>T_bill_diff(params.id,Math.max(0,Math.min(2,+query.ver||0))));
