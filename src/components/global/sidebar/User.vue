<template>
    <div>
      <v-list-item class="px-2 pt-1 mb-10">
      <v-list-item-avatar>
        <v-img src="@/assets/avatar.png" alt="admin" class="mx-auto" />
      </v-list-item-avatar>
      <v-list-item-title class="ml-4 text-capitalize"
        >Polla Gol</v-list-item-title
      >
      </v-list-item>

      <v-list-item active-class="orange--text"  route
            :to="'/'">
        <v-list-item-action>
          <v-icon>dashboard</v-icon>
        </v-list-item-action>
        <v-list-item-title>
          Home
        </v-list-item-title>
      </v-list-item>
      <v-list-item v-for="item in itemsRevisado" :key="item.text" active-class="orange--text"
            route
            :to="item.route">
      <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name:'NavUser',
  data:()=>({
      itemsNav: [
          { icon: "emoji_events", text: "Mis Torneos", route: "/torneos" },
          { icon: "fas fa-chart-pie", text: "Mis Stats", route: "/stats" },
          { icon: "fas fa-book", text: "Reglas", route: "/rules" }, 
        ],
  }),
  computed:{
    ...mapState(['token']),
    itemsRevisado(){
      if(this.token!=""){
        return this.itemsNav
      }
    }
  }
}
</script>
