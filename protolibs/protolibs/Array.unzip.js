module.exports=function(){
    let cols=this.shift(),r,v;
    return this.map(row=>{
        r={};
        cols.forEach(k=>{
            v=row.shift();
            if(v!==null && typeof v!='undefined')r[k]=v;
        });
        return r;
    });
}
//module.exports.devReload=true;