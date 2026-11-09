/* ---------- local chapter ---------- */
const T_chapter_body=(state,sent)=>{
 const toggle=`<div class="viewas"><span>Preview</span><div class="seg" role="group" aria-label="Preview chapter state"><button aria-pressed="${state==='yes'}" hx-get="/chapter/body?state=yes" hx-target="#chapter-body" hx-swap="outerHTML">Chapter exists</button><button aria-pressed="${state==='no'}" hx-get="/chapter/body?state=no" hx-target="#chapter-body" hx-swap="outerHTML">No chapter yet</button></div></div>`;
 if(state==='no') return `<div id="chapter-body" style="display:flex;flex-direction:column;gap:24px">${head('Local Chapter','No Digital Ground Game chapter covers Lima, OH 45801 yet. The nearest one is Columbus, 78 miles away.',toggle)}
  <section class="nochap">
   <div class="pitch"><span class="label" style="color:#9a9ca6">Lima, Ohio</span><h2>Start the <span>Lima chapter</span></h2>
    <p style="margin:0;opacity:.9">City leads recruit volunteers, run canvasses and phone banks, and connect their town to the national ground game.</p>
    <ul>${['Training and a starter kit from the national team','Event tools, walk lists, and a chapter page','A regional organizer who checks in every two weeks','Leadership development you can put on a résumé'].map(x=>`<li>${ic('check')}${x}</li>`).join('')}</ul>
    <span class="d" style="font-size:13px;color:#b9bdd0">23 people near Lima have already joined DGG and would be your first members.</span></div>
   ${sent?`<div style="padding:28px;display:flex;flex-direction:column;gap:12px;justify-content:center"><span class="chip green" style="align-self:flex-start">${ic('check')}Application sent</span><h2 style="font:400 32px/1 var(--display)">Thanks, ${USER.first}.</h2><p style="margin:0;color:var(--muted)">A regional organizer will reach out within three days to set up an intro call. In the meantime, the Columbus chapter has invited you to its next meeting.</p><button class="btn sm" style="align-self:flex-start" hx-get="/chapter/body?state=no" hx-target="#chapter-body" hx-swap="outerHTML">Edit application</button></div>`
   :`<form hx-post="/chapter/apply" hx-target="#chapter-body" hx-swap="outerHTML"><span class="label">Apply to be a city lead</span>
    <div class="field"><label class="label" for="cl-name">Full name</label><input id="cl-name" name="name" value="${USER.name}"></div>
    <div class="field"><label class="label" for="cl-email">Email</label><input id="cl-email" name="email" type="email" value="jordan.ellis@example.org"></div>
    <div class="field"><label class="label" for="cl-city">City</label><input id="cl-city" name="city" value="Lima, OH"></div>
    <div class="field"><label class="label" for="cl-hours">Hours per week you can give</label><select id="cl-hours" name="hours"><option>2–4 hours</option><option selected>5–8 hours</option><option>9+ hours</option></select></div>
    <div class="field"><label class="label" for="cl-why">Why do you want to lead a chapter?</label><textarea id="cl-why" name="why" placeholder="Tell us about your community and any organizing experience"></textarea></div>
    <button class="btn red block" type="submit">Apply to start a chapter</button></form>`}
  </section></div>`;
 return `<div id="chapter-body" style="display:flex;flex-direction:column;gap:24px">${head('Columbus Chapter','Your nearest Digital Ground Game chapter, covering Franklin, Delaware, and Licking counties.',toggle)}
 <div class="grid g3">
  <section class="panel span2"><div class="panel-h"><h2>City lead</h2><span class="chip green">Active chapter</span></div><div class="panel-b lead">
   <div class="portrait">AM</div>
   <div style="display:flex;flex-direction:column;gap:10px;min-width:0"><div><h2>Alex Moreno</h2><span style="color:var(--muted)">Columbus City Lead · since March 2025</span></div>
    <div class="contact">${ic('doc').replace('<svg','<svg style="width:16px;height:16px;color:var(--muted)"')}<span class="mono">columbus@digitalgroundgame.org</span><button class="btn sm ghost" data-copy="columbus@digitalgroundgame.org">Copy</button></div>
    <div class="contact">${ic('phone').replace('<svg','<svg style="width:16px;height:16px;color:var(--muted)"')}<span class="mono tab-nums">(614) 555-0190</span></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn primary sm" ${act('Message sent to Alex. Expect a reply within a day or two.')}>Message Alex</button><button class="btn sm" ${act('You joined the Columbus chapter')}>Join chapter</button></div></div>
  </div></section>
  <section class="panel"><div class="panel-h"><h2>Chapter stats</h2></div><div class="panel-b"><div class="kv" style="grid-template-columns:1fr auto">
   <div class="k">Members</div><div class="v tab-nums">412</div><div class="k">Doors knocked, 2026</div><div class="v tab-nums">38,650</div>
   <div class="k">Calls made, 2026</div><div class="v tab-nums">21,300</div><div class="k">Events this month</div><div class="v tab-nums">9</div>
  </div></div></section>
 </div>
 <div class="grid g2">
  <section class="panel"><div class="panel-h"><h2>Next meetings</h2></div><div class="rows">
   <div class="row"><span class="ic">${ic('users')}</span><span><span class="t">Monthly chapter meeting</span><br><span class="d">Thu, Nov 5 · 7 p.m. · Columbus Metropolitan Library, Main Branch</span></span><button class="btn sm" ${act("You're on the RSVP list for the chapter meeting")}>RSVP</button></div>
   <div class="row"><span class="ic red">${ic('pin')}</span><span><span class="t">Canvass captain training</span><br><span class="d">Sat, Oct 31 · 9 a.m. · Goodale Park shelter house</span></span><span class="chip red">12 spots</span></div>
   <div class="row"><span class="ic yel">${ic('phone')}</span><span><span class="t">Election week debrief</span><br><span class="d">Thu, Nov 5 · 7 p.m. · Virtual</span></span><span class="chip">Open</span></div>
  </div></section>
  <section class="panel"><div class="panel-h"><h2>Chapter team</h2></div><div class="rows">
   ${[['JK','Jasmine Kim','Volunteer coordinator'],['TR','Tyler Reed','Canvass captain, Short North'],['OB','Omar Bashir','Data and turf lead'],['LP','Lauren Pike','Media and photos']].map(([i,n,r])=>`<div class="row" style="grid-template-columns:auto 1fr"><div class="avatar" style="background:var(--black)">${i}</div><span><span class="t">${n}</span><br><span class="d">${r}</span></span></div>`).join('')}
  </div></section>
 </div></div>`;
};
V.chapter=()=>T_chapter_body('yes',false);
