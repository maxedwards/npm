const p=require('path');const fs=require('fs');
module.exports=function(path,isFile,andThen,sync){
	if (isFile) path=p.dirname(path);
	if (sync) {
		try{
			fs.statSync(path);
			if (typeof andThen=='function') andThen();
		}catch(e){
			module.exports(p.dirname(path),false,function(){
				fs.mkdirSync(path);
				//console.log('Sync created ' + path);
				if (typeof andThen=='function') andThen();
			},true);
		}
	} else {
		fs.stat(path, function(err,s){
			if (err) {
				module.exports(p.dirname(path),false,function(){
					fs.mkdir(path,function(err){
						//console.log('Async created ' + path);
						if (typeof andThen=='function') andThen();
					});
				});
			} else if (typeof andThen=='function') andThen();
		});
	}
}