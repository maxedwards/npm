module.exports=function(){
    if(this.length==0)return null;
    if(this.length==1)return this[0];
    return this[Math.floor(this.length*Math.random())];
}