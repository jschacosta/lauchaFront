<template>
  <div class="ancho">
    <v-tabs vertical class="elevation-10">
      <v-tab v-if="sumadeTodo!=0 && imagen!='xs'" >TABLA</v-tab>
      <v-tab v-if="sumadeTodo!=0 && imagen==='xs'" >T</v-tab>
      <v-tab v-for="(partido,i) of partidos" :key="i">
        P {{i+1}}
      </v-tab>
      <v-tab-item v-if="sumadeTodo!=0">
        
            <v-list class="pa-0 ma-0 encabezado" >
          <v-list-item-group class="pa-0 ma-0 text-center">
            <v-list-item-content class="pa-0 ma-0 ">
              <v-row class="text-center ma-0 pa-0 text-caption ">
                <v-col cols="2" class="ancho" v-if="imagen!='xs'">PARTIDO</v-col>
                <v-col cols="2" class="ancho" v-if="imagen==='xs'">P</v-col>
                <v-col cols="2" class="ancho">RES</v-col>
                <v-col cols="2" class="ancho" v-if="imagen!='xs'">DIF GOLES</v-col>
                <v-col cols="2" class="ancho" v-if="imagen==='xs'">DG</v-col>
                <v-col cols="2" class="ancho" v-if="imagen!='xs' && imagen!='sm'">MARCA EXAC</v-col>
                <v-col cols="2" class="ancho" v-if="imagen==='xs' || imagen==='sm'">ME</v-col>
                <v-col cols="2" class="ancho" v-if="imagen!='xs'">R ESP</v-col>
                <v-col cols="2" class="ancho" v-if="imagen==='xs'">RE</v-col>
                <v-col class="ancho" v-if="imagen!='xs'">TOTAL</v-col>
                <v-col class="ancho" v-if="imagen==='xs'">T</v-col>
              </v-row>
            </v-list-item-content>

              <v-row v-for="(item,i) of puntosSeparados.matches" :key="i" class="pa-0 ma-0 text-center normal" >
                <v-col cols="2" class="ancho d-flex align-center font-weight-bold" >
                    P{{i+1}}
                </v-col>
            <v-list-item-content v-for="(item2,j) of item" :key="j" class="pa-0 ma-0" background-color="primary">
                <v-col cols="2" class="ancho " v-if="item2!=null && item2!=0 && imagen!='xs'" >
                  <v-chip :x-small="imagen==='xs'?true:false" :color="item2>0?'primary':'error'">{{item2}}</v-chip></v-col>
                <v-col cols="2" class="ancho py-5" v-if="item2===null || item2===0 "></v-col>
                
                <v-col cols="2" class="ancho " v-if="item2!=null && item2!=0 && imagen==='xs'" :class="item2>0?'primary--text':'error--text'" >
                  {{item2}}</v-col>
            </v-list-item-content>
              <!-- <v-divider vertical></v-divider> -->
                <v-col v-if="item.reduce((a, b) => a + b, 0)!=0 && imagen!='xs' " cols="2" class="ancho" ><v-chip :x-small="imagen==='xs'?true:false" :color="item.reduce((a, b) => a + b, 0)>0?'primary':'error'">{{item.reduce((a, b) => a + b, 0)}}</v-chip></v-col>
                <v-col v-if="item.reduce((a, b) => a + b, 0)!=0 && imagen==='xs'" cols="2" class="ancho" :class="item.reduce((a, b) => a + b, 0)>0>0?'primary--text':'error--text'" >{{item.reduce((a, b) => a + b, 0)}}</v-col>
  
              </v-row>
          </v-list-item-group>
          </v-list>
        </v-tab-item>

      <v-tab-item v-for="(parti2,j) of partidos" :key="j">
        <v-card  color="#E0E0E0" >
              
          <v-row class="d-flex justify-center align-center mb-3 " dense>
            <v-col class="d-flex justify-end mt-5" cols="3">
              {{parti2.local}}
            </v-col>
            <v-col class=" d-flex justify-center align-end  mt-5" cols="1">
              {{parti2.score[0]}} 
            </v-col>
            <v-col class="d-flex justify-center align-center mt-5" cols="1">
              <h3>-</h3>
            </v-col>
            <v-col class=" d-flex justify-center align-start mt-5" cols="1">
              {{parti2.score[1]}}
            </v-col>
            <v-col class="d-flex justify-start align-start mt-5" cols="3"> 
              {{parti2.visita}}
            </v-col>
          </v-row>

          <v-row class="d-flex justify-center align-center mb-5" dense>
            <v-col  cols="3" class=" pa-0 ma-0 d-flex flex-column justify-center align-center ">
              <p class="ma-0 pa-0">Local</p>
              <v-chip small dense class="ma-1 font-weight-bold" dark color="green darken-2" > {{parti2.apuesta[0]}} </v-chip>
            </v-col>
            <v-col  cols="3" class=" pa-0 ma-0 d-flex flex-column justify-center align-center ">
              <p class="ma-0 pa-0">Empate</p>
              <v-chip small class="ma-1 font-weight-bold" dark color="green darken-2" > {{parti2.apuesta[1]}} </v-chip>
            </v-col>
            <v-col  cols="3" class=" pa-0 ma-0 d-flex flex-column justify-center align-center ">
              <p class="ma-0 pa-0">Visita</p>
              <v-chip  small class="ma-1 font-weight-bold" dark color="green darken-2"> {{parti2.apuesta[2]}} </v-chip>
            </v-col>
          </v-row >

          <div  v-for="(item2,k) of parti2.rules" :key="k" >
            
            <h4 class="mt-1 mb-2 mx-5 font-weight-regular">{{item2.text}}
              <v-icon right v-if="parti2.ruleElections[k]===parti2.ruleResult[k]-1 && parti2.ruleResult[k]-1!=-1" color="success">fas fa-check</v-icon>
              <v-icon right v-if="parti2.ruleElections[k]!=parti2.ruleResult[k]-1  && parti2.ruleResult[k]-1!=-1 && parti2.ruleResult[k]!=null   && parti2.ruleElections[k]!=null" color="error">fas fa-times</v-icon>
              </h4>
              <v-radio-group v-model="parti2.ruleElections[k]" disabled>
                <v-row  dense v-for="(texto,m) of parti2.rules[k].options.text" :key="m">
                  <v-col>
                    <v-radio
                      class="mx-8"
                      :label="`${texto}`"
                      :value="m"
                    ></v-radio>
                   </v-col>
                   <v-col>
                      {{parti2.rules[k].options.values[m]}} pts 
                   </v-col>
                 </v-row>
            </v-radio-group>
          </div>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div> 
</template>

<script>
import tablaPosiciones from '@/components/tables/tablaPosiciones.vue'
import steper from '@/components/dialog/steper.vue'
import { mapMutations, mapState } from 'vuex'

export default {
  name:'Juegos',

  computed:{
    ...mapState('torneo',['torneos','matchTorneo', 'puntosSeparados']),
    ...mapState(['_id']),
    imagen(){
      switch (this.$vuetify.breakpoint.name){
          case 'xs': return 'xs'
          case 'sm': return 'sm'
          case 'md': return 'md'
          case 'lg': return 'lg'
          case 'xl': return 'xl'
      }
    },
    partidos(){
      const arrayJugador=[]
      const index=this.torneos[0].players.findIndex(item=>item._id === this._id);
      const matchUsuario = this.torneos[0].players[index].matches
      for(let item of matchUsuario){
        for(let item2 of this.matchTorneo){
          if( item._id===item2._id){
            item2.score=item.score
            item2.ruleElections=item.ruleElections
            arrayJugador.push(item2)
          }
        } 
      }
      return arrayJugador
    },
    sumadeTodo(){
      const array= this.puntosSeparados.matches.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), []);
      return array.reduce((a, b) => a + b, 0)

    }
   
  },
  methods:{
    ...mapMutations('torneo',['cambiarDialog','obtenerTorneos']),
    ...mapMutations( 'loading',['loadingFunction']),
    unirse(){
      this.cambiarDialog(true)
    }
  },
}
</script>
<style scoped>
.ancho{
  margin: 0 auto;
  display: flex;
  justify-content: center;
  max-width: 800px;
}
.lateral { width: 30px;
max-width: 60px; }

.encabezado{
  background-color: #2C3A47;
  color: white
}
.claro{
  background-color: #E0E0E0;
  color:  #2C3A47
}
.oscuro{
  background-color: #D1CBCA;
  color:  #2C3A47
}
.normal{
  background-color:  #E0E0E0;
  color: #2C3A47
}
.descenso{
  background-color: #ffcccc;
  color: #2C3A47
}
.ascenso{
  background-color: #b3ffcc;
  color: #2C3A47
}
</style>