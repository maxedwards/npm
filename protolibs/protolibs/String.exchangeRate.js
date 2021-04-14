const exchangeCache=[];
//WITH:String.getJSON
module.exports=function(to,freshSeconds=60){
    freshSeconds=Math.max(parseFloat(freshSeconds)||0,60);
    return new Promise(async (ok,fail)=>{
        let slug=`${this.toString()}-${to}`;
        let now=new Date().valueOf()/1000, staleBefore=now-freshSeconds;
        //console.log({freshSeconds,staleBefore});

        if(exchangeCache[slug]&&(exchangeCache[slug].t>=staleBefore)) {
            //console.log('String.exchangeRate.js CACHE HIT');
            return ok(exchangeCache[slug].v);
        }

        // if(exchangeCache[slug])console.log('Stale cache:',exchangeCache[slug].t);
        console.log('String.exchangeRate is calling API..');

        `https://api.cryptonator.com/api/ticker/${slug}`.$getJSON()
            .then(x=>{
                if(!x.success) throw 'API failure:'+x.error;
                x.timestamp=now;
                x=exchangeCache[slug]={t:now,v:x.ticker.price};
                //console.log(x);
                ok(x.v);
            })
            .catch(fail);
    })
}

// e.g. let USD2GBP = await 'USD'.$exchangeRate('GBP')