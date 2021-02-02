//WARNING prototype pollution, will be fixed asap
Array.prototype.tabulate=function(colsize){
	var r='',buf='';
	this.forEach(function(col){
		r+=buf+col;
		var colsused=Math.ceil(r.length/colsize);
		var spare=(colsused*colsize)-r.length;
		if(spare==0)spare=colsize;
		buf=" ".repeat(spare);
	});
	return r;
}
Number.prototype.commasX=function(places) {
	var st=(parseInt(places)>0)?this.toFixed(places):this.toString();
	var parts = st.split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");//+'!';
}
module.exports=function newStopwatch(note){
	function hrDiffMs(hr2,hr1, places) {
		var ms1 = hr1[0] * 1000 + hr1[1] / 1000000;
		var ms2 = hr2[0] * 1000 + hr2[1] / 1000000;
		return round(ms2-ms1,places);
	}
	function round(n,places) {
		var pow=Math.pow(10, places||1);
		return Math.round(n*pow)/pow;
	}
	var S= {
		lib:{
			hiresDiff:hrDiffMs,
			round:round
		},
		history:[],
		note:function(note){S.history.push({at:process.hrtime(),note:note});return S;},
		ageOfEntry:function(i){return hrDiffMs(S.history[i].at,S.history[0].at, 2);},
		timeSoFar:function(){return S.ageOfEntry(S.history.length-1);},
		timeSinceEntry:function(i){return hrDiffMs(process.hrtime(),S.history[i].at, 2);},
		timeSinceLast:function(){return S.timeSinceEntry(S.history.length-1);},
		report:function(not){
			var total=0;
			S.note(not);//
			var r='',prev=null;
			S.history.forEach(function(E){
				if(prev){
					var row=[`${hrDiffMs(E.at,prev.at).commasX()}ms =`,`${total=hrDiffMs(E.at,S.history[0].at).commasX()}ms`].tabulate(13);
					if(E.note)r+=`\n+ ${row}`;
					if(E.note)r+=` :\n${E.note}`;
				} else r+=`\n*** ${E.note||'-no note-'}`
				prev=E;
			});
			r += `\n*** TOTAL TIME: ${total}ms\n`;
			return r;
		},
	}
	return S.note(note||'STOPWATCH REPORT');
}
