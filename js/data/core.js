/* =====================================================================
   SEED DATA  (becomes your SQLite seed script / fixtures)
   Everything here is sample data for the prototype.
   ===================================================================== */
/* ---------- sample data ---------- */
const USER={first:'Jordan',name:'Jordan Ellis',initials:'JE',addr:'1420 Neil Ave, Columbus, OH 43201',county:'Franklin County',precinct:'Columbus 21-C',ward:'Ward 21'};
const ELECTION=new Date('2026-11-03T06:30:00-05:00');
const daysLeft=()=>Math.max(0,Math.ceil((ELECTION-new Date())/864e5));

/* ---------- external links ---------- */
const DONATE_URL='https://secure.actblue.com/donate/dggsubscriber';
const DISCORD_URL='https://discord.gg/digitalgroundgame';

/* =====================================================================
   POLITICAL HUB v3 DATA  (sample data unless noted)
   ===================================================================== */

/* Elections + important dates. The dashboard shows a countdown only when
   an election is within 100 days of today. */
const ELECTIONS=[
 {date:'2026-12-01',name:'Georgia general election runoff (if needed)',states:['GA']},
 {date:'2027-04-06',name:'Wisconsin spring election',states:['WI']},
 {date:'2027-05-04',name:'Ohio primary election',states:['OH']},
 {date:'2027-11-02',name:'Off-year general elections (VA, NJ, and local races)',states:['VA','NJ','OH']},
];
const IMPORTANT_DATES=[
 ['2026-12-01','Georgia runoff (if needed)','Election','red',null],
 ['2027-01-03','120th Congress is sworn in','Congress','blue',null],
 ['2027-01-12','Most state legislatures begin 2027 sessions','States','',null],
 ['2027-04-06','Wisconsin spring election','Election','red','WI'],
 ['2027-04-05','Registration deadline for Ohio\'s May primary','Deadline','yel','OH'],
 ['2027-05-04','Ohio primary election','Election','red','OH'],
 ['2027-11-02','Off-year general elections','Election','red',null],
 /* Added for the 12-month dashboard timeline. The dashboard sorts by date; 'Civic' rows are dashboard-only. */
 ['2026-11-11','Veterans Day','Civic','green',null],
 ['2026-11-23','Georgia runoff early voting begins','Election','red','GA'],
 ['2027-01-18','Martin Luther King Jr. Day','Civic','green',null],
 ['2027-02-01','President\'s budget due to Congress','Congress','blue',null],
 ['2027-02-15','Presidents\' Day','Civic','green',null],
 ['2027-02-16','Wisconsin spring primary (if needed)','Election','red','WI'],
 ['2027-03-07','Anniversary of Bloody Sunday in Selma','Civic','green',null],
 ['2027-04-15','Congressional budget resolution deadline','Congress','blue',null],
 ['2027-05-18','Kentucky primary election','Election','red','KY'],
 ['2027-05-31','Memorial Day','Civic','green',null],
 ['2027-06-08','New Jersey primary election','Election','red','NJ'],
 ['2027-06-15','Virginia primary election','Election','red','VA'],
 ['2027-06-19','Juneteenth','Civic','green',null],
 ['2027-07-04','Independence Day','Civic','green',null],
 ['2027-08-03','Mississippi primary election','Election','red','MS'],
 ['2027-08-06','Voting Rights Act anniversary','Civic','green',null],
 ['2027-08-26','Women\'s Equality Day','Civic','green',null],
 ['2027-08-31','Mississippi primary runoff (if needed)','Election','red','MS'],
 ['2027-09-17','Constitution Day','Civic','green',null],
 ['2027-09-30','Federal fiscal year and funding end','Deadline','yel',null],
 ['2027-10-04','Ohio registration deadline for November','Deadline','yel','OH'],
 ['2027-10-09','Louisiana primary election','Election','red','LA'],
 ['2027-10-11','Indigenous Peoples\' Day / Columbus Day','Civic','green',null],
 ['2027-04-27','Ohio mail-in ballot request deadline (May primary)','Deadline','yel','OH'],
 ['2027-05-04','Ohio mail-in ballots due by 7:30 p.m. (May primary)','Deadline','yel','OH'],
 ['2027-10-26','Ohio mail-in ballot request deadline (November)','Deadline','yel','OH'],
 ['2027-11-02','Ohio mail-in ballots due by 7:30 p.m. (November)','Deadline','yel','OH'],
];
/* Dates a voter in this state can act on: that state's elections and deadlines, plus nationally listed elections its voters take part in (per ELECTIONS). */
const voterDates=st=>IMPORTANT_DATES.filter(x=>x[4]===st||(!x[4]&&ELECTIONS.some(e=>e.date===x[0]&&e.states.includes(st)))).sort((a,b)=>a[0].localeCompare(b[0]));

/* All states: [code, name, House seats (2020 census), capital, largest city] */
const STATES=[['AL','Alabama',7,'Montgomery','Huntsville'],['AK','Alaska',1,'Juneau','Anchorage'],['AZ','Arizona',9,'Phoenix','Phoenix'],['AR','Arkansas',4,'Little Rock','Little Rock'],['CA','California',52,'Sacramento','Los Angeles'],['CO','Colorado',8,'Denver','Denver'],['CT','Connecticut',5,'Hartford','Bridgeport'],['DE','Delaware',1,'Dover','Wilmington'],['DC','District of Columbia',1,'Washington','Washington'],['FL','Florida',28,'Tallahassee','Jacksonville'],['GA','Georgia',14,'Atlanta','Atlanta'],['HI','Hawaii',2,'Honolulu','Honolulu'],['ID','Idaho',2,'Boise','Boise'],['IL','Illinois',17,'Springfield','Chicago'],['IN','Indiana',9,'Indianapolis','Indianapolis'],['IA','Iowa',4,'Des Moines','Des Moines'],['KS','Kansas',4,'Topeka','Wichita'],['KY','Kentucky',6,'Frankfort','Louisville'],['LA','Louisiana',6,'Baton Rouge','New Orleans'],['ME','Maine',2,'Augusta','Portland'],['MD','Maryland',8,'Annapolis','Baltimore'],['MA','Massachusetts',9,'Boston','Boston'],['MI','Michigan',13,'Lansing','Detroit'],['MN','Minnesota',8,'Saint Paul','Minneapolis'],['MS','Mississippi',4,'Jackson','Jackson'],['MO','Missouri',8,'Jefferson City','Kansas City'],['MT','Montana',2,'Helena','Billings'],['NE','Nebraska',3,'Lincoln','Omaha'],['NV','Nevada',4,'Carson City','Las Vegas'],['NH','New Hampshire',2,'Concord','Manchester'],['NJ','New Jersey',12,'Trenton','Newark'],['NM','New Mexico',3,'Santa Fe','Albuquerque'],['NY','New York',26,'Albany','New York City'],['NC','North Carolina',14,'Raleigh','Charlotte'],['ND','North Dakota',1,'Bismarck','Fargo'],['OH','Ohio',15,'Columbus','Columbus'],['OK','Oklahoma',5,'Oklahoma City','Oklahoma City'],['OR','Oregon',6,'Salem','Portland'],['PA','Pennsylvania',17,'Harrisburg','Philadelphia'],['RI','Rhode Island',2,'Providence','Providence'],['SC','South Carolina',7,'Columbia','Charleston'],['SD','South Dakota',1,'Pierre','Sioux Falls'],['TN','Tennessee',9,'Nashville','Nashville'],['TX','Texas',38,'Austin','Houston'],['UT','Utah',4,'Salt Lake City','Salt Lake City'],['VT','Vermont',1,'Montpelier','Burlington'],['VA','Virginia',11,'Richmond','Virginia Beach'],['WA','Washington',10,'Olympia','Seattle'],['WV','West Virginia',2,'Charleston','Charleston'],['WI','Wisconsin',8,'Madison','Milwaukee'],['WY','Wyoming',1,'Cheyenne','Cheyenne']];
const STATE_BY=Object.fromEntries(STATES.map(s=>[s[0],s]));
const citiesOf=code=>{const s=STATE_BY[code];return [...new Set([s[3],s[4]])].sort()};

/* Deterministic sample-name generator (same inputs always give the same person) */
const FIRST=['Alex','Jordan','Taylor','Morgan','Casey','Riley','Avery','Quinn','Jamie','Drew','Dana','Robin','Marisol','Darius','Elena','Marcus','Priya','Hannah','Luis','Grace','Owen','Nadia','Victor','Renee','Tomas','Keisha','Wes','Ingrid','Malik','Colleen','Hector','June'];
const LAST=['Alvarez','Brennan','Castillo','Dawson','Ellison','Fairbanks','Garrett','Holloway','Ibarra','Jennings','Kowalski','Lindgren','Mercer','Nakamura','Okafor','Pruitt','Quintero','Ramsey','Sutherland','Tran','Underwood','Vance','Whitfield','Yates','Zamora','Abernathy','Bishop','Coleridge','Delacroix','Esposito'];
function seeded(str){let h=2166136261;for(const c of str){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return ()=>{h^=h<<13;h^=h>>>17;h^=h<<5;return (h>>>0)/4294967296}}
