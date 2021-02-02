module.exports=function prepend(x){
    if(typeof x=='string')x=x.split(',');
    if(!Array.isArray(x))x=[];
    return x.concat(this);
}