<template>
  <v-card>
    <v-card-title>Solicitar Turno</v-card-title>
    <v-col cols="12" class="col-lg-6 col-sm-12 col-xs-12 col-md-12">
      <div>
        <v-form name="form" ref="form" method="post">
          <v-row>
            <v-col class="mb-0 pb-0">
              <v-text-field outlined label="Nombre"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field outlined label="Apellido"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    outlined
                    v-model="date"
                    label="Fecha de Nacimiento"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-text-field outlined label="DNI"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select outlined :items="sexo" label="Sexo"></v-select>
            </v-col>
            <v-col>
              <v-select
                outlined
                :items="obraSocial"
                label="Obra Social"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field outlined label="Telefono"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field outlined label="Correo Electronico"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field outlined label="Profesional"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field outlined label="Practica"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col> </v-col>
            <v-col>
              <v-dialog
                ref="dialog"
                v-model="modal2"
                :return-value.sync="time"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    outlined
                    v-model="time"
                    label="Horario Turno"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker v-if="modal2" v-model="time" full-width>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal2 = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.dialog.save(time)">
                    OK
                  </v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn type="submit" large block depressed color="primary">
                <div>Solicitar Turno</div>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </v-col>
  </v-card>
</template>

<script>
export default {
  name: "turnos",
  data: () => ({
    date: null,
    modal: false,
    time: null,
    menu: false,
    menu2: false,
    modal2: false,

    obraSocial: ["Apos", "Osde", "SwissMedical"],
    sexo: ["Masculino", "Femenino"],
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    allowedHours: (v) => v % 2,
    allowedMinutes: (v) => v >= 10 && v <= 50,
    allowedStep: (m) => m % 10 === 0,
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }
  },
};
</script>