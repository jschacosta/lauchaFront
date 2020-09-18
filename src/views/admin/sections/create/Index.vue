<template>
  <div >
    <v-tabs background-color="white" color="primary" next-icon="mdi-arrow-right-bold-box-outline" prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
      <v-tab>  
        <i class="fa fa-cog"></i>
        Armado Partidos
      </v-tab>
      <v-tab >
        <i class="fa fa-cogs"></i>
        Partidos Terminados
      </v-tab>
      <!-- Tab1 -->
      <v-tab-item>
        <v-container fluid>
          <Armado></Armado>
        </v-container>
      </v-tab-item>
      <!-- Tab2 -->
      <v-tab-item>
        <v-container fluid>
          <Finish></Finish>
        </v-container>
      </v-tab-item>
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

}
</script>