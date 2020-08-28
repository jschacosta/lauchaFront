<template>
  <div>
    <v-row>
      <v-col class=" d-flex text-start align-center" cols="4">
        <h2>Torneo: {{torneos.torneo}}</h2>
      </v-col>
      <v-col cols="4" class=" text-left align-center">
        <v-select :items="torneos.equipos" v-model="eleccion" label="Elegir Equipo"></v-select>
      </v-col>
      <v-col cols="4" class=" d-flex text-start align-center">
        <v-btn color="primary" dark @click="searchPlayer()">Buscar Jugadores</v-btn>
      </v-col>
    </v-row>
    <v-card class="elevation-15">
      <v-card-title>
        Equipo: {{eleccion}}
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
        <v-col  md="4" class="ml-auto"> 
            <v-btn dark ml-auto color="green accent-5" v-if="confirmacion===true" @click="dialog=true">Agregar</v-btn>
        </v-col>
      </v-row>

      <v-data-table
      :headers="headers"
      :items="jugadores"
      :search="search"
      class="elevation-2"
      >
        <template v-slot:item.accion="{ item }">          
          <v-btn class="mr-2" fab dark small color="error" @click="borrarEquipo(item)">
            <v-icon dark>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'tablaPlayers',
  data:()=>({
    search:"",
    dialog:"",
    confirmacion:"",
    eleccion:"",
    headers: [
      {text: 'NOMBRE', align: 'start', sortable: true, value: 'name'},
      {text: 'APELLIDO', sortable: true, value: 'lastName'},
      {text: 'ACCIONES',  value: 'accion', sortable: false },
    ],
    jugadores:[
      {name:'Pedrito', lastName:'Perez'},
      {name:'Miguelito', lastName:'Soto'},
    ]
  }),
  computed:{
      ...mapState('teams',['torneos'])
  },
  methods:{
    searchPlayer(){
      if(this.torneos.elecciones===undefined){
        console.log('Mal jugado')
      }else{
        this.axios.get(`/players`, this.torneos.elecciones)
          .then(res=>{
            console.log(res.data)
          })
          .catch(e=>{ 
            console.log(e.error)
          })
      }
    }
  }
}
</script>
