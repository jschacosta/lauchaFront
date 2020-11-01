<template >
  <v-container >
    <v-row>
    <v-card class="elevation-12 general" max-width="600px">
        <div v-for="(item,i) of fechas " :key="i">
        <v-list-item-content class="ma-0 pa-0 fondoFecha">
        <div class="overline ml-3" >{{item}}</div>
    </v-list-item-content>
    <v-divider></v-divider>
        <v-list dense flat class="pa-0 ma-0" >
            <v-list-item-group class="  pa-0 fondoPartidos" v-for="(partido,j) of partidosCalendario " :key="j">
                <v-list-item class="pa-0" v-if="partido.fechaPartido===item">
                    <v-col class=" pa-0 text-center" cols="5" >
                        {{partido.local}}
                    </v-col>
                    <v-col class="pa-0 ma-0" cols="2">
                            <v-row class="d-flex justify-center" >                                    
                              <v-chip class="mt-1" x-small color="success" v-if="partido.estado==='JUGANDO'">En vivo</v-chip>
                              <v-chip class="mt-1" x-small color="error" v-if="partido.estado==='TERMINADO'">Finalizado</v-chip>
                            </v-row >
                            <v-row class="d-flex justify-center" v-if="partido.estado==='JUGANDO' || partido.estado==='TERMINADO'">                                    
                              {{partido.score.join('-')}}
                            </v-row>
                            <v-row class="d-flex justify-center mt-2 pa-0 ma-0" v-if="partido.estado==='POR JUGAR'">                                    
                            {{partido.horaPartido}}
                            </v-row> 
                    </v-col>
                    <v-col class="pa-0 text-center" cols="5">
                        {{partido.visita}}
                    </v-col>    
                </v-list-item>
                <v-divider v-if="partido.fechaPartido===item"></v-divider>
            </v-list-item-group>
        </v-list>
        <v-divider></v-divider>
        </div>

        <v-row>

        <v-list-item-content v-if="this.partidosCalendario.length===0" class="fondoPartidos"> 
        <v-list-item-title class="headline mb-1 d-flex justify-center ">
          <v-icon
        large
        left
        color="#2C3A47"
      >
        fas fa-beer
      </v-icon>No hay Partidos Agendados</v-list-item-title>
      </v-list-item-content>
        </v-row>
    </v-card>
    </v-row>
  </v-container>
</template> 
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import meses from '@/store/data/months';
export default {
    name: 'CalendarioUser',
    data:()=>({
      meses
    }),
    computed:{
      ...mapState('relato',['partidosCalendario',]),
      fechas(){
        const tiempo=[]
        for (let item of this.partidosCalendario){
          tiempo.push(item.fechaPartido)
        }
        return [...new Set(tiempo)]
      }
    },
    methods:{
      ...mapMutations( 'loading',['loadingFunction']),
      ...mapActions( 'relato',['calendario']),
      ...mapActions( 'relato',['obtenerCalendario']),
    },
    created: function(){
      if(this.partidosCalendario.length === 0 ){
        this.loadingFunction()
        this.axios.get(`/match-estado/JUGANDO&POR-JUGAR&TERMINADO`)
        .then(res=>{
        this.obtenerCalendario(res.data)
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

<style scoped>
.fondoFecha{
  background-color: #2C3A47;
  color: white
}
.fondoPartidos{
  background-color: #E0E0E0 ;
}
.general{
  width: 800px;
  margin-left: auto;
  margin-right: auto;
}
</style>