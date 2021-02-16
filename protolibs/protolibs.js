const types=['Object','Date','Array','String','Number','Boolean'];
const alltypes=types.concat(['Class']);
const corelibs=require('./protolibs/__corelibs.json');
const stopwatch=require('@maxedwards/stopwatch');
const fs=require('fs'), p=require('path'), isLive=process.env.NODE_ENV=='production';

const prefix='$';

const { minify } = require('terser'); // terser 4.6.3 provides SYNC minify, latest version is ASYNC!
const lists={core:{}};

const protolibs=module.exports={};

const optsGlobal={verbose:false};

const alldirs=[];


protolibs.shrinkJS=function(code){
    let min=minify(code.toString());
    return (min.error)
        ? `/*terser error:${min.error}*/\n${code}`
        : min.code;
}

function mreq(path,core){
    path=require.resolve(path);
    if(core){
        let F=require(path);
        if(typeof F!='function')throw 'protolibs.js: NOT A FUNCTION:'+path;
        if(optsGlobal.verbose)console.log('..LOADED CORE',path);
        return F
    }
    return function(){
        /*
        if(!require.cache[path]){
            if(!isLive){
                delete require.cache[path];
                console.log('protolibs.js DEV reload',path);
            }
        } else {
            console.log('protolibs.js first-time lazy-load',path);
        }
        */
        let F=require(path);
        if(typeof F!='function')throw 'protolibs.js: NOT A FUNCTION:'+path;
        if(F.noDevCache && !isLive){
            delete require.cache[path];
            console.log('protolibs.js noDevCache:',path);
        }
        return F.apply(this,arguments);
    }
}

protolibs.initServerside=function(fromDir){
    if(!fromDir || typeof fromDir != 'string') fromDir=p.join(__dirname,'protolibs');
    if(true || optsGlobal.verbose)console.log('protolibs.js SCANNING',fromDir);
    let added=0;
    
    let spa;
    types.forEach(t=>{
        let T=eval(t);
        T.$protolibs=T.$protolibs||[];
        try{ spa=require.resolve(p.join(fromDir,`_static.${t}.js`)); }
        catch(e){ return; }
        try{
            require(spa);
            if(optsGlobal.verbose)console.log('Loaded static file',spa);
        }catch(e){
            console.error('Error in static file',spa,'\n',e);
        }
    });
    Function.$protolibs=Function.$protolibs||[];

    function addProto(t,id,f,core){
        //core=core&&isLive;//otherwise lazy load with cache clearing
        let path=p.join(fromDir,f), lab=`${core?'core':'lazy'}`;
        lists[lab]=lists[lab]||{};
        let cat=`${t}.prototype.`;
        lists[lab][cat]=lists[lab][cat]||[]; 
        lists[lab][cat].push(id);
        let T=eval(t);
        T.prototype[id]=mreq(path,core)
        T.$protolibs.push(id);
        added++;
    }

    function addClass(t,id,f,core){
        //core=core&&isLive;//otherwise lazy load with cache clearing
        let path=p.join(fromDir,f), lab=`${core?'core':'lazy'}`;
        lists[lab]=lists[lab]||{};
        let cat=`Function.`;
        lists[lab][cat]=lists[lab][cat]||[]; 
        lists[lab][cat].push(id);
        Function[id]=mreq(path,core);
        //console.log('added Function',id,'core=',core)
        Function.$protolibs.push(id);
        added++;
        //
        return;
        // OLD:
        /*
        let path=p.join(fromDir,f);
        lists.core["Function."]=lists.core.Function||[];
        lists.core["Function."].push(id); //lists[t].sort();
        added++;
        //Function[id]=require(path);
        Function[id]=mreq(path,false);
        //console.log('**ADDED CLASS',id)
        Function.$protolibs.push(id);
        */
    }
    
    try{
        fs.readdirSync(fromDir).forEach(f=>{
            if(!f.endsWith('.js'))return;
            let p=f.split('.');
            if(p.length==3){ 
                let t=p[0]; let core=corelibs[t]&&corelibs[t].indexOf(p[1])>=0;
                if(types.indexOf(t)>=0) return addProto(t,prefix+`${p[1]}`,f,core);
                if(t=='Class') return addClass(t,prefix+`${p[1]}`,f,core);
            }
            if(p[0]!='_static')if(optsGlobal.verbose)console.log('protolibs.js skipping',f);
        });
    }catch(e){
        console.error(e.message);
    }
    
    if(optsGlobal.verbose)console.log('protolibs.js auto-added',added,'$prototypes and $classes\n');
    return (lists);
}

protolibs.testlibs=function(limitType){
    let prom=0;
    function didprom(){
        prom--;
        console.log.apply(console.log,arguments);
        if(prom==0)console.log('**ALL PROMISES COMPLETED**');
    }
    types.forEach(t=>{
        let T=eval(t); if(limitType&&T!==limitType)return;
        T.$protolibs.forEach(id=>{
            let code;
            if(t=='Function')
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
                }
            }catch(e){
                console.log('ERR:',code,e);
                throw 'QUIT!';
            }
        });
    });

    console.log('All tests completed, awaiting',prom++,'Promises');
}

//console.log('\n');



function clientFirst(path){
    try{
        let pcli=path.replace('.js','.client.js');
        let r=fs.readFileSync(pcli).toString();
        if(optsGlobal.verbose)console.log('CLIENT VERSION:',pcli);
        return r;
    }catch(e){
        return fs.readFileSync(path).toString();
    }
}

protolibs.clientCache={Compiled:{}};

protolibs.compileClient=function(opts){
    
    opts=opts||{};
    
    //opts.verbose=true; // for now

    if(typeof opts.extradirs=='string') opts.extradirs=opts.extradirs.split(',')
    
    let clientDirs=alldirs;
    if(Array.isArray(opts.extradirs)) clientDirs=clientDirs.concat(opts.extradirs);

    let client,compilekey=JSON.stringify(opts);
    if((!opts.nocache) && (client=protolibs.clientCache.Compiled[compilekey])){
        if(true||opts.verbose)console.log('protolibs client compile cache hit:',client.length,'bytes');
        return client;
    }

    let sw=stopwatch('COMPILE CLIENT');

    let doCache=!opts.nocache && (isLive||opts.forceCache);

    if(opts.verbose)console.log('\nprotolibs.js: compiling client subset:');

    client=``;
    let keys, fail=[], protoid, lib, f, id, path, spa, ei, frag, raw, ckey, incf;

    let toadd={}, tried={}, complete,pass=1;
    alltypes.forEach(t=>{
        keys=opts[t]; if(typeof keys=='string')keys=keys.split(',');
        toadd[t]=Array.isArray(keys)?keys:[];
    });

    function doPass(){
        if(opts.verbose)console.log('PASS',pass++);
        complete=true; // gets nullified if additional libs are identified
        alltypes.forEach(t=>{
            if((keys=Array.from(toadd[t])).length==0)return;// console.log('..no',t,'libs to add');

            toadd[t].splice(0); // current batch about to be added

            
            protolibs.clientCache[t]=protolibs.clientCache[t]||{};
            client+='\n';
            //if(t=='Class') client+=`\nFunction.$class={};`
            
            

            // add static files for prototypes:
            if(pass==2 && t!='Class')
                clientDirs.forEach(dir=>{
                    spa=p.join(dir,`_static.${t}.js`);
                    raw=protolibs.clientCache[t][spa];
                    if(typeof raw=='string'){
                        client += `\n${raw}`;
                        if(opts.verbose)console.log('..cache hit',t,'.',spa);
                    }else
                        try{
                            spa=require.resolve(spa);
                            if(opts.verbose)console.log('..including static file',spa);
                            raw=fs.readFileSync(spa).toString();
                            if(!opts.nozip){
                                raw=protolibs.shrinkJS(raw);
                                if(doCache)protolibs.clientCache[t][spa]=raw;
                            }
                            client += `\n${raw}`;
                        }catch(e){}
                });

            frag='';
            if(opts.verbose)console.log('alldirs:',alldirs);
            keys.forEach(k=>{
                f=`${t}.${k}.js`;

                if(typeof protolibs.clientCache[t][prefix+k]=='string'){
                    // cacheing of individual functions is disabled, only final-compile caching is active. This simplifies the auto-include functionality as otherwise would need to keep a log of which auto-includes to add for each single file cached, since the cached files are already compressed.
                    if(opts.verbose)console.log('..cache hit',t,'.',prefix,k);
                    frag+=`\n${protolibs.clientCache[t][prefix+k]}`;
                }else
                    try{
                        ei=0;
                        while (ei<clientDirs.length){
                            path=p.join(clientDirs[ei],f); ei++;
                            try{raw=clientFirst(path);
                                ei=999999;
                                if(opts.verbose)console.log('..FOUND:',path);
                            } catch(e2){
                                if(opts.verbose)console.log('..not found:',path);
                                //throw new Error('..FAIL: no such lib in ANY folder: '+f);
                            }
                        }

                        raw.split('\n').forEach(line=>{
                            incf=line.split('//WITH:'); if(incf.length!=2)return;
                            incf[1].split(',').map(x=>x.trim()).forEach(wlib=>{
                                wlib=wlib.split('.');
                                if(wlib.length!=2 || alltypes.indexOf(wlib[0])<0)
                                    return console.log('..SKIP illegal WITH: command',wlib); // will exclude WITH:Class.whatever!
                                if(wlib[1].indexOf(prefix)==0)wlib[1]=wlib[1].slice(prefix.length);
                                //console.log('..WITH:',wlib[0],'.',prefix,wlib[1]);
                                if(tried[wlib[0]]&&tried[wlib[0]].indexOf(wlib[1])>=0){
                                    if(opts.verbose)console.log('..already tried',wlib[0],'.',prefix,wlib[1]);
                                }else{
                                    toadd[wlib[0]]=toadd[wlib[0]]||[];
                                    toadd[wlib[0]].push(wlib[1]);
                                    complete=false; // triggers extra pass, however it could actually happen during current pass
                                    if(opts.verbose)console.log('..SCHEDULED WITH:',wlib[0],'.',prefix,wlib[1]);
                                }
                            });
                        });

                        protoid=t=='Class'
                            ?`Function.${prefix}${k}`
                            :`${t}.prototype.${prefix}${k}`;
                        if(!opts.nozip)protoid=`X.${prefix}${k}`;

                        lib=`(function(){
                                ${raw
                                    .split("module.exports")
                                    .join(protoid)}
                                })();`;

                        //console.log('..includes',path);
                        if(opts.zip&&!(opts.zip===false||opts.nozip)){
                            lib=protolibs.shrinkJS(lib);
                            if(doCache)protolibs.clientCache[t][prefix+k]=lib;
                        }
                        frag+=`\n${lib}`;
                        if(opts.verbose)console.log('..added',t,'.',prefix,k);
                    }catch(e){
                        if(opts.verbose)console.error(e.message)
                        fail.push(f);
                    }
                
            });

            tried[t]=(tried[t]||[]).concat(keys);
            
            //if(!!opts.nozip){client+=frag;return;}

            client +=`\nX=${t=='Class'?'Function':`${t}.prototype`};${frag}`; return;

            client +=`\n(X=>{${frag}\n})(${
                t=='Class'?'Function':`${t}.prototype`
            });`;
        });

        //console.log('toadd',toadd);

        if(opts.verbose)console.log('----END OF PASS---');
    }

    while(!complete)  doPass();

    if(opts.verbose)console.log('TRIED',tried);
    if(fail.length)if(opts.verbose)console.log('FAILED',fail);

    client = `//protolibs.js ${new Date().toISOString()}
    ((module,X)=>{${client}${fail.length&&!isLive?`
    
    alert("DEV:protolibs client compile FAILED on:\\n- ${fail.join('\\n- ')}${
        opts.nocache?'':'\\nCACHE IS ON!'
    }")
    `:''}
    })({})`;

    if(!opts.nozip)client=protolibs.shrinkJS(client);
    if(!doCache)
        delete protolibs.clientCache.Compiled[compilekey]; // will never happen as compilekey changes when nocache is used
    else
        protolibs.clientCache.Compiled[compilekey]=client;

    console.log('protolibs:',client.length,'byte client freshly generated');
    console.log(sw.report());
    return client;
}

protolibs.addDir=function(dir){
    //TO DO
    if(dir.length>0 && dir.indexOf('/')<0)dir=p.join(__dirname,'protolibs',dir);
    alldirs.push(dir);
    protolibs.initServerside(dir);
    if(optsGlobal.verbose){
        console.log('protolibs has added folder',dir);
        protolibs.report();
    }
}

protolibs.report=function(){
    console.log('protolibs report:\n','..alldirs=',alldirs,'\n','..all libraries=',lists);
}


protolibs.addDir(p.join(__dirname,'protolibs')); 