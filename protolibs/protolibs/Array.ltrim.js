module.exports = function(){
    return this
        .map(l=>l.replace(/\s\s+/gim,' ').trim())
        .filter(l=>l.length>0);
}