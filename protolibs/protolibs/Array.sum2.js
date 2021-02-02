module.exports=function(f){
    var s=0,v;
    this.forEach(function(O){
        var v=parseFloat(O[f]);
        s+=v.$isNaN()?0:v;
    });
    return s;
}
//WITH:Number.isNaN