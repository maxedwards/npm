String.extractHTML
,module.exports = function(tag, outer) {
		var pat = `<${tag}[^>]*>((.|[\r])*)<\\/${tag}[^>]*>`;
		var extract = new RegExp(pat,'im');
		var m=this.match(extract);
		if(!m)return '';
		return outer
					? m[0].trim()
					: m[0]
						.replace(extract, '$1')
						.split('\\n').join('\n')
						.split('\\t').join('\t')
						.split('\\\n').join('\\n')
						.split('\\"').join('"')
						.trim();
	}
