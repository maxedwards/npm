module.exports=function(){
    return this.map(s=>encodeURIComponent(s)).join(',');
}