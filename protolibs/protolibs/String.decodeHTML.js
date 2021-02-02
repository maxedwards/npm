var htd_translate = {
    "nbsp":" ",
    "amp" : "&",
    "reg" : "®",
    "laquo" : "«",
    "raquo" : "»",
    "quot": "\"",
    "lt"  : "<",
    "gt"  : ">",
    "trade"  : "™"
};
var htd_translate_re = new RegExp(`&(${Object.keys(htd_translate).join('|')});`, "g");

module.exports=function() {
    return this.replace(htd_translate_re, function(match, entity) {
        return htd_translate[entity];
    }).replace(/&#(\d+);/gi, function(match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
    });
}