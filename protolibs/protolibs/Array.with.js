module.exports=function(x){
    let n=Array.from(this);
    n.$pushNew(x);
    return n;
}
//WITH:Array.$pushNew