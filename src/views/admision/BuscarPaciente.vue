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
                  <br>
                  <v-template v-if="Usuario.message">
                    
                    <v-alert type="error"> {{Usuario.message}} </v-alert>
                  
                  </v-template>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
        <v-template v-if="Usuario.name" >
          <v-row >
            <v-col>
                <p>Al agregar un paciente se podria mostrar la seccion para agregar practicas y despues finalizar la admision.</p>
            </v-col>
          </v-row>
          
        </v-template>
        
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    searchByDni: "",
    Usuario: "",
  }),
  methods: {
    BuscarPaciente() {
      this.$store
        .dispatch("admision/buscarPacienteByDni", this.searchByDni)
        .then(
          (data) => {
            //console.log("traemos la data:", data);
            if (data.data) {
              console.log("Data" ,data.data)
              this.Usuario = data.data;
            } else {
              console.log("nada")
              this.Usuario = data
            }
          },
          (error) => {
            console.log(error);
          }
        );
    },
  },
};
</script>

<style>
</style>