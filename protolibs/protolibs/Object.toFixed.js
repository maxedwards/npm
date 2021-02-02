module.exports=function(places){
    var O=this;
    Object.keys(O).forEach(k=>{
        if(typeof O[k]=='number') O[k]=O[k].$toFixed(places);
        else if(O[k].constructor==Object) O[k].$toFixed(places);
    });
    return O;
}
//WITH:Number.$toFixed