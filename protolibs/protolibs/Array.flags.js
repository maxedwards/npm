module.exports=function(){
    let r={}
    this.map(x=>r[x]=true);
    return r;
}