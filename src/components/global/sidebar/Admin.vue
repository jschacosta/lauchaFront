<template>
    <div>
        <v-list-item class=" ml-1 px-1 pt-1 mb-5 ">
      <v-list-item-avatar>
        <v-img src="@/assets/avatar.png" alt="admin" class="mx-auto" />
      </v-list-item-avatar>
      <v-row>
      <v-list-item-title class="ml-4 text-capitalize">
        {{nombreCompleto}}
      </v-list-item-title>
      </v-row>
      <v-row>
      <v-list-item-title class="ml-4 text-capitalize">
        {{role}}
      </v-list-item-title>
      </v-row>
      </v-list-item>
    
      <v-list-item v-for="item in itemsFiltrados" :key="item.text" active-class="orange--text" route :to="item.route"
      >
      <v-list-item-action v-if="item.roles.indexOf(role)!=-1">
            <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
            <v-list-item-title v-if="item.roles.indexOf(role)!=-1">
              {{ item.text }}
            </v-list-item-title>
          </v-list-item>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'NavAdmin',
    data:()=>({
        itemsFiltrados:[],
        itemsNav: [
        { icon: "dashboard", text: "Dashboard", route: "/admin/dashboard", roles:['ADMIN','EDITOR','RELATOR']},
        { icon: "fas fa-edit", text: "Editar Campos", route: "/admin/edit", roles:['ADMIN','EDITOR']},
        { icon: "sports_soccer", text: "Crear Partidos", route: "/admin/create", roles:['ADMIN','EDITOR']},
        { icon: "fas fa-microphone-alt", text: "Relatar Partidos", route: "/admin/play", roles:['ADMIN','EDITOR','RELATOR']},
        { icon: "mdi-finance", text: "Analitycs", route: "/admin/analitycs", roles:[,'ADMIN'] },
        { icon: "fas fa-users-cog", text: "Usuarios", route: "/admin/users", roles:['ADMIN']},
        { icon: "fas fa-user-circle", text: "Mi Perfil", route: "/admin/profile", roles:['ADMIN','EDITOR','RELATOR']},
      ],
    }),
    computed:{
      ...mapState(['role','nombre','apellido']),    
      nombreCompleto(){
        let nombre= this.nombre.charAt(0);
        return`${nombre}. ${this.apellido}`
      }    
    },
    methods:{
      filtrarMenu(){
        for (let i of this.itemsNav){
          if(i.roles.indexOf(this.role)!=-1){
            this.itemsFiltrados.push(i)
          }
        }
      },
      
    },
    created(){
      this.filtrarMenu()
    }
}
</script>
