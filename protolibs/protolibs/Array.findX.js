module.exports=function(q1,q2,q3){
    // returns indices of all object entries that DON'T $matchall with at least one of the query terms
    // e.g. ([{a:1},{b:1},{c:1}]).findX({a:1},{c:1}) => [1]
    if(!(q1||q2||q3))return Array.from(this);
    if(q1.constructor == Array){
        q2=q1[1];
        q3=q1[2];
        q1=q1[0];
    }
    var r=[],t=this;for(var i=0;i<this.length;i++){
        if(t[i].$matchall(q1)||t[i].$matchall(q2)||t[i].$matchall(q3))r.push(i);
    };
    return r;
}
//WITH:Object.matchall