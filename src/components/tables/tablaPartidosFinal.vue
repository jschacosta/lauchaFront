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
      <v-data-table
      v-model="seleccion"
      :headers="headers" 
      :items="partidosTerminados"
      item-key="_id"
      show-select 
      dense
      :search="search" 
      class="elevation-2"  
      >
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
export default {
  name: 'tablaTerminados',
  data:()=>({
      search:"",
      seleccion: [],
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
    ...mapState('relato',['partidosTerminados','pedidoTer'])
  },
  methods:{
    ...mapMutations( 'loading',['loadingFunction']),
    ...mapMutations('textoSnack',['agregarSnack']),
    ...mapMutations( 'confirmar',['confirmar']),
    ...mapMutations( 'relato',['pedirTerminados']),
    ...mapActions( 'relato',['obtenerTerminados']),
    editarResultado(item){
      this.$router.push({path:`/admin/finish/${item._id}`})
    },
    archivarPartidos(){
      if(this.seleccion.length!=0){
        const info = {
          titulo:"¿Está seguro de desea archivar estos Partidos?",
          cuerpo:'Al confirmar, estos partidos ya no podrán ser modificados y serán eliminados de la interfaz del usuario y el candario de partidos',
          boton: 'archivarPartidos',
          datos:[]
        }
        const archivar = this.seleccion
        for(let item of archivar){
            item.estado ="GUARDADO"
        }
        info.datos = archivar
        this.confirmar(info)
      }
      if(this.seleccion.length===0){
        const snack = 'No ha seleccionado partidos'
        this.agregarSnack(snack)
      }
    },
  },
  created: function(){
    if(this.pedidoTer===false){
      this.loadingFunction()
      this.axios.get(`/match-estado/TERMINADO`)
      .then(res=>{
        this.obtenerTerminados(res.data)
        this.pedirTerminados(true)
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
