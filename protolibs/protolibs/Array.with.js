module.exports=function(){
    let n=Array.from(this);
    Array.from(arguments).map(x=>n.$pushNew(x));
    return n;
}
//WITH:Array.$pushNew