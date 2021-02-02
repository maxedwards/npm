module.exports=function(ilist){
    if(!Array.isArray(ilist))return [];//throw 'argument must be an array';
    // returns only the entries at the specified indices, in a new array
    // NOTE the entries are the same and any edits will affect the source array
    var r=[],t=this;
    ilist.forEach(function(i){
        r.push(t[i]);
    });
    return r;
}