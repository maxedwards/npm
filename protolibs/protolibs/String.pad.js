module.exports=function (len) {
    var v=this;
    len = len || 2;
    while (v.length < len) v = "0" + v;
    return v;
}