Array.withFields
,module.exports=function(O,fields){
		// UNTESTED
		// returns only the keys (or records) that have all of the fields mentioned
		var r=[];
		this.forEach(function(x){
			var X=O&&O[x]||x;
			var inc=true;
			fields.forEach(function(f){
				if(!X[f])inc=false;
			});
			if(inc)r.push(x);
		});
		return r;
	}
