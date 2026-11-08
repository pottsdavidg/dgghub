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

/* DGG Team: operations (sample) */
const OPERATIONS=[
 {id:'op1',name:'Georgia Runoff Support',status:'Recruiting',cls:'red',dates:'Nov 21 – Nov 30, 2026',where:'Atlanta metro, GA',lead:'Kai (South Squad Lead)',goal:120,signed:74,
  roles:[['Canvassers',80,52],['Canvass captains',12,7],['Drivers',10,6],['Phone bankers (remote)',18,9]],
  shifts:[['Sat, Nov 21','9 a.m. – 1 p.m.','Decatur',20,17],['Sat, Nov 21','2 p.m. – 6 p.m.','Decatur',20,11],['Sun, Nov 22','10 a.m. – 2 p.m.','Marietta',20,14],['Sat, Nov 28','9 a.m. – 1 p.m.','College Park',20,9],['Sun, Nov 29','10 a.m. – 2 p.m.','Stone Mountain',20,5]],
  checklist:[['Book volunteer housing',true],['Print 4,000 door hangers',true],['Cut turf with local party',false],['Confirm parking at staging sites',false],['Send training video to volunteers',false]],
  turf:[['DEC-01','Decatur',412,'Assigned'],['DEC-02','Decatur',388,'Assigned'],['MAR-01','Marietta',455,'Open'],['CPK-01','College Park',370,'Open'],['STM-01','Stone Mountain',401,'Open']]},
 {id:'op2',name:'Ohio Spring Kickoff Canvass',status:'Planning',cls:'yel',dates:'Mar 20 – 21, 2027',where:'Columbus + Cleveland, OH',lead:'Ulysses (Midwest Regional Lead)',goal:300,signed:41,
  roles:[['Canvassers',220,30],['Canvass captains',30,5],['Drivers',20,2],['Event hosts',30,4]],
  shifts:[['Sat, Mar 20','10 a.m. – 2 p.m.','Columbus',60,22],['Sun, Mar 21','10 a.m. – 2 p.m.','Cleveland',60,19]],
  checklist:[['Pick target precincts with Research Team',true],['Reserve rally venue',false],['Open volunteer sign-ups',true],['Order clipboards and walk list printing',false]],
  turf:[['COL-01','Columbus',0,'Not cut'],['CLE-01','Cleveland',0,'Not cut']]},
 {id:'op3',name:'Final Weekend: San Antonio',status:'Completed',cls:'green',dates:'Oct 31 – Nov 1, 2026',where:'San Antonio, TX',lead:'Kai (South Squad Lead)',goal:150,signed:162,
  roles:[['Canvassers',120,131],['Canvass captains',15,16],['Drivers',15,15]],shifts:[],checklist:[['Debrief posted to Discord',true],['Upload photos to Media',true]],turf:[]},
];
