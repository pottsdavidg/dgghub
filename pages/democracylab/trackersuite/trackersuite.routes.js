/* Tracker Suite: routes. */
route('GET','/trackers/tab',({query})=>T_tracker_body(TRACKER_TABS.some(x=>x[0]===query.t)?query.t:'overview'));
