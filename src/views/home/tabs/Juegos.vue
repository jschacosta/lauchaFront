<template>
  <div>
    <v-row class="d-flex justify-center mb-3 ">
      <v-btn @click="unirse()" small class="ma-2" tile outlined color="#2C3A47" 
      :disabled="torneos[0].edition==='true' ? false : true">
        <v-icon  left>mdi-pencil</v-icon> Editar Presagios
      </v-btn>
    </v-row>
    <cartaJugadas ></cartaJugadas>
    <Steper></Steper>  
  </div>
</template>

<script>
import cartaJugadas from '@/components/cards/cartaJugadas.vue'
import Steper from '@/components/dialog/steper.vue'

import {  mapState , mapMutations } from 'vuex'
export default {
  name:'Juegos',
  components:{
    cartaJugadas,
    Steper
  },
  computed:{
    ...mapState('torneo',['torneos', 'porJugar']),
    ...mapState(['_id','nombre','apellido',]),
  },
  methods:{
    ...mapMutations('torneo',['cambiarDialog']),
    unirse(){
      this.cambiarDialog(true)
    }
  },

}
</script>
