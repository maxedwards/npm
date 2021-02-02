String.ufrag
,module.exports=function(lim){
		var s=encodeURIComponent(this)
				.replace(/(\%[a-z0-9][a-z0-9])/gim,' ')
				.replace(/_+/gim,' ')
				.trim()
				.replace(/[\(\)]/g,'')
				.replace(/\s+/g,'-')
				.replace(/--+/g,'-');
		while(s.endsWith('.'))s=s.slice(0,s.length-1);
		while(lim&&s.length>lim&&s.indexOf('-')>0) s=s.slice(0,s.lastIndexOf('-'));
		return s;
	}
