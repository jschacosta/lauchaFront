<template>
  <div>
    <v-card class="elevation-15" >
      <v-card-title>
        Partidos a Relatar
        <v-spacer></v-spacer>
        <v-text-field
        v-model="search"
        dense
        append-icon="mdi-magnify"
        label=" Buscar Partido"
        single-line
        hide-details
        class="elevation-3">
        </v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="partidosCalendario" :search="search" class="elevation-2" dense >
          <template v-slot:[`item.estado`]="{ item }">
      <v-chip :color="getColor(item.estado)" outlined x-small dark>{{ item.estado }}</v-chip>
    </template>
        <template v-slot:[`item.accion`]="{ item }">
          <v-btn class="mr-2" x-small color="primary"  @click="iniciarRelato(item)" v-if="item.boton===true">
            INICIAR  PARTIDO
          </v-btn> 
          <v-btn class="mr-8"  x-small color="yellow darken-1"  @click="reanudarRelato(item)" v-if="item.boton===false">
            REANUDAR PARTIDO
          </v-btn>   
          <v-btn class="mr-2"  x-small color="error"  @click="terminarRelato(item)" v-if="item.boton===false">
            FINALIZAR PARTIDO
          </v-btn>  
        </template>
      </v-data-table>
    </v-card>
  </div>
</template> 

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  name: 'CalendarioAdmin',
  data:()=>({
      search:"",
      eleccion:"",
      headers: [
      {text: 'TORNEO', align: 'start', sortable: true, value: 'torneo'},
      {text: 'LOCAL', sortable: true, value: 'local'},
      {text: 'VISITA', sortable: true, value: 'visita'},
      {text: 'FECHA', sortable: true, value: 'fechaPartido'},
      {text: 'HORA', sortable: true, value: 'horaPartido'},
      {text: 'ESTADO', sortable: true, value: 'estado'},
      {text: 'ACCION', value: 'accion', sortable: false },
      ],
  }),
  computed:{
    ...mapState('relato',['partidosCalendario','pedidoCal'])
  },
  methods:{
    ...mapMutations( 'loading',['loadingFunction']),
    ...mapMutations( 'relato',['pedirCalendario']),
    ...mapMutations( 'confirmar',['confirmar']),
    ...mapActions( 'relato',['obtenerCalendario']),
    getColor (estado) {
      if (estado === 'POR JUGAR') return 'red'
      else return 'green'
    },
    iniciarRelato(item){
      const info = {
        titulo:`Iniciar Partido`,
        cuerpo:`¿Desea iniciar el partido ${item.local} v/s ${item.visita}?`,
        boton: 'iniciarRelato',
        datos:[]
        }
      info.datos=item
      this.confirmar(info)
    },
    reanudarRelato(item){
      item.boton= false
      this.$router.push({path:`/admin/play/${item._id}`})
    },
    terminarRelato(item){
      const info = {
        titulo:`Terminar Partido`,
        cuerpo:`¿Desea dar por terminado  el partido  ${item.local} v/s ${item.visita}?`,
        boton: 'terminarRelato',
        datos:[]
        }
        info.datos=item
        this.confirmar(info)
    }
  },
  created: function(){
    if(this.pedidoCal===false){
      this.loadingFunction()
      this.axios.get(`/match-estado/JUGANDO&POR-JUGAR`)
      .then(res=>{
        const partidosFilter = []
        for (let edicion of res.data){
          if(edicion.estado === 'JUGANDO'){
            edicion.boton=false
            partidosFilter.push(edicion)       
          }
          if(edicion.estado === 'POR JUGAR'){
            edicion.boton=true
            partidosFilter.push(edicion)
          }
        }
        this.obtenerCalendario(partidosFilter)
        this.pedirCalendario(true)
        this.loadingFunction()
      })
      .catch(e=>{
        this.loadingFunction()
        console.log(e.response.data.mensaje);
      })  
    }
  }   
}
</script>
