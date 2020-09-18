<template>
  <v-progress-linear v-if="estadoLoading===true"
      indeterminate
      absolute
      bottom
      color="orange"
      height="6px"
    ></v-progress-linear>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'loadingBar',
    computed:{
    ...mapState('loading',['estadoLoading'])
    }
}
</script>

