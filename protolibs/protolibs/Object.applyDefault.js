module.exports=function(f,val){
    if(typeof this[f]=='undefined')this[f]=val;
    return this;
}