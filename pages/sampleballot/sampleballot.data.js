/* Sample Ballot: data. */
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

/* DGG community ballot breakdowns (only some candidates have one, on purpose) */
const BREAKDOWNS={
 c1:{by:'Priya D., Research Team',verdict:'Recommended',take:'Coleman has a strong record on broadband and voting access, and has co-led two bipartisan infrastructure bills this term.',flags:['Missed 4% of votes this term, mostly during a family leave in March.'],updated:'Oct 28'},
 c5:{by:'Marcus J., Research Team',verdict:'Recommended',take:'Grant ran the state\'s consumer protection office and has a detailed plan for election administration funding.',flags:['Faced criticism over a 2023 settlement negotiated by his office; an independent review found no wrongdoing.'],updated:'Oct 25'},
 c11:{by:'Ella H., Research Team',verdict:'Recommended',take:'Raman authored the state\'s school meal debt relief bill and has a 90% attendance record on floor votes.',flags:[],updated:'Oct 22'},
 c14:{by:'Ella H., Research Team',verdict:'Recommended',take:'Whitfield is a first-time candidate and public school teacher focused on school funding and housing costs.',flags:['Limited voting record, since she has not held office before.'],updated:'Oct 24'},
 c15:{by:'Marcus J., Research Team',verdict:'Not recommended',take:'Delacroix is running as an independent with positions that overlap the Democratic nominee; the race is close enough that splitting the vote matters.',flags:[],updated:'Oct 24'},
};
