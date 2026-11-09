/* ---------- sample ballot ---------- */
const KIND_CHIP={Federal:'yel',State:'blue',Local:'green',Judicial:'red',Issues:''};   // chip color per ballot category ('' = the default grey chip)
const candColor=p=>p==='D'?'var(--blue)':p==='R'?'var(--red)':p==='G'?'#13824A':p==='L'?'#C99A00':'#596079';
const T_candidate=(c,open)=>{
 const ini=c.name.replace('Hon. ','').split(/[ /]+/).filter(Boolean).map(x=>x[0]).slice(0,2).join('');
 const row=`<div class="cand-row"><button class="cand-toggle" hx-get="/ballot/candidates/${c.id}${open?'?collapsed=1':''}" hx-target="#cand-${c.id}" hx-swap="outerHTML" aria-expanded="${open}"><div class="avatar" style="background:${candColor(c.party)}">${ini}</div><span style="min-width:0"><span class="t">${c.name}</span>${c.inc?' <span class="chip">Incumbent</span>':''}<br><span class="d">${PARTY[c.party]} · ${c.job}</span></span>${party(c.party)}${ic('down',open?'chev open':'chev')}</button>
  <button class="infobtn" hx-get="/ballot/breakdown/${c.id}" hx-target="#bd-${c.id}" aria-label="DGG community breakdown of ${esc(c.name)}" title="DGG community breakdown">${ic('info')}</button></div>`;
 if(!open)return `<div class="cand" id="cand-${c.id}">${row}<div id="bd-${c.id}"></div></div>`;
 return `<div class="cand open" id="cand-${c.id}">${row}<div id="bd-${c.id}"></div>
  <div class="cand-body"><div class="cand-main"><span class="label">About</span><p>${c.bio}</p><span class="label">Top priorities</span><ul class="cand-pos">${c.positions.map(([k,v])=>`<li><b>${k}</b><span>${v}</span></li>`).join('')}</ul></div>
   <aside class="cand-side"><div class="kv" style="grid-template-columns:90px 1fr"><div class="k">Age</div><div class="v tab-nums">${c.age}</div><div class="k">Lives in</div><div class="v">${c.home}</div><div class="k">Website</div><div class="v mono" style="font-size:13px">${c.site}</div></div>
    <span class="label">Raised this cycle</span><div class="disp tab-nums" style="font-size:30px">$${c.raised.toLocaleString()}K</div>
    <span class="label">Endorsements</span><div style="display:flex;gap:6px;flex-wrap:wrap">${c.endorse.map(e=>`<span class="chip">${e}</span>`).join('')}</div></aside></div></div>`;
};
function T_breakdown(u,c){
 const b=BREAKDOWNS[c.id];
 const close=`<button class="iconbtn" hx-get="/ballot/breakdown/${c.id}?close=1" hx-target="#bd-${c.id}" aria-label="Close breakdown">${ic('x')}</button>`;
 if(!b)return `<div class="breakdown empty"><div class="bd-h"><span class="label">DGG community breakdown</span>${close}</div><p>No one in DGG has written a breakdown of <b>${c.name}</b> yet.</p>
  ${isMember(u)?`<button class="btn sm primary" ${act('Would open the breakdown editor for '+c.name)}>${ic('pen')}Write this breakdown</button>`:`<p class="d">Breakdowns are written by DGG team members. Join a team to contribute to the community database.</p><button class="btn sm primary" ${nav('join')}>Join a team to contribute</button>`}</div>`;
 return `<div class="breakdown"><div class="bd-h"><span class="label">DGG community breakdown · ${b.by} · updated ${b.updated}</span>${close}</div>
  <div class="bd-verdict"><span class="chip ${b.verdict==='Recommended'?'green':'red'}">${b.verdict==='Recommended'?ic('check'):''}${b.verdict}</span></div>
  <p>${b.take}</p>${b.flags.length?`<span class="label">Recent controversies</span><ul class="bd-flags">${b.flags.map(f=>`<li>${f}</li>`).join('')}</ul>`:'<p class="d">No recent controversies found.</p>'}
  <p class="d">Community breakdowns reflect DGG members' views, not official endorsements.</p></div>`;
}
V.ballot=u=>{
 const show=!isV(u)||u.lookups?.ballot;
 const top=head('Sample Ballot',show?`Sample ballot for ${USER.precinct}, Nov 3, 2026 general election. Tap a candidate for their background; tap ${ic('info').replace('<svg','<svg style="width:15px;vertical-align:-2px"')} for the DGG community breakdown.`:'Enter your address to see the races and issues on your ballot.','<span class="sample">Sample data</span>');
 if(!show)return top+`<section class="panel"><div class="panel-h"><h2>Find your ballot</h2></div><div class="panel-b">${T_locform(u).replace('hx-post="/dash/location"','hx-post="/ballot/lookup"').replace('Get info','See my ballot')}</div></section>`;
 return `${top}<div class="ballot-legend">${['Federal','State','Judicial','Local'].map(k=>`<span class="chip ${KIND_CHIP[k]}">${BALLOT.filter(r=>r.kind===k).length} ${k}</span>`).join('')}<span class="chip ${KIND_CHIP.Issues}">${ISSUES.length} issues</span></div>
 <div class="ballot">${BALLOT.map((r,i)=>`<section class="panel kc-${KIND_CHIP[r.kind]}">${ph(r.race,`<span class="chip ${KIND_CHIP[r.kind]}">${r.kind}</span><span class="label">${r.vote}</span>${pinBtn(u,'race:'+i)}`)}<div class="rows">${r.cands.map(c=>T_candidate(c,false)).join('')}</div></section>`).join('')}
 ${ISSUES.map(([t,a,b,level])=>`<section class="panel kc-${KIND_CHIP[level]}">${ph(t,`<span class="chip ${KIND_CHIP[level]}">${level}</span>`)}<div class="panel-b"><p style="margin:0 0 8px">${a}</p><p style="margin:0;color:var(--muted);font-size:14px">${b}</p></div></section>`).join('')}</div>`;
};
