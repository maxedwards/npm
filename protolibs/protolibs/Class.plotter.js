module.exports=function(wid=100,hei=100){return new plotter(wid,hei);}

function plotter(wid,hei){this.vectors=[];this.wid=wid;this.hei=hei;}
const P=plotter.prototype;
P.reset=function(){this.vectors.splice(0)}
P.renderSVGinner=function(){return this.vectors.join('\n');}

P.line=function({title='', p1:[x1,y1], p2:[x2,y2], col='black', opacity=1, style='', id='', dash='', clas=''}){
    if(x1<0&&x2<0)return; if(x1>this.wid&&x2>this.wid)return;
    if(y1<0&&y2<0)return; if(y1>this.hei&&y2>this.hei)return;
    this.vectors.push(`<line stroke-dasharray="${dash}" id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:${col};${style};opacity:${opacity}" class="${clas}"><title>${title}</title></line>`);
}
P.lineOld=function(title='', [x1,y1], [x2,y2], col='black', opacity=1, style='', id='', dash='', clas=''){
    if(x1<0&&x2<0)return; if(x1>this.wid&&x2>this.wid)return;
    if(y1<0&&y2<0)return; if(y1>this.hei&&y2>this.hei)return;
    this.vectors.push(`<line stroke-dasharray="${dash}" id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:${col};${style};opacity:${opacity}" class="${clas}"><title>${title}</title></line>`);
}
P.circle=function({p:[x,y], r, col="black", opacity=1, style='', id=''}){
    if(x<-r)return; if(x>this.wid+r)return;
    if(y<-r)return; if(y>this.hei+r)return;
    this.vectors.push(`<circle cx="${x}" cy="${y}" r="${r}" stroke-width="0" fill="${col}" id="${id}" />`);
}
P.ellipse=function({title='', p:[x,y], rx, ry, col="black", opacity=1, style='', onclick='', id=''}){
    if(x<-rx)return; if(x>this.wid+rx)return;
    if(y<-ry)return; if(y>this.hei+ry)return;
    this.vectors.push(`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" stroke-width="0" style="fill:${col};opacity:${opacity};${style}" onclick="${onclick}" id="${id}"><title>${title}</title></ellipse>`);
}
P.ellipseOld=function(title='',[x,y], rx, ry, col="black",opacity=1,style='',onclick=''){
    if(x<-rx)return; if(x>this.wid+rx)return;
    if(y<-ry)return; if(y>this.hei+ry)return;
    this.vectors.push(`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" stroke-width="0" style="fill:${col};opacity:${opacity};${style}" onclick="${onclick}"><title>${title}</title></ellipse>`);
}
P.polygon=function({title='',points, col="black",opacity=1,style='',mouseover='',id=''}){
    if(points.filter(p=>(p[0]<0)).length==points.length)return;
    if(points.filter(p=>(p[1]<0)).length==points.length)return;
    if(points.filter(p=>(p[0]>this.wid)).length==points.length)return;
    if(points.filter(p=>(p[1]>this.hei)).length==points.length)return;
    this.vectors.push(
        `<polygon points="${points.map(([x,y])=>`${x},${y}`).join(' ')}" onmouseover="${mouseover}" style="fill:${col};opacity:${opacity};${style}" id="${id}"><title>${title}</title></polygon>`
        );
}
P.polygonOld=function(title='',points, col="black",opacity=1,style='',mouseover=''){
    if(points.filter(p=>(p[0]<0)).length==points.length)return;
    if(points.filter(p=>(p[1]<0)).length==points.length)return;
    if(points.filter(p=>(p[0]>this.wid)).length==points.length)return;
    if(points.filter(p=>(p[1]>this.hei)).length==points.length)return;
    this.vectors.push(
        `<polygon points="${points.map(([x,y])=>`${x},${y}`).join(' ')}" onmouseover="${mouseover}" style="fill:${col};opacity:${opacity};${style}"><title>${title}</title></polygon>`
        );
}
P.rect=function({title='',p1:[x1,y1], p2:[x2,y2], col='black', opacity=1, style='', id=''}){
    if(x1<0&&x2<0)return; if(x1>this.wid&&x2>this.wid)return;
    if(y1<0&&y2<0)return; if(y1>this.hei&&y2>this.hei)return;
    this.vectors.push(
        `<rect x="${Math.min(x1,x2)}" y="${Math.min(y1,y2)}" width="${Math.abs(x2-x1)}" height="${Math.abs(y2-y1)}" style="fill:${col};opacity:${opacity};${style}" id="${id}"><title>${title}</title></rect>`
    )
}
P.rectOld=function(title='',[x1,y1], [x2,y2], col='black',opacity=1,style=''){
    if(x1<0&&x2<0)return; if(x1>this.wid&&x2>this.wid)return;
    if(y1<0&&y2<0)return; if(y1>this.hei&&y2>this.hei)return;
    this.vectors.push(
        `<rect x="${Math.min(x1,x2)}" y="${Math.min(y1,y2)}" width="${Math.abs(x2-x1)}" height="${Math.abs(y2-y1)}" style="fill:${col};opacity:${opacity};${style}"><title>${title}</title></rect>`
    )
}
P.text=function({txt='', p:[x,y], col='black', opacity=1, style='', clas='', id=''}){
    this.vectors.push(
        `<text x="${x}" y="${y}" style="fill:${col};opacity:${opacity};${style}" class="${clas}" id="${id}">${txt}</text>`
    )
}
P.textOld=function(txt='', [x,y], col='black', opacity=1, style='', clas='', id=''){
    this.vectors.push(
        `<text x="${x}" y="${y}" style="fill:${col};opacity:${opacity};${style}" class="${clas}" id="${id}">${txt}</text>`
    )
}
