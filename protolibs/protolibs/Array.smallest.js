module.exports=function(){
    var v=null;
    this.forEach(av=>{if(!parseFloat(av))return;if(v==null||v>av)v=parseFloat(av);});
    return v;
}