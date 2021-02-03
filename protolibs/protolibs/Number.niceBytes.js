module.exports=function(){
    var v=this.valueOf();
    if(v<1000)return v+'B';
    if(v<1024000)return (v/1024).$commas(1)+'KB';
    if(v<1024000000)return (v/(1024*1024)).$commas(1)+'MB';
    return (v/(1024*1024*1024)).$commas(1)+'GB';
}
//WITH:Number.$commas