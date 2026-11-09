/* Inbox: routes. */
route('GET','/inbox/list',({query})=>T_inbox_list(query.filter||'all',null));

route('GET','/inbox/thread/{id}',({params,query})=>{const m=MESSAGES.find(x=>x.id===params.id);if(m)m.unread=false;return T_inbox_body(query.filter||'all',params.id,false)});

route('GET','/inbox/compose',()=>T_inbox_body('all',null,true));

route('POST','/inbox/send',({form,res})=>{res.toast((form.mode==='broadcast'?'Announcement sent to ':'Message sent to ')+(form.to||'recipient'));return T_inbox_body('all','m1',false)});
