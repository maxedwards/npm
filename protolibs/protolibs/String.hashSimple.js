String.hashSimple
,module.exports = function() {
		var hash = 0;
		if (this.length == 0) {
			return '';
		}
		for (var i = 0; i < this.length; i++) {
			var char = this.charCodeAt(i);
			hash = ((hash<<5)-hash)+char;
			hash = hash & hash; // Convert to 32bit integer
		}
		return hash.toString(16).replace('-','');
	}
