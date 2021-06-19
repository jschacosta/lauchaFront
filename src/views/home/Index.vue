<template>
  <div  class="mt-5">
    <v-tabs v-model="tab" centered icons-and-text style>
      <v-tab href="#torneo">  
        Torneo 
        <i class="far fa-futbol"></i>
      </v-tab>
      <v-tab href="#calendario">
        Calendario 
        <i class="fa fa-calendar-alt"></i>
      </v-tab >
      <v-tab v-if="estaJugador===true" href="#jugadas">
        Mis Jugadas 
        <i class="fas fa-chess-knight"></i>
      </v-tab>
      <!-- Tab1 -->
      <v-tabs-items :value="tab">

      <v-tab-item  value="torneo">
        <v-container >
          <Posiciones/>
        </v-container>
      </v-tab-item >
      <!-- Tab2 -->
      <v-tab-item value="calendario">
        <v-container>
          <Calendario/>
        </v-container>
      </v-tab-item>
      <!-- Tab3 -->
      <v-tab-item v-if="estaJugador===true" value="jugadas">
        <v-container>
          <Juegos/>
        </v-container>
      </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>
<script>
import Posiciones from './tabs/Posiciones.vue'
import Calendario from './tabs/Calendario.vue'
import Juegos from './tabs/Juegos.vue'
import {  mapState, mapMutations, mapActions } from 'vuex'

export default {
  name:"Home",
  components:{
    Posiciones,
    Calendario,
    Juegos
  },
  computed:{
    ...mapState('torneo',['torneos','contadorTorneo']),
    ...mapState(['_id']),
    tab: {
      set (tab) {
        this.$router.replace({ query: { ...this.$route.query, tab } })
      },
      get () {
        return this.$route.query.tab
      }
    },
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
  },
  methods:{
    ...mapMutations( 'loading',['loadingFunction']),
    ...mapMutations( 'torneo',['cambiarDialog', 'pedirContador']),
    ...mapActions( 'torneo',['agregarPorJugar','puntajes']),
  },
  async created(){
    if(this.contadorTorneo===false){
      this.loadingFunction()
      this.axios.get(`/torneos`)  
      .then(res=>{
        const todoTorneo=res.data
        this.puntajes(res.data)
        this.axios.get(`/match-estado/JUGANDO&POR-JUGAR&TERMINADO`)
        .then(respuesta=>{
          const ambosArreglos=[todoTorneo,respuesta.data]
          this.loadingFunction()
          this.agregarPorJugar(ambosArreglos)
          this.pedirContador()
        })
        .catch(e=>{
          this.loadingFunction()
          console.log(e.response.data.mensaje);
        })

      })
      .catch(e=>{
        this.puntajes([{name:"",players:[]}])
        this.loadingFunction()
        console.log(e.response.data.mensaje);
      })
    }
   
  }
}
</script>
