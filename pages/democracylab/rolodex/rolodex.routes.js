/* Rolodex: routes. */
route('GET','/rolodex/list',({query})=>{const f=query.filter||'all';return T_rx_list(f,query.q)+T_rx_filters(f,true)});
