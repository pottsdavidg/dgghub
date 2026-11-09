/* ---------- election data (future feature preview) ---------- */
function T_evmap(mode,picks){
 const col=st=>mode==='2024'?(RESULTS_2024_D.has(st)?'D':'R'):(picks[st]||'T');
 const tot={D:0,R:0,T:0};EV_TILES.forEach(([st,,,ev])=>tot[col(st)]+=ev);
 const W=12*58,H=8*58;
 return `<div id="evmap" class="evwrap">
  <div class="evbar"><div class="evD" style="width:${tot.D/5.38}%"><b class="tab-nums">${tot.D}</b>${mode==='2024'?'Harris':'Dem'}</div><div class="evT" style="width:${tot.T/5.38}%">${tot.T?`<b class="tab-nums">${tot.T}</b>`:''}</div><div class="evR" style="width:${tot.R/5.38}%"><b class="tab-nums">${tot.R}</b>${mode==='2024'?'Trump':'Rep'}</div><i class="ev270" aria-hidden="true"></i></div>
  <div class="evmid"><span class="label">270 to win</span></div>
  <div class="tbl-wrap"><svg class="evsvg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Electoral map: Democrats ${tot.D}, Republicans ${tot.R}${tot.T?', undecided '+tot.T:''}">
   ${EV_TILES.map(([st,c,r,ev])=>{const k=col(st);return `<g class="evtile ${k}" ${mode==='build'?`hx-post="/elections/flip" ${vals({st})} hx-target="#evmap" hx-swap="outerHTML" role="button" tabindex="0" aria-label="${STATE_BY[st][1]}, ${ev} votes"`:''}><rect x="${c*58+3}" y="${r*58+3}" width="52" height="52" rx="3"/><text x="${c*58+29}" y="${r*58+27}" text-anchor="middle" class="evst">${st}</text><text x="${c*58+29}" y="${r*58+44}" text-anchor="middle" class="evn">${ev}</text></g>`}).join('')}
  </svg></div>
  <p class="demo-note" style="margin:0">${mode==='2024'?'2024 presidential results. Maine (3–1) and Nebraska (4–1) split their electoral votes; tiles show the statewide winner.':'Click a state to cycle it: undecided → Democrat → Republican.'}</p></div>`;
}
V.elections=(u,q)=>{const mode=q.mode==='build'?'build':'2024';
 return `${head('Election Data','Maps and results from past elections, plus a build-your-own map for 2028.','<span class="chip yel">Preview · future feature</span>')}
 <div class="tabs" role="tablist"><button role="tab" aria-selected="${mode==='2024'}" ${nav('elections','?mode=2024')}>2024 results</button><button role="tab" aria-selected="${mode==='build'}" ${nav('elections','?mode=build')}>Build your 2028 map</button>${mode==='build'?`<button class="btn sm ghost" style="margin-left:auto;align-self:center" hx-post="/elections/reset" hx-target="#evmap" hx-swap="outerHTML">Reset map</button>`:''}</div>
 <section class="panel panel-b">${T_evmap(mode,SESSION.mapPicks||{})}</section>
 <section class="panel panel-b"><b>Coming soon:</b> House, Senate, and governor results by state and district, past turnout by county, and side-by-side comparisons of the last five elections.</section>`;
};
