/* Election model: forecast is computed server-side from the slider values */
function T_forecast(raceId,turnout,swing){
 const r=RACES.find(x=>x.id===raceId)||RACES[0],adj=turnout*0.45+swing*2.2;
 const pts=r.trend.map((v,i)=>i===r.trend.length-1?Math.min(99,Math.max(1,v+adj)):v),fin=pts[pts.length-1],[rt,c]=rateOf(fin);
 const W=600,H=230,L=40,R=16,T=12,B=28,iw=W-L-R,ih=H-T-B,x=i=>L+i*iw/(pts.length-1),y=v=>T+ih-(v-20)/60*ih;
 const line=pts.map((v,i)=>`${i?'L':'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(''),area=line+`L${x(pts.length-1)},${y(20)}L${x(0)},${y(20)}Z`;
 const sg=v=>(v>0?'+':'')+v;
 return `<section class="panel span2" id="forecast"><div class="panel-h"><h2>${r.name}</h2><span class="chip ${c}">${rt}</span></div><div class="panel-b" style="display:flex;flex-direction:column;gap:16px">
  <div class="prob"><div style="width:${fin}%;background:var(--blue)">DEM ${fin.toFixed(1)}%</div><div style="width:${100-fin}%;background:var(--red);justify-content:flex-end">${(100-fin).toFixed(1)}% REP</div></div>
  <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block" role="img" aria-label="Win probability trend ending at ${fin.toFixed(1)} percent">
   ${[20,35,50,65,80].map(t=>`<line x1="${L}" x2="${W-R}" y1="${y(t)}" y2="${y(t)}" stroke="var(--line)" ${t===50?'stroke-dasharray="4 4" stroke-width="1.5"':''}/><text x="${L-8}" y="${y(t)+4}" text-anchor="end" font-size="11" fill="var(--muted)" font-family="Roboto Mono, monospace">${t}%</text>`).join('')}
   <path d="${area}" fill="var(--blue)" opacity=".12"/><path d="${line}" fill="none" stroke="var(--blue)" stroke-width="3" stroke-linejoin="round"/>
   <circle cx="${x(pts.length-1)}" cy="${y(fin)}" r="6" fill="var(--blue)" stroke="var(--surface)" stroke-width="2"/>
   ${pts.map((_,i)=>i%2===0?`<text x="${x(i)}" y="${H-8}" text-anchor="middle" font-size="11" fill="var(--muted)" font-family="Roboto Mono, monospace">Wk ${i+1}</text>`:'').join('')}
  </svg>
  <div class="grid g3" style="gap:10px">
   <div class="panel stat" style="padding:12px 14px"><span class="label">Democrat</span><span style="font:700 15px var(--head)">${r.dem}</span></div>
   <div class="panel stat" style="padding:12px 14px"><span class="label">Republican</span><span style="font:700 15px var(--head)">${r.rep}</span></div>
   <div class="panel stat" style="padding:12px 14px"><span class="label">DGG voter contacts</span><span class="tab-nums" style="font:700 15px var(--head)">${r.contacts}</span></div>
  </div>
  <p style="margin:0;font-size:14px;color:var(--muted)">Scenario: turnout ${sg(turnout)} pts vs. 2022, late swing ${sg(swing)} pts. The model blends polling, early vote returns, and DGG canvass contact data. The what-if sliders adjust this week only.</p>
 </div></section>`;
}
V.model=(u,q)=>{const race=q.race||'oh7';
 const inner=`${modbar('Election Model','model.digitalgroundgame.org')}
 <div class="grid g3">
  <section class="panel"><div class="panel-h"><h2>Races</h2><span class="label">${RACES.length} tracked</span></div><div class="rows">${RACES.map(r=>{const p=r.trend[r.trend.length-1],[rt,c]=rateOf(p);return `<button class="row" ${nav('model','?race='+r.id)} style="grid-template-columns:1fr auto;${race===r.id?'background:var(--blueSoft)':''}"><span style="min-width:0"><span class="t" style="font-size:15px">${r.name}</span><br><span class="chip ${c}" style="margin-top:4px">${rt}</span></span><span class="mono tab-nums" style="font-size:14px">${p.toFixed(1)}%</span></button>`}).join('')}</div>
   <form class="panel-b" style="display:flex;flex-direction:column;gap:16px;border-top:1px solid var(--line)" hx-get="/model/forecast" hx-trigger="input delay:100ms" hx-target="#forecast" hx-swap="outerHTML">
    <input type="hidden" name="race" value="${race}"><span class="label">What-if scenario</span>
    <div class="slider"><div class="top"><label for="turnout">Turnout vs. 2022</label></div><input type="range" id="turnout" name="turnout" min="-10" max="10" value="0"></div>
    <div class="slider"><div class="top"><label for="swing">Late swing toward Dems</label></div><input type="range" id="swing" name="swing" min="-5" max="5" step="0.5" value="0"></div>
    <button class="btn sm ghost" type="button" style="align-self:flex-start" ${nav('model','?race='+race)}>Reset</button>
   </form></section>
  ${T_forecast(race,0,0)}
 </div>`;
 return `${head('Election Model','Race forecasts built on DGG canvassing data and in-house turnout modeling.','<span class="sample">Sample forecasts</span>')}${gate(u,'Election Model',inner)}`};

const _model=V.model;
V.model=(u,q)=>_model(u,q);
