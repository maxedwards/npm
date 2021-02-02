module.exports=function(O,f){
    var r=0; var valt;
    if(f){
        var fp=f.split('||');
        f=fp[0]; valt=parseFloat(fp[1])||0;
    }
    this.forEach(function(x){
        var X=O&&O[x]||x;
        var v=parseFloat(X);
        if(f)v=v||parseFloat(X[f])
        v=v||valt;
        r+=v;
    });
    return r;
}