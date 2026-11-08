/* ---------- public pages (about, regions, mailing list) ---------- */
route('GET','/site/about',({res})=>renderPage('about',{res}));
route('GET','/site/regions',({res})=>renderPage('regions',{res}));
route('GET','/site/regions/{slug}',({params,res})=>renderPage('region',{id:params.slug,res}));
route('GET','/site/mailing-list',({res})=>renderPage('mailing',{res}));
route('GET','/site/mailing-list/form',()=>T_mail_form(false));
route('POST','/site/mailing-list',({form,res})=>{
 const email=(form.email||'').trim();
 if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){res.toast('Enter a valid email address to sign up');return T_mail_form(false)}
 (DB.mailing_list=DB.mailing_list||[]).push({email,first:form.first||'',zip:form.zip||'',region:form.region||'',topics:Object.keys(form).filter(k=>k.startsWith('topic_')).map(k=>k.slice(6))});
 res.toast('Subscribed '+email);return T_mail_form(true,email);
});
