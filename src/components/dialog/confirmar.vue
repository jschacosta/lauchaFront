<template>
  <v-row justify="center">
    <v-dialog v-model="info.estado" persistent max-width="600" >
      <v-card>
        <v-card-title class="headline">{{info.titulo}}</v-card-title>
        <v-card-text>{{info.cuerpo}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="info.estado = false">Cancelar</v-btn>
          
          <v-btn color="green darken-1" text 
          @click="enviarPartidos() ; info.estado = false" v-if="this.info.boton === 'enviarPartidos'">Enviar Partidos</v-btn>
          
          <v-btn color="green darken-1" text 
          @click="iniciarRelato() ; info.estado = false" v-if="this.info.boton === 'iniciarRelato'">Iniciar Relato</v-btn>

          <v-btn color="green darken-1" text 
          @click="terminarRelato() ; info.estado = false" v-if="this.info.boton === 'terminarRelato'">Terminar Relato</v-btn>

        <v-btn color="green darken-1" text 
          @click="borrarUsuario() ; info.estado = false" v-if="this.info.boton === 'borrarUsuario'">Borrar Usuario</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    name:'dialogoConfirmar',
    computed:{
        ...mapState('confirmar',['info']),
        ...mapState(['token']),
        config(){
            return {headers: {token:this.token}}
        }
    },
    methods:{
        ...mapMutations('loading',['loadingFunction']),
        ...mapMutations('confirmar',['desconfirmar']),
        ...mapMutations('match',['limpiarPartidos']),
        ...mapMutations('userAdmin',['eliminarUsuario']),
        ...mapActions('relato',['añadirCalendario','estadoCalendario','eliminarCalendario']),

        enviarPartidos(){
            this.loadingFunction()
            this.axios.put('/match-relato', this.info.datos)
            .then(res=>{
                let partidos =res.data;
                for (let item of partidos){
                item.boton = true
                };
                this.añadirCalendario(partidos)
                this.limpiarPartidos()
                this.loadingFunction()
                //Importante cerrar dialog
                this.info.estado=false
            })
            .catch(e=>{
                this.loadingFunction()
                console.log(e.response.data.mensaje);
            })
        },
        iniciarRelato(){
            this.loadingFunction()
            this.info.datos.estado='JUGANDO'
            this.axios.put(`/match-rule`,this.info.datos)
            .then(res=>{
                let partido=res.data;
                partido.boton= false
                this.estadoCalendario(partido)
                this.loadingFunction()
                this.$router.push({path:`/admin/play/${partido._id}`})
                //Importante cerrar dialog
                this.info.estado=false
            })
            .catch(e=>{
                this.loadingFunction()
                console.log(e);
            })
        },
        terminarRelato(){
            this.loadingFunction()
            this.info.datos.estado='TERMINADO'
            this.axios.put(`/match-rule`,this.info.datos)
            .then(res=>{
                let partido=res.data;
                this.eliminarCalendario(partido)
                this.loadingFunction()
                //Importante cerrar dialog
                this.info.estado=false
            })
            .catch(e=>{
                this.loadingFunction()
                console.log(e.response.data.mensaje);
            })
        },
        borrarUsuario(){
            this.loadingFunction()
            let id=this.info.datos._id;
            this.axios.delete(`/admin/user/${id}`,this.config)
            .then(res=>{
                this.eliminarUsuario(res.data)
                this.loadingFunction()
                //Importante cerrar dialog
                this.info.estado=false
            })
            .catch(e=>{
                this.loadingFunction()
                console.log(e.response);
            })
        }
    },

}
</script>