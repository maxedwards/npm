Array.max
,module.exports=function(f){
		var s=NaN;
		this.forEach(function(O){
			var v=parseFloat(O[f]);
			if(v.$isNaN())return;
			if(s.$isNaN()||v>s)s=v;
		});
		return s;
	}
//WITH:Number.isNaN