module.exports=function(){
    if(Number.isNaN(this.valueOf())) return null;
    return this.$format("yyyy-mm-dd HH-MM-ss");
}
//WITH:Date.$format