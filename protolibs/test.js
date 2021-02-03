function cmd(c){
	console.log('>',c);
	try{
		console.log(eval(c),'\n\n');
	}catch(e){
		console.error('ERR!',e,'\n');
	}
}

cmd(`global.protolibs = require('./protolibs.js');`);
cmd(`new Date().$format('dd mmm hh:mm:ss');`);

cmd('protolibs.testlibs()');

if(0)cmd(
`"https://freeapi.com/api.json"
	.$getJSON({username:'',password:''})
	.then(console.log)
	.catch(console.error);`);
if(0)cmd(
	`"https://freeapi.com/api.json"
		.$getJSON({
			post:{some:'data'},
			username:'',
			password:''
		})
		.then(console.log)
		.catch(console.error);`);
if(0)cmd(
	`({some:'data'}).$postJSON({
			url:"https://freeapi.com/api.json",
			username:'',
			password:''
		})
		.then(console.log)
		.catch(console.error);`);
//cmd('barf');
cmd('// END')
