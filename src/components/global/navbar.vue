<template>
  <div style="-webkit-app-region:drag">
    <!-- Navbar para Usuario y Admin -->
    <v-app-bar app color="#2C3A47" dark>
      <v-app-bar-nav-icon @click.stop="drawer=!drawer" class="clickable" v-if="(imagen==='sm' || imagen==='md') && rutaActual!='Admin'"></v-app-bar-nav-icon>
      <v-app-bar-nav-icon @click.stop="mini=!mini" class="clickable" v-if="rutaActual==='Admin'"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span class="text-uppercase" v-if="rutaActual!='Admin'">
          <router-link  :to="{ name: 'Home'}"  style="text-decoration: none; color: inherit"> 
            PollaGol
          </router-link>
        </span>
      </v-toolbar-title >
      <v-toolbar-title>
        <span class="text-uppercase " :class="(imagen==='xs' )?'body-3':'h2'"  v-if="rutaActual==='Admin'">Panel de Control</span>
      </v-toolbar-title >
      <v-item-group multiple v-if="(imagen==='lg' || imagen==='xl')&& rutaActual!='Admin'">
        <v-item v-for="item in itemsRevisado" :key="item.text">
          <v-btn route :to="item.route" class="mx-2" text small outlined color="white" >
            <caption>{{item.text}}</caption>
          </v-btn>
        </v-item>
      </v-item-group>
      <v-spacer/>
      <v-btn small outlined color="orange" :to="{ name: 'Login'}" v-if="!estaActivo && $route.name!='Login'">
        <v-icon >person</v-icon>
        <caption>Acceder</caption>   
      </v-btn>
      <!-- Boton Salir User -->
      <UserButton v-if="estaActivo && rutaActual!='Admin'"></UserButton>
      <!-- Boton Salir Admin -->
      <v-btn  fab small class="mr-2" color='#2C3A47'  :to="{ name: 'Home'}"  v-if="estaActivo && rutaActual==='Admin'" >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <!-- loading Bar -->
      <loadingBar ></loadingBar>
    </v-app-bar>
    
    
  <!-- Config Menu Lateral -->
    <v-navigation-drawer
    v-model="drawer"
    :temporary="rutaActual!='Admin'?true:false"
    color="#2C3A47"
    dark
    :permanent="rutaActual==='Admin'?true:false"
    :mini-variant="rutaActual!='Admin'?false:mini"
    :absolute="rutaActual!='Admin'?true:false"
    :app="rutaActual==='Admin'?true:false"
    >   
    <!--Menu Lateral Usuario  -->
      <NavUser v-if="rutaActual!='Admin'"></NavUser>
    <!-- Menu Lateral Admin -->
      <NavAdmin v-if="rutaActual==='Admin'"></NavAdmin>
    </v-navigation-drawer>


    <!-- Botón flotante para subir página -->
    <v-btn
    v-scroll="onScroll"
    bottom
    color="orange darken-3"
    dark
    fab
    fixed
    right
    @click="toTop"
    class="clickable"
    v-if="(imagen==='xl' || imagen==='lg')"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>

    </div>  
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import router from '@/router/index'
import NavUser from './sidebar/User'
import NavAdmin from './sidebar/Admin'
import UserButton from './sidebar/UserButton'
import loadingBar from '../bars/loadingBar'

export default {
  name:'Navbar',
    components:{
      NavUser,
      NavAdmin,
      UserButton,
      loadingBar,
    },
  data: () => ({
    props: {
      source: String,
    },
    drawer: null,
    mini: true,
    fab: false, //este es para el boton flotante te envia a la zona superior
    itemsNav: [
        { icon: "emoji_events", text: "Mis Torneos", route: "/torneos" },
        { icon: "fas fa-chart-pie", text: "Mis Stats", route: "/stats" },
        { icon: "fas fa-book", text: "Reglas", route: "/rules" }, 
      ],
    
  }),
  computed:{
  ...mapGetters(['estaActivo']),
  ...mapState(['token']),
  itemsRevisado(){
    if(this.token!=""){
      return this.itemsNav
    }
  },

  imagen(){
    switch (this.$vuetify.breakpoint.name){
          case 'xs': return 'xs'
          case 'sm': return 'sm'
          case 'md': return 'md'
          case 'lg': return 'lg'
          case 'xl': return 'xl'
    }
  },
    rutaActual(){
      let incluye=this.$route.path.includes('admin')
      if(incluye===true){
      return 'Admin';
      }else{
        return ""
      }
    },
  },
  methods: {
    onScroll(e){
      if(typeof window ==="undefined")return
        const top=window.pageYOffset || e.target.onScrollTop || 0
        this.fab=top>20
    },
    toTop(){
        this.$vuetify.goTo(0)
    },
  },
}
</script>

<style>
.clickable{
  -webkit-app-region: no-drag;
}
</style>

