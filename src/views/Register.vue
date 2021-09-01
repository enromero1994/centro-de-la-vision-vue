<template>
  <v-container>
    <v-row class="mt-15">
      <v-col cols="12" class="col-lg-4"></v-col>
      <v-col cols="12" class="col-lg-4 col-sm-12 col-xs-12 col-md-12">
        <v-row>
          <v-col></v-col>
          <v-col>
            <router-link to="/" class="clean-router">
              <v-img
                lazy-src="https://centrodelavisionsgo.com.ar/sistema/img/sitio/Logo.svg"
                max-height="150"
                max-width="250"
                contain
                src="https://centrodelavisionsgo.com.ar/sistema/img/sitio/Logo.svg"
              ></v-img
            ></router-link>
          </v-col>
          <v-col></v-col>
        </v-row>
        <div class="pt-10">
          <v-form
            name="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="handleRegister"
          >
            <v-row>
              <v-col class="pb-0 mb-0" cols="12" lg="6" md="12" sm="12">
                <v-text-field
                  solo
                  outlined
                  v-model="user.name"
                  name="name"
                  :counter="30"
                  :rules="nameRules"
                  label="Nombre"
                  required
                ></v-text-field>
                <!-- <div
              v-if="submitted && errors.has('username')"
              class="alert-danger"
            >{{errors.first('username')}}</div> -->
              </v-col>
              <!-- <v-col class="pb-0 mb-0" cols="12" lg="6" md="6" sm="12">
              <v-text-field
                solo
                outlined
                v-model="lastname"
                :counter="10"
                :rules="lastnameRules"
                label="Apellido"
                required
              ></v-text-field>
            </v-col> -->
              <v-col class="pb-0 mb-0" cols="12" lg="6" md="12" sm="12">
                <v-text-field
                  solo
                  outlined
                  v-model="user.lastname"
                  name="lastname"
                  :counter="30"
                
                  label="Apellido"
                  required
                ></v-text-field>
              </v-col>
                        <v-col class="pb-0 mb-0" cols="12" lg="12" md="12" sm="12">
                <v-text-field
                type="number"
                  solo
                  outlined
                  v-model="user.dni"
                  name="dni"
                  :counter="8"
                
                  label="DNI"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col class="pb-0 mb-0">
                <v-text-field
                  solo
                  outlined
                  v-model="user.email"
                  name="email"
                  :rules="emailRules"
                  label="Correo Electronico"
                  required
                ></v-text-field>
                <!-- <div
              v-if="submitted && errors.has('email')"
              class="alert-danger"
            >{{errors.first('email')}}</div> -->
              </v-col>
            </v-row>
            <!-- <v-row>
            <v-col class="pb-0 mb-0">
              <v-text-field
                solo
                outlined
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Contraseña"
                hint="Al menos 10 caracteres"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
          </v-row> -->
            <v-row>
              <v-col class="pb-0 mb-0">
                <v-text-field
                  solo
                  outlined
                  v-model="user.password"
                  required
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min, rules.match]"
                  :type="show2 ? 'text' : 'password'"
                  name="password"
                  label="Contraseña"
                  hint="Al menos 10 caracteres"
                  counter
                  @click:append="show2 = !show2"
                ></v-text-field>
                <!-- <div
              v-if="submitted && errors.has('password')"
              class="alert-danger"
            >{{errors.first('password')}}</div> -->
              </v-col>
            </v-row>
            <div v-if="message">
              <div v-if="successful == false">
                <v-alert dense outlined type="error">
                  {{ message.message }}
                </v-alert>
              </div>
              <div v-else>
                <v-alert dense outlined type="success">
                  {{ message }}
                </v-alert>
              </div>
            </div>
            <v-row>
              <v-col>
                <v-btn
                  :disabled="!valid"
                  class="mr-4"
                  type="submit"
                  color="primary"
                  large
                  width="100%"
                  >Registrarse</v-btn
                >

                <router-link to="/login" class="clean-router">
                  <p>¿Ya tienes cuenta? Inicia sesion haciendo click aqui</p>
                </router-link>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-col>
      <v-col cols="12" class="col-lg-4"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import User from "../models/user";
export default {
  data() {
    return {
      user: new User("", "", ""),
      submitted: false,
      successful: "false",
      message: "",
      show1: false,
      show2: false,
      password: "",
      password_confirmation: "",
      rules: {
        required: (value) => !!value || "Contraseña Obligatoria.",
        min: (v) => v.length >= 10 || "Contraseña Min 10 caracteres",
        // match: (v) =>
        //   (!!v && v) === this.password || "Las contraseñas no coinciden",
        // match2: (v) =>
        //   (!!v && v) === this.password_confirmation ||
        //   "Las contraseñas no coinciden",
      },

      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "Nombre obligatorio",
        (v) =>
          (v && v.length <= 30) || "Nombre debe tener menos de 10 caracteres",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "Correo electronico obligatorio",
        (v) => /.+@.+\..+/.test(v) || "Correo electronico debe ser valido",
      ],
      lazy: false,
      error: null,
      success: null,
      type: "formNotify",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister() {
      this.message = "";
      this.submitted = true;
      console.log(this.user)
      this.$store.dispatch("auth/register", this.user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
        },
        (error) => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      );
    },
  },
};
</script>

<style>
</style>