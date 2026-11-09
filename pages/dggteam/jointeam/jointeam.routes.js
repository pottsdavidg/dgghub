/* ---------- team-matching quiz ---------- */
route('POST','/quiz/answer',({form})=>{const q=SESSION.quiz;q.answers[q.step]=+form.choice;q.step=Math.min(TEAMQUIZ.length,q.step+1);q.pick=null;return T_quiz(q)});
route('POST','/quiz/back',()=>{const q=SESSION.quiz;q.step=Math.max(0,q.step-1);return T_quiz(q)});
route('POST','/quiz/pick',({form})=>{SESSION.quiz.pick=TEAMS[form.team]?form.team:null;return T_quiz(SESSION.quiz)});
route('POST','/quiz/restart',()=>{SESSION.quiz=newQuiz(SESSION.quiz.ctx);return T_quiz(SESSION.quiz)});
route('POST','/quiz/skip',({res})=>{SESSION.quiz=null;return renderPage('home',{res})});
route('POST','/quiz/join',({res})=>{
 const u=currentUser(),q=SESSION.quiz,sc=teamScores(q.answers);
 u.team=q.pick||TEAM_ORDER.slice().sort((a,b)=>sc[b]-sc[a])[0];u.account='member';SESSION.quiz=null;
 res.toast(`You joined the ${TEAMS[u.team].n}. The Democracy Lab and DGG Team tools are unlocked.`);
 return renderPage('contact',{res});
});
