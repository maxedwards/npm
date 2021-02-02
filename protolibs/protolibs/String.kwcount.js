String.kwcount
    ,module.exports = function(kwlist){
            // don't rely on this, just pass an Array:
            if(typeof kwlist=='string')kwlist=kwlist.split(' ').ltrim();
            if(!Array.isArray(kwlist))return 0;
            let c=0,x=this;
            kwlist.forEach(k=>{if(x.indexOf(k)>=0)c++});
            return c;
        }