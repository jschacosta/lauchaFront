<template>
   <v-card class="elevation-12">
        <v-system-bar color="grey darken-4"></v-system-bar>
        <v-card-title> 
            Tabla de Usuarios y Roles
            <v-divider class="mx-4" inset vertical></v-divider>
            Registrados: {{usuarios.length}}
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label=" Buscar Usuario"
                single-line
                hide-details
                class="elevation-2">
            </v-text-field>
        </v-card-title>
            <v-row>
                <v-col cols="12" md="6">
                    <div class="text-center">
                        <v-btn dark ml-auto color="warning" @click="getUsers()">Obtener Usuarios</v-btn>
                    </div>
                </v-col>
                <v-col  Cols="12" md="6" > 
                    <div class="text-center">
                        <v-btn dark ml-auto color="green accent-5" @click="createUser()">Crear Nuevo Usuario</v-btn>
                    </div>
                </v-col>
            </v-row>
        <v-data-table dense :headers="headers" :items="usuarios" :search="search" class="elevation-7">
            <template v-slot:[`item.accion`]="{ item }" >
                <v-btn class="mr-2"  tile large color="primary" icon  @click="editarUser(item)">
                    <v-icon dark>mdi-pencil</v-icon>
                </v-btn>      
                <v-btn class="mr-2"  tile large color="error" icon @click="deleteUser(item)">
                    <v-icon dark>mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </v-card>      
</template>

<script>
import {mapMutations, mapState, mapActions} from 'vuex'
export default {
    name:'tablaUserAdmin',
    data:()=>({
        search:"",
        headers: [
            {text: 'CORREO', align: 'start', sortable: true, value: 'email'},
            { text: 'NOMBRE',  value: 'name', sortable: true },
            { text: 'APELLIDO',  value: 'lastName', sortable: true },
            { text: 'ROLES',  value: 'role', sortable: true },
            { text: 'CREADO (d/m/a)',  value: 'date', sortable: true },
            { text: 'ACCIÓN',  value: 'accion', sortable: false },
        ],
    }),
    computed:{
        ...mapState(['token']),
        ...mapState('userAdmin',['usuarios','pedido']),
        config(){ 
            return {headers: {token:this.token}}
        },
    },
    methods:{
        ...mapMutations('userAdmin',['nuevoUsuario','pedir','editarRol']),
        ...mapMutations( 'loading',['loadingFunction']),
        ...mapMutations( 'confirmar',['confirmar']),
        ...mapActions('userAdmin',['obtenerUsers']),
        createUser(){
            this.nuevoUsuario()
        },
        getUsers(){
            this.loadingFunction() 
            this.axios.get(`/admin/users`,this.config)
            .then(res=>{
                let users=res.data
                this.obtenerUsers(users)
                this.loadingFunction()
                this.pedir()
            }) 
            .catch(e=>{ 
                this.loadingFunction()  
                console.log(e.response);
            })
        },
        editarUser(user){
            this.editarRol(user)
        },
        deleteUser(user){
            const info = {
            titulo:`¿Está seguro de eliminar a ${user.email}?`,
            cuerpo:'Al eliminar, toda la información del usuario será borrada de manera permanente',
            boton: 'borrarUsuario',
            datos:[]
            }
            info.datos=user
            this.confirmar(info)
        }
    },
    created(){
        if(this.pedido===false){
            this.getUsers()
        }
    }
}
</script>
