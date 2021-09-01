import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/test/';

class RequestService {
 
  addRequest(request){
    return axios.post(API_URL + 'request',{
    summary : request.summary,
    description : request.description,
    status : 'En Espera',
    assignee : '',
    userId : request.userId,
    categoryId : request.categoryId
  },
      { headers: authHeader()})
    .then(response => {
      if (response.data) {
        console.log(response.data)
      }

      return response.data;
    });
  }
  getRequestByIdUser(id) {
    console.log('ID',id)
    return axios.get(API_URL + `request/user/${id}`,{ headers: authHeader() })
   
  }
  putRequestAssignee(assignee,idrequest){
    return axios.put(API_URL + `request/${idrequest}`,{
    assignee : assignee
  },
      { headers: authHeader()})
    .then(response => {
      if (response.data) {
        console.log(response.data)
      }

      return response.data;
    });
  }
  getAllRequests() {
    return axios.get(API_URL + 'request',{ headers: authHeader() })
   
  }
  setAssigne(userid,requestid){
    return axios.post(API_URL + 'resolution',{
      requestId : requestid,
      userId: userid
    },
        { headers: authHeader()})
      .then(response => {
        if (response.data) {
          console.log(response.data)
        }
  
        return response.data;
      });
  }
  setState(status,idrequest){
    console.log(status,'asd' ,idrequest)
    return axios.put(API_URL + `request/${idrequest}`,{
      status : status
  },
      { headers: authHeader()})
    .then(response => {
      if (response.data) {
        console.log(response.data)
      }

      return response.data;
    });
  }
  
}

export default new RequestService();