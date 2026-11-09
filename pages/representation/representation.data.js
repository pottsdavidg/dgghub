/* Representation (list + rep detail): data. */
const REPS={
 federal:[
  {id:'r1',name:'Maria Delgado',ini:'MD',party:'D',office:'U.S. Senator',scope:'Ohio · Class I',term:'2025–2031',phone:'(202) 555-0141',committees:['Agriculture','Commerce, Science & Transportation'],score:'92% with party'},
  {id:'r2',name:'Thomas Whitaker',ini:'TW',party:'R',office:'U.S. Senator',scope:'Ohio · Class III',term:'2023–2029',phone:'(202) 555-0178',committees:['Finance','Armed Services'],score:'89% with party'},
  {id:'r3',name:'Andre Coleman',ini:'AC',party:'D',office:'U.S. Representative',scope:'Ohio District 3',term:'2025–2027',phone:'(202) 555-0119',committees:['Energy & Commerce'],score:'94% with party'},
 ],
 state:[
  {id:'r4',name:'Karen Lindqvist',ini:'KL',party:'R',office:'Governor',scope:'State of Ohio',term:'2023–2027',phone:'(614) 555-0100',committees:['Executive'],score:'—'},
  {id:'r5',name:'Priya Raman',ini:'PR',party:'D',office:'State Senator',scope:'Ohio Senate District 15',term:'2023–2027',phone:'(614) 555-0162',committees:['Education','Health'],score:'90% with party'},
  {id:'r6',name:'Gregory Haines',ini:'GH',party:'R',office:'State Representative',scope:'Ohio House District 7',term:'2025–2027',phone:'(614) 555-0187',committees:['Finance','Government Oversight'],score:'86% with party'},
 ],
 local:[
  {id:'r7',name:'Darnell Brooks',ini:'DB',party:'D',office:'Mayor',scope:'City of Columbus',term:'2024–2027',phone:'(614) 555-0122',committees:[],score:'—'},
  {id:'r8',name:'Susan Okafor',ini:'SO',party:'D',office:'County Commissioner',scope:'Franklin County',term:'2025–2028',phone:'(614) 555-0133',committees:[],score:'—'},
  {id:'r9',name:'Luis Ferreira',ini:'LF',party:'N',office:'City Council, District 4',scope:'Columbus City Council',term:'2024–2027',phone:'(614) 555-0156',committees:['Housing','Public Safety'],score:'Nonpartisan seat'},
  {id:'r10',name:'Hannah Cho',ini:'HC',party:'N',office:'School Board Member',scope:'Columbus City Schools',term:'2023–2027',phone:'(614) 555-0171',committees:['Curriculum'],score:'Nonpartisan seat'},
 ]};

const ALLREPS=[...REPS.federal,...REPS.state,...REPS.local];

const REP_INDEX={};

function sampleRep(id,office,scope,party,extra={}){
 if(REP_INDEX[id])return REP_INDEX[id];
 const r=seeded(id),f=FIRST[Math.floor(r()*FIRST.length)],l=LAST[Math.floor(r()*LAST.length)];
 const p=party||(r()<.5?'D':'R');
 const rep={id,name:`${f} ${l}`,ini:f[0]+l[0],party:p,office,scope,term:extra.term||`${2023+Math.floor(r()*3)*2}–${2027+Math.floor(r()*2)*2}`,phone:`(${200+Math.floor(r()*700)}) 555-0${100+Math.floor(r()*899)}`,committees:extra.committees||[],score:extra.score||'—',sample:true};
 REP_INDEX[id]=rep;return rep;
}

/* Real federal executive + judicial officeholders (as of 2025–26). The live version pulls current data. */
const FED_EXEC=[
 {id:'x-pres',name:'Donald J. Trump',ini:'DT',party:'R',office:'President',scope:'Executive Office of the President',term:'2025–2029',phone:'(202) 456-1111',committees:[],score:'—'},
 {id:'x-vp',name:'JD Vance',ini:'JV',party:'R',office:'Vice President',scope:'Executive Office of the President',term:'2025–2029',phone:'(202) 456-1111',committees:[],score:'—'},
 ...[['State','Marco Rubio'],['Treasury','Scott Bessent'],['Defense','Pete Hegseth'],['Attorney General','Pam Bondi'],['Interior','Doug Burgum'],['Agriculture','Brooke Rollins'],['Commerce','Howard Lutnick'],['Labor','Lori Chavez-DeRemer'],['Health & Human Services','Robert F. Kennedy Jr.'],['Housing & Urban Development','Scott Turner'],['Transportation','Sean Duffy'],['Energy','Chris Wright'],['Education','Linda McMahon'],['Veterans Affairs','Doug Collins'],['Homeland Security','Kristi Noem']].map(([d,n],i)=>({id:'x-cab'+i,name:n,ini:n.split(' ').map(x=>x[0]).join('').slice(0,2),party:'R',office:d==='Attorney General'?d:'Secretary of '+d,scope:'Cabinet',term:'2025–',phone:'—',committees:[],score:'—'})),
];

const FED_JUD=[['John G. Roberts Jr.','Chief Justice','2005'],['Clarence Thomas','Associate Justice','1991'],['Samuel A. Alito Jr.','Associate Justice','2006'],['Sonia Sotomayor','Associate Justice','2009'],['Elena Kagan','Associate Justice','2010'],['Neil M. Gorsuch','Associate Justice','2017'],['Brett M. Kavanaugh','Associate Justice','2018'],['Amy Coney Barrett','Associate Justice','2020'],['Ketanji Brown Jackson','Associate Justice','2022']]
 .map(([n,o,y],i)=>({id:'j'+i,name:n,ini:n.split(' ').filter(x=>/^[A-Z][a-z]/.test(x)).map(x=>x[0]).join('').slice(0,2),party:'N',office:o,scope:'U.S. Supreme Court',term:'Since '+y,phone:'(202) 479-3000',committees:[],score:'—'}));

[...FED_EXEC,...FED_JUD].forEach(r=>REP_INDEX[r.id]=r);

const VOTES=[
 ['H.R. 2817 Rural Broadband Access Act','Yea','Oct 20, 2026'],
 ['H.Res. 611 Rule for H.R. 2817','Yea','Oct 14, 2026'],
 ['H.R. 1450 Small Farm Disaster Relief','Yea','Sep 24, 2026'],
 ['H.R. 1922 Postal Service Rate Freeze','Nay','Sep 11, 2026'],
];
