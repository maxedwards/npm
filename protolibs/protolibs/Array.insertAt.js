module.exports=function(){
    let args=Array.from(arguments), pos=parseInt(args.shift());
    if(args.length==0 || !(pos==0||pos>0))return Array.from(this);
    let r=this.slice(0,pos);
    args.forEach(x=>r.push(x));
    return r.concat(this.slice(pos));
}