module.exports=function renderTree(arr,root,cur){
    //console.log('renderTree',root,cur);
    let pa;
    return `<ul class="cmsnav">${arr
    .map(x=>{
        pa=`${root}/${x.dir||x}`;
        return `<li${cur==pa?' class="sel"':''}>${
        typeof x=='string'
            ?`<a href="${pa}">${x}</a>`
            :`${x.dir}${renderTree(x.nodes,pa,cur)}`
        }</li>`;
    })
    .join('')
}</ul>`;
}