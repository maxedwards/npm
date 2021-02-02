module.exports=function(ignoreCase){
    var i=0,e,j;
    while(i<this.length){
        e=this[i];
        if(ignoreCase)e=e.toLowerCase();
        j=i+1;
        while(j<this.length){
            if((ignoreCase&&(this[j].toLowerCase()==e)) || (this[j]==e))
                this.splice(j,1);
            else
                j++;
        }
        i++;
    }
    return this;
}