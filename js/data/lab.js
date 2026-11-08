const LEG=[
 {c:0,id:'HB 301',t:'Ballot Drop Box Restrictions',p:'hi',tag:'Elections',note:'Hearing Oct 28'},
 {c:0,id:'SB 77',t:'Public Records Fee Cap',p:'md',tag:'Transparency',note:'3 cosponsors added'},
 {c:1,id:'S. 904',t:'Voter Registration Modernization Act',p:'hi',tag:'Elections',note:'Markup scheduled'},
 {c:1,id:'SB 58',t:'Residential Tenant Notice Act',p:'md',tag:'Housing',note:'Testimony window open'},
 {c:1,id:'HB 230',t:'School Meal Debt Relief Act',p:'',tag:'Education',note:'No movement 21 days'},
 {c:2,id:'H.R. 2817',t:'Rural Broadband Access Act',p:'md',tag:'Infrastructure',note:'Passed House Oct 20'},
 {c:2,id:'HB 112',t:'Polling Place Accessibility Standards',p:'hi',tag:'Elections',note:'Senate committee next'},
 {c:3,id:'H.R. 1450',t:'Small Farm Disaster Relief Extension',p:'',tag:'Agriculture',note:'Awaiting signature'},
];
const COURTS=[
 {n:'Ohio Fair Districts Coalition v. State Redistricting Board',ct:'Ohio Supreme Court',iss:'Redistricting',st:'Oral argument',next:'Nov 12, 2026',cls:'yel'},
 {n:'In re Franklin County Early Voting Hours',ct:'S.D. Ohio',iss:'Voting access',st:'TRO granted',next:'Oct 29, 2026',cls:'green'},
 {n:'Citizens for Open Records v. City of Dayton',ct:'Ohio 2nd Dist. Court of Appeals',iss:'Public records',st:'Briefing',next:'Dec 3, 2026',cls:''},
 {n:'Midwest Tenants Union v. Ohio Dept. of Commerce',ct:'Franklin County C.P.',iss:'Housing',st:'Motion to dismiss',next:'Nov 5, 2026',cls:''},
 {n:'State ex rel. Harmon v. Board of Elections',ct:'Ohio Supreme Court',iss:'Ballot language',st:'Decided',next:'—',cls:'red'},
];
const WIKI=[
 {id:'w1',name:'Marisol Vega',h:'@marisolexplains',ini:'MV',c:'#1144FF',plat:'TikTok, YouTube',reach:'2.4M',topics:'Election law, civics explainers',lean:'Center-left',claims:58,flag:2,blurb:'Former county elections clerk who breaks down ballot rules and voting deadlines in 60-second videos.'},
 {id:'w2',name:'The Policy Wonk Pod',h:'@policywonkpod',ini:'PW',c:'#242424',plat:'Podcast, X',reach:'610K',topics:'Budget, healthcare policy',lean:'Center',claims:41,flag:1,blurb:'Weekly long-form podcast hosted by two former congressional budget staffers.'},
 {id:'w3',name:'Dale Hutchins',h:'@dalehutchinslive',ini:'DH',c:'#FF0F43',plat:'Rumble, X, Facebook',reach:'1.1M',topics:'Energy, rural economy',lean:'Right',claims:73,flag:11,blurb:'Livestream commentator focused on farm policy and energy prices in the Midwest.'},
 {id:'w4',name:'Civic Sunday',h:'@civicsunday',ini:'CS',c:'#13824A',plat:'Instagram, Threads',reach:'380K',topics:'Local government, turnout',lean:'Nonpartisan',claims:22,flag:0,blurb:'Graphic explainers on city council and school board decisions, published every Sunday.'},
 {id:'w5',name:'Ray Bustamante',h:'@raybvotes',ini:'RB',c:'#FFC800',plat:'YouTube, Twitch',reach:'890K',topics:'Labor, gaming culture',lean:'Left',claims:35,flag:4,blurb:'Streamer who mixes political commentary with live gameplay and regular union-organizer interviews.'},
 {id:'w6',name:'Heartland Ledger',h:'@heartlandledger',ini:'HL',c:'#596079',plat:'Substack, X',reach:'240K',topics:'State legislatures, taxes',lean:'Center-right',claims:49,flag:3,blurb:'Newsletter tracking statehouse tax bills across Ohio, Indiana, and Michigan.'},
];
const EOS=[
 {id:'EO 26-031',t:'Federal Workforce Return-to-Office Requirements',ag:'OPM',d:'Oct 14, 2026',st:'In effect',cls:'green',cases:0},
 {id:'EO 26-029',t:'Election Equipment Certification Review',ag:'EAC, DHS',d:'Oct 2, 2026',st:'Challenged',cls:'yel',cases:2},
 {id:'EO 26-024',t:'Disaster Relief Grant Eligibility Changes',ag:'FEMA',d:'Aug 21, 2026',st:'Enjoined',cls:'red',cases:3},
 {id:'EO 26-019',t:'Rural Broadband Permitting Streamlining',ag:'Commerce, Interior',d:'Jul 9, 2026',st:'In effect',cls:'green',cases:0},
 {id:'EO 26-012',t:'Student Loan Servicer Oversight',ag:'Education',d:'May 28, 2026',st:'Revoked',cls:'',cases:1},
 {id:'EO 26-007',t:'Public Lands Energy Leasing Expansion',ag:'Interior',d:'Apr 3, 2026',st:'Challenged',cls:'yel',cases:4},
];
const APPTS=[
 {pos:'Deputy Secretary of Education',ag:'Education',who:'Carl Brenner',st:'Confirmed',cls:'green',d:'Oct 9, 2026',vote:'52–47'},
 {pos:'Assistant Attorney General, Civil Rights',ag:'Justice',who:'Dana Whitlock',st:'Committee vote',cls:'blue',d:'Oct 30, 2026',vote:'—'},
 {pos:'Commissioner, Election Assistance Commission',ag:'EAC',who:'Paul Ostrander',st:'Hearing held',cls:'yel',d:'Oct 16, 2026',vote:'—'},
 {pos:'Inspector General',ag:'Labor',who:'Vacant (IG removed)',st:'Vacant',cls:'red',d:'Since Jun 2, 2026',vote:'—'},
 {pos:'Administrator, FEMA',ag:'Homeland Security',who:'Renee Calloway (acting)',st:'Acting',cls:'',d:'Since Mar 11, 2026',vote:'—'},
 {pos:'U.S. Attorney, S.D. Ohio',ag:'Justice',who:'Mark Dunleavy',st:'Nominated',cls:'',d:'Sep 22, 2026',vote:'—'},
];
const AGENDA=[
 ['Federal workforce',[['Reclassify policy-influencing career jobs (Schedule F)','In progress',70],['Move agency headquarters out of Washington','Proposed',10],['Consolidate inspector general offices','Blocked',30]]],
 ['Education',[['Wind down the Department of Education','In progress',45],['Convert federal K-12 grants to block grants','Proposed',10]]],
 ['Elections & justice',[['Bring independent agencies under direct presidential control','In progress',55],['Narrow civil rights enforcement priorities','Implemented',100]]],
 ['Environment & energy',[['Expand oil and gas leasing on federal lands','Implemented',100],['Roll back vehicle emissions standards','Blocked',35]]],
];
const AGCLS={'Implemented':'green','In progress':'blue','Blocked':'red','Proposed':''};
const RACES=[
 {id:'oh7',name:'Ohio House District 7',dem:'Nora Whitfield',rep:'Gregory Haines (inc.)',trend:[39,41,40,43,44,43,45,46,45,47,47.5],contacts:'18,240'},
 {id:'oh15',name:'Ohio Senate District 15',dem:'Priya Raman (inc.)',rep:'Doug Kessler',trend:[58,59,61,60,62,61,62,64,63,62,63],contacts:'24,910'},
 {id:'oh09',name:'U.S. House, Ohio District 9',dem:'Sample Democrat',rep:'Sample Republican',trend:[55,54,53,52,50,51,50,51,52,53,52],contacts:'31,005'},
 {id:'fcc',name:'Franklin County Commission',dem:'Susan Okafor (inc.)',rep:'Brian Tolliver',trend:[66,67,68,69,70,69,70,71,72,71,71],contacts:'12,470'},
 {id:'mi38',name:'Michigan House District 38',dem:'Sample Democrat',rep:'Sample Republican',trend:[44,45,43,44,46,45,46,47,48,49,50],contacts:'9,860'},
];
const rateOf=p=>p>=85?['Safe D','blue']:p>=65?['Likely D','blue']:p>=55?['Lean D','blue']:p>45?['Toss-up','yel']:p>35?['Lean R','red']:p>15?['Likely R','red']:['Safe R','red'];
const ROLODEX=[
 {n:'Marisol Vega',ini:'MV',type:'Creator',what:'TikTok, YouTube · 2.4M',where:'Columbus, OH',topic:'Election law explainers',rel:'Warm',last:'Oct 19, 2026',poc:'Lauren Pike',pocRole:'Media lead'},
 {n:'Civic Sunday',ini:'CS',type:'Creator',what:'Instagram, Threads · 380K',where:'Chicago, IL',topic:'Local government graphics',rel:'Partner',last:'Oct 22, 2026',poc:'Lauren Pike',pocRole:'Media lead'},
 {n:'Ray Bustamante',ini:'RB',type:'Creator',what:'YouTube, Twitch · 890K',where:'Detroit, MI',topic:'Labor, gaming culture',rel:'Warm',last:'Sep 30, 2026',poc:'Dev Patel',pocRole:'Blue Book editor'},
 {n:'The Policy Wonk Pod',ini:'PW',type:'Creator',what:'Podcast · 610K',where:'Washington, DC',topic:'Budget and healthcare',rel:'Cold',last:'Jun 12, 2026',poc:'Dev Patel',pocRole:'Blue Book editor'},
 {n:'Andre Coleman',ini:'AC',type:'Politician',what:'U.S. Representative, OH-3',where:'Columbus, OH',topic:'Energy & Commerce',rel:'Warm',last:'Oct 14, 2026',poc:'Alex Moreno',pocRole:'Columbus City Lead'},
 {n:'Priya Raman',ini:'PR',type:'Politician',what:'State Senator, OH SD-15',where:'Columbus, OH',topic:'Education, health',rel:'Partner',last:'Oct 21, 2026',poc:'Alex Moreno',pocRole:'Columbus City Lead'},
 {n:'Nora Whitfield',ini:'NW',type:'Candidate',what:'Candidate, OH House 7',where:'Columbus, OH',topic:'Housing, transit',rel:'Warm',last:'Oct 21, 2026',poc:'Tyler Reed',pocRole:'Canvass captain'},
 {n:'Darnell Brooks',ini:'DB',type:'Politician',what:'Mayor, Columbus',where:'Columbus, OH',topic:'City budget, public safety',rel:'Cold',last:'Apr 2, 2026',poc:'Jasmine Kim',pocRole:'Volunteer coordinator'},
 {n:'Susan Okafor',ini:'SO',type:'Politician',what:'Franklin County Commissioner',where:'Columbus, OH',topic:'County services',rel:'Warm',last:'Sep 18, 2026',poc:'Omar Bashir',pocRole:'Data and turf lead'},
];
