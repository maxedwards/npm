module.exports=function(field){
    if(typeof field!='string')return [];
    var res=[],sel=this;
    var fields=field.split('+');
    if(fields.length==1)
        sel.forEach(function(e){ if(!res.$has(e[field]))res.push(e[field]); });
    else {
        sel.forEach(function(e){
            var vals=[];
            fields.forEach(function(f){ vals.push(e[f]); });
            vals=vals.join('||');
            if(res.$has(vals))return;
            res.push(vals);
            //console.log(vals);
        });
    }
    return res;
}
//WITH:Array.$has