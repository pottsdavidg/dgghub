/* Tracker Suite: data. */
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

/* Tracker credits. img: photo path (DGGPlaceholder.jpg until a real photo arrives). links: [label, url, icon]. */
const ANGEL_RAMOS={n:'Angel Ramos',ini:'AR',c:'#1144FF',img:'OrgMemberPics/DGGPlaceholder.jpg',title:'Tracker Project Lead',blurb:'Texan PhD candidate in Political Theory. BA in political science from the University of Pittsburgh at Johnstown, graduating magna cum laude with a double minor in philosophy and sociology. Interested in pushing the boundaries of what one can do without paywalled data. Advocate for centralized, standardized and cleaned data. Vita Activa &gt; Vita Contemplativa.',links:[['GitHub','https://github.com/My-Name2','code'],['Hugging Face','https://huggingface.co/My-Name1/spaces','ext'],['Email','mailto:aramos33@cougarnet.uh.edu','mail']]};
const LEG_CREDITS=[ANGEL_RAMOS];
const EXEC_CREDITS=[ANGEL_RAMOS];
const AGENDA_CREDITS=[ANGEL_RAMOS];
const EMILY_CAPPER={n:'Emily Capper',ini:'EC',c:'#FF0F43',img:'OrgMemberPics/EmilyCapper.jpg',title:'Coordinator of Research',blurb:'B.S. Biology. Data science, elections, and American history hobbyist. At Digital Ground Game I work on the court tracker and state election models.',links:[['Email','mailto:emily.ln2.77k@gmail.com','mail']]};
const COURTS_CREDITS=[EMILY_CAPPER];
