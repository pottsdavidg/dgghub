/* Election Models: data. */
const RACES=[
 {id:'oh7',name:'Ohio House District 7',dem:'Nora Whitfield',rep:'Gregory Haines (inc.)',trend:[39,41,40,43,44,43,45,46,45,47,47.5],contacts:'18,240'},
 {id:'oh15',name:'Ohio Senate District 15',dem:'Priya Raman (inc.)',rep:'Doug Kessler',trend:[58,59,61,60,62,61,62,64,63,62,63],contacts:'24,910'},
 {id:'oh09',name:'U.S. House, Ohio District 9',dem:'Sample Democrat',rep:'Sample Republican',trend:[55,54,53,52,50,51,50,51,52,53,52],contacts:'31,005'},
 {id:'fcc',name:'Franklin County Commission',dem:'Susan Okafor (inc.)',rep:'Brian Tolliver',trend:[66,67,68,69,70,69,70,71,72,71,71],contacts:'12,470'},
 {id:'mi38',name:'Michigan House District 38',dem:'Sample Democrat',rep:'Sample Republican',trend:[44,45,43,44,46,45,46,47,48,49,50],contacts:'9,860'},
];

const rateOf=p=>p>=85?['Safe D','blue']:p>=65?['Likely D','blue']:p>=55?['Lean D','blue']:p>45?['Toss-up','yel']:p>35?['Lean R','red']:p>15?['Likely R','red']:['Safe R','red'];
