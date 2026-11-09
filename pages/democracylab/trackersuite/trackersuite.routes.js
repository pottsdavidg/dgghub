/* Tracker Suite: routes. */
route('GET','/exec/body',({query})=>T_exec_body(query.tab||'orders',query.filter||'all'));

route('GET','/trackers/tab',({query})=>T_tracker_body(TRACKER_TABS.some(x=>x[0]===query.t)?query.t:'leg'));
