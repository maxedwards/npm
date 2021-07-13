const rxFloat=/^-?\d+(\.\d+)?$/;
// keep depth low so that self-referencing objects don't waste CPU on constantly re-parsing themselves
module.exports=function(depth=5){
    let O=this;
    Object.entries(O).forEach(([k,v])=>{
        if(!v)return;
        if(Array.isArray(v) || v.constructor===Object) {if(depth>0)v.$parseFloats(depth-1);}
            else
        if(typeof v=='string' && rxFloat.test(v)) O[k]=parseFloat(v);
    })
    return this;
}
//WITH:Array.parseFloats