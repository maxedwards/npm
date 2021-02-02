module.exports=function(q1,q2,q3,offset,limit){
    // returns indices of all object entries that $matchall with at least one of the query terms
    // e.g. ([{a:1},{b:1},{c:1}]).find({a:1},{c:1}) => [0,2]
    // queries can also be functions taking the whole record and returning boolean
    if(!(q1||q2||q3))return Array.from(this);
    if(q1.constructor == Array){
        q2=q1[1];
        q3=q1[2];
        q1=q1[0];
    }
    var r=[],t=this;
    
    
    // BREAKS PRODX, SO NO!
    //return Array._safeBraces.native.filter.call(t, (x=>(
    //            x.$matchall(q1)
    //            ||(q2&&x.$matchall(q2))
    //            ||(q3&&x.$matchall(q3))
    //        )
    //    )
    //);
    

    let off=parseInt(offset),lim=parseInt(limit);

    for(var i=0;i<t.length;i++){
        if(t[i].$matchall(q1)||t[i].$matchall(q2)||t[i].$matchall(q3)){
            if(off>0)return off--;
            if(lim&&r.length>lim)return;
            r.push(i);
        }
    };
    return r;
}
//WITH:Object.matchall