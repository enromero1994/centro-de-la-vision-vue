import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/test/';

class CategoryService {
  getAllCategories() {
    return axios.get(API_URL + 'category',{ headers: authHeader() })
   
  }
  addCategory(category){
    return axios.post(API_URL + 'category',{
    name : category.name,
    description : category.description
  },
      { headers: authHeader()})
    .then(response => {
      if (response.data) {
        console.log(response.data)
      }

      return response.data;
    });
  }
  putCategory(category){
    return axios.put(API_URL + `category/${category.id}`,{
    name : category.name,
    description : category.description
  },
      { headers: authHeader()})
    .then(response => {
      if (response.data) {
        console.log(response.data)
      }

      return response.data;
    });
  }
  delCategory(id){
    return axios.delete(API_URL + `category/${id}`,{ headers: authHeader() })
  }
}

export default new CategoryService();