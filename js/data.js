/* =====================================================================
   SEED DATA  (becomes your SQLite seed script / fixtures)
   Everything here is sample data for the prototype.
   ===================================================================== */
/* ---------- sample data ---------- */
const USER={first:'Jordan',name:'Jordan Ellis',initials:'JE',addr:'1420 Neil Ave, Columbus, OH 43201',county:'Franklin County',precinct:'Columbus 21-C',ward:'Ward 21'};
const ELECTION=new Date('2026-11-03T06:30:00-05:00');
const daysLeft=()=>Math.max(0,Math.ceil((ELECTION-new Date())/864e5));

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

const HISTORY=[
 ['Nov 3, 2026','General Election','upcoming',''],
 ['May 5, 2026','Primary Election','Voted','Early, in person'],
 ['Nov 4, 2025','General Election','Voted','Mail-in absentee'],
 ['Aug 5, 2025','Special Election','Did not vote',''],
 ['May 6, 2025','Primary Election','Voted','Election Day'],
 ['Nov 5, 2024','General Election','Voted','Early, in person'],
 ['Mar 19, 2024','Primary Election','Voted','Election Day'],
 ['Nov 7, 2023','General Election','Voted','Mail-in absentee'],
 ['Aug 8, 2023','Special Election','Voted','Election Day'],
 ['May 2, 2023','Primary Election','Did not vote',''],
 ['Nov 8, 2022','General Election','Voted','Election Day'],
];

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
const EVENTS=[
 {m:'OCT',d:27,type:'Phone bank',cls:'blue',t:'Early Vote Phone Bank',when:'Tue 6–8 p.m.',where:'Virtual (Zoom)',going:42},
 {m:'OCT',d:31,type:'Canvass',cls:'red',t:'Short North Door Knock',when:'Sat 10 a.m.–1 p.m.',where:'Goodale Park, Columbus',going:28},
 {m:'NOV',d:1,type:'Text bank',cls:'yel',t:'Final Weekend Text Bank',when:'Sun 2–4 p.m.',where:'Virtual',going:65},
];
const MEDIA=[
 {k:'interview',t:'Candidate Q&A: Nora Whitfield, Ohio House District 7',d:'Interview · 24 min · Oct 21',tint:'k',dur:'24:12',big:'Q&A'},
 {k:'photos',t:'Goodale Park Canvass Kickoff',d:'Photo album · 86 photos · Oct 18',tint:'',dur:'86',big:'Oct 18'},
 {k:'stream',t:'Replay: Columbus Weekend of Action',d:'Live stream replay · 1 hr 12 min · Oct 17',tint:'r',dur:'1:12:40',big:'Replay'},
 {k:'interview',t:'Candidate Q&A: Priya Raman, Ohio Senate District 15',d:'Interview · 19 min · Oct 14',tint:'k',dur:'19:05',big:'Q&A'},
 {k:'photos',t:'Dayton Phone Bank Night',d:'Photo album · 34 photos · Oct 10',tint:'y',dur:'34',big:'Oct 10'},
 {k:'stream',t:'Replay: Canvasser Training 101',d:'Live stream replay · 48 min · Oct 6',tint:'',dur:'48:30',big:'Training'},
 {k:'photos',t:'Cleveland Door Knock, 4,200 Doors',d:'Photo album · 121 photos · Oct 4',tint:'r',dur:'121',big:'Oct 4'},
 {k:'interview',t:'Street Interviews: Why Voters Are Showing Up',d:'Video · 7 min · Sep 29',tint:'',dur:'7:48',big:'On the street'},
];
const QUIZ=[
 ['How many amendments does the U.S. Constitution have?',['10','27','33','50'],1,'27 amendments have been ratified. The most recent, the 27th, took effect in 1992 after being proposed in 1789.'],
 ['Which amendment lowered the voting age to 18?',['19th','24th','26th','15th'],2,'The 26th Amendment was ratified in 1971, faster than any other amendment.'],
 ['How many voting members sit in the House of Representatives?',['100','435','438','535'],1,'The House has 435 voting members, a number fixed by law since 1929.'],
 ['How long is a U.S. senator\'s term?',['2 years','4 years','6 years','8 years'],2,'Senators serve six-year terms, with about a third of the Senate up for election every two years.'],
 ['Under the Constitution, which branch has the power to declare war?',['The President','Congress','The Supreme Court','The Secretary of Defense'],1,'Article I, Section 8 gives Congress the power to declare war.'],
];
const TIMELINE=[['Declaration of Independence adopted',1776],['Bill of Rights ratified',1791],['15th Amendment bars race-based voting denial',1870],['19th Amendment guarantees women the vote',1920],['Voting Rights Act signed',1965]];
const RACES=[
 {id:'oh7',name:'Ohio House District 7',dem:'Nora Whitfield',rep:'Gregory Haines (inc.)',trend:[39,41,40,43,44,43,45,46,45,47,47.5],contacts:'18,240'},
 {id:'oh15',name:'Ohio Senate District 15',dem:'Priya Raman (inc.)',rep:'Doug Kessler',trend:[58,59,61,60,62,61,62,64,63,62,63],contacts:'24,910'},
 {id:'oh09',name:'U.S. House, Ohio District 9',dem:'Sample Democrat',rep:'Sample Republican',trend:[55,54,53,52,50,51,50,51,52,53,52],contacts:'31,005'},
 {id:'fcc',name:'Franklin County Commission',dem:'Susan Okafor (inc.)',rep:'Brian Tolliver',trend:[66,67,68,69,70,69,70,71,72,71,71],contacts:'12,470'},
 {id:'mi38',name:'Michigan House District 38',dem:'Sample Democrat',rep:'Sample Republican',trend:[44,45,43,44,46,45,46,47,48,49,50],contacts:'9,860'},
];
const rateOf=p=>p>=85?['Safe D','blue']:p>=65?['Likely D','blue']:p>=55?['Lean D','blue']:p>45?['Toss-up','yel']:p>35?['Lean R','red']:p>15?['Likely R','red']:['Safe R','red'];
const TRACKS=[
 ['gov','Local & State Government','How city councils, county boards, and statehouses actually work.','var(--blue)',3,5],
 ['career','Careers in Politics','Paths into campaigns, staff jobs, and running for office.','var(--red)',1,4],
 ['content','Political Content Creation','Build a channel that informs people and grows an audience.','var(--yellow)',0,4],
 ['organize','Organizing 101','Canvassing, phone banks, and building a volunteer team.','#13824A',2,3],
];
const WORKSHOPS=[
 {tr:'gov',t:'Who Runs Your City? Councils, Mayors, and Managers',by:'Alex Moreno',role:'Columbus City Lead',ini:'AM',len:'52 min',st:'watched'},
 {tr:'gov',t:'Reading a County Budget in 30 Minutes',by:'Omar Bashir',role:'Data and turf lead',ini:'OB',len:'34 min',st:'watched'},
 {tr:'gov',t:'How a Bill Moves Through the Ohio Statehouse',by:'Priya Desai',role:'Policy volunteer, former legislative aide',ini:'PD',len:'47 min',st:'watched'},
 {tr:'gov',t:'Public Comment: Making Your Three Minutes Count',by:'Jasmine Kim',role:'Volunteer coordinator',ini:'JK',len:'Live · Nov 4, 7 p.m.',st:'upcoming'},
 {tr:'career',t:'From Volunteer to Field Organizer',by:'Tyler Reed',role:'Canvass captain, Short North',ini:'TR',len:'41 min',st:'watched'},
 {tr:'career',t:'So You Want to Run for School Board',by:'Hannah Ortiz',role:'Former school board candidate',ini:'HO',len:'58 min',st:'new'},
 {tr:'career',t:'Landing a Legislative Staff Job',by:'Marcus Lee',role:'Statehouse staffer, DGG alum',ini:'ML',len:'Live · Nov 10, 6:30 p.m.',st:'upcoming'},
 {tr:'content',t:'Finding Your Angle: Civics Content That Gets Watched',by:'Lauren Pike',role:'Media and photos lead',ini:'LP',len:'39 min',st:'new'},
 {tr:'content',t:'Fact-Checking Before You Post',by:'Dev Patel',role:'Blue Book editor',ini:'DP',len:'28 min',st:'new'},
 {tr:'organize',t:'Your First Door: Canvassing Basics',by:'Tyler Reed',role:'Canvass captain, Short North',ini:'TR',len:'31 min',st:'watched'},
 {tr:'organize',t:'Running a Phone Bank That People Come Back To',by:'Jasmine Kim',role:'Volunteer coordinator',ini:'JK',len:'36 min',st:'watched'},
];
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
const TEAMS={
 dev:{n:'Dev Team',sub:'Development & Technology',icon:'code',c:'var(--blue)',d:'Handles programming and development for projects including websites, bots, and Digital Ground Game infrastructure.',projects:['Hub prototype','Discord bots','Website'],
  members:[['SO','Sam Ortega','Team lead'],['NB','Nia Brooks','Front end'],['KW','Kai Wen','Bots and automation'],['RG','Rosa Guerrero','Data engineering']]},
 research:{n:'Research Team',sub:'Policy & Analysis',icon:'search',c:'#13824A',d:'Conducts research on key issues, maintains talking point resources, and provides evidence-based analysis for political initiatives and electoral efforts.',projects:['Talking points','Bill analysis','Election Model'],
  members:[['PD','Priya Desai','Team lead'],['DP','Dev Patel','Fact-checking'],['EH','Ella Hart','Election data'],['MJ','Marcus Johnson','Policy writer']]},
 media:{n:'Media Team',sub:'Social Media & Messaging',icon:'mega',c:'var(--red)',d:'Produces content that informs and mobilizes voters while coordinating with creators who support liberal and Democratic messaging.',projects:['Final weekend push','Creator outreach','Event coverage'],
  members:[['LP','Lauren Pike','Team lead'],['BA','Bea Alvarez','Video editor'],['CT','Chris Tan','Graphics'],['ZM','Zoe Mendez','Creator partnerships']]},
 events:{n:'Events Team',sub:'Events & Community',icon:'cal',c:'#C99A00',d:'Organizes social events, civics workshops, and organizing events while helping regional squads with event logistics.',projects:['Final weekend canvass','Workshops','Election night watch party'],
  members:[['JK','Jasmine Kim','Team lead'],['TR','Tyler Reed','Canvass logistics'],['AF','Ari Feld','Venues'],['GS','Grace Song','Volunteer shifts']]},
 welcome:{n:'Welcome Team',sub:'Community Onboarding',icon:'door',c:'var(--black)',d:'Helps new members navigate the server, connect with teams, and find ways to get involved with Digital Ground Game.',projects:['New member calls','Server guide','Team matching'],
  members:[['HO','Hannah Ortiz','Team lead'],['WB','Will Bauer','Discord moderator'],['YN','Yara Nasser','Buddy program'],['LC','Leo Cruz','Onboarding docs']]},
};
const TEAM_ORDER=['dev','research','media','events','welcome'];
let TID=100;
const TASKS=[
 ['dev','Wire "Open full app" buttons to the live tracker URLs','Hub prototype','In progress','SO','Oct 28'],
 ['dev','Add sign-in with Discord','Hub prototype','To do',null,'Nov 6'],
 ['dev','Fix role sync bug in the welcome bot','Discord bots','In progress','KW','Oct 27'],
 ['dev','Move the website to the new host','Website','To do','RG','Nov 15'],
 ['dev','Write setup docs for new developers','Website','Done','NB','Oct 20'],
 ['research','Update early voting talking points for Ohio','Talking points','In progress','MJ','Oct 27'],
 ['research','Summarize HB 301 drop box restrictions','Bill analysis','To do',null,'Oct 28'],
 ['research','Fact-check this week\'s top 10 viral claims','Talking points','In progress','DP','Oct 26'],
 ['research','Load early vote returns into the Election Model','Election Model','To do','EH','Oct 29'],
 ['research','Brief on Ohio redistricting oral argument','Bill analysis','Done','PD','Oct 21'],
 ['media','Edit recap video from the Goodale Park canvass','Event coverage','In progress','BA','Oct 27'],
 ['media','Design "Make a plan to vote" carousel','Final weekend push','To do',null,'Oct 28'],
 ['media','Send talking points to 12 partner creators','Creator outreach','In progress','ZM','Oct 29'],
 ['media','Schedule final weekend posts','Final weekend push','To do','LP','Oct 30'],
 ['media','Photo album from the Dayton phone bank','Event coverage','Done','CT','Oct 19'],
 ['events','Confirm Goodale Park shelter house for Oct 31','Final weekend canvass','In progress','AF','Oct 26'],
 ['events','Build volunteer shift sign-up for election day','Final weekend canvass','To do',null,'Oct 30'],
 ['events','Book venue for election night watch party','Election night watch party','To do','JK','Oct 28'],
 ['events','Set up Zoom and slides for public comment workshop','Workshops','In progress','GS','Nov 3'],
 ['events','Order clipboards and walk list printing','Final weekend canvass','Done','TR','Oct 22'],
 ['welcome','Host Tuesday new member call','New member calls','In progress','HO','Oct 27'],
 ['welcome','Update the server guide for the new hub','Server guide','To do',null,'Nov 1'],
 ['welcome','Pair 14 new members with buddies','Team matching','In progress','YN','Oct 28'],
 ['welcome','Clean up stale channels in Discord','Server guide','To do','WB','Nov 4'],
 ['welcome','Write FAQ for the team matching quiz','Team matching','Done','LC','Oct 23'],
].map(([team,t,project,status,who,due])=>({id:TID++,team,t,project,status,who,due}));

/* ---------- team-matching quiz: 3 options per question ---------- */
const TEAMQUIZ=[
 ['Which of these sounds like the most fun way to help out on a Saturday?',[
  ['Building a tool or fixing something that\'s broken',{dev:3}],
  ['Digging into the facts and writing them up',{research:3}],
  ['Making a video or graphic people will share',{media:3}]]],
 ['What would your friends say you\'re best at?',[
  ['Keeping everyone organized',{events:3}],
  ['Making new people feel welcome',{welcome:3}],
  ['Figuring out how things work',{dev:2,research:1}]]],
 ['Which tools do you feel most at home with?',[
  ['Code editors or spreadsheets',{dev:2,research:2}],
  ['Canva, CapCut, or social media apps',{media:3}],
  ['Calendars, sign-up forms, and Discord',{events:2,welcome:2}]]],
 ['A friend texts you for help. Which message are you most excited to answer?',[
  ['"Is this viral claim actually true?"',{research:3}],
  ['"Help me throw a fundraiser this weekend."',{events:3}],
  ['"I just joined and I\'m kind of lost."',{welcome:3}]]],
 ['Where do you do your best work?',[
  ['Heads-down on my laptop',{dev:2,research:1}],
  ['Online, creating and posting',{media:2}],
  ['In person, with people',{events:1,welcome:2}]]],
];

/* ---------- ballot: races and candidates (sample data + lorem ipsum) ---------- */
const LOREM=[
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae sapien a nisl tincidunt luctus. Suspendisse potenti, sed feugiat urna at magna tempor.',
 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Donec varius, nibh in rhoncus pharetra, tortor mauris euismod lorem.',
 'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Pellentesque in ipsum id orci porta dapibus. Nulla quis lorem ut libero malesuada feugiat.',
 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.',
];
const POSITIONS=[['Housing','Lorem ipsum dolor sit amet, expand affordable housing near transit.'],['Schools','Consectetur adipiscing elit, fully fund public schools.'],['Jobs','Sed do eiusmod tempor, grow union apprenticeships.'],['Taxes','Ut enim ad minim veniam, cut property taxes for seniors.'],['Public safety','Quis nostrud exercitation, hire more crisis responders.'],['Voting','Duis aute irure dolor, expand early voting hours.'],['Roads','Excepteur sint occaecat, fix roads before building new ones.'],['Health care','Cupidatat non proident, lower prescription costs.']];
let CID=1;
const mkC=(name,party,opts={})=>{const id='c'+(CID++),k=CID;return {id,name,party,inc:!!opts.inc,job:opts.job||'Lorem ipsum consultant',age:opts.age||40+(k*7)%25,home:opts.home||'Columbus, OH',
 bio:LOREM[k%4]+' '+LOREM[(k+1)%4],positions:[POSITIONS[k%8],POSITIONS[(k+3)%8],POSITIONS[(k+5)%8]],
 endorse:opts.endorse||['Lorem Ipsum Alliance','Dolor Workers Local '+(100+k*7)],raised:opts.raised||(120+k*53)%900+40,site:name.toLowerCase().replace(/[^a-z]+/g,'')+'.example.org'}};
const BALLOT=[
 {race:'U.S. House, Ohio District 3',kind:'Federal',vote:'Vote for 1',cands:[mkC('Andre Coleman','D',{inc:1,job:'U.S. Representative',raised:1840}),mkC('Patricia Moreland','R',{job:'Small business owner',raised:960}),mkC('Devon Achebe','L',{job:'Software engineer',raised:48})]},
 {race:'Governor & Lieutenant Governor',kind:'State',vote:'Vote for 1 pair',cands:[mkC('Karen Lindqvist / Ed Torres','R',{inc:1,job:'Governor',raised:5200}),mkC('Michael Grant / Aisha Bell','D',{job:'Former Attorney General',raised:4380}),mkC('Ruth Nakamura / Cal Briggs','G',{job:'Environmental scientist',raised:210})]},
 {race:'Ohio Secretary of State',kind:'State',vote:'Vote for 1',cands:[mkC('Lorem Castellano','D',{job:'County elections director',raised:880}),mkC('Ipsum Whitcombe','R',{inc:1,job:'Secretary of State',raised:1320})]},
 {race:'Ohio Senate, District 15',kind:'State',vote:'Vote for 1',cands:[mkC('Priya Raman','D',{inc:1,job:'State Senator',raised:610}),mkC('Doug Kessler','R',{job:'Insurance agent',raised:390})]},
 {race:'Ohio House, District 7',kind:'State',vote:'Vote for 1',cands:[mkC('Gregory Haines','R',{inc:1,job:'State Representative',raised:450}),mkC('Nora Whitfield','D',{job:'Public school teacher',raised:520}),mkC('Sam Delacroix','I',{job:'Nurse practitioner',raised:75})]},
 {race:'Ohio Supreme Court, Justice',kind:'Judicial',vote:'Vote for 1',cands:[mkC('Hon. Dolores Amet','N',{job:'Appeals court judge',raised:700}),mkC('Hon. Felix Tempor','N',{inc:1,job:'Justice',raised:820})]},
 {race:'Franklin County Commissioner',kind:'Local',vote:'Vote for 1',cands:[mkC('Susan Okafor','D',{inc:1,job:'County Commissioner',raised:300}),mkC('Brian Tolliver','R',{job:'Real estate developer',raised:410})]},
 {race:'Franklin County Prosecutor',kind:'Local',vote:'Vote for 1',cands:[mkC('Marisa Elit','D',{job:'Public defender',raised:260}),mkC('Thomas Sed','R',{inc:1,job:'County Prosecutor',raised:340})]},
 {race:'Columbus City Schools Board',kind:'Local',vote:'Vote for up to 2',cands:[mkC('Hannah Cho','N',{inc:1,job:'School board member',raised:62}),mkC('Marcus Webb','N',{job:'Parent and PTA president',raised:41}),mkC('Elena Ruiz','N',{job:'Former principal',raised:58}),mkC('Victor Ullamco','N',{job:'Accountant',raised:20})]},
];
const ISSUES=[
 ['Issue 1 · Columbus Parks Levy','A 0.5-mill property tax renewal for 10 years to maintain parks and recreation centers.','A YES vote renews the levy. A NO vote ends it when the current levy expires in 2027. Estimated cost: $17.50 per year per $100,000 of home value.'],
 ['Issue 2 · Library Bond','Authorizes $40M in bonds for two new branch libraries and renovations to five branches.','A YES vote approves the bonds. A NO vote rejects them. Estimated cost: $9 per year per $100,000 of home value.'],
 ['Issue 3 · Lorem Ipsum Charter Amendment','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.','A YES vote lorem ipsum dolor sit amet. A NO vote consectetur adipiscing elit. Sample text for layout only.'],
];

/* ---------- external links ---------- */
const DONATE_URL='https://secure.actblue.com/donate/dggsubscriber';
const DISCORD_URL='https://discord.gg/digitalgroundgame';

/* =====================================================================
   DB: the in-memory stand-in for SQLite. Each key is a future table.
   ===================================================================== */
const DB={
 users:[{id:1,name:'Jordan Ellis',first:'Jordan',email:'jordan.ellis@example.org',zip:'43201',account:'member',team:'media',theme:'system',donate_dismissed:false,join_min:false}],
 tasks:TASKS, bills:BILLS, ballot:BALLOT, events:EVENTS, media:MEDIA, wiki:WIKI,
 workshops:WORKSHOPS, rolodex:ROLODEX, races:RACES, orders:EOS, appointments:APPTS,
 cases:COURTS, legislation:LEG, agenda:AGENDA, teams:TEAMS,
};

/* =====================================================================
   REAL ORG CONTENT  (pulled from digitalgroundgame.org on Oct 30, 2026)
   ===================================================================== */
const SITE_URL='https://digitalgroundgame.org/';
const SOCIALS=[['Instagram','https://www.instagram.com/digitalgroundgame'],['TikTok','https://www.tiktok.com/@digitalgroundgame'],['YouTube','https://www.youtube.com/@DigitalGroundGame'],['X','https://x.com/digitalgroundg'],['Bluesky','https://bsky.app/profile/digitalgroundgame.org'],['Threads','https://www.threads.com/@digitalgroundgame'],['Facebook','https://www.facebook.com/digitalgroundgame'],['Twitch','https://www.twitch.tv/digitalgroundgame'],['Discord','https://discord.gg/digitalgroundgame']];
const CTA={
 title:'Final Midterm CTA: Take back the House and the Senate',
 date:'Oct 25, 2026',by:'Ulysses, Midwest Regional Lead',url:'https://digitalgroundgame.org/call-to-action',
 steps:[
  ['Canvass','Knock doors with local canvassing groups to turn out Democratic-leaning and anti-Trump voters. Local parties canvass heavily on weekends.',['Sign up: San Antonio, Oct 31 – Nov 1','https://forms.gle/GeC5q5YhKZwbyB7g8']],
  ['Phone bank','Phone banking reaches places canvassers can\'t: forests, back roads, and reservations. Find a phone bank through your local party or Mobilize.',['Find a phone bank on Mobilize','https://www.mobilize.us/']],
  ['Join your local Democratic Party','Membership keeps you informed about state and local races and ordinances, and connects you to canvasses, phone banks, and candidate visits. Fees are usually small.',null],
  ['Vote','Early voting has started in most states. Vote early and bring friends and family. Local offices and ordinances are on the ballot too.',['See my ballot','#ballot']],
 ],
 previous:[['Oct 16','Detroit Canvassing','https://digitalgroundgame.org/call-to-action/2026-10-16-detroit-canvassing'],['Oct 11','Major Order: No Kings Protest 10/17/2026','https://digitalgroundgame.org/call-to-action/2026-10-11-major-order-no-kings-protest-10-17-2026'],['Sep 28','Protect the Vote in 2026: Become a Poll Watcher','https://digitalgroundgame.org/call-to-action/2026-09-28-protect-the-vote-in-2026-become-a-poll-watcher']],
};
const UPCOMING=[
 {m:'OCT',d:'31',type:'Canvass',cls:'red',t:'San Antonio Door Knock',when:'Sat, Oct 31 + Sun, Nov 1',where:'San Antonio, TX',btn:['Sign up','https://forms.gle/GeC5q5YhKZwbyB7g8']},
 {m:'ANY',d:'—',type:'Phone bank',cls:'blue',t:'Phone bank from home',when:'Any day through Nov 3',where:'Virtual · via Mobilize',btn:['Find a shift','https://www.mobilize.us/']},
 {m:'NOV',d:'3',type:'Election Day',cls:'yel',t:'Election Day',when:'Tue, Nov 3',where:'Your polling place',btn:['Make a plan','#register']},
];
const PAST_CANVASSES=[['Bucks County, PA','Oct 24'],['Detroit, MI','Oct 17 + 18'],['Phoenix, AZ','Oct 3 + 4'],['Cleveland, OH','Sep 26 + 27']];
const DGG_CALENDAR='https://calendar.google.com/calendar/u/0/r?cid=c_558b7955537810ad93b69f714c889e6a5773ae520471dcfea3d84bf233bd6d28%40group.calendar.google.com';
const ABOUT={
 mission:'Digital Ground Game is a national, community-driven movement defending democracy through practical political action.',
 values:'We are committed to free expression, equality under the law, and market-driven prosperity. Our goal is to build lasting political power and develop the next generation of leaders.',
 tagline:'Defending democracy, one action at a time.',
 model:'Members join regional squads that work on initiatives together, starting local and building toward national mobilization.',
 stats:[['5','Regional squads','West, South, Midwest, Northeast, and International'],['6+','Specialized teams','Dev, Research, Media, Events, Welcome, and more'],['100%','Action-oriented','Every project ends in real-world action']],
 wins:[['12,726','Door knocks at a two-day event in Ohio in 2026'],['360,000+','Door knocks during the 2024 election cycle'],['Ohio','Largest independent canvassing event in state history'],['8 states','Supported by 7 canvassing houses and 4 large events last cycle'],['2024','Largest rookie ground game of the last election cycle']],
 benefits:[['Real political impact','Knock doors, make calls, and move races.'],['Leadership development','Lead a city, a team, or a project.'],['Evidence-based action','Research and data guide where we go.']],
};
const REGIONS=[
 {slug:'northeast',name:'Northeast',tag:'Where the American experiment began, democracy continues.',ig:'https://www.instagram.com/digitalgroundgame',
  states:['Connecticut','Delaware','District of Columbia','Maine','Maryland','Massachusetts','New Hampshire','New Jersey','New York','Pennsylvania','Rhode Island','Vermont','Virginia'],
  team:[['Sam Koved','Northeast Lead · Research Team Lead'],['Shea','Northeast Lead · Pennsylvania'],['Gabriel','Northeast City Lead'],['Ben','DC Organizer'],['Elias','New Jersey Organizer'],['Kmav','Philly City Organizer']],
  cities:['Washington, DC','New Jersey','Philadelphia, PA','New York City'],
  notes:[['Open roles','Pennsylvania Organizer, Philadelphia Organizer, and New York City Organizer. Contact Sam or Shea on Discord.'],['Recent canvass','Bucks County, PA on Oct 24, run by the Northeast squad with Swing Left.'],['Northeast News','A regional dispatch looking for contributors from Rhode Island, Connecticut, New Jersey, and Maryland.']]},
 {slug:'west',name:'West',tag:'Organizing across the West, from Alaska to New Mexico.',ig:'https://www.instagram.com/digitalgroundgame.west',
  states:['Alaska','Arizona','California','Colorado','Hawaii','Idaho','Montana','Nevada','New Mexico','Oregon','Utah','Washington','Wyoming'],
  team:[['Ken','West Region Lead'],['Daniel Lee','West Region Lead · West Region Dispatch']],
  cities:['Phoenix, AZ','Los Angeles, CA','Alaska','Colorado'],
  notes:[['Work sessions','Thursdays at 4 p.m. PT. A state government workshop and a "how to get a job in politics" workshop are in development.'],['LA happy hours','A recurring social series for members in Los Angeles.'],['Recent canvass','Phoenix, AZ on Oct 3 + 4.']]},
 {slug:'midwest',name:'Midwest',tag:'Fourteen states, one ground game.',ig:'https://www.instagram.com/digitalgroundgame.midwest',
  states:['Illinois','Indiana','Iowa','Kansas','Kentucky','Michigan','Minnesota','Missouri','Nebraska','North Dakota','Ohio','South Dakota','West Virginia','Wisconsin'],
  team:[['Kyle E.','Midwest Regional Lead'],['Ulysses','Midwest Regional Lead'],['Carrie','Midwest Regional Lead'],['Daniel Y.','Chicago, IL City Organizer'],['B.H.','Chicago, IL City Organizer'],['Mike M.','Twin Cities, MN City Organizer'],['Walt C.','Indianapolis City Lead'],['Colin F.','Central IL City Organizer']],
  cities:['Chicago, IL','Twin Cities, MN','Indianapolis, IN','Central Illinois','Detroit area, MI'],
  notes:[['Recent canvass','Detroit, MI on Oct 17 + 18: canvassing in Clinton Township followed by a community rally.'],['Ohio record','12,726 doors knocked at a two-day Cleveland event, the largest independent canvass in Ohio history.']]},
 {slug:'south',name:'South',tag:'Building power from Texas to the Carolinas.',ig:'https://www.instagram.com/digitalgroundgame.south',
  states:['Alabama','Arkansas','Florida','Georgia','Louisiana','Mississippi','North Carolina','Oklahoma','South Carolina','Tennessee','Texas'],
  team:[['Kai','South Squad Lead · Texas'],['Adam','South Squad Lead'],['Austin','Austin City Organizer'],['Tyler Knight','Orlando City Lead']],
  cities:['Austin, TX','Orlando, FL','San Antonio, TX'],
  notes:[['Next canvass','San Antonio, TX on Oct 31 + Nov 1.']],
  next:['Sign up for San Antonio','https://forms.gle/GeC5q5YhKZwbyB7g8']},
 {slug:'international',name:'International',tag:'Caring about what happens back home does not stop at the border.',ig:'https://www.instagram.com/digitalgroundgame',
  states:['Americans living abroad','International supporters'],
  team:[],cities:[],
  notes:[['Who we are','Americans living abroad and international supporters who meet regularly to stay involved in organizing, protests, and day-to-day ground work across the U.S.'],['Vote from abroad','DGG partners with Vote From Abroad to help overseas Americans register and request ballots.']],
  next:['Vote From Abroad','https://www.voteabroad.org/ccJP-DGG-2026']},
];

/* ---------- inbox (sample messages for the presentation) ---------- */
const MESSAGES=[
 {id:'m1',kind:'broadcast',from:'DGG Leadership',fromRole:'National · All members',ini:'DGG',c:'var(--red)',to:'All members',subject:'Final weekend: every door counts',time:'9:12 AM',date:'Today',unread:true,
  body:['Team,','This is it. Early voting closes Sunday and Election Day is Tuesday. If you can make it to San Antonio this weekend, sign up through the link on your dashboard. If you can\'t travel, a two-hour phone bank shift on Mobilize makes a real difference.','Thank you for everything you\'ve put into this cycle.','— DGG Leadership']},
 {id:'m2',kind:'direct',from:'Lauren Pike',fromRole:'Media Team Lead',ini:'LP',c:'var(--red)',to:'You',subject:'Recap video for Goodale Park',time:'8:40 AM',date:'Today',unread:true,
  body:['Hey Jordan, could you pull the best 10 clips from the Goodale Park canvass by Saturday? Bea is cutting the recap video and we want it up before Election Day.','The raw footage is in the shared drive under Event coverage.']},
 {id:'m3',kind:'team',from:'Dev Team',fromRole:'Team channel · 5 members',ini:'DT',c:'var(--blue)',to:'Dev Team',subject:'Standup notes: hub prototype',time:'Yesterday',date:'Oct 29',unread:false,
  body:['Sam: wiring the Open full app buttons to live tracker URLs. Done by Wednesday.','Kai: role sync bug in the welcome bot is fixed and deployed.','Nia: setup docs for new developers are merged.']},
 {id:'m4',kind:'broadcast',from:'Midwest Squad',fromRole:'Regional · Midwest',ini:'MW',c:'#C99A00',to:'Midwest members',subject:'Thank you, Detroit',time:'Oct 19',date:'Oct 19',unread:false,
  body:['Huge thanks to everyone who came out to Clinton Township on Oct 17 and 18. We knocked doors all weekend and ended with a packed community rally.','Photos are up in Media. Next stop: San Antonio.','— Kyle, Ulysses, and Carrie']},
 {id:'m5',kind:'direct',from:'Alex Moreno',fromRole:'Columbus City Lead',ini:'AM',c:'#596079',to:'You',subject:'Chapter meeting agenda',time:'Oct 27',date:'Oct 27',unread:false,
  body:['Hi Jordan, I\'m putting together the agenda for next week\'s chapter meeting. Would you be up for giving a five-minute update on what the Media Team is working on?']},
 {id:'m6',kind:'broadcast',from:'DGG Leadership',fromRole:'National · All members',ini:'DGG',c:'var(--red)',to:'All members',subject:'Protect the vote: become a poll watcher',time:'Sep 28',date:'Sep 28',unread:false,
  body:['Poll watchers help make sure every eligible voter can cast a ballot. Training takes about an hour and most states need volunteers on Election Day.','Sign up through your state party and let your regional lead know so we can track coverage.']},
];
