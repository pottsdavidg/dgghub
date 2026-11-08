const STAGES=['Introduced','Committee','Passed chamber','Passed 2nd chamber','To executive','Law'];
const BILLS=[
 {id:'hr2817',num:'H.R. 2817',lvl:'Federal',title:'Rural Broadband Access Act',stage:2,sponsor:'r3',updated:'Oct 20',topic:'Infrastructure',summary:'Funds last-mile broadband buildout in counties where fewer than 80% of households have 100 Mbps service, administered through state broadband offices.',follow:true},
 {id:'s904',num:'S. 904',lvl:'Federal',title:'Voter Registration Modernization Act',stage:1,sponsor:'r1',updated:'Oct 17',topic:'Elections',summary:'Requires states to offer online registration and automatic registration at motor vehicle agencies, with an opt-out notice mailed within 30 days.',follow:true},
 {id:'hb112',num:'HB 112',lvl:'Ohio',title:'Polling Place Accessibility Standards',stage:3,sponsor:'r6',updated:'Oct 15',topic:'Elections',summary:'Sets minimum accessibility standards for polling locations and requires boards of elections to publish compliance audits 60 days before each general election.',follow:false},
 {id:'sb58',num:'SB 58',lvl:'Ohio',title:'Residential Tenant Notice Act',stage:1,sponsor:'r5',updated:'Oct 9',topic:'Housing',summary:'Extends written notice for rent increases on month-to-month leases from 30 to 60 days.',follow:true},
 {id:'hr1450',num:'H.R. 1450',lvl:'Federal',title:'Small Farm Disaster Relief Extension',stage:5,sponsor:'r2',updated:'Sep 30',topic:'Agriculture',summary:'Extends emergency loan eligibility for farms under 500 acres affected by declared disasters through FY2028.',follow:false},
 {id:'hb230',num:'HB 230',lvl:'Ohio',title:'School Meal Debt Relief Act',stage:0,sponsor:'r5',updated:'Oct 2',topic:'Education',summary:'Prohibits districts from sending student meal debt to collections and creates a state relief fund.',follow:false},
];
const BILLTL={
 hr2817:[['Oct 20, 2026','Passed House, 251–178. Sent to the Senate.','red'],['Oct 14, 2026','Amendment 3 (manager’s amendment) adopted by voice vote.',''],['Jun 18, 2026','Reported favorably by Energy & Commerce, 32–19.',''],['Apr 3, 2026','Committee substitute adopted in subcommittee.',''],['Feb 12, 2026','Introduced and referred to Energy & Commerce.','']],
};
const DEFAULT_TL=[['Oct 2026','Latest action recorded.','red'],['Sep 2026','Committee hearing held.',''],['2026','Introduced and referred to committee.','']];

const VOTES=[
 ['H.R. 2817 Rural Broadband Access Act','Yea','Oct 20, 2026'],
 ['H.Res. 611 Rule for H.R. 2817','Yea','Oct 14, 2026'],
 ['H.R. 1450 Small Farm Disaster Relief','Yea','Sep 24, 2026'],
 ['H.R. 1922 Postal Service Rate Freeze','Nay','Sep 11, 2026'],
];

/* Bills table: 50 federal + 15 Ohio. party: D, R, or B (bipartisan). Missing fields are intentional:
   they show the "help fill this in" prompt for joining a team. */
const BILL_TITLES=['Rural Broadband Access Act','Voter Registration Modernization Act','Small Farm Disaster Relief Extension','Postal Service Rate Freeze Act','Veterans Mental Health Access Act','Clean Water Infrastructure Investment Act','Prescription Drug Price Transparency Act','Election Security Grant Program Act','Child Care Affordability Act','National Apprenticeship Expansion Act','Wildfire Resilience Act','Social Security Fairness Act','Affordable Insulin Act','Student Loan Servicer Accountability Act','Bridge Repair Priority Act','Public Lands Recreation Access Act','Rural Hospital Stabilization Act','Election Worker Protection Act','Housing Supply Expansion Act','Tribal Broadband Equity Act','Medicare Dental Coverage Act','Stock Trading Ban for Members of Congress Act','Disaster Assistance Simplification Act','Federal Firefighter Pay Parity Act','Paid Family Leave Pilot Act','Heat Illness Prevention Act','Small Business Credit Access Act','Lead Pipe Replacement Act','Workforce Pell Grant Act','Mental Health in Schools Act','Railway Safety Improvement Act','Online Privacy for Kids Act','Maternal Health Quality Act','Food Desert Elimination Act','Coastal Flood Mapping Act','Fentanyl Detection Technology Act','Truck Parking Safety Act','Census Accuracy Act','National Service Corps Expansion Act','Community Solar Access Act','Water Rights Settlement Act','Microloan Modernization Act','Domestic Semiconductor Workforce Act','Senior Housing Repair Act','Election Day Holiday Act','Public Broadcasting Support Act','Inland Waterways Revitalization Act','Rural Postal Delivery Act','Ballot Access for Overseas Voters Act','Highway Wildlife Crossings Act'];
const STATE_BILL_TITLES=['Polling Place Accessibility Standards','Residential Tenant Notice Act','School Meal Debt Relief Act','Ballot Drop Box Restrictions','Public Records Fee Cap','Ohio Broadband Expansion Grant Program','Property Tax Relief for Seniors','Statehouse Transparency Act','Redistricting Commission Reform','Teacher Pay Floor Act','Lake Erie Algae Prevention Act','Early Voting Hours Extension','Child Tax Credit for Ohio Families','Short-Term Rental Registration Act','Election Equipment Audit Act'];
const PARTIES=['D','R','B'];
function makeBills(titles,prefixes,lvl,seedKey){
 return titles.map((t,i)=>{const r=seeded(seedKey+i),pre=prefixes[i%prefixes.length],n=prefixes[0]==='HB'||prefixes[0]==='SB'?20+Math.floor(r()*380):100+Math.floor(r()*9800);
  const d=new Date(2026,10,5-Math.floor(i*1.6)-Math.floor(r()*2));
  const missing=i%9===5;
  return {id:(pre.replace(/\W/g,'')+n).toLowerCase(),num:`${pre} ${n}`,lvl,title:t,stage:Math.floor(r()*6),party:missing?null:PARTIES[Math.floor(r()*3)],
   updated:d.toLocaleDateString('en-US',{month:'short',day:'numeric'}),ts:+d,topic:'',summary:missing?'':`${t}: ${LOREM[i%4].split('. ')[0]}.`,sponsor:null,follow:false,missing}});
}
const FED_BILLS=makeBills(BILL_TITLES,['H.R.','S.','H.R.','H.R.','S.'],'Federal','fed');
const OH_BILLS=makeBills(STATE_BILL_TITLES,['HB','SB','HB'],'Ohio','oh');
// keep the hand-written sample bills (with detail pages and history) at the top
BILLS.forEach(b=>{b.party=b.party||({hr2817:'B',s904:'D',hb112:'B',sb58:'D',hr1450:'R',hb230:'D'}[b.id]||'B');b.ts=+new Date(2026,10,4)});
const ALL_FED=[...BILLS.filter(b=>b.lvl==='Federal'),...FED_BILLS];
const ALL_OH=[...BILLS.filter(b=>b.lvl!=='Federal'),...OH_BILLS];
const STATE_BILL_CACHE={OH:ALL_OH};
function billsForState(st){
 if(STATE_BILL_CACHE[st])return STATE_BILL_CACHE[st];
 const name=STATE_BY[st][1];
 const titles=STATE_BILL_TITLES.map(t=>t.replace('Ohio',name).replace('Lake Erie Algae Prevention Act','Clean Lakes and Rivers Act'));
 const list=makeBills(titles,['HB','SB','HB'],name,st.toLowerCase()).map(b=>({...b,id:st.toLowerCase()+'-'+b.id}));
 return STATE_BILL_CACHE[st]=list;
}
const findBill=id=>[ALL_FED,...Object.values(STATE_BILL_CACHE)].flat().find(b=>b.id===id)||(()=>{const m=/^([a-z]{2})-/.exec(id);if(m&&STATE_BY[m[1].toUpperCase()])return billsForState(m[1].toUpperCase()).find(b=>b.id===id)})();
