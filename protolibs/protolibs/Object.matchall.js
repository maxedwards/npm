module.exports=function(q){
    if(!q) return false;
    if(typeof q=='function')return !!q(this);
    if(q.constructor != Object)return false;
    // e.g. ({a:1,b:2}).matchall({a:1,b:3}) => false
    // e.g. ({a:1,b:2}).matchall({a:1})     => true
    // queries can also be functions taking the whole record and returning boolean
    var K=Object.keys(q);
    var f,t=this;
    while(K.length>0){
        f=K.shift();
        if(q[f]==null){
            if(!(typeof t[f] == 'undefined' || t[f]==null)) return false;
        } else {
            if(q[f].constructor==RegExp){
                if(!q[f].test(t[f]))return false;
            }else if(q[f].constructor==Function){
                if(!q[f](t[f]))return false;
            }else{
                if(t[f]!=q[f])return false;
            }
        }
    }
    return true;
}
