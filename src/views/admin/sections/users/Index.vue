<template>
  <div >
    <v-tabs background-color="white" color="primary" next-icon="mdi-arrow-right-bold-box-outline" prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
      <v-tab>  
        <i class="fa fa-cog"></i>
        Gestión Usuarios
      </v-tab>
      <v-tab >
        <i class="fa fa-cogs"></i>
        Crear Torneo
      </v-tab>
      <!-- Tab1 -->
      <v-tab-item>
        <v-container fluid>
          <Users></Users>
        </v-container>
      </v-tab-item>
      <!-- Tab2 -->
      <v-tab-item>
        <v-container fluid>
          <Torneo></Torneo>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
import Users from './tabs/Users';
import Torneo from './tabs/Torneo';
export default {
    name:"Index",
    components:{//son vistas pero se consideran como componentes para comodidad
      Torneo,
      Users
    },
}
</script>