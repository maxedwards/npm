module.exports=function(arr2){
    if(!Array.isArray(arr2)) return this;
    if(arr2.length==0)return this;
    arr2.forEach(x=>this.$has(x)||this.push(x));
    return this;
}
//WITH:Array.$has