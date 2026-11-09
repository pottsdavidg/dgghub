/* Regions (list + region detail): view. */
V.regions=()=>T_public('regions',`${T_pubhero('Regions','Find your <span>squad</span>','Members organize through five regional squads. Each squad runs local events, canvasses, and news dispatches, then joins national mobilizations.')}
 <div class="pubwrap pubbody"><div class="regiongrid">${REGIONS.map(r=>`<button class="regioncard" hx-get="/site/regions/${r.slug}" hx-target="#root" hx-swap="innerHTML show:window:top"><span class="label">${r.slug==='international'?'Worldwide':r.states.length+' states'}</span><h2>${r.name}</h2><p>${r.tag}</p>
  <div class="rmeta">${r.team.length?`<span class="chip">${r.team.length} leads & organizers</span>`:''}${r.cities.slice(0,3).map(c=>`<span class="chip blue">${c}</span>`).join('')}</div>${arrow()}</button>`).join('')}</div></div>`);

V.region=(u,q,slug)=>{const r=REGIONS.find(x=>x.slug===slug)||REGIONS[0];
 return T_public('regions',`${T_pubhero(r.slug==='international'?'International Squad':r.name+' Region',r.name,r.tag,`<div class="herobtns"><a class="btn" href="${DISCORD_URL}" target="_blank" rel="noopener">${ic('chat')}Join #${r.slug} on Discord</a>${r.next?`<a class="btn ghosty" href="${r.next[1]}" target="_blank" rel="noopener">${r.next[0]}</a>`:''}</div>`)}
 <div class="pubwrap pubbody">
  <button class="crumb" hx-get="/site/regions" hx-target="#root">${ic('back')}All regions</button>
  <div class="grid g3">
   <section class="panel span2"><div class="panel-h"><h2>${r.slug==='international'?'Who we are':'States covered'}</h2><span class="label">${r.slug==='international'?'Worldwide':r.states.length+' states'}</span></div><div class="panel-b"><div class="statechips">${r.states.map(s=>`<span class="chip">${s}</span>`).join('')}</div></div></section>
   <section class="panel"><div class="panel-h"><h2>Contact</h2></div><div class="panel-b" style="display:flex;flex-direction:column;gap:10px">
    <div class="contact"><span class="mono">info@digitalgroundgame.org</span><button class="btn sm ghost" data-copy="info@digitalgroundgame.org">Copy</button></div>
    <a class="btn sm" href="${r.ig}" target="_blank" rel="noopener">${r.ig.includes('.'+r.slug)?r.name+' Instagram':'DGG Instagram'}</a>
    <a class="btn sm discordbtn" href="${DISCORD_URL}" target="_blank" rel="noopener">${ic('chat')}Discord</a></div></section>
  </div>
  ${r.team.length?`<section class="panel"><div class="panel-h"><h2>Regional team</h2><span class="label">${r.team.length} people</span></div><div class="leadgrid">${r.team.map(([n,role])=>`<div class="leadcard"><div class="avatar" style="background:var(--blue)">${n.replace(/[^A-Za-z ]/g,'').split(' ').filter(Boolean).map(x=>x[0]).join('').slice(0,2)}</div><div><b>${n}</b><span>${role}</span></div></div>`).join('')}</div></section>`:''}
  <div class="grid g2">
   ${r.cities.length?`<section class="panel"><div class="panel-h"><h2>Cities & chapters</h2></div><div class="rows">${r.cities.map(c=>`<div class="row" style="grid-template-columns:auto 1fr"><span class="ic red">${ic('pin')}</span><span class="t">${c}</span></div>`).join('')}</div></section>`:''}
   <section class="panel" ${r.cities.length?'':'style="grid-column:1/-1"'}><div class="panel-h"><h2>What's happening</h2></div><div class="rows">${r.notes.map(([t,d])=>`<div class="row" style="grid-template-columns:1fr"><span><span class="t">${t}</span><br><span class="d">${d}</span></span></div>`).join('')}</div></section>
  </div>
 </div>`)};
