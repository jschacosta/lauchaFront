<template>
  <div>
    <CreateTorneo></CreateTorneo>
    <tablaTorneoPlayers></tablaTorneoPlayers>
  </div>
</template>

<script>
import CreateTorneo from '@/components/cards/createTorneo.vue'
import tablaTorneoPlayers from '@/components/tables/tablaTorneoPlayers.vue'
import { mapState, mapMutations,mapActions} from 'vuex';

export default {
    name:'Torneo',
    components:{
      CreateTorneo,
      tablaTorneoPlayers
    }
}
</script>
