module.exports=function(){
    return this.toString()
                .split('-')
                .map((s,i)=>
                        i>0
                        ? (
                            (s.slice(0,1)||'').toUpperCase()
                            +(s.slice(1)||'').toLowerCase()
                        )
                        : s.toLowerCase()
                ).join('');
}