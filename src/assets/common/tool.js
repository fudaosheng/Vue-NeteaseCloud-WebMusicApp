export function debounce(fn,delay){
  let timer=null;
  
  return (...args)=>{
    if(timer)clearTimeout(timer);
    timer=setTimeout(()=>{
      fn&&fn.apply(this,args)
    },delay)
  }
}

export function distinct(arr){
  let newArr=[];
  let isExist=false;
  for(let i=0,length=arr.length;i<length;i++){

    for(let j=i+1;j<length;j++){
      if(arr[i].name==arr[j].name){
        isExist=true;
        break;
      }
    }
    if(!isExist){
      newArr.push(arr[i]);
    }
    isExist=false;
  }
  return newArr;
}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
