Array.max
,module.exports=function(f){
//	return this.sort()[this.length-1];
		var s=NaN;
		this.forEach(function(O){
			var v=parseFloat(O[f]);
			if(v.$isNaN())return;
			if(s.$isNaN()||v>s)s=v;
		});
		return s;
	}
//WITH:Number.isNaN
