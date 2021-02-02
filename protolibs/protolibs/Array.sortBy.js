Array.sortBy
,module.exports=function(O,arrF){
		if(!arrF && O && O.length){
			arrF=O;	
			O=null;
		}
		if(typeof arrF=='string')arrF=arrF.split(',');
		if(!(arrF&&arrF.length)) return Array.from(this);
		
		var pols=[],f=arrF,rev,d,l,len=[];
		for(var i=0;i<arrF.length;i++){
			d=(f[i] && f[i].split(' DESC'));
			f[i]=f[i]&&d[0];
			rev=(f[i]&&(d.length==2));
			pols.push(rev?1:-1);
			l=(f[i] && f[i].split('.length'));
			f[i]=f[i]&&l[0];
			len.push(f[i]&&(l.length==2));
		}
		
		
		return this.sort(function(a,b){
			var A=O?O[a]:a, B=O?O[b]:b;
			var va,vb,pol;
			for(var i=0;i<arrF.length;i++){
				va=A[f[i]]; vb=B[f[i]]; pol=pols[i];
				if(!va && !vb) return 0; if(!va)return pol; if(!vb)return -pol;
				if(len[i]){va=va.length;vb=vb.length;}
				if(va==vb){
					if(i==arrF.length-1)return 0;
					// iterate to the next level of sorting
				} else break; // they're not the same so decide
			}
			if(va<vb) return pol; else return -pol;
		});
	}
