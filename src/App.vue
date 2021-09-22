<template>
  <v-app id="inspire">
    <v-app-bar app color="#119DA4" flat dark>
      
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-lg-none"></v-app-bar-nav-icon>
     
      <v-container class="py-0 fill-height">
        <template v-if="loggedIn">
        <v-avatar class="mr-10 d-none d-lg-block" color="grey darken-1" size="45">
          <v-img src="https://randomuser.me/api/portraits/men/22.jpg"></v-img>
        </v-avatar>
        <router-link class="d-none d-lg-block" to="/profile">
        <v-btn v-for="link in links" :key="link" text>
          {{ link }}
        </v-btn>
        </router-link>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
        </template>
      </v-container>
    </v-app-bar>

    <!--
    <div v-if="loggedIn">
      
     
      <v-app-bar app color="#119DA4" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <router-link to="/" class="clean-router">
          <div class="d-flex align-center clean-router"></div>
        </router-link>

           <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-app-bar>
      -->
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list-item>
          <router-link class="clean-router" to="/profile">
            <v-list-item-avatar>
              <v-img
                src="https://randomuser.me/api/portraits/men/22.jpg"
              ></v-img>
            </v-list-item-avatar>
          </router-link>
          <v-list-item-content>
            <v-list-item-title>{{
              `${currentUser.user.name}  ${currentUser.user.lastname}`
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list dense>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                <router-link class="clean-router" to="/profile">
                  <div class="">Menu Principal</div>
                </router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list dense>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                <router-link class="clean-router" to="/turnos">
                  <div class="">Solicitar Turno</div>
                </router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn text block class="black">
              <a href @click.prevent="logOut" class="clean-router">
                <span class="mr-2">Cerrar Sesion</span>
                <v-icon>mdi-logout</v-icon>
              </a>
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    
    

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <template v-if="loggedIn" >
          <v-col cols="2" class="d-none d-lg-block">
             
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item v-for="n in linksNav" :key="n" link>
                  <v-list-item-content>
                    <router-link
                    
                      :to="{ name: n.link, params: { userId: 123 } }"
                    >
                      <v-list-item-title>
                        {{ n.name }}
                      </v-list-item-title>
                    </router-link>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item link color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title style="text-align:center">
              <a href @click.prevent="logOut" class="clean-router">
                <span class="mr-2">Cerrar Sesion</span>
               
              </a>
            </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
             
          </v-col>
          </template>
          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <!--  -->
              <router-view />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <!-- <v-main class="pt-0" style="background: #eeeeee">
      <router-view />
    </v-main>
    -->
  </v-app>
</template>


<script>
export default {
  name: "App",
  data: () => ({
    //
    drawer: null,
    links: ["Home", "Perfil", "Mensajes", "Soporte"],
    linksNav: [{ name: "Turnos", link: "turnos" }, {name: "Historia Medica", link:"historial_medico"}],
  }),

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
  },
};
</script>
