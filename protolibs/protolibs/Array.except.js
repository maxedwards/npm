module.exports=function(arr2,ignoreCase){
    // non-destructive version of Array.kill
		if(typeof arr2=='string')arr2=arr2.split(',');
		var arr1=Array.from(this);
		if(arr1.length==0||arr2.length==0)return arr1;
		arr2.forEach(function(k){
			var i;
			while(true){
				i=arr1.indexOf(k); if(i<0) return;
				arr1.splice(i,1);
			}
		});
		return arr1;
	}