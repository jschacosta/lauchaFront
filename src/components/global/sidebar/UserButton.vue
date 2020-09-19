<template>
  <div class="text-center mr-1">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn fab  v-bind="attrs" v-on="on"  small>
          <v-avatar color="teal" size="40">
            <span class="white-.text body-1">{{iniciales}}</span>
          </v-avatar>
        </v-btn> 
      </template>
      <v-list small>
        <v-list-item :to="'/profile'" disabled>
          <v-list-item-title >Mi Perfil</v-list-item-title>
        </v-list-item>
        <v-list-item @click="cerrar()"  >
          <v-list-item-title >Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import router from '@/router/index'
import {mapActions,mapState} from 'vuex'
export default {
  name:'UserButton',
  data:()=>({
      items: [
      { title: 'Perfil',route:'/perfil' },
      { title: 'Log Out',route:'/' },
    ],
  }),
  computed:{
    ...mapState(['nombre','apellido']),
    iniciales(){
      let nombre= this.nombre.charAt(0);
      let apellido= this.apellido.charAt(0);
      return`${nombre}${apellido}`
    }
  },
  methods:{
    ...mapActions(['cerrarSesion']),
    cerrar(){
      this.cerrarSesion();
      this.$router.push("/").catch(()=>{});
    }
  }
}
</script>
