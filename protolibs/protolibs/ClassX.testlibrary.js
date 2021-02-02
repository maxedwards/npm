module.exports=function(t,id){
    let T=eval(t);
    let code;
    if(t=='Function'||t=='Class')
        code=`(new Function.${id}())`;
    else
        code=`(new ${t}).${id}()`;
    try{
        let res=eval(code);
        if(res && res.constructor==Promise){
            prom++;
            console.log('..Promise returned, will handle.');
            res.then(x=>didprom('Promise OK:',code))
            .catch(x=>didprom('Promise FAIL:',code,':',x));
        } else console.log(t,'.',id,':no error');
    }catch(e){
        console.log('ERR:',code,e);
        throw 'QUIT!';
    }
}
function cmd(c){
    console.log('>',c);
    try{
        console.log(eval(c),'\n\n');
    }catch(e){
        console.error('ERR!',e,'\n');
    }
}
let prom=0;
function didprom(){
    prom--;
    console.log.apply(console.log,arguments);
    if(prom==0)console.log('**ALL PROMISES COMPLETED**');
}