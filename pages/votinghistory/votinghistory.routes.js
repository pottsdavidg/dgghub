/* Voting History: routes. */
route('POST','/history/lookup',({res})=>{const u=currentUser();u.lookups.history=true;return renderPage('history',{res,modal:promptAccount('history')})});
