<template >
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
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
            method="post"
            @submit.prevent="handleLogin"
          >
            <v-row>
              <v-col class="mb-0 pb-0">
                <v-text-field
                  solo
                  filled
                  outlined
                  v-model="user.email"
                  label="Correo Electronico"
                  required
                  prepend-inner-icon="mdi-account"
                  name="email"
                  :rules="emailRules"
                ></v-text-field>
                <!-- <div
            v-if="errors.has('username')"
            class="alert alert-danger"
            role="alert"
          >El nombre de usuario es obligatorio</div> -->
                <v-text-field
                  solo
                  filled
                  outlined
                  v-model="user.password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required]"
                  :type="show1 ? 'text' : 'password'"
                  name="password"
                  label="Contraseña"
                  @click:append="show1 = !show1"
                  prepend-inner-icon="mdi-lock"
                ></v-text-field>
              </v-col>
            </v-row>
            <div v-if="message">
              <div>
                <v-alert dense outlined type="error">
                  {{ message.message }}
                </v-alert>
              </div>
            </div>
            <v-row>
              <v-col>
                <v-btn
                  :disabled="!valid"
                  type="submit"
                  large
                  block
                  depressed
                  color="primary"
                >
                  <div v-if="loaderlogin">Iniciar Sesion</div>
                  <div v-else>
                    <v-progress-circular
                      indeterminate
                      color="purple"
                    ></v-progress-circular>
                  </div>
                </v-btn>
                <router-link to="/register" class="clean-router">
                  <p>Aun no tengo cuenta</p>
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
  name: "Signin",
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: "",
      loaderlogin: true,
      show1: false,
      password: "",
      rules: {
        required: (value) => !!value || "Obligatorio.",
        emailMatch: () => "The email and password you entered don't match",
      },
      valid: true,
      email: "",
      emailRules: [
        (v) => !!v || "Correo electronico obligatorio",
        (v) => /.+@.+\..+/.test(v) || "El correo electronico debe ser valido",
      ],
      checkbox: false,
      lazy: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin() {
      console.log(this.user)
      this.loading = true;

      if (this.user.email && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push("/profile");
          },
          (error) => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
  },
};
</script>

<style>
</style>