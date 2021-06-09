// returns a keyed object record of subrecords. Any records missing the key will be given a UID
module.exports=function(key){
	let r={};
	this.map((v,i)=>{
		if(v.constructor !== Object)return r[i]=v;
		r[v[key]||i]=v.$without(key);
	});
	return r;
}
//WITH:Object.without
