<template>
    <div class="container"> 
        <v-row>
            <v-col></v-col>
            <v-col cols="12" md="10" class="container mt-3">
                <v-card-text class="mt-5 elevation-12">
                    <h1 class=" text-center black--text titulo my-4">
                        Nueva contraseña
                    </h1>
                    <h3 class="text-center subtitulo mt-4"  >
                        Escribe tu nueva contraseña
                    </h3>
                    <v-form  class="mx-5" ref="form" v-model="valid" lazy-validation>
                         <v-text-field
                            v-model="Password1"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            prepend-icon="mdi-lock"
                            :rules="passwordRules"
                            :type="show1 ? 'text' : 'password'"
                            label="Nueva Pass"
                            name="Password"
                            color="indigo"
                            required
                            @click:append="show1 = !show1"
                          >
                          </v-text-field>
                         <v-text-field
                            v-model="Password2"
                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            prepend-icon="mdi-lock"
                            :rules="passwordRules"
                            :type="show2 ? 'text' : 'password'"
                            label="Confirmar nueva Pass"
                            name="Password"
                            color="indigo"
                            required
                            @click:append="show2 = !show2"
                          >
                          </v-text-field>
                    </v-form>
                    <h2 class="text-center mt-3 final" >
                        <router-link  :to="{ name: 'Login'}"  style="text-decoration: none; color: inherit"> 
                            Volver a Inicio de Sesión
                        </router-link>
                        </h2>
                <div class="text-center mt-5">
                    <v-btn
                    rounded
                    color="indigo"
                    dark
                    :disabled="!valid"
                    @click="forgot()"
                    >
                    Enviar
                    </v-btn>
                </div>
                </v-card-text>
            </v-col>
            <v-col></v-col>
        </v-row>
        <v-row>
            <v-col ></v-col>
            <v-col cols="12" md="10" class="mx-5">
                <v-alert type="success" class="text-center" v-if="estado">
                    {{respuesta}}
                </v-alert>
            </v-col>
            <v-col></v-col>
        </v-row>
    </div>
</template>

<script>

import { mapMutations} from "vuex";
export default {
    name: 'Reset',
    data:()=>({
        Password1:"",
        show1: false,
        Password2:"",
        show2: false,
        valid: true,
        estado:false,
        respuesta:"",
        passwordRules: [
            (v) => !!v || "La contraseña es requerida",
            (v) =>
                (v && v.length >= 6) ||
                "La contraseña debe tener al menos 6 carácteres",
        ]
    }),
    computed:{
        token(){
            return this.$route.params.id
        }
    },
    methods:{
        ...mapMutations("textoSnack", ["agregarSnack"]),
        ...mapMutations("loading", ["loadingFunction"]),
        forgot(e){
            console.log(this.Password1,this.Password2)
            if(this.Password1!=this.Password2){
                this.agregarSnack('Las contraseñas no coinciden');
            }
            else{
                this.loadingFunction();
                this.axios.put(`/reset-password/${this.token}`, {password1: this.Password1, password2:this.Password2})
                    .then((res) => {
                        let mensaje = res.data.mensaje;
                        this.agregarSnack(mensaje)
                        this.respuesta = 'Tu contraseña ha sido actualizada, haz click en volver a Ingreso'
                        this.estado=true;
                        this.loadingFunction();
                    })
                    .catch((e) => {
                        this.loadingFunction();
                        let error = e.response.data.mensaje;
                        this.agregarSnack(error);
                    });
            }
        } 
    }
}
</script>
<style scoped>
.titulo{
  font-size: 30px;
  font-weight: 400 ; /* 400px es normal */
}
.subtitulo{
  font-size: 15px;
  font-weight: 400;
}
.final{
  font-size: 15px;
  font-weight: 600;
}
</style>