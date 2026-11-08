const RX_F=[['all','All'],['Creator','Creators'],['Politician','Officials & candidates']];
const T_rx_list=(f,q)=>{const s=(q||'').toLowerCase(),rc={Partner:'green',Warm:'blue',Cold:''},list=ROLODEX.filter(r=>(f==='all'||(f==='Creator'?r.type==='Creator':r.type!=='Creator'))&&(!s||(r.n+r.what+r.topic+r.poc).toLowerCase().includes(s)));
 return `<section class="panel" id="rx-list"><input type="hidden" id="rx-f" name="filter" value="${f}"><div class="tbl-wrap"><table><thead><tr><th>Name</th><th>Type</th><th>Focus</th><th>Relationship</th><th>Last contact</th><th>DGG point of contact</th><th></th></tr></thead><tbody>
 ${list.map(r=>`<tr><td style="min-width:220px"><div style="display:flex;gap:10px;align-items:center"><div class="avatar" style="background:${r.type==='Creator'?'var(--blue)':'var(--black)'}">${r.ini}</div><div><b>${r.n}</b><br><span style="font-size:13px;color:var(--muted)">${r.what}</span></div></div></td><td><span class="chip ${r.type==='Creator'?'blue':''}">${r.type}</span></td><td style="min-width:150px">${r.topic}<br><span style="font-size:13px;color:var(--muted)">${r.where}</span></td><td><span class="chip ${rc[r.rel]}">${r.rel}</span></td><td class="tab-nums" style="white-space:nowrap">${r.last}</td><td style="min-width:160px"><b>${r.poc}</b><br><span style="font-size:13px;color:var(--muted)">${r.pocRole}</span></td><td><button class="btn sm" ${act('Intro request sent to '+r.poc+', who manages the relationship with '+r.n)}>Request intro</button></td></tr>`).join('')||'<tr><td colspan="7" style="color:var(--muted)">No contacts match that search.</td></tr>'}
 </tbody></table></div></section>`};
const T_rx_filters=(f,oob)=>`<div class="filters" id="rx-filters" ${oob?'hx-swap-oob="true"':''}>${RX_F.map(([k,l])=>`<button class="fbtn" aria-pressed="${f===k}" hx-get="/rolodex/list?filter=${k}" hx-include="#rxq" hx-target="#rx-list" hx-swap="outerHTML">${l}</button>`).join('')}</div>`;
V.rolodex=(u,q)=>`${head('Rolodex','Political creators and officials we have relationships with, and the DGG member who owns each relationship.','<span class="sample">Sample contacts</span>')}
 ${gate(u,'Rolodex',`<div class="grid g4">
  <div class="panel stat"><span class="label">Contacts</span><span class="v tab-nums">${ROLODEX.length}</span><span class="s">Across 4 states and DC</span></div>
  <div class="panel stat"><span class="label">Creators</span><span class="v tab-nums">${ROLODEX.filter(r=>r.type==='Creator').length}</span><span class="s">Combined reach 4.3M</span></div>
  <div class="panel stat"><span class="label">Officials & candidates</span><span class="v tab-nums">${ROLODEX.filter(r=>r.type!=='Creator').length}</span><span class="s">Federal, state, and local</span></div>
  <div class="panel stat"><span class="label">Active partners</span><span class="v ok tab-nums">${ROLODEX.filter(r=>r.rel==='Partner').length}</span><span class="s">Co-hosted events this cycle</span></div>
 </div>
 <div class="filters">${T_rx_filters('all')}<label class="search" style="margin-left:auto;max-width:300px;display:flex">${ic('search')}<input id="rxq" name="q" placeholder="Search names, topics, contacts" aria-label="Search the Rolodex" hx-get="/rolodex/list" hx-trigger="keyup changed delay:250ms, search" hx-include="#rx-f" hx-target="#rx-list" hx-swap="outerHTML"></label></div>
 ${T_rx_list('all','')}
 <p class="demo-note" style="max-width:72ch">Direct contact details stay with each point of contact. Members request an introduction through them so every relationship has one owner.</p>`)}`;

const _rolodex=V.rolodex;
V.rolodex=(u,q)=>_rolodex(u,q);
