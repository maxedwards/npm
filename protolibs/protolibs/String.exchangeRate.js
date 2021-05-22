const processCache={};
//WITH:String.getJSON
module.exports=function(to,freshSeconds=60,cache=processCache,noisy){
    freshSeconds=Math.max(parseFloat(freshSeconds)||0,30);
    return new Promise(async (ok,fail)=>{
        let slug=`${this.toString()}-${to}`;
        let now=new Date().valueOf()/1000, staleBefore=now-freshSeconds;
        if(cache[slug]&&(cache[slug].t>=staleBefore))  return ok(cache[slug].v);
        if(noisy)console.log('String.$exchangeRate calling api.cryptonator.com for',slug);
        `https://api.cryptonator.com/api/ticker/${slug}`.$getJSON()
            .then(x=>{
                if(!x.success) throw 'API failure:'+x.error;
                x=cache[slug]={t:now,v:parseFloat(x.ticker.price)};
                ok(x.v);
            })
            .catch(fail);
    })
}

// e.g. let USD2GBP = await 'USD'.$exchangeRate('GBP')
