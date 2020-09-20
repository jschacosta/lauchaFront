<template>
  <div class="d-flex justify-center">
    <v-card class="elevation-15" max-width="600px">
        <v-card-title>
            <v-text-field
            v-model="search"
            dense
            append-icon="mdi-magnify"
            label=" Buscar Jugador"
            single-line
            hide-details
            class="elevation-3">
            </v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="torneos[0].players" :search="search" class="elevation-2">
            <template v-slot:[`item.accion`]="{ item }">
                <v-btn class="mr-2" small tile large color="error" icon @click="kickUser(item)">
                    <i class="fas fa-skull"></i>
                    Kick
                </v-btn>
            </template>
      </v-data-table>
    </v-card>
  </div>
</template> 
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    name: 'tablaTorneoPlayers',
    data:()=>({
        search:"",
        headers: [
            {text: 'JUGADOR', align: 'start', sortable: true, value: 'nickName'},
            {text: 'ACCION', value: 'accion', sortable: false },
        ],
    }),
    computed:{
        ...mapState('torneo',['torneos']),
    },
    methods:{
        ...mapMutations( 'loading',['loadingFunction']),
        ...mapMutations( 'textoSnack',['agregarSnack']),
        ...mapActions( 'torneo',['agregarPorJugar','puntajes']),
        kickUser(player){
            this.loadingFunction()
            const id= player._id;
            this.axios.put(`/delete-user-torneo/${id}`)
            .then(res=>{
                const array=[]
                array.push(res.data)
                this.puntajes(array)
                let aviso="Jugador kickeado"
                this.agregarSnack(aviso)
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
