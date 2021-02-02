module.exports=function(id,ui,data){
    this.id=id||`ui2${Math.random()}`;
    this.ui=ui||{};
    this.data=data||{};
}

module.exports.prototype.render=function(){
    return `
    <div class="ui2app" id="${id}">
        <h1>App</h1>
    </div>
`;
}

module.exports.prototype.js=function(){
    
}

module.exports.prototype.css=function(){
    return `
    div.ui2app {border:5px solid green; padding:3px;}
    `
}