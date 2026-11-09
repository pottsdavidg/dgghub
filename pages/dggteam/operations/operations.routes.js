/* Operations: routes. */
route('POST','/ops/{id}/shift/{i}',({params,res})=>{const op=OPERATIONS.find(o=>o.id===params.id),s=op.shifts[+params.i];
 s[5]=!s[5];s[4]+=s[5]?1:-1;op.signed+=s[5]?1:-1;res.toast(s[5]?`You claimed ${s[0]}, ${s[1]} in ${s[2]}`:'Shift dropped');return T_op_detail(op)});

route('POST','/ops/{id}/check/{i}',({params})=>{const op=OPERATIONS.find(o=>o.id===params.id),c=op.checklist[+params.i];c[1]=!c[1];return T_op_detail(op)});
