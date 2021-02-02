Object.copyFields
,module.exports=function(flist,xclist){
		if(typeof flist=='string')flist=flist.split(',');
		if(typeof xclist=='string')xclist=xclist.split(',');
		var O=this;
		var r={};
		if(flist && flist.length){
			//flist.forEach(function(k){ var ks=k.split(':'); r[ ks[1]||ks[0] ]=O[ ks[0] ]; });
			flist.forEach(function(k){
				var ks=k.split(':');
				r[ ks[1] || ks[0] ] = O.$address(ks[0]);
			});
		}else{
			Object.keys(O).forEach(function(k){ if(!(xclist&&xclist.$has(k))) r[k]=O[k]; });
		}
		return r;
	}
//WITH:Object.address,Array.has