<template>
  <div>
    <v-card class="elevation-15" >
      <v-card-title>
        Edición Final y Partidos a Archivar
        <v-spacer></v-spacer>
        <v-btn dark small color="grey darken-3"  @click="archivarPartidos()">
            Archivar Partidos
            <v-icon right dark>folder</v-icon>
          </v-btn> 
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
      <v-data-table :headers="headers" :items="partidosTerminados" :search="search" class="elevation-2" dense >
          <template v-slot:[`item.estado`]="{ item }">
      <v-chip color="black" outlined x-small dark>{{ item.estado }}</v-chip>
    </template>
        <template v-slot:[`item.accion`]="{ item }">
          <v-btn class="mr-2" x-small color="primary"  @click="editarResultado(item)">
            EDITAR RESULTADOS FINAL
          </v-btn> 
        </template>
      </v-data-table>
    </v-card>
  </div>
</template> 
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import loadingBarVue from '../bars/loadingBar.vue';
export default {
  name: 'tablaTerminados',
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
    ...mapState('relato',['partidosTerminados','pedido2'])
  },
  methods:{
    ...mapMutations( 'loading',['loadingFunction']),
    ...mapMutations( 'relato',['pedir2']),
    ...mapActions( 'relato',['mostrarEliminados']),
    editarResultado(item){
    },
    archivarPartidos(){
    },
  },
  created: function(){
    if(this.pedido2===false){
      this.loadingFunction()
      this.axios.get(`/match-estado/TERMINADO`)
      .then(res=>{
        this.mostrarEliminados(res.data)
        this.pedir2(true)
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
