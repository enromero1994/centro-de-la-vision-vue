import AdmisionService from '../services/admision.service';


export const admision = {
  namespaced: true,
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
      }
    },

}