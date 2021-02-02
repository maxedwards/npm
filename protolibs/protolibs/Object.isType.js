module.exports=function(T){
    return Object.prototype.toString.call(this)==Object.prototype.toString.call(new T);
}