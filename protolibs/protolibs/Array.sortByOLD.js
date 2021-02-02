module.exports=function(O,f1,f2,f3){
		if(!f1)return this;
		var d1=f1 && f1.split(' DESC');f1=f1&&d1[0];var rev1=f1&&(d1.length==2);var pol1=rev1?1:-1;
		var l1=f1 && f1.split('.length');f1=f1&&l1[0];var len1=f1&&(l1.length==2);
		
		var d2=f2 && f2.split(' DESC');f2=f2&&d2[0];var rev2=f2&&(d2.length==2);var pol2=rev2?1:-1;
		var l2=f2 && f2.split('.length');f2=f2&&l2[0];var len2=f2&&(l2.length==2);
		
		var d3=f3 && f3.split(' DESC');f3=f3&&d3[0];var rev3=f3&&(d3.length==2);var pol3=rev3?1:-1;
		var l3=f3 && f3.split('.length');f3=f3&&l3[0];var len3=f3&&(l3.length==2);
		
		var comp=function(a,b){
			var A=O?O[a]:a, B=O?O[b]:b;
			var va=A[f1], vb=B[f1], pol=pol1;
			if(!va && !vb) return 0; if(!va)return pol; if(!vb)return -pol;
			if(len1){va=va.length;vb=vb.length;}
			if(va==vb){
				if(!f2)return 0;
				va=A[f2]; vb=B[f2]; pol=pol2;
				if(!va && !vb) return 0; if(!va)return pol; if(!vb)return -pol;
				if(len2){va=va.length;vb=vb.length;}
				if(va==vb){
					if(!f3)return 0;
					va=A[f3]; vb=B[f3]; pol=pol3;
					if(!va && !vb) return 0; if(!va)return pol; if(!vb)return -pol;
					if(len3){va=va.length;vb=vb.length;}
					if(va==vb)return 0;
				}
			}
			if(va<vb) return pol; else return -pol;
		}

		return this.sort(comp);
	}