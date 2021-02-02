module.exports=function(fileSafe){
    if(Number.isNaN(this.valueOf())) return null;
    return this.$format(fileSafe?'HH-MM-ss':'HH:MM:ss');
}
//WITH:Date.$format