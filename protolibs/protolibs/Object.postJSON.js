module.exports=function(opts){
    return new Promise((ok,fail)=>{
        if(!opts)return fail('Options missing');
        if(typeof opts.url!='string')return fail('url missing');
        opts.url.$getJSON({...opts,post:this}).then(ok).catch(fail);
    });
}
//WITH:String.$getJSON