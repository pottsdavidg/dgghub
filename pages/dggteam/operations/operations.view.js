/* Operations: view. */
function T_op_detail(op){
 const pct=Math.min(100,Math.round(op.signed/op.goal*100));
 return `<div id="op-detail" class="opdetail">
  <div class="ophead"><div><span class="chip ${op.cls}">${op.status}</span><h2>${op.name}</h2><span class="d">${op.dates} · ${op.where} · Lead: ${op.lead}</span></div>
   <div class="opgoal"><span class="label">Volunteers</span><b class="disp tab-nums">${op.signed}<small>/${op.goal}</small></b><div class="bar" style="height:10px"><i style="width:${pct}%;background:${pct>=100?'var(--green)':'var(--blue)'}"></i></div></div></div>
  <div class="grid g2">
   <section class="panel">${ph('Roles needed')}<div class="rows">${op.roles.map(([r,need,have])=>`<div class="row" style="grid-template-columns:1fr 140px"><span class="t" style="font-size:15px">${r}</span><span style="display:flex;flex-direction:column;gap:4px"><span class="mono d" style="text-align:right">${have}/${need}</span><span class="bar"><i style="width:${Math.min(100,have/need*100)}%;background:${have>=need?'var(--green)':'var(--blue)'}"></i></span></span></div>`).join('')}</div></section>
   <section class="panel">${ph('Logistics checklist',`<span class="label">${op.checklist.filter(c=>c[1]).length}/${op.checklist.length}</span>`)}<div class="rows">${op.checklist.map(([c,done],i)=>`<div class="row" style="grid-template-columns:auto 1fr"><button class="chk" role="checkbox" aria-checked="${done}" aria-label="${esc(c)}" hx-post="/ops/${op.id}/check/${i}" hx-target="#op-detail" hx-swap="outerHTML">${done?ic('check'):''}</button><span style="${done?'text-decoration:line-through;color:var(--muted)':''}">${c}</span></div>`).join('')}</div></section>
  </div>
  ${op.shifts.length?`<section class="panel">${ph('Shifts','<span class="label">Claim a shift</span>')}<div class="tbl-wrap"><table><thead><tr><th>Day</th><th>Time</th><th>Staging site</th><th>Filled</th><th></th></tr></thead><tbody>${op.shifts.map(([d,t,w,need,have,mine],i)=>`<tr><td style="white-space:nowrap">${d}</td><td style="white-space:nowrap">${t}</td><td>${w}</td><td style="min-width:120px"><span class="mono d">${have}/${need}</span><div class="bar"><i style="width:${have/need*100}%;background:var(--blue)"></i></div></td><td>${mine?`<button class="btn sm ghost" hx-post="/ops/${op.id}/shift/${i}" hx-target="#op-detail" hx-swap="outerHTML">${ic('check')}You're in · drop</button>`:`<button class="btn sm primary" ${have>=need?'disabled':''} hx-post="/ops/${op.id}/shift/${i}" hx-target="#op-detail" hx-swap="outerHTML">Claim shift</button>`}</td></tr>`).join('')}</tbody></table></div></section>`:''}
  ${op.turf.length?`<section class="panel">${ph('Turf packets')}<div class="tbl-wrap"><table><thead><tr><th>Packet</th><th>Area</th><th>Doors</th><th>Status</th></tr></thead><tbody>${op.turf.map(([id,a,doors,st])=>`<tr><td class="mono">${id}</td><td>${a}</td><td class="tab-nums">${doors||'—'}</td><td><span class="chip ${st==='Assigned'?'green':st==='Open'?'blue':''}">${st}</span></td></tr>`).join('')}</tbody></table></div></section>`:''}
 </div>`;
}

V.ops=(u,q)=>{const sel=OPERATIONS.find(o=>o.id===q.op)||OPERATIONS[0];
 return `${head('Operations','Plan and staff mass canvasses and events: volunteers, shifts, logistics, and turf.',`<button class="btn primary" ${act('Would open the new operation form')}>${ic('plus')}New operation</button>`)}
 <div class="opslayout"><div class="oplist">${OPERATIONS.map(o=>`<button class="opcard" aria-current="${o.id===sel.id}" ${nav('ops','?op='+o.id)}><span class="chip ${o.cls}" style="align-self:flex-start">${o.status}</span><b>${o.name}</b><span class="d">${o.dates}</span><span class="d">${o.where}</span><div class="bar"><i style="width:${Math.min(100,o.signed/o.goal*100)}%;background:${o.signed>=o.goal?'var(--green)':'var(--blue)'}"></i></div><span class="mono d">${o.signed}/${o.goal} volunteers</span></button>`).join('')}</div>
 ${T_op_detail(sel)}</div>`;
};
