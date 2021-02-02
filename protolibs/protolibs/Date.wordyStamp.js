module.exports = function(){
    var d=this;
    return `${d.getFullYear()}-${(d.getMonth()+1).toString().$pad(2)}-${d.getDate().toString().$pad(2)} ${Date.daysOfWeek[d.getDay()]}`;
}
//WITH:String.$pad