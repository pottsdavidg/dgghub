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
/* Approved creators (fictional sample profiles; replace with real vetted creators) */
const CREATORS=[
 {n:'Marisol Vega',h:'@marisolexplains',ini:'MV',c:'#1144FF',plat:'TikTok, YouTube',reach:'2.4M',focus:'Election law explainers',why:'Accurate, sourced explainers that drive voter registration.'},
 {n:'Civic Sunday',h:'@civicsunday',ini:'CS',c:'#13824A',plat:'Instagram, Threads',reach:'380K',focus:'Local government',why:'Makes city council and school board decisions easy to follow.'},
 {n:'The Policy Wonk Pod',h:'@policywonkpod',ini:'PW',c:'#242424',plat:'Podcast',reach:'610K',focus:'Budget and health policy',why:'Evidence-based policy breakdowns from former congressional staff.'},
 {n:'Ray Bustamante',h:'@raybvotes',ini:'RB',c:'#C99A00',plat:'YouTube, Twitch',reach:'890K',focus:'Labor and young voters',why:'Reaches young voters and promotes canvassing and union organizing.'},
 {n:'Lakeside Liberal',h:'@lakesideliberal',ini:'LL',c:'#FF0F43',plat:'YouTube',reach:'1.2M',focus:'Midwest politics',why:'Consistently pro-democracy, fact-checked, and focused on winning elections.'},
 {n:'Ballot Basics',h:'@ballotbasics',ini:'BB',c:'#596079',plat:'Instagram, TikTok',reach:'540K',focus:'How to vote',why:'Clear, nonpartisan how-to-vote guides in English and Spanish.'},
];
const CREATOR_CRITERIA=['Supports liberal democratic values and getting Democrats elected','Sources claims and corrects mistakes publicly','Doesn\'t discourage voting or attack Democratic candidates in general elections','Reviewed by the Media Team every quarter'];
