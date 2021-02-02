module.exports=function(incTime,fileSafe){
    if(Number.isNaN(this.valueOf())) return null;
    var tsep=fileSafe?'-':':';
    var tform='';
    if (incTime&&!fileSafe) tform=" HH:MM:ss";
    if (incTime&& fileSafe) tform=" HH-MM-ss";
    
    return this.$format("ddd dd-mmm-yyyy" + tform);
}
//WITH:Date.$format