module.exports=function(field,minval,maxval){
    // Operates on an EXPANDED array
    var res=[];
    this.forEach(function(O){
        if((!minval||O[field]>=minval)&&(!maxval||O[field]<=maxval))res.push(O);
    });
    return res;
}