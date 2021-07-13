module.exports=function({cols,rows,groups}){
    if(!rows.length)return '(no entries)<br />';
    return `<table cellspacing=0 cellpadding=2 border=1>
    ${
        rows.map((r,i)=>`${(i==0)||(groups&&(i%groups==0))?`<tr class="head" onclick="showGroup(this)">
        ${cols.map(c=>`<th>${c.th}</th>`).join('\n')}
    </tr>`:``}
        <tr class="off">
            ${cols.map(c=>`<td align=right>${c.td(r)}</td>`).join('\n')}
        </tr>`).join('\n')
}
</table>`
}
module.exports.devReload=true;