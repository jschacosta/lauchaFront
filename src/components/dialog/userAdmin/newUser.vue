<template>
  <div>
      <v-row justify="center">
            <v-dialog v-model="dialogNew" persistent max-width="600px">
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
                        <v-btn color="blue darken-1" text @click="cerrarDialog()">Cancelar</v-btn>
                        <v-btn color="blue darken-1" text @click=" crearUsuario()">Crear Usuario</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name:'newUser',
    data:()=>({
        nuevoNombre:"",
        nuevoApellido:"",
        nuevoEmail:"",
        password1:"",
        password2:"",
        nuevoRole:""
    }),
    computed:{
        ...mapState('userAdmin',['dialogNew']),
        ...mapState(['token']),
        config(){
            return {headers: {token:this.token}}
        }
    },
    methods:{
        ...mapMutations( 'loading',['loadingFunction']),
        ...mapMutations( 'userAdmin',['agregarUsuario','nuevoUsuario']),
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
            this.axios.post('/admin/user',nuevoUsuario,this.config)
            .then(res=>{
                let users=res.data;
                let fecha=new Date(users.date)
                users.fecha=`${fecha.getDay()}/${fecha.getMonth()}/${fecha.getFullYear()}`
                this.agregarUsuario(users)
                this.loadingFunction()
                //cerrar Dialog
                this.nuevoUsuario()
            })
            .catch(e=>{ 
                this.loadingFunction()
                console.log(e.response);
            })
        },
        cerrarDialog(){
            this.nuevoUsuario()
        }
    }
}
</script>
