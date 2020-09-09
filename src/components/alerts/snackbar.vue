<template>
  <div class="text-center ma-2">
    <v-snackbar app top
      v-model="superTexto.estado">
      {{superTexto.texto}}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="apagarSnack()">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
  export default {
      name:'SnackBar',
    data: () => ({
    }),
    computed: {
      ...mapState('textoSnack',['superTexto'])
    },
    methods: {
      ...mapMutations('textoSnack',['apagarSnack'])
    },
  }
</script>