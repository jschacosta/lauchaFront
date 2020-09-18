<template>
  <div>
    <CreateTorneo></CreateTorneo> 
  </div>
</template>

<script>
import CreateTorneo from '@/components/cards/createTorneo.vue'
import { mapState, mapMutations} from 'vuex';

export default {
    name:'Torneo',
    components:{
      CreateTorneo
    },
    methods:{
    ...mapMutations( 'torneo',['obtenerTorneos', 'cambiarBoton']),
    ...mapMutations( 'loading',['loadingFunction']),
    },
    created(){
      this.loadingFunction()
      this.axios.get(`/torneos`)
      .then(res=>{
        console.log(res.data)
        if(res.data.length===0){
          this.loadingFunction()
          this.obtenerTorneos([{name:"",players:[]}])
          this.cambiarBoton(true)
        }
        if(res.data.length!=0){
          this.loadingFunction()
          this.obtenerTorneos(res.data)
          this.cambiarBoton(false)
        }
      })
      .catch(e=>{
        this.loadingFunction()
        console.log(e.response.data.mensaje);
      })
    }
}
</script>
