<template>
  <v-container >
    <v-row>
      <v-card max-width="600px "  class="general elevation-8 pa-0 " >
        <v-list class="pa-0 ma-0" >
          <v-list-item-group class="pa-0 ma-0 " v-if="torneos[0].name!=''">
            
            <v-list-item-content class="pa-0 ma-0 fondoFecha">
              <v-row class="text-center pa-0 ma-0 font-weight-bold">
                <v-col cols="2">Pos</v-col>
              <v-divider vertical></v-divider>
                <v-col cols="6">Nombre</v-col>
              <v-divider vertical></v-divider>
                <v-col cols="3" class="ml-4" >Pts</v-col>
              </v-row>
            </v-list-item-content>
            
            <v-divider></v-divider>
            <div v-for="(jugador,k) of torneos[0].players" :key="k" >
              <v-list-item class="pa-0 ma-0 "  :class="hola">
              <v-row class="text-center pa-0 ma-0 ">
                <v-col cols="2">{{k+1}}</v-col>
              <v-divider vertical></v-divider>
                <v-col cols="6">{{jugador.nickName}}</v-col>
              <v-divider vertical></v-divider>
                <v-col cols="3" class="ml-4" >{{jugador.points}}</v-col>
              </v-row>
              </v-list-item>
              <v-divider></v-divider>
            </div>

          </v-list-item-group>


          <v-list-item-content v-if="torneos[0].name===''" class="normal"> 
          <v-list-item-title class="headline mb-1 d-flex justify-center ">
          <v-icon
          large
          left
          color="#2C3A47"
          >
          fas fa-beer
        </v-icon>No hay Torneos Creados</v-list-item-title>
        </v-list-item-content>



        </v-list>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'tablaPosiciones',

    computed:{
      ...mapState('torneo',['torneos']),
      hola(){
        const x= 1
        if(x===1){
          return 'ascenso'
        }if(x===2){
          return 'descenso'
        }
        if(x===3){
          return 'normal'
        }
      }
    },
    methods:{
      ...mapMutations( 'loading',['loadingFunction']),
      ...mapMutations( 'torneo',['obtenerTorneos']),
    },
  
  }
</script>

<style scoped>
.general{
  width: 800px;
  margin-left: auto;
  margin-right: auto;
}  

.fondoFecha{
  background-color: #2C3A47;
  color: white
}
.fondoFecha{
  background-color: #2C3A47;
  color: white
}
.descenso{
  background-color: #ffcccc;
  color: #2C3A47
}
.ascenso{
  background-color: #b3ffcc;
  color: #2C3A47
}
.normal{
  background-color:  #E0E0E0;
  color: #2C3A47
}
.basico{
  
  margin-left: auto;
  margin-right: auto;

}
</style>