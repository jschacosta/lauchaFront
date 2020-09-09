<template>
  <div>
    <v-card class="elevation-15">
      <v-card-title>
        Total Partidos: {{partidos.length}}
        <v-spacer></v-spacer>
        <v-btn  class="ml-10"  small color="primary" v-if="partidos.length > 0"  @click="enviarPartidos()">
            Enviar Partidos<v-icon dark>mdi-share</v-icon>
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
      <v-data-table :headers="headers" :items="partidos" :search="search" class="elevation-2">
        <template v-slot:[`item.accion`]="{ item }">
          <v-btn class="mr-2" small color="primary"  @click="añadirReglas(item)" v-if="item.boton===true">
            + Rule
          </v-btn> 
          <v-btn class="mr-2"  small color="yellow darken-1"  @click="editarReglas(item)" v-if="item.boton===false">
            <v-icon dark>mdi-pencil</v-icon> 
            Rules
          </v-btn>   
          <v-btn class="mr-2" small color="error"  @click="borrarReglas(item)" v-if="item.boton===false">
            <v-icon >mdi-delete</v-icon>
            Rule
          </v-btn>  
          <v-btn class="mr-2" small tile large color="error" icon @click="borrarPartido(item)">
            <v-icon dark>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

  </div>
</template> 
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
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
      ...mapState('match',['partidos','boton','pedido'])
  },
  methods:{
      ...mapMutations('match',['verPartidos','deletePartido','dialogReglas','actualizarReglas','subirReglas','pedir']),
      ...mapMutations( 'loading',['loadingFunction']),
      ...mapMutations( 'confirmar',['confirmar']),
      ...mapActions('relato',['añadirCalendario']),
      borrarPartido(partido){
        this.loadingFunction()
        const id= partido._id;
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
      },
      añadirReglas(item){
        this.dialogReglas(item)
      },
      editarReglas(item){
        this.subirReglas(item)
      },
      borrarReglas(item){
        this.loadingFunction()
        item.rules=[]
        this.axios.put('/match-rule', item)
        .then(res=>{
            let partido =res.data;
            partido.boton=true
            this.actualizarReglas(partido)
            this.loadingFunction()   
        })
        .catch(e=>{
            this.loadingFunction()
            console.log(e.response.data.mensaje);
        })
      },
      enviarPartidos(){
        const info = {
            titulo:"¿Está seguro de enviar estos partidos a Relatos?",
            cuerpo:'Al confirmar, estos partidos estarán para el juego de los usuarios y para la zona de relatos',
            boton: 'enviarPartidos',
            datos:[]
        }
        for (let item of this.partidos){
          item.estado = 'POR JUGAR'
        };
        info.datos = this.partidos
        this.confirmar(info)
      }
  },
  created: function(){
    if(this.pedido===false){
      this.loadingFunction()
      this.axios.get(`/match-estado/PENDIENTE`)
      .then(res=>{
        this.verPartidos(res.data)
        this.pedir()
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
