/*String.prototype.hashSHA1*/
const crypto=require('crypto');
module.exports = function(len){
    return crypto
                .createHash('sha1')
                .update(this.toString())
                .digest('base64')
                .slice(0,len||12);
}