<template>
  <div>
    <v-card class="elevation-15">
      <v-card-title>
        Total Partidos: {{partidos.length}}
        <v-spacer></v-spacer>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar jugador"
        single-line
        hide-details
        class="elevation-3">
        </v-text-field>
      </v-card-title>
      <v-row>
        <v-col  class="ml-15" md="4">Total Jugadores: </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="partidos" :search="search" class="elevation-2">
        <template v-slot:item.accion="{ item }">          
          <v-btn class="mr-2" fab dark small color="error" @click="borrarPartido(item)">
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
        {text: 'ACCION',  value: 'accion', sortable: false },
        ],
    }),
    computed:{
        ...mapState('teams',['torneos']),
        ...mapState('match',['partidos'])
    },
    methods:{
        ...mapMutations('match',['verPartidos', 'deletePartido']),
        borrarPartido(partido){
            const id= partido._id;
            console.log(id)
            this.axios.delete(`/match/${id}`)
            .then(res=>{
                let partidos =res.data;
                this.deletePartido(partidos)
            })
            .catch(e=>{ 
                console.log(e.response.data.mensaje);
            })
        }
    },
    created: function(){
        if(this.partidos.length === 0 || this.partidos === undefined){
            this.axios.get(`/match`)
            .then(res=>{
                let partidos =res.data;
                this.verPartidos(partidos)
            })
            .catch(e=>{ 
                console.log(e.response.data.mensaje);
            })
        }
    }
}
</script>
