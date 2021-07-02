const rxFloat=/^\d+(\.\d+)?$/;
// keep depth low so that self-referencing objects don't waste CPU on constantly re-parsing themselves
module.exports=function(depth=5){
    let A=this,v;
    for(let i=0;i<A.length;i++){
        if(v=A[i]){
            if(Array.isArray(v) || v.constructor===Object) {if(depth>0)A[i].$parseFloats(depth-1);}
                else
            if(typeof v=='string' && rxFloat.test(v)) A[i]=parseFloat(v);
        }
    }
    return A;
}
//WITH:Object.parseFloats