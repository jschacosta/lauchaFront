<template>
      <div class="block text-center notFound mt-5">
        <v-row  align="center" justify="center">
          <v-icon x-large color="blue darken-2" class="mx-3">mood_bad</v-icon>
          <h2>Página no encontrada </h2>
        </v-row>

        <v-icon x-large color="orange" class="mx-3">fas fa-exclamation-triangle</v-icon>
        <p>Mala suerte, la página que buscas no existe. Prueba con: </p><router-link :to="{name:'Home'}">Home</router-link>
      </div>
</template>
<script>
export default {
    name:'NotFound'
}
</script>