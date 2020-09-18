<template>
<div>
  <!-- Footer para PC y Tablets -->
    <v-footer
      v-if="rutaLogin || (imagen!='xs' && !rutaAdmin) || ( !rutaAdmin && !rutaLogin && !estaActivo)"
      class="font-weight-medium "
      color="#2C3A47"
      dark 
    >
      <v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }} — <strong>Johann Schwarze</strong>
        </v-col>
    </v-footer>
    <!-- Footer para Telefonos con botones -->
    <v-bottom-navigation v-if="estaActivo && imagen==='xs' && !rutaAdmin && !rutaLogin"  app  background-color="#2C3A47" dark >
          <v-item-group multiple >
          <v-item  v-for="item in items" :key="item.text" >
              <v-btn   :disabled="(item.text==='Mis Torneos' || item.text==='Mis Stats') ? true : false"
              height="100%"  route :to="item.route" active-class="orange--text" 
              :class="anchoPantalla===true?'px-1':'px-4'">
                  <caption>{{item.text}}</caption>
                  <v-icon  >{{item.icon}}</v-icon>
              </v-btn>
          </v-item>
        </v-item-group>
    </v-bottom-navigation>  
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Footer',
  data:()=>({
    items: [
        { icon: "mdi-home", text: "Home", route: "/" },
        { icon: "emoji_events", text: "Mis Torneos", route: "/torneos" },
        { icon: "fas fa-chart-pie", text: "Mis Stats", route: "/stats" },
        { icon: "fas fa-book", text: "Reglas", route: "/rules" }, 
      ]
  }),
  computed:{
  ...mapGetters(['estaActivo']),
    imagen(){
      switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 'xs'
            case 'sm': return 'sm'
            case 'md': return 'md'
            case 'lg': return 'lg'
            case 'xl': return 'xl'
      }
    },
    rutaAdmin() {
      return this.$route.path.includes('admin')
    },
    rutaLogin() {
      return this.$route.path.includes('login')||this.$route.path.includes('reset')||this.$route.path.includes('forgot')
    },
    anchoPantalla(){
      if (screen.width<370){return true}
      else{false}
    }
  }
}
</script>
