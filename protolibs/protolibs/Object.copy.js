module.exports=function(fields,subfields){
    if(fields){
        if(typeof fields=='string')fields=fields.split(',');
    } else fields=Object.keys(this);
    //console.log(fields);
    var r={},src=this;
    fields.forEach(function(f){
        var v=src[f]; if(v&&v.constructor==Object)v=v.$copy(subfields); r[f]=v;
    });
    return r;
}