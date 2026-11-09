/* Election Data: routes. */
route('POST','/elections/flip',({form})=>{const p=SESSION.mapPicks,cur=p[form.st]||'T';p[form.st]={T:'D',D:'R',R:'T'}[cur];return T_evmap('build',p)});

route('POST','/elections/reset',()=>{SESSION.mapPicks={};return T_evmap('build',{})});
