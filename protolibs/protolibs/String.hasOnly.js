String.hasOnly
,module.exports=function(subset){
		return (new RegExp(`^[${subset}]+$`)).test(this);
	}
	// NOTE subset must be pre-quoted for RegEx (e.g. \( etc))
