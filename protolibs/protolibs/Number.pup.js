module.exports=function(pre=4,post=4){
    let r=parseFloat(this.toFixed(post)).toString().split('.');
    if(r.length==1)r.push('0');
    return r[0].padStart(pre)+'.'+r[1].padEnd(post);
}