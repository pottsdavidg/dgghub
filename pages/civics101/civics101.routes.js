/* Civics 101 (incl. Know Your Stuff games): routes. */
route('GET','/civics/tab',({query})=>T_civics_body(currentUser(),CIVICS_TABS.some(t=>t[0]===query.t)?query.t:'overview'));

route('GET','/games/hub',()=>T_games_hub());

route('POST','/games/quiz/start',()=>{SESSION.game={qi:0,score:0,pick:null};return T_game_quiz(SESSION.game)});

route('POST','/games/quiz/answer',({form})=>{const g=SESSION.game;if(g.pick==null){g.pick=+form.choice;if(g.pick===QUIZ[g.qi][2])g.score++}return T_game_quiz(g)});

route('POST','/games/quiz/next',()=>{const g=SESSION.game;g.qi++;g.pick=null;return T_game_quiz(g)+(g.qi>=QUIZ.length?promptAccount('games'):'')});

route('POST','/games/timeline/start',()=>{SESSION.timeline={order:[2,0,4,1,3],checked:false};return T_game_timeline(SESSION.timeline)});

route('POST','/games/timeline/move',({form})=>{const g=SESSION.timeline,i=+form.i,j=i+(+form.dir);if(j>=0&&j<g.order.length)[g.order[i],g.order[j]]=[g.order[j],g.order[i]];return T_game_timeline(g)});

route('POST','/games/timeline/check',()=>{SESSION.timeline.checked=true;return T_game_timeline(SESSION.timeline)});

route('POST','/games/timeline/reset',()=>{SESSION.timeline.checked=false;return T_game_timeline(SESSION.timeline)});
