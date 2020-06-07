import axios from 'axios';

const URL = 'http://api.tremollo.co:8080';

const config = {
    headers: {
        'Content-Type': 'application/json'
       
    },

}


 const getData = (resource, params=null) => {
     return axios.get(`${URL}/${resource}`, {
         headers: {
             'Content-Type': 'application/json'

         },
         params: params
     });
  
 }
const postData = (resource, data) => {
    return axios.post(`${URL}/${resource}`, data, config);

}
const putData = (resource, data) => {
    return axios.put(`${URL}/${resource}`, data, config);

}
export default {
    getData,
    postData,
    putData
}

