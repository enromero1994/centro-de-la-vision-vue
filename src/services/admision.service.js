import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:8000/api/admision/';

class AdmisionService {
    buscarPacienteByDni(dni){
        console.log(authHeader())
        return axios.get(API_URL + `search-user?dni=${dni}`,{ headers: authHeader()})
     
    }
    buscarProfesionales(){
        return axios.get('http://127.0.0.1:8000/api/profesionales-practicas')
    }
    agregarAgenda(agenda){
        return axios.post(API_URL + 'agenda',{
            professional_id : agenda.professional_id,
            practice_id : agenda.practice_id,
            fecha : agenda.fecha,
            hora_inicio : agenda.hora_inicio,
            hora_fin : agenda.hora_fin,
            intervalo : agenda.intervalo


        },
            { headers: authHeader()})
          .then(response => {
            if (response.data) {
              
            }
      
            return response.data;
          });
      }
      asignarTurno(TurnoAsignado){
          //probar enviando solo TurnoAsignado dado que ya viene con los mismos atributos
          console.log('Este es el turno asignado',TurnoAsignado)
        return axios.post(API_URL + 'turno',{
            agenda_id : TurnoAsignado.agenda_id,
            o_s_id : TurnoAsignado.o_s_id,
            patient_id : TurnoAsignado.patient_id


        },
            { headers: authHeader()})
          .then(response => {
            if (response.data) {
              
            }
      
            return response.data;
          });
      }
 

}
export default new AdmisionService();