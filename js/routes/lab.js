/* ---------- democracy lab ---------- */
route('GET','/wiki/list',({query})=>T_wiki_list(query.q));
route('GET','/workshops/list',({query})=>T_ws_body(TRACKS.some(t=>t[0]===query.track)?query.track:'all'));
route('GET','/exec/body',({query})=>T_exec_body(query.tab||'orders',query.filter||'all'));
route('GET','/model/forecast',({query})=>T_forecast(query.race,+query.turnout||0,+query.swing||0));
route('GET','/rolodex/list',({query})=>{const f=query.filter||'all';return T_rx_list(f,query.q)+T_rx_filters(f,true)});
route('GET','/trackers/tab',({query})=>T_tracker_body(TRACKER_TABS.some(x=>x[0]===query.t)?query.t:'leg'));
