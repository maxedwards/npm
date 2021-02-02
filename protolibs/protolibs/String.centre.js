String.centre
,module.exports=function(wid,fullpad){
		var r=this.toString();
		if(r.length>=wid)return r;
		var pad=(wid-r.length)/2;
		var nlen=Math.floor(pad+r.length);
		while(r.length<nlen)r=' '+r;
		if(fullpad)while(r.length<wid)r+=' ';
		return r;
	}
