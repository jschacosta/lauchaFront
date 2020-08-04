<template>
      <div class="block text-center notFound mt-5">
        <v-row  align="center" justify="center">
          <v-icon x-large color="blue darken-2" class="mx-3">fas fa-lock</v-icon>
          <h2>No Autorizado</h2>
        </v-row>
        <v-icon x-large color="red" class="mx-3">fa fa-exclamation</v-icon>
        <p>Epa, no tienes las credenciales para entrar aqui. Prueba con: </p><router-link :to="{name:'Home'}">Home</router-link>
      </div>
</template>
<script>
export default {
    name:'UnAuthorized'
}
</script>