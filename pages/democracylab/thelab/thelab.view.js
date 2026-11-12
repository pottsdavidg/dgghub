/* The Lab: what the Democracy Lab is, and everyone on the team.
   The team is built from every page's credit list, one card per person,
   so a change to someone's card on any page shows up here too. */
const LAB_TEAM=()=>{const seen=new Set();
 return [...BLUEBOOK_CREDITS,...DGGAPP_CREDITS,...LEG_CREDITS,...COURTS_CREDITS,...AGENDA_CREDITS,...EXEC_CREDITS,...MODEL_CREDITS,...LAB_ONLY_CREDITS]
  .filter(p=>!seen.has(p.n)&&seen.add(p.n))
  .map((p,i)=>[p,i]).sort(([a,i],[b,j])=>labRank(a)-labRank(b)||i-j).map(([p])=>p)};
/* Shown first on The Lab, in this order; everyone else follows in page order. */
const LAB_FIRST=['Kevin Ji','Sam Koved','Cameron Tomaino','Patrick Dolan'];
const labRank=p=>{const i=LAB_FIRST.indexOf(p.n);return i<0?LAB_FIRST.length:i};
V.lab=u=>`${head('The Lab',LAB_ABOUT)}${gate(u,'The Lab',credits(LAB_TEAM(),'The team'))}`;
