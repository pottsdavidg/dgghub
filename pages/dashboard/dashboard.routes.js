/* Dashboard: routes. */
route('POST','/dash/location',({form,res})=>{
 const u=currentUser();
 if(!form.state){res.toast('Choose your state to continue');return renderPage(u.account==='visitor'?'home':'settings',{res})}
 u.location={address:form.address||'',city:form.city||'',state:form.state,zip:form.zip||''};
 res.toast('Location saved for this visit');
 const from=u.account!=='visitor'&&form.address!==undefined&&false;
 return renderPage('home',{res,modal:promptAccount('location')});
});

route('GET','/dash/locform',()=>T_locform(currentUser(),true));

route('GET','/dash/dates',({query})=>T_utv(tlDates(currentUser()),query.page));

route('POST','/dashboard/dismiss-donate',()=>{currentUser().donate_dismissed=true;return ''});
