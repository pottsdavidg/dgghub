/* Public site pages (shared): view. */
const T_pubhero=(eyebrow,title,sub,extra='')=>`<section class="pubhero patwrap tilebg"><div class="pubwrap"><span class="label" style="color:#fff">${eyebrow}</span><h1>${title}</h1>${sub?`<p>${sub}</p>`:''}${extra}</div></section>`;
