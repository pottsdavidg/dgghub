/* =====================================================================
   DB: the in-memory stand-in for SQLite. Each key is a future table.
   ===================================================================== */
const DB={
 users:[{id:1,name:'Jordan Ellis',first:'Jordan',email:'jordan.ellis@example.org',zip:'43201',account:'member',team:'media',theme:'system',donate_dismissed:false,join_min:false}],
 tasks:TASKS, bills:BILLS, ballot:BALLOT, events:EVENTS, media:MEDIA, wiki:WIKI,
 workshops:WORKSHOPS, rolodex:ROLODEX, races:RACES, orders:EOS, appointments:APPTS,
 cases:COURTS, legislation:LEG, agenda:AGENDA, teams:TEAMS,
};
