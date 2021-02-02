Array.filt
,module.exports=function(O,arrAllow){
		// returns only the keys (or records) that meet at least one of the given criteria i.e. OR
		// for multiple AND criteria, chain .filt(O,or1).filt(O,or2) etc
		// when O is null (i.e. array is the expanded data) it can be omitted altogether.
		//
		// e.g. arrayOfKeys.filt(dataRoot, {"f1":"v<4"})
		// e.g. arrayOfKeys.filt(dataRoot, {"f1":"v<4"})
		// WARNING: the condition is eval'ed i.e. code can be included
		// SO CAN BE USED TO WIPE AND ALTER THE MASTER DATA TREE
		// e.g expandedArray.filt('delete R.something')
		//
		// the condition must express boolean allow in terms of R, R.xyz, and id, to decide if R||id should
		// be included in the result. R is for each single record as indexed by id in the array of keys
		if(!arrAllow && O && O.length){
			arrAllow=O;	
			O=null;
		}
		if(typeof arrAllow=='string')arrAllow=arrAllow.split(',');
		
		var r=[];
		this.forEach(function(id){
			var R=O&&O[id]||id;
			var inc;
			arrAllow.forEach(function(cond){
				if(inc)return;//only need to match one to pass
				inc=!!eval(cond);
			});
			if(inc)r.push(id);
		});
		return r;
	}
