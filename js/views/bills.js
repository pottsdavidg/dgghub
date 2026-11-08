const DIFFS=[
 `<p><span class="sec">§2(a)</span>The Secretary shall award grants to eligible States for last-mile broadband deployment in counties where fewer than 80 percent of households have access to service of at least 100 megabits per second.</p><p><span class="sec">§3</span>Authorizes $4,000,000,000 for fiscal years 2027 through 2031.</p>`,
 `<p><span class="sec">§2(a)</span>The Secretary shall award grants to eligible States for last-mile broadband deployment in counties where fewer than <del>80</del> <ins>85</ins> percent of households have access to service of at least 100 megabits per second.</p><p><span class="sec">§2(c)</span><ins>A State receiving a grant shall publish a coverage map updated not less than twice per year.</ins></p><p><span class="sec">§3</span>Authorizes <del>$4,000,000,000</del> <ins>$3,200,000,000</ins> for fiscal years 2027 through 2031.</p>`,
 `<p><span class="sec">§2(a)</span>The Secretary shall award grants to eligible States for last-mile broadband deployment in counties where fewer than 85 percent of households have access to service of at least 100 megabits per second<ins>, with priority given to tribal lands</ins>.</p><p><span class="sec">§2(c)</span>A State receiving a grant shall publish a coverage map updated not less than twice per year.</p><p><span class="sec">§4(b)</span><del>Grantees may subcontract up to 100 percent of deployment.</del></p><p><span class="sec">§3</span>Authorizes $3,200,000,000 for fiscal years 2027 through 2031.</p>`];
const VERS=['Introduced · Feb 12','Committee substitute · Apr 3','Engrossed (passed House) · Oct 20'];
const T_bill_diff=(id,v)=>`<div id="diff-box" style="display:flex;flex-direction:column;gap:12px"><div class="tabs" role="tablist">${VERS.map((x,i)=>`<button role="tab" aria-selected="${v===i}" hx-get="/bills/${id}/diff?ver=${i}" hx-target="#diff-box" hx-swap="outerHTML">${x}</button>`).join('')}</div><div class="diff">${DIFFS[v]}</div></div>`;
const T_follow=b=>`<button class="btn ${b.follow?'':'primary'}" id="followbtn" hx-post="/bills/${b.id}/follow" hx-swap="outerHTML">${ic('bell')}${b.follow?'Following':'Follow bill'}</button>`;
V.bill=(u,q,id)=>{
 const b=findBill(id)||BILLS[0],sp=ALLREPS.find(r=>r.id===b.sponsor),tl=BILLTL[b.id]||DEFAULT_TL;
 return `${head(b.title,`${b.num} · ${b.lvl} · ${b.party?({D:'Introduced by Democrats',R:'Introduced by Republicans',B:'Bipartisan'})[b.party]:'Sponsor unknown'}`,pinBtn(CTX(),'bill:'+b.id),crumb('bills','Bills & Laws'))}
 <section class="panel"><div class="panel-b" style="display:flex;flex-direction:column;gap:14px"><p style="margin:0;max-width:75ch">${b.summary}</p>
  <div class="pipeline">${STAGES.map((s,i)=>`<div class="${i<b.stage?'on':i===b.stage?'cur':''}">${s}${i===b.stage?`<small>Current · ${b.updated}</small>`:''}</div>`).join('')}</div></div></section>
 <div class="grid g3">
  <section class="panel span2"><div class="panel-h"><h2>Text changes</h2><span class="label">${VERS.length} versions</span></div><div class="panel-b" style="display:flex;flex-direction:column;gap:12px">
   ${b.id==='hr2817'?T_bill_diff(b.id,2):`<p style="margin:0;color:var(--muted)">Version-by-version text changes will appear here once the live data connection is built.</p>`}
   <div style="display:flex;gap:14px;font-size:13px;color:var(--muted)"><span><ins style="background:var(--greenSoft);color:var(--green);text-decoration:none;padding:0 4px">added</ins> vs. previous version</span><span><del style="background:var(--redSoft);color:var(--red);padding:0 4px">removed</del></span></div>
  </div></section>
  <section class="panel"><div class="panel-h"><h2>Action history</h2></div><div class="panel-b"><div class="timeline">${tl.map(([w,t,c])=>`<div class="tl ${c}"><div class="when">${w}</div><div class="what">${t}</div></div>`).join('')}</div></div></section>
 </div>
 <section class="panel"><div class="panel-h"><h2>How your representatives voted</h2></div><div class="tbl-wrap"><table><thead><tr><th>Official</th><th>Office</th><th>Vote</th></tr></thead><tbody>
  <tr><td>Andre Coleman ${party('D')}</td><td>U.S. Representative, OH-3</td><td><span class="chip green">Yea</span></td></tr>
  <tr><td>Maria Delgado ${party('D')}</td><td>U.S. Senator</td><td><span class="chip">Pending</span></td></tr>
  <tr><td>Thomas Whitaker ${party('R')}</td><td>U.S. Senator</td><td><span class="chip">Pending</span></td></tr>
 </tbody></table></div></section>`;
};

/* ---------- bills & laws ---------- */
const defaultBillState=u=>(u.location&&STATE_BY[u.location.state]&&u.location.state!=='DC')?u.location.state:'OH';
const T_scopeseg=(u,scope,oob)=>`<div class="seg scopeseg" id="scopeseg" role="radiogroup" aria-label="Federal or state bills" ${oob?'hx-swap-oob="true"':''}>
   <label><input type="radio" name="scope" value="federal" ${scope==='federal'?'checked':''}>Federal</label>
   ${isV(u)?`<button type="button" class="lockedopt" hx-post="/prompt/account" ${vals({why:'statebills'})} hx-swap="none">${ic('lock')}My state</button>`
   :`<label class="stateopt"><input type="radio" name="scope" value="state" ${scope==='state'?'checked':''}>State</label><label class="sr" for="billst">Choose a state</label><select id="billst" name="st" class="statesel ${scope==='state'?'on':''}">${STATES.filter(x=>x[0]!=='DC').map(([c,n])=>`<option value="${c}" ${(u.billState||defaultBillState(u))===c?'selected':''}>${n}</option>`).join('')}</select>`}
  </div>`;
function T_bills_table(u,scope,q,limit){
 const st=u.billState||defaultBillState(u),s=(q||'').toLowerCase(),src=scope==='state'?billsForState(st):ALL_FED;
 const list=src.filter(b=>!s||(b.num+' '+b.title).toLowerCase().includes(s)).sort((a,b)=>b.ts-a.ts).slice(0,limit);
 const help=isV(u)?`hx-post="/prompt/account" ${vals({why:'contribute'})} hx-swap="none"`:isMember(u)?act('Would open the bill editor so you can fill in the missing details'):`hx-post="/prompt/team" ${vals({why:'contribute'})} hx-swap="none"`;
 return `<div id="bills-table"><div class="tbl-wrap"><table class="billtbl"><thead><tr><th style="width:44px"><span class="sr">Pin</span></th><th>Bill</th><th>Title</th><th>Progress</th><th>Introduced by</th></tr></thead><tbody>
 ${list.map(b=>`<tr><td>${flagBtn(u,'bill:'+b.id)}</td><td class="mono" style="white-space:nowrap;font-size:13px">${b.num}</td><td style="min-width:240px"><button class="linkbtn tlink" ${nav('bill/'+b.id)}>${b.title}</button><br><span class="d">Updated ${b.updated}</span></td>
  <td style="min-width:170px"><div style="display:flex;flex-direction:column;gap:6px"><span class="label" style="font-size:11px">${STAGES[b.stage]}</span>${pipe(b.stage)}</div></td>
  <td>${b.party?partyChip(b.party):`<button class="chip yel helpchip" ${help}>${ic('pen')}Missing · help fill in</button>`}</td></tr>`).join('')||'<tr><td colspan="5" style="color:var(--muted)">No bills match that search.</td></tr>'}
 </tbody></table></div><div class="tblfoot"><span class="d">Showing ${list.length} of ${src.length} ${scope==='state'?STATE_BY[st][1]:'federal'} bills, most recently updated first</span></div></div>`;
}
V.bills=(u,q)=>{u.billState=u.billState||defaultBillState(u);const scope=isV(u)?'federal':(q.scope==='state'?'state':'federal'),limit=[10,25,50].includes(+q.limit)?+q.limit:10;
 return `${head('Bills & Laws','Legislation sorted by latest activity. Flag a bill to pin it to your dashboard.','<span class="sample">Sample data</span>')}
 <form class="billctl" id="billctl" hx-get="/bills/table" hx-target="#bills-table" hx-swap="outerHTML" hx-trigger="change, keyup changed delay:250ms from:#billq, search from:#billq">
  <label class="search grow">${ic('search')}<input id="billq" name="q" type="search" value="${esc(q.q||'')}" placeholder="Search bills by number or title" aria-label="Search bills"></label>
  ${T_scopeseg(u,scope)}
  <label class="field inline"><span class="label">Show</span><select name="limit">${[10,25,50].map(n=>`<option ${n===limit?'selected':''}>${n}</option>`).join('')}</select></label>
 </form>
 <section class="panel">${T_bills_table(u,scope,q.q,limit)}</section>`;
};
