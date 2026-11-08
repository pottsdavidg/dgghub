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
