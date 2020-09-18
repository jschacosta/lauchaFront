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
      <v-tab >
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
      <v-tab-item>
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
export default {
    name:"Home",
    components:{
      Posiciones,
      Calendario,
      Juegos
    },
}
</script>


}