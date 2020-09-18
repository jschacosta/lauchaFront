<template>
    <v-container>
        <v-row class="d-flex  justify-center" v-if="torneos[0].name!=''">
            <h2 class="mr-5">Torneo: {{this.torneos[0].name}}</h2>
            <v-btn @click="unirse()" color="primary">Unirse</v-btn>
        </v-row>
        <tablaPosiciones></tablaPosiciones>
        <steper></steper>  
    </v-container>
</template>

<script>
import tablaPosiciones from '@/components/tables/tablaPosiciones.vue'
import steper from '@/components/dialog/steper.vue'
import { mapMutations, mapState } from 'vuex'

export default {
    name:'Posiciones',
    components:{
        tablaPosiciones,
        steper
    },
    computed:{
      ...mapState('torneo',['torneos']),

        },
    methods:{
        ...mapMutations('torneo',['cambiarDialog','obtenerTorneos']),
      ...mapMutations( 'loading',['loadingFunction']),
        unirse(){
            this.cambiarDialog(true)
        }
    },
     
}
</script>
