import AdmisionService from '../services/admision.service';


export const admision = {
  namespaced: true,
  state:{
    profesionales:[]
  },
  actions: {
    buscarPacienteByDni({ commit }, dni) {
        return AdmisionService.buscarPacienteByDni(dni).then(
          pacient => {
            return Promise.resolve(pacient.data);
          },
          error => {
           
            return Promise.reject(error);
          }
        );
      },
      buscarProfesionales({ commit }){
        return AdmisionService.buscarProfesionales().then(
          professionals => {
            commit('getProfesionales', professionals.data);
            return Promise.resolve(professionals.data);
          },
          error => {
           
            return Promise.reject(error);
          }
        );
      },
      agregarAgenda({ commit }, agenda) {
        return AdmisionService.agregarAgenda(agenda).then(
          agenda => {
            console.log('here',agenda)
            return Promise.resolve(agenda);
          },
          error => {
           
            return Promise.reject(error);
          }
        );
      },
      asignarTurno({ commit }, TurnoAsignado) {
        return AdmisionService.asignarTurno(TurnoAsignado).then(
          turnoAsignado => {
            console.log('here',turnoAsignado)
            return Promise.resolve(turnoAsignado);
          },
          error => {
           
            return Promise.reject(error);
          }
        );
      },
    },
    mutations: {
      getProfesionales(state,profesionales){
        state.profesionales = profesionales
      },
      addProfesionales(state,profesionales){

      }

    
    }

}