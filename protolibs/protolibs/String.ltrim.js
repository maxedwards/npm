module.exports = function(){
    return this.split('\n').map(l=>l.trim()).join('\n');
}