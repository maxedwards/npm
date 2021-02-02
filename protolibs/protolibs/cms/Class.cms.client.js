module.exports=function({root,navTree,msTransition}){
    //console.log('cms client init, navTree=', navTree);
    msTransition=parseInt(msTransition);

    const loadState=function(J,pu){
        let d, ud=[], no=[], old={};
        // nav rebuild:
        let nav=Function.$cmsRenderTree(navTree, root, pu);
        document.querySelectorAll('.cms-nav').forEach(d=>{
            d.innerHTML=nav;
            wire();
            ud.push('nav');
        });
        
        // update other fields:
        J.$keys().forEach(k=>{
            if(d=document.getElementById(`cms-${k}`)){
                if(old[k]=d.getAttribute('content')) {
                    d.setAttribute('content',J[k].$htmlEscape());
                } else {
                    old[k]=d.innerHTML;
                    if(msTransition>0){
                        d.classList.remove('cms-updated');
                        d.classList.add('cms-updating');
                    }
                    d.innerHTML=J[k];
                    if(msTransition>0)
                        setTimeout(()=>{
                            d.classList.remove('cms-updating');
                            d.classList.add('cms-updated');
                        }, msTransition);
                };
                ud.push(k);
            } else no.push(k);
        });
        console.log({Updated:ud.join(','),Unused:no.join(',')});
        //console.log('old',old);
        return old;
    }

    const chandle=function(){
        let pu=this.getAttribute('href'), ju=this.href.split('.htm').join('.json'), old;
        //alert(u);
        document.body.classList.add('cms-fetching');
        setTimeout(()=>ju.$getJSON().then(J=>{
            document.body.classList.remove('cms-fetching');
            //alert(JSON.stringify(J,null,3));
            old=loadState(J,pu);
            if(!(history.state&&history.state.J&&history.state.pu))
                history.replaceState({J:old}, old.title, location.pathname);
            history.pushState({J}, J.title, pu);
        }).catch(e=>{
            document.body.classList.remove('cms-fetching');
            alert(e);
            document.location=pu;
        }), 1);
        return false;
    }

    const wire=()=>document.querySelectorAll('ul.cmsnav li a').forEach(a=>a.onclick=chandle);
    wire();

    window.addEventListener('popstate', (event) => {
        //console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
        if(event.state&&event.state.J)
            loadState(event.state.J, location.pathname);
        else location.reload();
    });


}
//WITH:String.getJSON,Object.keys,Class.cmsRenderTree,String.htmlEscape