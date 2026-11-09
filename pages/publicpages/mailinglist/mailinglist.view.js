/* Mailing list: view. */
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
