module.exports=function(T){
    T=T||Object;
    return Object.prototype.toString.call(this)==Object.prototype.toString.call(new T);
}