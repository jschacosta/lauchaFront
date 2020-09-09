<template>
  <v-container>
    <v-tabs background-color="white" color="primary" next-icon="mdi-arrow-right-bold-box-outline" prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
      <v-tab>  
        <i class="fa fa-trophy"></i>
        Torneo Actual
      </v-tab>
      <v-tab >
        <i class="fa fa-calendar"></i>
        Calendario Partidos
      </v-tab>
      <!-- Tab1 -->
      <v-tab-item>
        <v-container fluid>
          <HelloWorld msg="Welcome to Your Vue.js App"/>
        </v-container>
      </v-tab-item>
      <!-- Tab2 -->
      <v-tab-item>
        <v-container fluid>
          <CalendarioUser></CalendarioUser>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>
<script>
import HelloWorld from '@/components/HelloWorld.vue'
import CalendarioUser from '@/components/cards/calendarioUser.vue'
export default {
    name:"Home",
    components:{//son vistas pero se consideran como componentes para comodidad
      HelloWorld,
      CalendarioUser
    }
}
</script>
