//WITH:Class.fetch,String.btoa
//TODO: get Function.$fetch working and then strip out the node-only stuff
module.exports=function(opts){
    let url=this.toString();
    return new Promise((ok,fail)=>{
        let F=(typeof fetch=='undefined')?require('node-fetch'):fetch;
        //console.log('$getJSON',url,new Date().toLocaleTimeString());
        //console.log('Arguments',Array.from(arguments));

        let c={headers:{
            //'Content-Type': 'application/x-www-form-urlencoded'
            'Accept': 'application/json',//, text/plain, */*'
        }};

        if(opts&&opts.username&&opts.password)c.headers.Authorization='Basic '+(opts.username + ":" + opts.password).$btoa();

        if(opts&&opts.post&&opts.post.constructor===Object){
            //console.log('POSTing an Object');
            c.headers["Content-Type"]="application/json";
            c.method='post';
            c.body=JSON.stringify(opts.post);
        }

        //console.log('config',c);

        F(url, c)
                .then(response => response.json())
                .then(json => ok(json))
                .catch(fail);
        }
    );
}
