import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
      
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
          // localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    console.log('Enviamos esto , ' + user)
    return axios.post(API_URL + 'register', {
      // name: user.username,
      name : user.name,
      email: user.email,
      lastname : user.lastname,
      dni: user.dni,
      dni_type: user.dni_type,
      password: user.password,
      password_confirmation: user.password,
      role_id: 1
    });
  }
}

export default new AuthService();