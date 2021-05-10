/*String.prototype.hashMD5*/
const crypto=require('crypto');
module.exports = function(len){
    return crypto
                .createHash('md5')
                .update(this.toString())
                .digest('base64')
                .slice(0,len||12);
}