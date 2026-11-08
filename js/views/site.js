const T_pubhero=(eyebrow,title,sub,extra='')=>`<section class="pubhero patwrap tilebg"><div class="pubwrap"><span class="label" style="color:#fff">${eyebrow}</span><h1>${title}</h1>${sub?`<p>${sub}</p>`:''}${extra}</div></section>`;

V.about=()=>T_public('about',`${T_pubhero('About us','Vote loud, <span>lead louder</span>',ABOUT.mission,`<div class="herobtns"><a class="btn" href="${DISCORD_URL}" target="_blank" rel="noopener">${ic('chat')}Become a volunteer</a><button class="btn ghosty" hx-get="/site/regions" hx-target="#root">Find your region</button></div>`)}
 <div class="pubwrap pubbody">
  <section class="pubsplit"><div><h2 class="pubh">What we stand for</h2><p class="lead-p">${ABOUT.values}</p><p class="lead-p">${ABOUT.model}</p></div>
   <div class="grid g3 statrow">${ABOUT.stats.map(([v,l,s])=>`<div class="panel stat"><span class="v tab-nums">${v}</span><span class="label">${l}</span><span class="s">${s}</span></div>`).join('')}</div></section>
  <section><h2 class="pubh">Our accomplishments</h2><div class="wins">${ABOUT.wins.map(([v,t])=>`<div class="win"><b class="tab-nums">${v}</b><span>${t}</span></div>`).join('')}</div></section>
  <section><h2 class="pubh">Our teams</h2><div class="teamgrid">${TEAM_ORDER.map(k=>{const T=TEAMS[k];return `<div class="teamcard" style="--team:${T.c}"><div class="teamicon">${ic(T.icon)}</div><div><h3>${T.n}</h3><div class="tsub">${T.sub}</div><p>${T.d}</p></div></div>`}).join('')}</div></section>
  <section class="benefits"><h2 class="pubh" style="color:var(--red)">What you will gain</h2><div class="grid g3">${ABOUT.benefits.map(([t,d],i)=>`<div class="benefit">${ic(['track','star','search'][i])}<b>${t}</b><span>${d}</span></div>`).join('')}</div></section>
  <section class="joinband"><div><h2>Ready to get in the ground game?</h2><p>Join thousands of volunteers on Discord, or get updates by email first.</p></div><div class="herobtns"><a class="btn discordbtn" href="${DISCORD_URL}" target="_blank" rel="noopener">${ic('chat')}Join Discord</a><button class="btn" hx-get="/site/mailing-list" hx-target="#root">Join the mailing list</button></div></section>
 </div>`);

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

const T_mail_form=(done,email)=>done?`<div class="mailbox" id="mailbox"><span class="chip green" style="align-self:flex-start">${ic('check')}You're on the list</span><h2>Thanks for signing up.</h2><p>We'll send updates to <b>${esc(email)}</b>. You can unsubscribe anytime from any email.</p><button class="btn sm ghost" style="align-self:flex-start" hx-get="/site/mailing-list/form" hx-target="#mailbox" hx-swap="outerHTML">Sign up another email</button></div>`
 :`<form class="mailbox" id="mailbox" hx-post="/site/mailing-list" hx-target="#mailbox" hx-swap="outerHTML">
  <div class="grid g2" style="gap:14px"><div class="field"><label class="label" for="ml-first">First name</label><input id="ml-first" name="first" autocomplete="given-name"></div><div class="field"><label class="label" for="ml-zip">ZIP code</label><input id="ml-zip" name="zip" inputmode="numeric" autocomplete="postal-code"></div></div>
  <div class="field"><label class="label" for="ml-email">Email</label><input id="ml-email" name="email" type="email" required autocomplete="email" placeholder="you@example.com"></div>
  <div class="field"><label class="label" for="ml-region">Your region</label><select id="ml-region" name="region"><option value="">Choose a region</option>${REGIONS.map(r=>`<option value="${r.slug}">${r.name}</option>`).join('')}</select></div>
  <fieldset class="field" style="border:0;padding:0;margin:0"><legend class="label" style="margin-bottom:8px">Send me</legend><div class="checks">${[['cta','Calls to action'],['events','Events near me'],['dispatch','Regional news dispatches']].map(([k,l])=>`<label class="checkrow"><input type="checkbox" name="topic_${k}" checked>${l}</label>`).join('')}</div></fieldset>
  <button class="btn primary block" type="submit">Join the mailing list</button>
  <p class="demo-note" style="margin:0">Prototype: signups aren't sent anywhere yet. In production this form posts to your email provider.</p>
 </form>`;
V.mailing=()=>T_public('mail',`${T_pubhero('Mailing list','Stay in the <span>loop</span>','Get calls to action, event announcements, and regional news from Digital Ground Game in your inbox.')}
 <div class="pubwrap pubbody"><div class="pubsplit">
  <div><h2 class="pubh">What you'll get</h2><div class="rows panel">${[['bell','Calls to action','Our latest asks, like canvasses, phone banks, and poll-watching drives.'],['cal','Events','Canvassing weekends, workshops, and squad meetups in your region.'],['doc','Regional dispatches','News and wins from your region\'s squad.']].map(([i,t,d])=>`<div class="row" style="grid-template-columns:auto 1fr"><span class="ic">${ic(i)}</span><span><span class="t">${t}</span><br><span class="d">${d}</span></span></div>`).join('')}</div>
   <p class="lead-p" style="margin-top:16px">Want to talk with organizers in real time? <a href="${DISCORD_URL}" target="_blank" rel="noopener">Join the Discord.</a></p></div>
  ${T_mail_form(false)}
 </div></div>`);
