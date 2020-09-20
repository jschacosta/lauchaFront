<template>
  <div>
    <CreateTorneo></CreateTorneo>
    <tablaTorneoPlayers></tablaTorneoPlayers>
  </div>
</template>

<script>
import CreateTorneo from '@/components/cards/createTorneo.vue'
import tablaTorneoPlayers from '@/components/tables/tablaTorneoPlayers.vue'
import { mapState, mapMutations} from 'vuex';

export default {
    name:'Torneo',
    components:{
      CreateTorneo,
      tablaTorneoPlayers
    },
    methods:{
    ...mapMutations( 'torneo',['obtenerTorneos']),
    ...mapMutations( 'loading',['loadingFunction']),
    },
    created(){
      this.loadingFunction()
      this.axios.get(`/torneos`)
      .then(res=>{
        if(res.data.length===0){
          this.loadingFunction()
          this.obtenerTorneos([{name:"",players:[]}])
        }
        if(res.data.length!=0){
          this.loadingFunction()
          this.obtenerTorneos(res.data)
        }
      })
      .catch(e=>{
        this.loadingFunction()
        console.log(e.response.data.mensaje);
      })
    }
}
</script>
