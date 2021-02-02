module.exports=function(){
    let kill=Array.from(arguments);
    if(Array.isArray(kill[0]))kill=kill[0];
    let r={...this}
    kill.forEach(k=>delete r[k]);
    return r;
}