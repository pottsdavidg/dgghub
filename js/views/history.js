/* ---------- voting history ---------- */
V.history=u=>{
 const show=!isV(u)||u.lookups?.history;
 const top=head('Voting History','Whether you voted is public record in most states. How you voted is always secret and never stored here.','<span class="sample">Sample data</span>');
 if(!show)return top+`<section class="panel"><div class="panel-h"><h2>Look up your voting history</h2></div><form class="panel-b lookupform" hx-post="/history/lookup" hx-target="#root" hx-swap="innerHTML show:window:top">
  <div class="field"><label class="label" for="vh-first">First name</label><input id="vh-first" name="first" value="Jordan"></div><div class="field"><label class="label" for="vh-last">Last name</label><input id="vh-last" name="last" value="Ellis"></div>
  <div class="field"><label class="label" for="vh-dob">Date of birth</label><input id="vh-dob" name="dob" type="date" value="1996-04-12"></div><div class="field"><label class="label" for="vh-state">State</label><select id="vh-state" name="state">${STATE_OPTS('OH')}</select></div>
  <button class="btn primary" type="submit">Look up</button></form></section>`;
 const past=HISTORY.filter(h=>h[2]!=='upcoming'),v=past.filter(h=>h[2]==='Voted').length;
 return `${top}<section class="panel">${ph('Your turnout',pinBtn(u,'hist:stats'))}<div class="panel-b"><div class="grid g4">
  <div class="stat"><span class="label">Turnout</span><span class="v tab-nums">${Math.round(v/past.length*100)}%</span><span class="s">${v} of ${past.length} elections since 2022</span></div>
  <div class="stat"><span class="label">Voting streak</span><span class="v tab-nums">3</span><span class="s">Elections in a row</span></div>
  <div class="stat"><span class="label">General elections</span><span class="v ok tab-nums">4 / 4</span><span class="s">Never missed a November</span></div>
  <div class="stat"><span class="label">Most used</span><span class="v">Early</span><span class="s">3 early, 3 mail, 3 Election Day</span></div></div></div></section>
 <section class="panel">${ph('Election by election',pinBtn(u,'hist:table'))}<div class="tbl-wrap"><table><thead><tr><th>Date</th><th>Election</th><th>Participation</th><th>Method</th></tr></thead><tbody>
 ${HISTORY.map(([d,e,s,m])=>`<tr><td class="tab-nums">${d}</td><td>${e}</td><td><span class="chip ${s==='Voted'?'green':s==='upcoming'?'blue':'red'}">${s==='upcoming'?'Upcoming':s}</span></td><td>${m||'—'}</td></tr>`).join('')}
 </tbody></table></div></section>`;
};
