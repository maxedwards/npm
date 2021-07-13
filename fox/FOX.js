(function(){
	"use strict";
	console.log('@maxedwards/fox [FOX.js]',require('./package.json').version,'installed in',__dirname);
	//console.log('FOX.js '+require('./package.json').version);

	//require('../agnostic/safeBraces.js');
	//Number._safeBraces.ON('niceBytes')
	if(!String.$protolibs)require('@maxedwards/protolibs');

	const isDev=process.env.NODE_ENV!='production';

	//const EF=require('./ensureFolder.js');
	const EF=require('@maxedwards/ensure-folder');

	const zlib=require('zlib');
	const fs=require('fs');
	
	
	//const cache={};

	function killObject(O){
		if(O.constructor === Object) Object.keys(O).forEach(k=>{
			delete O[k];
		});
	}

	const gzipModeDefault = process.env["NODE_ENV"]=='production' ? null : null; // [null, 'auto', true]
	const gzipThreshDefault = process.env["NODE_ENV"]=='production' ? 1000 : 3400;
	
	const FOXcache={};
	const FOX = module.exports = function(path,initval, opts){
		opts=opts||{};
		const dbug=opts.silent
			? _=>{}
			: console.log.bind(console.log);
		if(FOXcache[path]){
			if(FOXcache[path].willDestroy()) {
				//throw 'FOX.js cannot reuse a file being destroyed!'+path;
				FOXcache[path].abortDestroy();
			}
			dbug('FOX.js: CACHE HIT',path);
			return FOXcache[path];
		}
		var pathNice=`..${path.slice(-40)}`;
		//if(cache[path]){dbug('FOX cache hit:' + path); return cache[path];}
		var data=initval;
		var waiting,saving=false,willdestroy;//,abortdestroy;//, saveAgain=false;
		var lastMod, lastSize, lastFs;
		var noCache=true; //X.opts.noCache;
		var arcrum=(opts.archive)?'ARC':'NOARC';
		var isgzip=false;

		function checkFile(){
			isgzip=false;
			try{
				lastFs=fs.statSync(path+'.gz');
				isgzip=true;
				lastSize=lastFs.size;
				lastMod=lastFs.mtime.valueOf();
			}catch(e){
				try{
					lastFs=fs.statSync(path);
					lastSize=lastFs.size;
					lastMod=lastFs.mtime.valueOf();
				}catch(e){
					dbug('FOX.js: NEW(NO-EXIST) save to create',pathNice,arcrum)
				}
			}
		}

		function loadFile(X){
			// INTENTIONALLY, this will BARF if the file cannot be properly read AND parsed:
			// STOOOPID:
			//if(lastSize<10)throw 'FOX.js: '+path+' IS ONLY '+lastSize+' BYTES!'

			var rawfile;
			if(isgzip){
				rawfile = fs.readFileSync(path+'.gz');
				try{
					rawfile = zlib.gunzipSync(rawfile).toString();
					isDev&&dbug('FOX.js: gunzipped ',path+'.gz');
				} catch (e) {
					dbug('FOX.js: gunzip FAIL on ',path+'.gz',':',e);
					rawfile='CORRUPTED ZIP gives CORRUPTED JSON. '+e.toString()
				}
			} else rawfile=fs.readFileSync(path);
			try{
				data=JSON.parse(rawfile);
			}catch(e){
				console.error('FOX.js: LOAD FAIL',path,e);
				if(typeof opts.onLoadFail=='function'){
					data=opts.onLoadFail(rawfile);
					dbug('FOX.js: processed a corrupted JSON file into',data);
				} else {
					data=null;
					dbug('FOX.js: onLoadFail not defined in opts, barfing..');
					throw new Error('FOX.js: LOAD FAIL '+path+': '+e);
				}
			}
			rawfile=null;
			//console.trace();
			isDev&&dbug('FOX.js: LOADED',lastSize.$niceBytes(),pathNice,arcrum);
			if(!X)return;
			X.lastSize=lastSize; X.lastMod=lastMod; X.lastFs=lastFs; X.V=data; X.gzip=isgzip;
		}

		checkFile();

		if(lastFs){
			// FILE ALREADY EXISTS
			if(opts.dontBotherLoading){
				dbug('FOX.js: !NOT LOADED! - set & save to OVERWRITE',lastSize.$niceBytes(),pathNice,arcrum);
			}else{
				loadFile()
			}
		} else if (typeof opts.onFileMissing=='function'){
			data=opts.onFileMissing();
			dbug('FOX.js: initialised a missing JSON file with',data);
		}
		
		var X=FOXcache[path]={
			opts:opts,
			lastSize:lastSize, lastMod:lastMod, gzip:isgzip, V:data, 
			willDestroy:function(){ return !!willdestroy; },
			abortDestroy:function(){
				if(willdestroy){
					clearTimeout(willdestroy);
					willdestroy=null;
					dbug('FOX.js destroy aborted');
				}
			},
			set:function(Vnew){
				X.V=Vnew; return X;
			},
			save: function save(/*Vnew*/){
				//if(Vnew) X.V=Vnew;//UNTESTED
				
				return new Promise(function(resolve,reject){
					var J;
					try{J=JSON.stringify(X.V);}
					catch(e){ return reject(e,X); }

					var savepath=path;
					var firstZip;
					var thresh=parseInt(opts.gzipThresh)||gzipThreshDefault;
					var dozip=!!X.gzip;
					if(
						X.gzip
						|| (opts.gzip==true)
						|| ( (opts.gzip||gzipModeDefault) == 'auto' && J.length>thresh )
					){
						if(!X.gzip){
							firstZip=true;
							dozip=true;
							//dbug('FOX.js: firstZip:',savepath);
						}
						savepath+='.gz';
						//dbug('FOX.js: saving as gzip:',savepath);
					} //else dbug('FOX.js: saving as raw:',savepath);

					function attemptSave(){
						waiting=null;
						if(saving) {
							dbug('FOX.js: SAVE ERR - already saving; retry in 5s ');
							if(waiting)clearTimeout(waiting);
							return waiting=setTimeout(attemptSave,5000);
						}
						
						if(dozip) {
							var slen=J.length;
							J=zlib.gzipSync(J,{level:9});
							dbug('FOX.js: zlib squashed',slen,'bytes to',J.length);
						}

						try{EF(savepath,true,null,true);}
						catch(e){return reject(e,X);}
						
						function beginSaving(){
							function abortSave(waitms){
								saving=false;
								if(waiting)clearTimeout(waiting);
								return waiting=setTimeout(attemptSave,waitms||5000);
							}

							var actions=[];

							if(dozip){
								actions.push('Zip');
							}

							saving=true;
							var pathSav=savepath+'_SAV';
							var pathPrev=(firstZip?path:savepath)+'_PREV';
							
							fs.writeFile(pathSav,J,(err)=>{
								
								if(err){
									dbug('FOX.js: ABORT. SAVE ERR',err.toString(), '; retry in 5s ');
									return abortSave();
								}

								actions.push('Sav');

								fs.readFile(pathSav,(err,res)=>{
									if(err){
										dbug('FOX.js: ABORT. VERIFY ERR1',err.toString(), '; retry save in 5s ');
										return abortSave();
									}
									var valid = 
										dozip
										? (res.toString('base64')==J.toString('base64'))
										: (res==J)
									if(!valid){
										dbug('FOX.js: ABORT. VERIFY ERR2; Saved=',res.length,'b, expected ',J.length,'- Retry save in 5s',pathSav);
										return abortSave();
									}
									actions.push('Veri1');

									lastFs=fs.statSync(pathSav);

									if(X.lastMod&&!firstZip){
										//if(!X.opts.archive){
										//	actions.push('NOARC');
										//}else{
											try{fs.unlinkSync(pathPrev)}catch(e){}
											try{
												fs.renameSync(savepath,pathPrev);//dbug('FOX.js: PRE-SAVE BACKUP',pathNice+'_PREV');
												actions.push(X.opts.archive?'Arc':'(arc)');
											} catch(e){
												actions.push('NEW')
											}
											
										//}
										
									} else {
										//dbug('FOX.js: FIRST EVER SAVE',pathNice);
										actions.push('NEW');
									}
		
									fs.renameSync(pathSav,savepath);
									actions.push('Activ');

									fs.readFile(savepath,(err,res)=>{
										if(err){
											dbug('FOX.js: ABORT. RE-VERIFY ERR1',err.toString(), '; retry full save in 5s ');
											return abortSave();//
										}
										var valid = 
											dozip
											? (res.toString('base64')==J.toString('base64'))
											: (res==J)
										if(!valid){
											dbug('FOX.js: ABORT. RE-VERIFY ERR2; retry full save in 5s',pathNice);
											return abortSave();
										}

										actions.push('Veri2');
										
										if(!X.opts.archive){
											try{fs.unlinkSync(pathPrev)}catch(e){}
											actions.push('UNARC');
										}

										if(firstZip&&X.lastMod){
											fs.unlinkSync(path);
											dbug('FOX.js: removed unzipped previous',path);
											actions.push('REC1');
											try{
												fs.unlinkSync(path+'_PREV');
												dbug('FOX.js: removed unzipped archive',path+'_PREV');
												actions.push('REC2');
											}catch(e){}
										}

										X.lastSize=lastSize=lastFs.size;
										X.lastMod=lastMod=lastFs.mtime.valueOf();

										X.gzip=dozip;	
										saving=false; // NOW we've finished. Not before.


										dbug('FOX.js: SAVE',actions.join('/'),lastSize.$niceBytes(),pathNice+(X.gzip?'.gz':''));

										FOX.status();					
										return err?reject(err,X):resolve(X);	
									});
									
									
								});
								
							});
						}


						if(X.lastMod && !firstZip) fs.readFile(savepath,(err,data)=>{
							if(err){
								dbug('FOX.js: WARN. PRE-VERIFY FAIL but we are overwriting anyway',pathNice);
								return beginSaving();
							}
							var valid = 
								dozip
								? (data.toString('base64')==J.toString('base64'))
								: (data==J)
							if(valid){
								dbug('FOX.js: UNCHANGED - NO SAVE',data.length.$niceBytes(),pathNice);
								FOX.status();
								return resolve(X);
							} //else dbug('FOX.js: FILE CHANGED, proceding with save',pathNice)
							beginSaving();
						}); else beginSaving();
					}

					if(waiting){clearTimeout(waiting);waiting=null;}
					waiting=setTimeout(attemptSave, saving?5000:1000);
				});
			},
			
			unload:function(){
				//delete cache[path];
				try{delete require.cache[require.resolve(path)];}catch(e){}

				function attemptDestroy(){
					
					willdestroy=null;
					// very naiive!!:
					//if(abortdestroy){abortdestroy=null; dbug('FOX.js destroy attempt aborted'); return;}
					if(saving||waiting) return willdestroy=setTimeout(attemptDestroy,5000);
					
					//return;
					// should kill all top-level keys if V is an object
					if(X.V.constructor === Object){
						isDev&&dbug('FOX.js: UNLOAD',pathNice,Object.keys(X.V).length,'keys')
						killObject(X.V);
					} else if (X.V.length){
						isDev&&dbug('FOX.js: UNLOAD',pathNice,X.V.length,'entries');
						X.V.forEach(killObject);
						X.length=0;
					}
					delete X.V;
					delete FOXcache[path];

					FOX.status();
				}

				if(willdestroy) clearTimeout(willdestroy);
				willdestroy = setTimeout(attemptDestroy, (saving||waiting)?5000:1000);
				
				isDev&&dbug('FOX.js: UNLOAD SCHEDULED',pathNice);
			},

			isSaving:function(){ return saving || waiting || willdestroy }
		}
		X.uncache=X.unload; // historical reasons
		//if(!noCache)cache[path]=X;
		X.reloadIfChanged=function(){
			if(X.willDestroy()) {
				//throw 'FOX.js cannot reload file being destroyed!'+path;
				X.abortDestroy();
			}
			checkFile();
			if(lastMod==X.lastMod && lastSize==X.lastSize)return dbug('FOX.js: unchanged:',path);
			dbug('FOX.js: reload:',path);
			if(X.V.constructor === Object){
				isDev&&dbug('FOX.js: UNLOAD',pathNice,Object.keys(X.V).length,'keys')
				killObject(X.V);
			} else if (X.V.length){
				isDev&&dbug('FOX.js: UNLOAD',pathNice,X.V.length,'entries');
				X.V.forEach(killObject);
				X.length=0;
			}
			loadFile(X);
		}
		
		data=null; lastMod=null;

		FOX.status();

		return X;
	}
		
	let statTimer;
	FOX.status=function(){
		if(statTimer)clearTimeout(statTimer);
		statTimer=setTimeout(function(){
			statTimer=null;
			var csiz=0,cco=0;
			Object.keys(FOXcache).forEach(p=>{
				var X=FOXcache[p];
				if(X.lastSize && typeof X.V !='undefined'){
					//dbug('FOX.js: status:',X.lastSize.$niceBytes(),p);
					csiz+=X.lastSize; cco++;
				}
			});
			//if(csiz)
			console.log('FOX.js: status: current cache is',csiz.$niceBytes(),'(on disc) from',cco,'files')
		},1000);
	}
})()
