module.exports=function(){
    if(Number.isNaN(this.valueOf())) return null;
    return this.$format("yyyy-mm-dd");
}
//WITH:Date.$format