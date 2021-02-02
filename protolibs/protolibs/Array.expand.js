Array.expand
,module.exports=function(O,addIDas,asClones){
		if(!O)return [];//throw 'Data root object missing';
		var r=[];
		this.forEach(function(id){
			var R=O[id];
			if(asClones)R=R.$copy();
			if(addIDas)R[addIDas]=id;
			r.push(R);
		});
		return r;
	}
//WITH:Object.copy