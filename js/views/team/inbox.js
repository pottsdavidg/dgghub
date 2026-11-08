/* ---------- inbox (member accounts) ---------- */
const KIND={direct:['Direct','blue'],team:['Team','green'],broadcast:['Announcement','red']};
const T_inbox_list=(f,sel)=>{const list=MESSAGES.filter(m=>f==='all'||m.kind===f);
 return `<div class="inlist" id="inlist"><div class="filters inbox-f">${[['all','All'],['direct','Direct'],['team','Team'],['broadcast','Announcements']].map(([k,l])=>`<button class="fbtn" aria-pressed="${f===k}" hx-get="/inbox/list?filter=${k}" hx-target="#inlist" hx-swap="outerHTML">${l}</button>`).join('')}</div>
 <div class="threads">${list.map(m=>`<button class="thread ${m.unread?'unread':''}" aria-current="${sel===m.id}" hx-get="/inbox/thread/${m.id}?filter=${f}" hx-target="#inbox-body" hx-swap="outerHTML"><div class="avatar av-sm" style="background:${m.c}">${m.ini}</div><span class="tmain"><span class="trow"><b>${m.from}</b><span class="ttime">${m.time}</span></span><span class="tsubj">${m.kind==='broadcast'?ic('mega2'):''}${m.subject}</span><span class="tprev">${m.body[0].replace(/^(Team,|Hey Jordan, |Hi Jordan, )/,'')}</span></span></button>`).join('')||'<p class="panel-b" style="color:var(--muted)">Nothing here yet.</p>'}</div></div>`};
const T_reader=m=>`<article class="reader"><div class="rhead"><div class="avatar" style="background:${m.c}">${m.ini}</div><div style="flex:1;min-width:0"><span class="chip ${KIND[m.kind][1]}">${KIND[m.kind][0]}</span><h2>${m.subject}</h2><span class="d"><b>${m.from}</b> · ${m.fromRole} · to ${m.to} · ${m.date}</span></div></div>
 <div class="rbody">${m.body.map(p=>`<p>${p}</p>`).join('')}</div>
 ${m.kind==='broadcast'?`<div class="rstats"><span class="chip">${ic('users')}Sent to 1,284 members</span><span class="chip green">${ic('check')}68% opened</span></div><div class="rreply"><span class="d">Announcements are one-way. Questions? Reply in the Discord.</span><a class="btn sm discordbtn" href="${DISCORD_URL}" target="_blank" rel="noopener">${ic('chat')}Open Discord</a></div>`
 :`<form class="rreply" hx-post="/actions/notify" ${vals({msg:'Reply sent to '+m.from})} hx-swap="none"><textarea name="reply" aria-label="Reply" placeholder="Reply to ${m.from}…"></textarea><button class="btn primary sm" type="submit">${ic('send')}Send</button></form>`}
</article>`;
const T_compose=()=>`<form class="reader compose" hx-post="/inbox/send" hx-target="#inbox-body" hx-swap="outerHTML">
 <div class="rhead"><div style="flex:1"><span class="label">New message</span><h2>Compose</h2></div></div>
 <div class="field"><label class="label" for="c-mode">Message type</label><div class="freqseg" role="radiogroup" id="c-mode">
  <label class="radioseg"><input type="radio" name="mode" value="direct" checked>Direct message</label>
  <label class="radioseg"><input type="radio" name="mode" value="broadcast">Mass announcement</label></div></div>
 <div class="field"><label class="label" for="c-to">To</label><select id="c-to" name="to">
  <optgroup label="People"><option>Lauren Pike · Media Team Lead</option><option>Alex Moreno · Columbus City Lead</option><option>Sam Ortega · Dev Team Lead</option><option>Jasmine Kim · Events Team Lead</option></optgroup>
  <optgroup label="Groups"><option>My team</option><option>Columbus chapter (412)</option></optgroup>
  <optgroup label="Leadership only"><option>Midwest Squad members</option><option>All Team Members</option><option>Everyone using the hub (1,284)</option></optgroup></select></div>
 <div class="field"><label class="label" for="c-subj">Subject</label><input id="c-subj" name="subject" placeholder="What's this about?"></div>
 <div class="field"><label class="label" for="c-body">Message</label><textarea id="c-body" name="body" rows="7" placeholder="Write your message…"></textarea></div>
 <p class="demo-note" style="margin:0">Mass announcements and "Leadership only" groups are limited to squad and national leads. Recipients also get an email and a Discord ping.</p>
 <div style="display:flex;gap:8px"><button class="btn primary" type="submit">${ic('send')}Send</button><button class="btn ghost" type="button" hx-get="/inbox/thread/m1" hx-target="#inbox-body" hx-swap="outerHTML">Cancel</button></div>
</form>`;
const T_inbox_body=(f,sel,compose)=>{const m=MESSAGES.find(x=>x.id===sel)||MESSAGES[0];
 return `<div class="inbox" id="inbox-body">${T_inbox_list(f,compose?null:m.id)}${compose?T_compose():T_reader(m)}</div>`};
V.inbox=(u,q)=>(MESSAGES[0].unread=false,'')+`${head('Inbox','Messages from teammates, your chapter, and DGG leadership.',`<button class="btn primary" hx-get="/inbox/compose" hx-target="#inbox-body" hx-swap="outerHTML">${ic('pen')}New message</button>`)}
 <div class="grid g4">
  <div class="panel stat"><span class="label">Unread</span><span class="v tab-nums" style="color:var(--red)">${MESSAGES.filter(m=>m.unread).length}</span><span class="s">Since your last visit</span></div>
  <div class="panel stat"><span class="label">Direct</span><span class="v tab-nums">${MESSAGES.filter(m=>m.kind==='direct').length}</span><span class="s">From other members</span></div>
  <div class="panel stat"><span class="label">Team</span><span class="v tab-nums">${MESSAGES.filter(m=>m.kind==='team').length}</span><span class="s">${u.team?TEAMS[u.team].n:'Your team'} channel</span></div>
  <div class="panel stat"><span class="label">Announcements</span><span class="v tab-nums">${MESSAGES.filter(m=>m.kind==='broadcast').length}</span><span class="s">From national and regional leads</span></div>
 </div>
 ${T_inbox_body('all','m1',false)}`;
