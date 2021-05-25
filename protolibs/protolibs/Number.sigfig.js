module.exports=function(n=2){
    return parseFloat(this.toFixed(n));
    var p=10**n;
    return Math.round(p*this)/p;
}