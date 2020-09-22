// import { resolve } from "url";

// export function postData(type, userData){
//     let BaseUrl = 'http://34.93.89.207/olive_api/public/api';

//     return new Promise((resolve, reject),{
//         fetch(BaseUrl+type,{
//             method: 'POST',
//             body: JSON.stringify(userData) 
//         })
//         .then((response) => response.json())
//         .then((json) => {
//          resolve(responseJson);
//         })
//         .catch((error) => {
//           reject(error);
//         });
//     });
// }