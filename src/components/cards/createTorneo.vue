<template>
<div>
  <v-btn class="my-10" @click="dialogo=true" v-if="boton===true" rounded color="primary" dark>Crear Torneo</v-btn>
  <v-btn class="my-10" v-if="boton===false" rounded color="error" @click="terminarTorneo()" dark>Terminar Torneo</v-btn>
  <v-card class="pa-0"  v-if="boton===false" >
    <v-list class="pa-0">
      <v-list-item-group class="pa-0">
        <v-list-item class="pa-0">
          <v-row class="text-center">
            <v-col cols="6">
              {{torneos[0].name}}
            </v-col>
            <v-col cols="2">
              {{torneos[0].players.length}}/10
            </v-col>
            <v-col cols="4">
              <v-btn small @click="edicion" v-if="botonDos===true" rounded color="warning" dark>Activar Edicion</v-btn>
              <v-btn small @click="edicion" v-if="botonDos===false" rounded color="error" dark>Desactivar Edicion</v-btn>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
  {{torneos}}
  <v-dialog v-model="dialogo" max-width="500px" persistent>
    <v-card class="container">
      <v-card-title>
        Escribe el nombre del torneo
      </v-card-title>
      <v-card-text>
        <v-text-field 
            v-model="nombre"
            label="Nombre del Torneo"
            type="text"
            outlined
            dense
            class="mr-10 ml-5"
            >
            Escribe el nombre para el Torneo
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialogo=false" color="green darken-1" text>Cancelar</v-btn>
        <v-btn @click="crearTorneo() ; dialogo=false" color="green darken-1" text>Crear Torneo</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    name: 'CreateTorneo',
    data:()=>({
      dialogo: false,
      nombre:null,
      creado:false,
    }),
    computed:{
    ...mapState('relato',['partidosCalendario']),
    ...mapState( 'torneo',['torneos', 'boton', 'botonDos']),
    },
    methods:{
    ...mapMutations( 'loading',['loadingFunction']),
    ...mapActions( 'relato',['obtenerCalendario']),
    ...mapMutations( 'torneo',['obtenerTorneos', 'cambiarBoton','eliminarTorneo']),
      async crearTorneo(){
        this.loadingFunction()
        var partidos = []
        await this.axios.get(`/match-estado/POR-JUGAR`)
          .then(res=>{
            this.obtenerCalendario(partidos)
            partidos= res.data
            
          })
          .catch(e=>{
            console.log(e.response.data.mensaje);
            
          })  
        const nuevoTorneo={
          name:this.nombre,
          edition:'true',
          matches:[]
          }
          for (let item of partidos){
            nuevoTorneo.matches.push({_id:item._id, score:null, ruleResult:[], valorRegla:[],apuesta:item.apuesta, ruleApuesta:[]})
          }
          console.log(nuevoTorneo)
          await this.axios.post(`/torneos`, nuevoTorneo)
          .then(res=>{
            this.obtenerTorneos(res.data)
            this.cambiarBoton(false)
          })
          .catch(e=>{
            console.log(e.response.data.mensaje);
          })  
        this.loadingFunction()
      },
      edicion(){
        this.loadingFunction()
      },
      terminarTorneo(){
          this.loadingFunction()

        this.axios.delete(`/torneos/${this.torneos[0]._id}`)
        .then(res=>{
          this.eliminarTorneo(res.data)
          this.cambiarBoton(true)
          this.loadingFunction()

        })
        .catch(e=>{
          console.log(e.response.data.mensaje);
        this.loadingFunction()

        })  
      }
    },
    
}
</script>
