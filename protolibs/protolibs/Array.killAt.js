module.exports=function(ilist){
    if(!Array.isArray(ilist))return this;//throw 'argument must be an array';
    var offs=0,t=this;
    ilist.sort().forEach(function(i){
        t.splice(i-offs,1);
        offs++;
    });
    return t;
}