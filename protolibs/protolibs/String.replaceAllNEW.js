String.replaceAllNEW
,module.exports = function(str1, str2, ignoreCase) {
        if(typeof str1!='string')return;
        if(typeof str2!='string')return;
		return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignoreCase?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
    }
// from http://dumpsite.com/forum/index.php?topic=4.msg8#msg8
	// Faster, but complex & brittle?? Use with care: 
