module.exports=function(){
    this.sort();
    var i=1,prev=this[0];
    while(i<this.length)
        if(this[i]==prev)
            this.splice(i,1);
        else{
            prev=this[i];
            i++;
        }
    return this;
}