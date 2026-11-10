/* ---------- Democracy Lab ---------- */
V.wiki=(u,q)=>`${head('The Blue Book','A community-edited reference on the online voices shaping political conversation, with sourced claims and accuracy records.')}${sampleBar(u,'The Blue Book')}${modbar('The Blue Book','bluebook.digitalgroundgame.org','https://bluebook.digitalgroundgame.org/')}`;
V.article=(u,q,id)=>{const w=WIKI.find(x=>x.id===id)||WIKI[0];
 return `${head(w.name,w.h,`<button class="btn" ${act('Would open the editor with revision history')}>Edit article</button>`,crumb('wiki','The Blue Book'))}
 <div class="article">
  <article class="panel panel-b">
   <p><b>${w.name}</b> (${w.h}) is a political content creator active on ${w.plat}. ${w.blurb}<span class="cite">[1]</span></p>
   <h2>Content and audience</h2><p>Most content focuses on ${w.topics.toLowerCase()}. Audience analytics from the tracker estimate a combined reach of ${w.reach} followers, concentrated in the Midwest and among 18–34 year olds.<span class="cite">[2]</span></p>
   <h2>Accuracy record</h2><p>Editors have reviewed ${w.claims} factual claims. ${w.flag} were rated misleading or false, and ${w.flag?'corrections were issued for '+Math.max(0,w.flag-1):'none required correction'}.<span class="cite">[3]</span></p>
   <h2>Relationship to campaigns</h2><p>No paid partnerships with campaigns or PACs were disclosed in FEC or state filings during the 2026 cycle.<span class="cite">[4]</span></p>
   <p style="font-size:13px;color:var(--muted);border-top:1px solid var(--line);padding-top:10px;margin-top:18px">Last edited Oct 19, 2026 by a DGG research volunteer · 27 revisions</p>
  </article>
  <aside class="infobox"><div class="ttl">${w.name}</div><div class="kv">
   <div class="k">Handle</div><div class="v mono" style="font-size:13px">${w.h}</div><div class="k">Platforms</div><div class="v">${w.plat}</div>
   <div class="k">Reach</div><div class="v tab-nums">${w.reach}</div><div class="k">Topics</div><div class="v">${w.topics}</div>
   <div class="k">Lean</div><div class="v">${w.lean}</div><div class="k">Claims</div><div class="v tab-nums">${w.claims} reviewed · ${w.flag} flagged</div>
  </div></aside>
 </div>`};

/* ---------- Democracy Lab wrappers (locked for non-members) ---------- */
const AS_MEMBER={account:'member'};
const _wiki=V.wiki;
V.wiki=(u,q)=>isMember(u)?_wiki(u,q):`${head('The Blue Book','A community-edited reference on the online voices shaping political conversation.')}${gate(u,'The Blue Book',_wiki(AS_MEMBER,q))}`;
