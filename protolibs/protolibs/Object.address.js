Object.address
,module.exports=function(addr){
		var r=this; if(!addr || typeof addr!='string') return;
		addr.split('.').forEach(function(n){
			if(typeof r=='undefined')return;
			r=r&&r[n];
		});
		return r;
	}
