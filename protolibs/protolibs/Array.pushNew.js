module.exports=function(x){
    if(this.indexOf(x)>=0||(typeof x=='string' && this.indexOf(x.toLowerCase())>=0))return;
    this.push(x);
}