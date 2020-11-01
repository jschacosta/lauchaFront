<template>
  <div class="text-center ma-2 ">
    <v-snackbar app top  color="teal" rounded="pill" 
      v-model="superTextoSteper.estado">
      {{superTextoSteper.texto}}
      <template v-slot:action="{ attrs }">
        <v-btn color="white"  text v-bind="attrs" @click="apagarSnackSteper()">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
  export default {
    name:'SnackSteper',
    computed: {
      ...mapState('textoSnack',['superTextoSteper'])
    },
    methods: {
      ...mapMutations('textoSnack',['apagarSnackSteper'])
    },
  }
</script>