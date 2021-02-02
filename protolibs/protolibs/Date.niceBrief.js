module.exports=function(){ 
    if(Number.isNaN(this.valueOf())) return null;
    return this.$format("dd-mmm-yyyy");
}
//WITH:Date.$format