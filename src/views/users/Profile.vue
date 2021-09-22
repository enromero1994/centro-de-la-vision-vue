<template>
    <v-card>
        {{currentUser}}

    </v-card>

   
    
 
 
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
}
</script>

<style>

</style>