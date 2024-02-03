<template>
    <v-container>
        <v-row class="d-flex  justify-center" v-if="torneos[0].name!=''">
            <h2 class="text-center mr-2">Torneo {{this.torneos[0].name}}</h2>
            <v-btn @click="unirse()" color="primary" v-if="estaJugador===false">Unirse</v-btn>
        </v-row>
        <tablaPosiciones></tablaPosiciones>
        <Steper></Steper>
    </v-container>
</template>

<script>
import tablaPosiciones from '@/components/tables/tablaPosiciones.vue'
import Steper from '@/components/dialog/steper.vue'
import { mapMutations, mapState } from 'vuex'

export default {
    name:'Posiciones',
    components:{
        tablaPosiciones,
        Steper,
    },
    computed:{
        ...mapState('torneo',['torneos', 'porJugar']),
        ...mapState(['_id']),
        estaJugador(){
            const index=this.torneos[0].players.findIndex(item=>item._id === this._id);
            if(index===-1 && this._id!=""){
              return false
            }else{
              return true
            }
        }
    },
    methods:{
        ...mapMutations('torneo',['cambiarDialog','obtenerTorneos']),
        unirse(){
            this.cambiarDialog({estado:true,paso:1})
        }
    }
}
</script>
