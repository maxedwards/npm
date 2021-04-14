const cache=[];
//WITH:String.getJSON
module.exports=function(to,freshSeconds=60){
    freshSeconds=Math.max(parseFloat(freshSeconds)||0,60);
    return new Promise(async (ok,fail)=>{
        let slug=`${this.toString()}-${to}`;
        let now=new Date().valueOf()/1000, staleBefore=now-freshSeconds;
        if(cache[slug]&&(cache[slug].t>=staleBefore))  return ok(cache[slug].v);
        console.log('String.exchangeRate is calling API..');
        `https://api.cryptonator.com/api/ticker/${slug}`.$getJSON()
            .then(x=>{
                if(!x.success) throw 'API failure:'+x.error;
                x=cache[slug]={t:now,v:x.ticker.price};
                ok(x.v);
            })
            .catch(fail);
    })
}

// e.g. let USD2GBP = await 'USD'.$exchangeRate('GBP')