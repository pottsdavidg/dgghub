/* Team contact: view. */
V.contact=u=>{const T=TEAMS[u.team],lead=T.members[0],mid=REGIONS.find(r=>r.slug==='midwest');
 const handle=n=>'@'+n.toLowerCase().replace(/[^a-z]+/g,'');
 const email=n=>n.toLowerCase().split(' ')[0]+'.'+(n.split(' ')[1]||'dgg').toLowerCase().replace(/[^a-z]/g,'')+'@digitalgroundgame.org';
 const person=([i,n,r],big)=>`<div class="person ${big?'big':''}"><div class="avatar" style="background:${T.c}">${i}</div><div class="pinfo"><b>${n}</b><span class="d">${r}</span><span class="mono d">${handle(n)} on Discord</span></div><div class="pacts"><a class="btn sm discordbtn" href="${DISCORD_URL}" target="_blank" rel="noopener">${ic('chat')}Message</a><button class="btn sm ghost" data-copy="${email(n)}">${ic('mail')}Copy email</button></div></div>`;
 return `${head('Contact',`Reach your team lead and teammates on the ${T.n}.`,'<span class="sample">Sample contacts</span>')}
 <section class="panel">${ph('Team lead',`<span class="chip blue">${T.n}</span>`)}<div class="panel-b">${person(lead,true)}</div></section>
 <section class="panel">${ph('Teammates',`<span class="label">${T.members.length-1} people</span>`)}<div class="people">${T.members.slice(1).map(m=>person(m)).join('')}</div></section>
 <section class="panel">${ph('Regional and chapter leads','<span class="label">Midwest</span>')}<div class="people">${mid.team.slice(0,3).map(([n,r])=>person([n.replace(/[^A-Za-z ]/g,'').split(' ').map(x=>x[0]).join('').slice(0,2),n,r])).join('')}${person(['AM','Alex Moreno','Columbus City Lead'])}</div></section>`;
};
