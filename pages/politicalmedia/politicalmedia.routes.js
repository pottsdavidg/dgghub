/* Political Media (incl. workshops): routes. */
route('GET','/media/tab',({query})=>T_media_body2(currentUser(),MEDIA_TABS.some(t=>t[0]===query.t)?query.t:'dgg'));

route('GET','/media/list',({query})=>T_media_body(query.filter||'all'));

route('GET','/workshops/list',({query})=>T_ws_body(TRACKS.some(t=>t[0]===query.track)?query.track:'all'));
