/* ---------- settings ---------- */
const T_theme_seg=t=>`<div class="freqseg" id="theme-seg" role="group" aria-label="Theme">${[['light','Light',ic('sun')],['dark','Dark',ic('moon')],['system','Match my device','']].map(([k,l,i])=>`<button aria-pressed="${t===k}" hx-post="/settings/theme" ${vals({theme:k})} hx-target="#theme-seg" hx-swap="outerHTML">${i}${l}</button>`).join('')}</div>`;
V.settings=u=>`${head('Settings','Manage your profile, location, team, and pop-ups.')}
 <section class="panel">${ph('Account status',`<span class="chip blue">${ACCOUNT_LABEL[u.account]}</span>`)}<div class="panel-b" style="display:flex;flex-direction:column;gap:14px">
  ${isMember(u)?`<div class="teamrow"><div class="teamicon" style="--team:${TEAMS[u.team].c}">${ic(TEAMS[u.team].icon)}</div><div style="flex:1;min-width:200px"><b style="font:700 18px var(--head)">${TEAMS[u.team].n}</b><br><span style="color:var(--muted)">${TEAMS[u.team].sub}</span></div><button class="btn sm ghost" ${nav('join')}>Switch teams</button><button class="btn sm ghost" hx-post="/settings/leave-team" hx-target="#root">Leave team</button></div>`
  :`<div class="teamrow"><div style="flex:1;min-width:200px"><b style="font:700 18px var(--head)">You're not on a team yet</b><br><span style="color:var(--muted)">Join a team to unlock the Democracy Lab, tasks, inbox, and operations.</span></div><button class="btn primary" ${nav('join')}>Join a team</button></div>`}
 </div></section>
 <section class="panel">${ph('Presentation mode','<span class="label">Demo only</span>')}<div class="panel-b" style="display:flex;flex-direction:column;gap:10px"><span class="d">Preview the hub at each access level without signing out.</span>
  <div class="freqseg" role="group" aria-label="View as">${[['visitor','Visitor (no account)'],['account','Account'],['member','Team member']].map(([k,l])=>`<button aria-pressed="${u.account===k}" hx-post="/settings/viewas" ${vals({as:k})} hx-target="#root">${l}</button>`).join('')}</div></div></section>
 <section class="panel">${ph('Profile')}<form class="panel-b grid g3" style="align-items:end" hx-post="/settings/profile" hx-swap="none">
  <div class="field"><label class="label" for="s-name">Full name</label><input id="s-name" name="name" value="${esc(u.name)}"></div>
  <div class="field"><label class="label" for="s-email">Email</label><input id="s-email" name="email" type="email" value="${esc(u.email)}"></div>
  <button class="btn primary" type="submit" style="justify-self:start">Save profile</button></form></section>
 <section class="panel">${ph('Location','<span class="label">Used for your ballot, representatives, and dates</span>')}<div class="panel-b">${T_locform(u,true).replace('Get info','Save location')}</div></section>
 <section class="panel">${ph('Appearance')}<div class="panel-b">${T_theme_seg(u.theme)}</div></section>
 <section class="panel">${ph('Pop-ups')}<form class="panel-b checks" hx-post="/settings/prompts" hx-trigger="change" hx-swap="none">
  <label class="checkrow"><input type="checkbox" name="team" ${u.noTeamPrompts?'':'checked'} ${isMember(u)?'disabled':''}>Remind me about joining a DGG team</label>
 </form></section>
 <section class="panel panel-b" style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"><div><b style="font:700 17px var(--head)">Support Digital Ground Game</b><br><span style="color:var(--muted)">Donations go through ActBlue and keep the hub free.</span></div><div style="display:flex;gap:8px;flex-wrap:wrap"><a class="btn red" href="${DONATE_URL}" target="_blank" rel="noopener">${ic('heart')}Donate</a><button class="btn ghost" hx-post="/auth/signout" hx-target="#root">${ic('logout')}Sign out</button></div></section>`;
