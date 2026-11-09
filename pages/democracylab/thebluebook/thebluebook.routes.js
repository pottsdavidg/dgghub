/* The Blue Book (wiki + articles): routes. */
route('GET','/wiki/list',({query})=>T_wiki_list(query.q));
