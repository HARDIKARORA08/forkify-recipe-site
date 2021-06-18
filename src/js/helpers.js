import { TIMEOUT_SEC } from "./config.js";// which is equal to 10
const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };
// WE WILL HAVE TO RACE BETWEEN THEM SO THAT REQUEST EK DEFINITE TIME KE BAAD REPLY KARE HI
/*export const getJSON=async function(url){
    try{
        const res = await Promise.race([timeout(TIMEOUT_SEC),fetch(url)]);
        const data = await res.json();
        // if (!res.ok) alert(`${data.message} ${data.status}`);
        return data;
    }catch(err){
      throw err;
    } 
}
export const sendJSON=async function(url,uploadData){
    try{
       const fetchPro=fetch(url,{
         method: 'POST',
         headers:{
           'Content-type': 'application/json',
         },
         body: JSON.stringify(uploadData)
       })
       const res = await Promise.race([timeout(TIMEOUT_SEC),fetchPro]);
       const data = await res.json();
       // if (!res.ok) alert(`${data.message} ${data.status}`);
       return data;
    }catch(err){
      throw err;
    } 
}*/

export const AJAX=async function(url,uploadData=undefined){
  try{
  const fetchPro=uploadData? fetch(url,{
    method: 'POST',
    headers:{
      'Content-type': 'application/json',
    },
    body: JSON.stringify(uploadData)
  }) : fetch(url);
  const res = await Promise.race([timeout(TIMEOUT_SEC),fetchPro]);
  const data = await res.json();
  // if (!res.ok) alert(`${data.message} ${data.status}`);
  return data;
}catch(err){
 throw err;
} 

}