module.exports=function(){
  const X=this;
  let url=`https://api.cryptowat.ch/markets/${
      (X.exchange||'binance').toLowerCase()
  }/${
      X.pair.toLowerCase()
  }/${
      X.func.toLowerCase()
  }`
  return url.$getJSON()
}
//WITH: String.getJSON