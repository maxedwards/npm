module.exports=function(){
    //return this;
    let cols=[];
    this.forEach(x=>{
        if(x.constructor !== Object) return;
        Object.keys(x).forEach(k=>cols.$has(k)||cols.push(k));
    });
    let body=[cols];
    this.forEach(x=>{
        if(x.constructor !== Object) return body.push(x);
        let row=[];
        cols.forEach(k=>{
            row.push(x[k]);
            //if(typeof x[k]!='undefined')
        });
        while(row.length&&typeof row[row.length-1]=='undefined')row.splice(row.length-1,1);
        body.push(row);
    });
    return body;
}
//WITH:Array.has