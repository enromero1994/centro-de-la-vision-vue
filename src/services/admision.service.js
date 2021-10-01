import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

class AdmisionService {
    buscarPacienteByDni(dni){
        return axios.get(API_URL + `search-user?dni=${dni}`)
    }

}
export default new AdmisionService();