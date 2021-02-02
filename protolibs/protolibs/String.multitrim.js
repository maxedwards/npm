String.multitrim
,module.exports=function(){
		return this.split('\n')
				.map(function(l){return l.trim();})
				.join('\n')
				.replace(/^\s*[\r\n]/gm, "") 
		
	}
