<template>
  <v-app>
    <div v-if="loggedIn">
        <v-app-bar app color="#119DA4" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link to="/" class="clean-router">
        <div class="d-flex align-center clean-router">
 

          <span class="mr-2 title hidden-sm-and-down">Mesa de Ayuda UnLaR</span>
        </div>
      </router-link>

      <v-spacer></v-spacer>
   

    
     
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <router-link class="clean-router" to="/profile">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/22.jpg"></v-img>
          </v-list-item-avatar>
        </router-link>
        <v-list-item-content>
          <v-list-item-title>Emiliano Romero</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

    
         <template v-slot:append>
        <div class="pa-2">
            <v-btn text block class="black"  >
          <a href @click.prevent="logOut" class="clean-router">
            <span class="mr-2" >Cerrar Sesion</span>
            <v-icon>mdi-logout</v-icon>
          </a>
        </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    </div>
    
    <v-main class="pt-0">
      <router-view />
    </v-main>

    <foote />
  </v-app>
</template>


<script>


export default {
  name: "App",
    data: () => ({
    //
    drawer: null,
  }),

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
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
