module.exports=function(places){
    var O=this;
    Object.keys(O).forEach(k=>{
        if(typeof O[k]=='number') O[k]=O[k].$commas(places);
        else if(O[k].constructor==Object) O[k].$commas(places);
    });
    return O;
}
//WITH:Number.$commas