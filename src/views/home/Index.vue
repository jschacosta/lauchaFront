<template>
  <div  class="mt-5">
    <v-tabs  centered icons-and-text>
      <v-tab>  
        Torneo 
        <i class="far fa-futbol"></i>
      </v-tab>
      <v-tab >
        Calendario 
        <i class="fa fa-calendar-alt"></i>
      </v-tab>
      <v-tab v-if="estaJugador===true">
        Mis Jugadas 
        <i class="fas fa-chess-knight"></i>
      </v-tab>
      <!-- Tab1 -->
      <v-tab-item>
        <v-container >
          <Posiciones/>
        </v-container>
      </v-tab-item>
      <!-- Tab2 -->
      <v-tab-item>
        <v-container>
          <Calendario/>
        </v-container>
      </v-tab-item>
      <!-- Tab3 -->
      <v-tab-item v-if="estaJugador===true">
        <v-container>
          <Juegos/>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
import Posiciones from './tabs/Posiciones.vue'
import Calendario from './tabs/Calendario.vue'
import Juegos from './tabs/Juegos.vue'
import {  mapState } from 'vuex'

export default {
  name:"Home",
  components:{
    Posiciones,
    Calendario,
    Juegos
  },
  computed:{
    ...mapState('torneo',['torneos']),
    ...mapState(['_id']),
    estaJugador(){
        const index=this.torneos[0].players.findIndex(item=>item._id === this._id);
        if(index===-1){
          return false
        }else{
          return true
        }
      if(this.torneos[0].players.length=0){
        return false
      }
    }
  }
}
</script>
