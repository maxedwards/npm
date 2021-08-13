module.exports=function(allow){
    if(!Array.isArray(allow))return [];//throw 'argument must be an array';
    if(allow.length==0)return [];
    var r=[];
    this.forEach(function(v){if(allow.$has(v))r.push(v);});
    return r;
}
//WITH:Array.$has
