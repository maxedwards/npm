module.exports=function(places) {
    var st=(parseInt(places)>0)?this.toFixed(places):this.toString();
    var parts = st.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}