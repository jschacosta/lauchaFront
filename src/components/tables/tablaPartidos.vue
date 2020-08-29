<template>
  <div>
    <v-card class="elevation-15">
      <v-card-title>
        Total Partidos: {{partidos.length}}
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
      <v-data-table :headers="headers" :items="partidos" :search="search" class="elevation-2">
        <template v-slot:item.accion="{ item }">
          <v-btn class="mr-2" small color="primary"  @click="añadirReglas(item)">
            + Reglas
          </v-btn>         
          <v-btn class="mr-2" tile large color="error" icon @click="borrarPartido(item)">
            <v-icon dark>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'tablaPartidos',
    data:()=>({
        search:"",
        eleccion:"",
        headers: [
        {text: 'TORNEO', align: 'start', sortable: true, value: 'torneo'},
        {text: 'LOCAL', sortable: true, value: 'local'},
        {text: 'VISITA', sortable: true, value: 'visita'},
        {text: 'FECHA', sortable: true, value: 'fechaPartido'},
        {text: 'HORA', sortable: true, value: 'horaPartido'},
        {text: 'ACCION', value: 'accion', sortable: false },
        ],
    }),
    computed:{
        ...mapState('teams',['torneos']),
        ...mapState('match',['partidos'])
    },
    methods:{
        ...mapMutations('match',['verPartidos', 'deletePartido']),
        ...mapMutations( 'loading',['loadingFunction']),
        borrarPartido(partido){
          this.loadingFunction()
          const id= partido._id;
          console.log(id)
          this.axios.delete(`/match/${id}`)
          .then(res=>{
              let partidos =res.data;
              this.deletePartido(partidos)
              this.loadingFunction()
          })
          .catch(e=>{
              this.loadingFunction()
              console.log(e.response.data.mensaje);
          })
        }
    },
    created: function(){
        if(this.partidos.length === 0 || this.partidos === undefined){
          this.loadingFunction()
          this.axios.get(`/match`)
          .then(res=>{
              let partidos =res.data;
              this.verPartidos(partidos)
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
