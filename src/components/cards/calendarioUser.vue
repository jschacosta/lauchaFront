<template>
    <div >
        <v-card class="elevation-15  fluid" max-width="610px" >
            <div v-for="(item,i) of partidosCalendario " :key="i">
            <v-list-item-content class="ma-0 pa-0">
            <div class="overline ml-3 ">{{item.fechaPartido}}</div>
        </v-list-item-content>
        <v-divider></v-divider>
            <v-list dense flat class="pa-0 ma-0" disabled>
                <v-list-item-group class=" container-fluid pa-0" >
                    <v-row class="container-fluid pa-0" >
                        <v-col class="fluid pa-0" cols="4">
                            <v-list-item class="d-flex justify-center align-center">{{item.local}}</v-list-item>
                        </v-col>
                        <v-col class="pa-0 ma-0" cols="3">
                                <v-row class="fluid d-flex justify-center" v-if="item.estado==='JUGANDO'">                                    
                                  <v-chip class="mt-1" x-small color="success">En vivo</v-chip>
                                  <v-chip class="mt-1" x-small color="error" v-if="item.estado==='TERMINADO'">Finalizado</v-chip>
                                </v-row >
                                <v-row class="d-flex justify-center" v-if="item.estado==='JUGANDO' || item.estado==='TERMINADO'">                                    
                                  2-1
                                </v-row>
                                <v-row class="d-flex justify-center mt-2 pa-0 ma-0" v-if="item.estado==='POR JUGAR'">                                    
                                {{item.horaPartido}}
                                </v-row> 
                        </v-col>
                        <v-col class="fluid pa-0 " cols="4">
                            <v-list-item class="d-flex pa-0 justify-center align-center">{{item.visita}}</v-list-item>
                        </v-col>
                    </v-row>
                </v-list-item-group>
            </v-list>
            <v-divider></v-divider>
            </div>
        </v-card>
    </div>
</template> 
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    name: 'CalendarioUser',
    computed:{
      ...mapState('relato',['partidosCalendario',])
    },
    methods:{
      ...mapMutations( 'loading',['loadingFunction']),
      ...mapActions( 'relato',['calendario']),
    },
    created: function(){
      if(this.partidosCalendario.length === 0 || this.partidosCalendario === undefined){
        this.loadingFunction()
        this.axios.get(`/match`)
        .then(res=>{
        let nuevosPartidos =res.data;
        const partidosFilter = []
        for (let edicion of nuevosPartidos){
          if(edicion.estado != 'PENDIENTE' ){
            partidosFilter.push(edicion)
          }
        }
        this.ontenerCalendario(partidosFilter)
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
