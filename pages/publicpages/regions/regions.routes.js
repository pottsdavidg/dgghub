/* Regions (list + region detail): routes. */
route('GET','/site/regions',({res})=>renderPage('regions',{res}));

route('GET','/site/regions/{slug}',({params,res})=>renderPage('region',{id:params.slug,res}));
