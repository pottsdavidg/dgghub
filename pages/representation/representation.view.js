/* ---------- representation ---------- */
const BRANCHES_SEL=[['legislative','Legislative (Congress)'],['executive','Executive'],['judicial','Judicial (Supreme Court)']];
const stateSenateDistricts=st=>st==='OH'?33:st==='NE'?49:Math.max(20,Math.min(40,STATE_BY[st][2]*3));
function repsFor(kind,p){
 const st=p.state,S=STATE_BY[st];
 if(kind==='federal'){
  if(p.branch==='executive')return FED_EXEC;
  if(p.branch==='judicial')return FED_JUD;
  if(st==='OH'&&+p.district===3)return REPS.federal;
  const d=+p.district||1,out=[];
  if(st!=='DC'){out.push(sampleRep(`sen-${st}-1`,'U.S. Senator',S[1]),sampleRep(`sen-${st}-2`,'U.S. Senator',S[1]))}
  out.push(sampleRep(`h-${st}-${d}`,st==='DC'?'Delegate to Congress':'U.S. Representative',S[2]===1?`${S[1]} at-large`:`${S[1]} District ${d}`));
  return out;
 }
 if(kind==='state'){
  if(st==='OH'&&+p.district===15)return REPS.state;
  const d=+p.district||1,gp=sampleRep(`gov-${st}`,'Governor',S[1]).party;
  return [sampleRep(`gov-${st}`,'Governor',S[1]),sampleRep(`ltg-${st}`,'Lieutenant Governor',S[1],gp),sampleRep(`ag-${st}`,'Attorney General',S[1]),sampleRep(`sos-${st}`,'Secretary of State',S[1]),
   sampleRep(`ss-${st}-${d}`,'State Senator',`${S[1]} Senate District ${d}`),sampleRep(`sr-${st}-${d}`,'State Representative',`${S[1]} House District ${d*2}`)];
 }
 const city=p.city||citiesOf(st)[0];
 if(st==='OH'&&city==='Columbus')return REPS.local;
 const k=`${st}-${city}`;
 return [sampleRep(`may-${k}`,'Mayor',`City of ${city}`),sampleRep(`ccp-${k}`,'City Council President',`${city} City Council`),sampleRep(`cc1-${k}`,'City Council Member',`${city} City Council`),sampleRep(`cc2-${k}`,'City Council Member',`${city} City Council`),sampleRep(`sb-${k}`,'School Board President',`${city} Public Schools`,'N'),sampleRep(`com-${k}`,'County Commissioner',`County serving ${city}`)];
}
const repMini=(u,r)=>`<div class="repmini"><button class="repmini-main" ${nav('rep/'+r.id)}><div class="avatar" style="background:${candColor(r.party)}">${r.ini}</div><span style="min-width:0"><b>${r.name}</b><span class="d">${r.office}</span><span class="d">${r.scope}</span></span>${party(r.party)}</button>${pinBtn(u,'rep:'+r.id)}</div>`;
function T_rep_col(u,kind,p){
 const S=STATE_BY[p.state],list=repsFor(kind,p);
 const sel=(name,opts,v,label)=>`<label class="field"><span class="label">${label}</span><select name="${name}">${opts.map(([val,l])=>`<option value="${val}" ${String(v)===String(val)?'selected':''}>${l}</option>`).join('')}</select></label>`;
 const stateSel=sel('state',STATES.map(s=>[s[0],s[1]]),p.state,'State');
 let controls='';
 if(kind==='federal'){controls=sel('branch',BRANCHES_SEL,p.branch,'Branch')+(p.branch==='legislative'?stateSel+sel('district',Array.from({length:S[2]},(_,i)=>[i+1,S[2]===1?'At-large':'District '+(i+1)]),p.district,'House district'):'')}
 else if(kind==='state'){controls=stateSel+sel('district',Array.from({length:stateSenateDistricts(p.state)},(_,i)=>[i+1,'District '+(i+1)]),p.district,'State senate district')}
 else {controls=stateSel+sel('city',citiesOf(p.state).map(c=>[c,c]),p.city,'City')}
 const title={federal:'Federal',state:'State',local:'Local'}[kind];
 return `<section class="panel repcol" id="col-${kind}"><div class="panel-h"><h2>${title}</h2><span class="label">${list.length} officials</span></div>
  <form class="repctl" hx-get="/reps/col/${kind}" hx-trigger="change" hx-target="#col-${kind}" hx-swap="outerHTML">${controls}</form>
  <div class="replist">${list.map(r=>repMini(u,r)).join('')}</div></section>`;
}
function repDefaults(u){
 if(!isV(u)&&u.location&&u.location.state==='OH')return {federal:{branch:'legislative',state:'OH',district:3},state:{state:'OH',district:15},local:{state:'OH',city:'Columbus'}};
 const st=(!isV(u)&&(u.location == null ? undefined : u.location.state))||STATES[0][0];
 return {federal:{branch:'legislative',state:st,district:1},state:{state:st,district:1},local:{state:st,city:citiesOf(st)[0]}};
}
V.reps=u=>{const d=repDefaults(u);
 return `${head('Representation','Every elected official, from Congress to city council. Pick a state and district in each column.','<span class="sample">Sample data</span>')}
 <div class="repsearch"><label class="search">${ic('search')}<input name="q" placeholder="Search politicians by name, office, or state" aria-label="Search politicians" hx-get="/reps/search" hx-trigger="keyup changed delay:250ms, search" hx-target="#rep-results"></label><div id="rep-results"></div></div>
 ${isV(u)?`<div class="note">${ic('users')}<span>Showing <b>${STATE_BY[d.federal.state][1]}</b>, the first state alphabetically. <button class="linkbtn" hx-get="/auth/modal/signup" hx-swap="none">Create a free account</button> and this page will default to your own representatives.</span></div>`:''}
 <div class="repcols">${T_rep_col(u,'federal',d.federal)}${T_rep_col(u,'state',d.state)}${T_rep_col(u,'local',d.local)}</div>
 <p class="demo-note">President, Vice President, Cabinet, and Supreme Court are real officeholders as of 2025. Legislators and local officials are generated sample names until the Congress.gov and Open States connections are built.</p>`;
};
V.rep=(u,q,id)=>{
 const r=REP_INDEX[id]||ALLREPS.find(x=>x.id===id)||ALLREPS[0],spons=BILLS.filter(b=>b.sponsor===r.id);
 return `${head(r.name,`${r.office} · ${r.scope}`,`<div class="ph-r">${pinBtn(u,'rep:'+r.id)}<button class="btn primary" ${act('Following '+r.name+". You'll be notified of new votes and statements.")}>${ic('bell')}Follow</button></div>`,crumb('reps','Representation'))}
 <div class="grid g3">
  <section class="panel">${ph('Contact',party(r.party))}<div class="panel-b"><div class="kv" style="grid-template-columns:90px 1fr">
   <div class="k">Phone</div><div class="v mono tab-nums">${r.phone}</div><div class="k">Term</div><div class="v">${r.term}</div>
   <div class="k">Committees</div><div class="v">${r.committees.join(', ')||'—'}</div><div class="k">Party</div><div class="v">${PARTY[r.party]||'—'}</div>
  </div><button class="btn sm" style="margin-top:12px" ${act('Would open a pre-addressed message form')}>Write to ${r.name.split(' ')[0]}</button></div></section>
  <section class="panel span2">${ph('Recent votes','<span class="label">Last 30 days</span>')}<div class="tbl-wrap"><table><thead><tr><th>Measure</th><th>Vote</th><th>Date</th></tr></thead><tbody>
   ${VOTES.map(([m,v,d])=>`<tr><td>${m}</td><td><span class="chip ${v==='Yea'?'green':'red'}">${v}</span></td><td class="tab-nums">${d}</td></tr>`).join('')}
  </tbody></table></div></section>
 </div>
 <section class="panel">${ph('Sponsored legislation')}<div class="rows">${spons.length?spons.map(b=>`<button class="row" ${nav('bill/'+b.id)}><span class="ic">${ic('doc')}</span><span><span class="t">${b.num} · ${b.title}</span><br><span class="d">${STAGES[b.stage]}</span></span><span style="width:120px">${pipe(b.stage)}</span></button>`).join(''):`<div class="panel-b" style="color:var(--muted)">No sponsored bills on file. <button class="linkbtn" ${isV(u)?'hx-post="/prompt/account" '+vals({why:'contribute'})+' hx-swap="none"':nav('join')}>Join a DGG team to help fill this in.</button></div>`}</div></section>`;
};
