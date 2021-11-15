<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6" md="6" sm="12">
        <v-row>
          <v-col cols="12">
            <v-card elevation="2" height="80">
              <v-card-title>
                Buscar Paciente
                <v-spacer></v-spacer>

                <v-responsive max-width="260">
                  <v-text-field
                    v-model="searchByDni"
                    dense
                    flat
                    hide-details
                    solo-inverted
                    placeholder="Ingresar DNI"
                    @keyup.enter="BuscarPaciente()"
                  ></v-text-field>
                </v-responsive>
              </v-card-title>
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <h3>Informacion del Paciente:</h3>

                  <form>
                    <v-text-field
                      disabled
                      v-model="Usuario.nombre"
                      label="Nombre Paciente"
                    ></v-text-field>
                    <v-text-field
                      disabled
                      v-model="Usuario.apellido"
                      label="Apellido Paciente"
                    ></v-text-field>

                    <v-text-field
                      disabled
                      v-model="Usuario.dni_tipo"
                      label="Tipo de Documento"
                    ></v-text-field>
                    <v-text-field
                      disabled
                      v-model="Usuario.dni"
                      label="Numero de Documento"
                    ></v-text-field>
                    <v-text-field
                      disabled
                      v-model="Usuario.direccion"
                      label="Direccion"
                    ></v-text-field>
                    <v-text-field
                      disabled
                      v-model="Usuario.email"
                      label="Correo Electronico"
                    ></v-text-field>

                    <!-- <v-btn class="mr-4" @click="submit"> submit </v-btn>
                    <v-btn @click="clear"> clear </v-btn> -->
                  </form>
                  <br />
                  <v-template v-if="Usuario.message">
                    <v-alert type="error"> {{ Usuario.message }} </v-alert>
                  </v-template>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
        <v-template v-if="Usuario.nombre">
          <v-row>
            <v-col>
              <v-card elevation="2" height="80">
                <v-card-title>
                  Asignar Turno
                  <v-spacer></v-spacer>
                </v-card-title>
              </v-card>
              <br />
              <p>
                Seleccione un profesional y luego el horario disponible en su
                agenda para registrar el turno
              </p>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-select
                    v-model="professionalsSelect"
                    :items="professionals"
                    item-text="name"
                    item-value="id"
                    label="Profesionales"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        label="Elegir la fecha del turno"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
                      scrollable
                      :events="arrayEvents"
                      event-color="green lighten-1"
                      @change="getAgenda"
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-select
                    v-model="agendaSelected"
                    :items="agenda"
                    item-text="hora"
                    item-value="id"
                    label="Agenda Disponible"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-btn @click="AsignarTurno" depressed color="primary"> Asignar Turno </v-btn>
                </v-col>
                <!-- {{ agendaSelected }} -->
              </v-row>
            </v-col>
          </v-row>
        </v-template>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12">
        <v-card elevation="2" height="80">
          <v-card-title>
            Turnos del Paciente
            <v-spacer></v-spacer>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Fecha Turno</th>
                <th class="text-left">Hora Turno</th>
                <th class="text-left">Profesional</th>
                <th class="text-left">Practica</th>
                <th class="text-left">Orden</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in Usuario.turnos" :key="item.id">
                <td>{{ item.agenda.fecha }}</td>
                <td>{{ item.agenda.hora }}</td>
                <td>
                  {{ item.agenda.profesional.nombre }}
                  {{ item.agenda.profesional.apellido }}
                </td>
                <td>{{ item.agenda.practica.nombre }}</td>
                <td>{{ item.orden }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    arrayEvents: null,
    dataProfesionales: null,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    modal: false,
    searchByDni: "",
    Usuario: "",
    professionals: [],
    professionalsSelect: {
      name: "",
      id: "",
    },
    agendaSelected: {
      id: "",
    },
    agenda: [],
  }),
  mounted() {
    this.arrayEvents = [...Array(6)].map(() => {
      const day = Math.floor(Math.random() * 30);
      const d = new Date();
      d.setDate(day);
      let dia = d.toISOString().substr(0, 10);
      console.log("dia", dia);
      return dia;
    });
  },
  methods: {
    AsignarTurno(){
      console.log('aca',this.Usuario)
      let TurnoAsignado = {
        agenda_id : this.agendaSelected.id ,
        patient_id : this.Usuario.paciente_id, 
        observaciones : "",
        o_s_id : 1
      }
      console.log(TurnoAsignado)
      this.$store.dispatch("admision/asignarTurno", TurnoAsignado).then(
        (data) => {
          console.log("data", data);
        },
        (error) => {
          console.log(error);
        })
    },
    BuscarPaciente() {
      this.$store
        .dispatch("admision/buscarPacienteByDni", this.searchByDni)
        .then(
          (data) => {
            //console.log("traemos la data:", data);
            if (data.data) {
              this.Usuario = data.data;
              console.log(this.Usuario);
            } else {
              console.log("nada");
              this.Usuario = data;
            }
          },
          (error) => {
            console.log(error);
          }
        );
    },
    getProfessionals() {
      this.$store.dispatch("admision/buscarProfesionales").then(
        (data) => {
          let { profesionales } = data.data;
          // console.log(profesionales);
          this.dataProfesionales = profesionales;
          for (let index = 0; index < profesionales.length; index++) {
            const nombre = profesionales[index].nombre;
            const apellido = profesionales[index].apellido;
            const id = profesionales[index].id;

            this.professionals.push({
              name: `${nombre} ${apellido}`,
              id: id,
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getAgenda() {
      this.agenda = [];
      console.log("Fecha seleccionada", this.date);
      // console.log('Profesional seleccionado',this.professionalsSelect)
      // console.log('Data profesionales',this.dataProfesionales)
      let result = this.dataProfesionales.filter(
        (professionals) => professionals.id == this.professionalsSelect.id
      );
      let { agenda } = result[0];

      let agendaFiltrada = agenda.filter((agenda) => agenda.fecha == this.date);
      console.log("Agenda Filtrada", agendaFiltrada);
      console.log("Agenda Real", agenda);
      //Refactorizar este for
      agendaFiltrada.forEach((agenda) => {
        if (agenda.tomado == 1) {
          agenda.disabled = true;
        }
      });

      this.agenda = agendaFiltrada;
    },
  },
  created: function () {
    this.getProfessionals();
  },
};
</script>

<style>
</style>