<template>
<div>
        <!-- Card con Tabla de Usuarios -->
        <v-card class="elevation-12">
            <v-system-bar color="grey darken-4"></v-system-bar>
            <v-card-title>
                Usuarios Registrados: 
                <v-spacer></v-spacer>
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
                            <v-btn dark ml-auto color="warning" @click="obtenerUsuarios()">Obtener Usuarios</v-btn>
                        </div>
                    </v-col>
                    <v-col  Cols="12" md="6" > 
                        <div class="text-center">
                            <v-btn dark ml-auto color="green accent-5" @click="dialogCrear=true">Crear Nuevo Usuario</v-btn>
                        </div>
                    </v-col>
                </v-row>
            <v-data-table :headers="headers" :items="usuarios" :search="search" class="elevation-7">
                <template v-slot:item.accion="{ item }">
                    <v-btn class="mr-2"  tile large color="primary" icon  @click="itemUsar=item;dialogEditar=true">
                        <v-icon dark>mdi-pencil</v-icon>
                    </v-btn>      
                    <v-btn class="mr-2"  tile large color="error" icon @click="itemUsar=item;dialogBorrar=true">
                        <v-icon dark>mdi-delete</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>      
        <!-- Dialog para Crear nuevo Usuario -->
        <template>
            <v-row justify="center">
                <v-dialog v-model="dialogCrear" persistent max-width="600px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Nuevo Usuario</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field label="Nombre*" v-model="nuevoNombre" require></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Apellido*" v-model="nuevoApellido" required></v-text-field>
                                    </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Email*" v-model="nuevoEmail" required hint="Un correo por Usuario" persistent-hint></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Password*"  v-model="password1" type="password" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Repetir Password*" v-model="password2" type="password" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select :items="['USER', 'EDITOR', 'RELATOR', 'ADMIN']" v-model="nuevoRole" label="Rol" required ></v-select>
                                </v-col>
                                </v-row>
                                <small>*indicates required field</small>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialogCrear = false">Cancelar</v-btn>
                            <v-btn color="blue darken-1" text @click=" crearUsuario()">Crear Usuario</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>
        <!-- Dialog para Editar rol de Usuario -->
        <template>
            <v-row justify="center">
                <v-dialog v-model="dialogEditar" persistent max-width="500px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Usuario: {{itemUsar.email}}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <v-select :items="['USER', 'EDITOR', 'RELATOR', 'ADMIN']" v-model="nuevoRole" label="Rol" required ></v-select>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialogEditar = false">Cancelar</v-btn>
                            <v-btn color="blue darken-1" text @click="editarUsuario()">Cambiar Rol</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>
        <!-- Dialog para Borrar Usuario -->
        <template>
            <v-row justify="center">
                <v-dialog v-model="dialogBorrar" persistent max-width="300">
                <v-card>
                    <v-card-title class="h5 text-center">¿Estás seguro que quieres borrar el usuario??</v-card-title>
                    <v-card-text>Se borrará toda la info personal como correo y torneos creados junto con su puntuación acumulada.</v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialogBorrar = false">Cancelar</v-btn>
                    <v-btn color="green darken-1" text @click="borrarUsuario()">Borrar Usuario</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-row>
        </template>
        </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    name: 'Users',
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
        usuarios:[],
        //Variables de Dialog
        dialogCrear:false,
        dialogEditar:false,
        dialogBorrar:false,
        itemUsar:"",
        //Variables de 
        nuevoNombre:"",
        nuevoApellido:"",
        nuevoEmail:"",
        password1:"",
        password2:"",
        nuevoRole:""
    }),
    methods:{
            ...mapMutations( 'loading',['loadingFunction']),
        obtenerUsuarios(){
            this.loadingFunction()
            this.axios.get(`/admin/all-users`)
                .then(res=>{
                    let users=res.data
                    users.sort(function(a,b){
                         return new Date(b.date) - new Date(a.date)
                    })
                    var suma=0
                    for (let item of users){
                        let fecha=new Date(item.date)
                        users[suma].fecha=`${fecha.getDay()}/${fecha.getMonth()}/${fecha.getFullYear()}`
                        suma++
                    }
                    this.usuarios=users
                    this.loadingFunction()
                })
                .catch(e=>{ 
                    this.loadingFunction()
                    console.log(e.response);
                })
        },
        crearUsuario(){
                this.loadingFunction()
                let nuevoUsuario={
                    name:this.nuevoNombre,
                    lastName:this.nuevoApellido,
                    email:this.nuevoEmail,
                    password1:this.password1,
                    password2:this.password2,
                    role:this.nuevoRole,
                };
                this.axios.post('/admin/admin',nuevoUsuario)
                .then(res=>{
                    let users=res.data;
                    let fecha=new Date(users.date)
                    users.fecha=`${fecha.getDay()}/${fecha.getMonth()}/${fecha.getFullYear()}`
                    this.usuarios.push(users)
                    this.usuarios.sort(function(a,b){
                         return new Date(b.date) - new Date(a.date)
                    })
                    this.loadingFunction()   
                })
                .catch(e=>{ 
                    this.loadingFunction()
                    console.log(e.response);
                })
                this.dialogCrear = false;
        },
        borrarUsuario(){
            this.loadingFunction()
            let id=this.itemUsar._id;
            this.axios.delete(`/admin/${id}`)
                .then(res=>{
                    const index=this.usuarios.findIndex(item=>item._id === res.data._id);
                    this.usuarios.splice(index,1);
                    this.loadingFunction()
                })
                .catch(e=>{
                    this.loadingFunction()
                    console.log(e.response);
                })
            this.dialogBorrar=false
        },
        editarUsuario(){
            this.loadingFunction()
            let id=this.itemUsar._id;
            const nuevoItem= this.itemUsar
            nuevoItem.role=this.nuevoRole
            this.axios.put(`/admin/user/${id}`,nuevoItem)
            .then(res=>{
                let index = this.usuarios.findIndex( item => item._id === res.data._id);
                this.usuarios[index].role = res.data.role;
                this.dialogEditar=false
                this.loadingFunction()
            })
            .catch(e=>{
                this.loadingFunction()
                console.log(e.response)              
            })
            this.agregar = false;  
        } 
    }  
}
</script>
