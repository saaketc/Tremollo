import axios from 'axios';

const URL = 'http://api.tremollo.co:8080';

// const config = {
//     headers: {
//         'Content-Type': 'application/json'
       
//     },

// }


 const getData = (resource, params=null) => {
     return axios.get(`${URL}/${resource}`, {
         headers: {
             'Content-Type': 'application/json'

         },
         params: params
     });
  
 }
const postData = (resource, data, contentType='application/json') => {
    return axios.post(`${URL}/${resource}`, data, {
        headers: {
            'Content-Type': contentType

        }
    });

}
const putData = (resource, data, contentType='application/json') => {
    return axios.put(`${URL}/${resource}`, data, {
        headers: {
            'Content-Type': contentType

        }
    });

}
export default {
    getData,
    postData,
    putData
}

