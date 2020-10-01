<template>
  <div class="ancho">
    <v-tabs vertical class="elevation-10">
      <v-tab v-if="sumadeTodo!=0 && imagen!='xs'" >TABLA</v-tab>
      <v-tab v-if="sumadeTodo!=0 && imagen==='xs'" >T</v-tab>
      <v-tab v-for="(partido,i) of partidos" :key="i">
        P {{i+1}}
      </v-tab>
      <v-tab-item v-if="sumadeTodo!=0">
          <MiniTabla></MiniTabla>
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
import MiniTabla from '@/components/tables/minitabla.vue'
import { mapMutations, mapState } from 'vuex'

export default {
  name:'Juegos',
  components:{
    MiniTabla
  },
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
    ...mapMutations('torneo',['cambiarDialog']),
    unirse(){
      this.cambiarDialog(true)
    }
  }
}
</script>

<style scoped>
.ancho{
  margin: 0 auto;
  display: flex;
  justify-content: center;
  max-width: 800px;
}
</style>