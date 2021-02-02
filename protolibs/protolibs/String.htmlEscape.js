String.htmlEscape
,module.exports = function(lite) {
		return lite ?
			this.toString().replace(/"/g, '&quot;')
		:	this.toString()
			.replace(/&/g, '&amp;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}
