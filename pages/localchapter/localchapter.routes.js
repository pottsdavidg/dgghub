/* Local Chapter: routes. */
route('GET','/chapter/body',({query})=>T_chapter_body(query.state==='no'?'no':'yes',false));

route('POST','/chapter/apply',({res})=>{SESSION.chapterSent=true;res.toast('Application sent');return T_chapter_body('no',true)});
