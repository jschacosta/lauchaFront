<template>
  <div >
    <v-tabs v-model="tab" background-color="white" color="primary" next-icon="mdi-arrow-right-bold-box-outline" prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
      <v-tab href="#one">  
        <i class="fa fa-cog"></i>
        Armado Partidos
      </v-tab>
      <v-tab href="#two">
        <i class="fa fa-cogs"></i>
        Partidos Terminados
      </v-tab>
      <v-tabs-items :value="tab">
      <!-- Tab1 -->
      <v-tab-item value="one">
        <v-container fluid>
          <Armado></Armado>
        </v-container>
      </v-tab-item>
      <!-- Tab2 -->
      <v-tab-item value="two">
        <v-container fluid>
          <Finish></Finish>
        </v-container>
      </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>
<script>
import Armado from './tabs/Armado';
import Finish from './tabs/Finish';
export default {
    name:"Create",
    components:{//son vistas pero se consideran como componentes para comodidad
      Armado,
      Finish
    },
    computed:{
       tab: {
    set (tab) {
      this.$router.replace({ query: { ...this.$route.query, tab } })
    },
    get () {
      return this.$route.query.tab
    }
    }
    }

}
</script>