/* ---------- registration ---------- */
const T_reg_form=(u,again)=>`<section class="panel"><div class="panel-h"><h2>${again?'Check someone else':'Look up your registration'}</h2><span class="label">All 50 states + DC</span></div>
 <form class="panel-b lookupform" hx-post="/register/lookup" hx-target="#root" hx-swap="innerHTML show:window:top">
  <div class="field"><label class="label" for="rg-first">First name</label><input id="rg-first" name="first" value="${again?'':'Jordan'}" autocomplete="given-name"></div>
  <div class="field"><label class="label" for="rg-last">Last name</label><input id="rg-last" name="last" value="${again?'':'Ellis'}" autocomplete="family-name"></div>
  <div class="field"><label class="label" for="rg-dob">Date of birth</label><input id="rg-dob" name="dob" type="date" value="${again?'':'1996-04-12'}"></div>
  <div class="field"><label class="label" for="rg-zip">ZIP code</label><input id="rg-zip" name="zip" value="${again?'':'43201'}" inputmode="numeric" autocomplete="postal-code"></div>
  <div class="field"><label class="label" for="rg-state">State</label><select id="rg-state" name="state">${STATE_OPTS('OH')}</select></div>
  <button class="btn primary" type="submit">Look up</button>
 </form></section>`;
V.register=u=>{
 const show=!isV(u)||u.lookups?.register;
 const top=head('Registration',show?'Your record as held by your state\'s election office. The live version checks it nightly.':'Enter your information to check your voter registration, polling place, and deadlines.','<span class="sample">Sample data</span>');
 if(!show)return top+T_reg_form(u)+`<p class="privnote">${ic('lock')}<span>We only use this to look up your public voter record. ${isV(u)?'With a free account, we save it so you won\'t need to enter it again.':''}</span></p>`;
 return `${top}<div class="grid g3">
  <section class="panel span2">${ph('Your record',`<span class="chip green">${ic('check')}Active</span>${pinBtn(u,'reg:record')}`)}<div class="panel-b"><div class="kv">
   <div class="k">Name</div><div class="v">${USER.name}</div><div class="k">Registered address</div><div class="v">${USER.addr}</div>
   <div class="k">County</div><div class="v">${USER.county}</div><div class="k">Precinct</div><div class="v">${USER.precinct} · ${USER.ward}</div>
   <div class="k">Registered since</div><div class="v">September 14, 2018</div><div class="k">Party affiliation</div><div class="v">Unaffiliated (Ohio sets affiliation by the last primary ballot you chose)</div>
   <div class="k">Voter ID on file</div><div class="v mono">OH••••••4471</div></div></div></section>
  <section class="panel">${ph('Polling place',pinBtn(u,'reg:polling'))}<div class="panel-b" style="display:flex;flex-direction:column;gap:12px">
   <div style="display:flex;gap:10px">${ic('pin').replace('<svg','<svg style="width:20px;flex:none;color:var(--red)"')}<div><b>Northwood Recreation Center</b><br><span style="color:var(--muted)">2000 N High St, Columbus, OH 43201</span></div></div>
   <div class="chip blue" style="align-self:flex-start">0.6 mi · 12 min walk</div><button class="btn sm" ${act('Would open directions in your maps app')}>Get directions</button></div></section>
 </div>
 <section class="panel">${ph('Key dates',pinBtn(u,'reg:dates'))}<div class="tbl-wrap"><table><thead><tr><th>Date</th><th>What</th><th>Days away</th></tr></thead><tbody>
  ${IMPORTANT_DATES.filter(x=>(!x[4]||x[4]==='OH')&&x[2]!=='Civic').sort((a,b)=>a[0].localeCompare(b[0])).map(([d,l,k,c])=>`<tr><td class="tab-nums" style="white-space:nowrap">${fmtDate(d).long}</td><td>${l} <span class="chip ${c}">${k}</span></td><td class="tab-nums">${daysUntil(d)}</td></tr>`).join('')}
 </tbody></table></div></section>
 ${T_reg_form(u,true)}`;
};
