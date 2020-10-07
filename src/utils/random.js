/**生成随机字符串 */
export function randomStr(){
    const randomStr='qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    let length=randomStr.length;
    let str='';
    for(let i=0;i<6;i++){
        str+=randomStr.charAt(Math.floor(Math.random()*length));
    }
    return str+new Date().getTime();
}