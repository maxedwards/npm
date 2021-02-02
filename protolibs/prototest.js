function cmd(c){
	console.log('>',c);
	try{
		console.log(eval(c),'\n\n');
	}catch(e){
		console.error('ERR!',e,'\n');
	}
}

cmd(`global.protolibs = require('./protolibs.js')();`);
cmd(`new Date().$format('dd mmm hh:mm:ss');`);

cmd('protolibs.testlibs()');

if(0)cmd(
`"https://food.maxedwards.co.uk/daydata.json?diary=Kaia&recent=183"
	.$getJSON({username:'max',password:'chipshop'})
	.then(console.log)
	.catch(console.error);`);
if(0)cmd(
	`"https://food.maxedwards.co.uk/daydata.json?diary=Kaia&recent=183"
		.$getJSON({
			post:{some:'data'},
			username:'max',
			password:'chipshop'
		})
		.then(console.log)
		.catch(console.error);`);
if(0)cmd(
	`({some:'data'}).$postJSON({
			url:"https://food.maxedwards.co.uk/daydata.json?diary=Kaia&recent=183",
			username:'max',
			password:'chipshop'
		})
		.then(console.log)
		.catch(console.error);`);
//cmd('barf');
cmd('// END')
