/* ---------- team-matching quiz (used at sign-up and in the app) ---------- */
function teamScores(answers){const sc=Object.fromEntries(TEAM_ORDER.map(k=>[k,0]));answers.forEach((a,i)=>{if(a==null)return;const w=TEAMQUIZ[i][1][a][1];for(const k in w)sc[k]+=w[k]});return sc}
function T_quiz(q){
 const app=q.ctx==='app';
 if(q.step<TEAMQUIZ.length){
  const [text,opts]=TEAMQUIZ[q.step];
  return `<div class="quizbox" id="quizbox">
   <div class="tagline" style="margin-bottom:6px"><span class="label">${app?'Join a team':'Create an account · Step 3 of 3'}</span><div class="slogan" style="font-size:clamp(40px,5vw,60px)">Where do <span class="r">you</span> fit?</div><p>Five quick questions match you with a Digital Ground Game team. You can switch teams later.</p></div>
   <div class="qprog">${TEAMQUIZ.map((_,i)=>`<i class="${i<=q.step?'on':''}"></i>`).join('')}</div>
   <div class="tq-head"><span class="label">Question ${q.step+1} of ${TEAMQUIZ.length}</span><button class="crumb" style="margin:0" hx-post="/quiz/skip" hx-target="#root">${app?'Not now':'Skip for now'}</button></div>
   <div class="tq-q">${text}</div>
   <div class="tq-opts">${opts.map(([l],i)=>`<button class="opt ${q.answers[q.step]===i?'picked':''}" hx-post="/quiz/answer" ${vals({choice:i})} hx-target="#quizbox" hx-swap="outerHTML">${l}</button>`).join('')}</div>
   ${q.step>0?`<button class="btn ghost sm" style="align-self:flex-start" hx-post="/quiz/back" hx-target="#quizbox" hx-swap="outerHTML">${ic('back')}Back</button>`:''}
  </div>`;
 }
 const sc=teamScores(q.answers),max=Math.max(1,...Object.values(sc)),best=TEAM_ORDER.slice().sort((a,b)=>sc[b]-sc[a])[0];
 const pick=q.pick||best,T=TEAMS[pick];
 return `<div class="quizbox" id="quizbox">
  <div class="tagline" style="margin-bottom:6px"><span class="label">Your match</span><div class="slogan" style="font-size:clamp(40px,5vw,60px)">Welcome to the <span class="r">${TEAMS[best].n.replace(' Team','')}</span> team</div></div>
  <div class="teamhero" style="--team:${T.c}"><div class="teamicon">${ic(T.icon)}</div><div><h2>${T.n}</h2><div class="tsub">${T.sub}</div><p>${T.d}</p></div></div>
  <div class="panel panel-b" style="display:flex;flex-direction:column;gap:8px"><span class="label">How you matched</span>${TEAM_ORDER.map(k=>`<div class="teamscore"><span>${TEAMS[k].n}</span><span class="bar"><i style="width:${sc[k]/max*100}%;background:${TEAMS[k].c}"></i></span><span class="mono tab-nums" style="text-align:right">${sc[k]}</span></div>`).join('')}</div>
  <div class="field"><span class="label">Rather join a different team?</span><div class="otherteams">${TEAM_ORDER.map(k=>`<button aria-pressed="${pick===k}" hx-post="/quiz/pick" ${vals({team:k})} hx-target="#quizbox" hx-swap="outerHTML">${ic(TEAMS[k].icon)}${TEAMS[k].n}</button>`).join('')}</div></div>
  <button class="btn primary block" hx-post="/quiz/join" hx-target="#root">Join the ${T.n}${app?'':' and continue'}</button>
  <button class="crumb" style="align-self:center" hx-post="/quiz/restart" hx-target="#quizbox" hx-swap="outerHTML">Retake the quiz</button>
 </div>`;
}

/* ---------- join a team (in-app quiz) ---------- */
V.join=(u,q,id,quiz)=>`${head('Join a team','Five quick questions match you with the DGG team that fits your skills.')}<div class="play">${T_quiz(quiz)}</div>`;
