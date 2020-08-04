<template>
  <div class="container">
    <v-tabs background-color="white" color="primary" next-icon="mdi-arrow-right-bold-box-outline" prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
      <v-tab>  
        <i class="fas fa-trophy"></i>
        Equipos
      </v-tab>
      <v-tab>
        <i class="fas fa-running"></i>
        Jugadores
      </v-tab>
      <v-tab>
        <i class="fas fa-file-signature"></i>
        Nombres Torneos
      </v-tab>
      <v-tab>
        <i class="fas fa-book"></i>
        Reglas</v-tab>
      <!-- Tab1 -->
      <v-tab-item>
        <v-container fluid>
          <Teams></Teams>
        </v-container>
      </v-tab-item>
      <!-- Tab2 -->
      <v-tab-item>
        <v-container fluid>
          <Players></Players>
        </v-container>
      </v-tab-item>
      <!-- Tab3 -->
      <v-tab-item>
        <v-container fluid>
         <NamesTeams></NamesTeams>
        </v-container>
      </v-tab-item>
      <!-- Tab4 -->
      <v-tab-item>
        <v-container fluid>
         <Rules></Rules>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
import Teams from './tabs/Teams';
import Players from './tabs/Players';
import NamesTeams from './tabs/NamesTeams';
import Rules from './tabs/Rules';
export default {
    name:"Edit",
    components:{//son vistas pero se consideran como componentes para comodidad
      Teams,
      Players,
      NamesTeams,
      Rules
    }
}
</script>