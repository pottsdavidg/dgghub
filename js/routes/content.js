/* ---------- civics, media, election data, resources ---------- */
route('GET','/civics/tab',({query})=>T_civics_body(currentUser(),CIVICS_TABS.some(t=>t[0]===query.t)?query.t:'overview'));
route('GET','/help/search',({query})=>T_faq(query.q));
route('GET','/media/tab',({query})=>T_media_body2(currentUser(),MEDIA_TABS.some(t=>t[0]===query.t)?query.t:'dgg'));
route('GET','/media/list',({query})=>T_media_body(query.filter||'all'));
route('POST','/elections/flip',({form})=>{const p=SESSION.mapPicks,cur=p[form.st]||'T';p[form.st]={T:'D',D:'R',R:'T'}[cur];return T_evmap('build',p)});
route('POST','/elections/reset',()=>{SESSION.mapPicks={};return T_evmap('build',{})});
route('GET','/chapter/body',({query})=>T_chapter_body(query.state==='no'?'no':'yes',false));
route('POST','/chapter/apply',({res})=>{SESSION.chapterSent=true;res.toast('Application sent');return T_chapter_body('no',true)});
