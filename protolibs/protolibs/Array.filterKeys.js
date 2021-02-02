module.exports=function(O,crit,exact){
    // for a simple array of keys, pass in the master object and an arbitrary list of filter criteria
    // e.g. ['id1','id2'].filterKeys(O,{hello:'there','hello':'bye'})
    // matches any of the criteria (OR logic)
    // for AND logic just chain calls together:
    // e.g. O.keys().filterKeys(O,{}).filterKeys(O,{}).. etc
    if(!crit || crit.constructor!==Object)return; // ADDED 19-Jan-2021
    var ck=Object.keys(crit);
    if(!(ck&&ck.length))return;
    if(!exact)ck.forEach(f=>{crit[f]=crit[f].toString().toLowerCase()});
    var r=[];
    this.forEach(k=>{
        if(!O[k])return;
        var ok;
        ck.forEach(f=>{
            if(ok)return;
            if(!O[k][f])return;
            if(exact){
                if(O[k][f]==crit[f])return ok=1;
            }else{
                if(O[k][f].toString().toLowerCase().indexOf(crit[f])>=0)return ok=1;
            }
        });
        if(ok)r.push(k);
    });
    return r;
}
