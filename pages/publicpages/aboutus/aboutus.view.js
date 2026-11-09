/* About us: view. */
V.about=()=>T_public('about',`${T_pubhero('About us','Vote loud, <span>lead louder</span>',ABOUT.mission,`<div class="herobtns"><a class="btn" href="${DISCORD_URL}" target="_blank" rel="noopener">${ic('chat')}Become a volunteer</a><button class="btn ghosty" hx-get="/site/regions" hx-target="#root">Find your region</button></div>`)}
 <div class="pubwrap pubbody">
  <section class="pubsplit"><div><h2 class="pubh">What we stand for</h2><p class="lead-p">${ABOUT.values}</p><p class="lead-p">${ABOUT.model}</p></div>
   <div class="grid g3 statrow">${ABOUT.stats.map(([v,l,s])=>`<div class="panel stat"><span class="v tab-nums">${v}</span><span class="label">${l}</span><span class="s">${s}</span></div>`).join('')}</div></section>
  <section><h2 class="pubh">Our accomplishments</h2><div class="wins">${ABOUT.wins.map(([v,t])=>`<div class="win"><b class="tab-nums">${v}</b><span>${t}</span></div>`).join('')}</div></section>
  <section><h2 class="pubh">Our teams</h2><div class="teamgrid">${TEAM_ORDER.map(k=>{const T=TEAMS[k];return `<div class="teamcard" style="--team:${T.c}"><div class="teamicon">${ic(T.icon)}</div><div><h3>${T.n}</h3><div class="tsub">${T.sub}</div><p>${T.d}</p></div></div>`}).join('')}</div></section>
  <section class="benefits"><h2 class="pubh" style="color:var(--red)">What you will gain</h2><div class="grid g3">${ABOUT.benefits.map(([t,d],i)=>`<div class="benefit">${ic(['track','star','search'][i])}<b>${t}</b><span>${d}</span></div>`).join('')}</div></section>
  <section class="joinband"><div><h2>Ready to get in the ground game?</h2><p>Join thousands of volunteers on Discord, or get updates by email first.</p></div><div class="herobtns"><a class="btn discordbtn" href="${DISCORD_URL}" target="_blank" rel="noopener">${ic('chat')}Join Discord</a><button class="btn" hx-get="/site/mailing-list" hx-target="#root">Join the mailing list</button></div></section>
 </div>`);
