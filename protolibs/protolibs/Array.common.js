module.exports=function(arr2){
    //Could also maybe be called Array.intersection
    var arr1=this;
    if(arr1.length==0||arr2.length==0)return [];
    var i=0; while(i<arr1.length){
        if(arr2.has(arr1[i])) i++; else arr1.splice(i,1);
    }
    return arr1.$dedup();
}
//WITH:Array.$dedup