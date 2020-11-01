<template>
  <v-container >
    <v-row>
      <v-card max-width="600px "  class="general elevation-8 pa-0 " >
        <v-list class="pa-0 ma-0">

          <v-list-item-group class="pa-0 ma-0 ">
            
            <v-list-item-content class="pa-0 ma-0 fondoFecha" v-if="torneos[0].name!=''" >
              <v-row class="pa-0 ma-0  ancho font-weight-bold">
                <v-col cols="2" class="text-left pa-0 py-3">Pos</v-col>
              <v-divider vertical></v-divider>

                <v-col cols="6" class="text-center">Nombre</v-col>
              <v-divider vertical></v-divider>
                <v-col cols="2"  class="text-right" >Pts</v-col>
              </v-row>
            </v-list-item-content>
            <v-divider></v-divider>
              <div  v-for="(jugador,k) of torneos[0].players" :key="k" >
                <v-list-item class="pa-0 ma-0 " :class="colores[k]" @click="verOtro(jugador._id)">
                <v-row class="ancho" >
                  <v-col cols="2"  class="d-flex justify-start pa-0 ma-0">{{k+1}}</v-col>
                <v-divider vertical></v-divider>
                  <v-col cols="6" class="d-flex justify-center pa-0 ma-0">{{jugador.nickName}}</v-col>
                <v-divider vertical></v-divider>
                  <v-col cols="2"  class="d-flex justify-end pa-0 ma-0">{{jugador.points}}</v-col>
                </v-row>
                </v-list-item>
                <v-divider></v-divider>
              </div>

          </v-list-item-group>

          <v-list-item-content v-if="torneos[0].name===''" class="normal"> 
            <v-list-item-title class="headline mb-1 d-flex justify-center ">
              <v-icon large left color="#2C3A47">fas fa-beer</v-icon>
              No hay Torneos Creados
            </v-list-item-title>
          </v-list-item-content>

         <v-list-item-content   v-if="torneos[0].players.length===0 && torneos[0].name!=''  && imagen!='xs'"   class="normal"> 
            <v-list-item-title class="headline mb-1 d-flex justify-center ">
              <v-icon large left color="#2C3A47">fab fa-old-republic</v-icon>
              <p>Aún no hay jugadores en este torneo <br> Sé el primero en unirte</p>
            </v-list-item-title>
          </v-list-item-content>

          <v-list-item v-if="torneos[0].players.length===0 && torneos[0].name!='' && (imagen==='xs')" class="normal">
              <v-icon large  color="#2C3A47">fab fa-old-republic</v-icon>
              <p class="text-center mx-2">Aún no hay jugadores en este torneo <br> Sé el primero en unirte</p>
           </v-list-item>

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
    ...mapState(['_id']),
    colores(){
      const array=[]
      if(this.torneos[0].name!=""){
        const largo = this.torneos[0].players.length
        if(largo<=4){
          for (let i = 0 ; i < largo ; i++) {
            array.push('normal')
          }
          return array
        }
        if(4<largo && largo<7){
          array.push('ascenso')
          for (let i = 0; i < largo-2; i++) {
            array.push('normal')
          }
          array.push('descenso')
          return array
        }
        if(largo>=7){
          array.push('ascenso')
          for (let i = 0; i < largo-3; i++) {
              array.push('normal')
          }
          array.push('descenso')
          array.push('descenso')
          return array
        }  
      }if(this.torneos[0].name===""){
        array.push('hola')
        return array
      }
    },
    imagen(){
      switch (this.$vuetify.breakpoint.name){
          case 'xs': return 'xs'
          case 'sm': return 'sm'
          case 'md': return 'md'
          case 'lg': return 'lg'
          case 'xl': return 'xl'
      }
    }
  },
  methods:{
    ...mapMutations( 'loading',['loadingFunction']),
    ...mapMutations( 'torneo',['obtenerTorneos']),
    verOtro(id){
      if(id!=this._id){
        this.$router.push({path:`/torneos/${id}`})
      }
      if(id===this._id){
        this.$router.push({path:`/?tab=jugadas`})
      }
    }
  }
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
    margin: 0 auto;
}
.ancho{
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
/* .theme--light.v-divider {
    border-color: #B0ABAB !important; 
} */
</style>



