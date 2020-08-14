<template>
    <div class="container"> 
        <v-row>
            <v-col></v-col>
            <v-col cols="12" md="10" class="container mt-3">
                <v-card-text class="mt-5 elevation-12">
                    <a href="/">{{token}}</a>
                    <h1 class=" text-center black--text titulo my-4">
                        Nueva contraseña
                    </h1>
                    <h3 class="text-center subtitulo mt-4"  >
                        Escribe tu nueva contraseña
                    </h3>
                    <v-form  class="mx-5" ref="form" v-model="valid" lazy-validation>
                         <v-text-field
                            v-on:keypress.enter.prevent
                            label="Nueva Pass"
                            name="Password"
                            prepend-icon="mdi-lock"
                            type="password"
                            color="indigo"
                            v-model="Password1"
                            :rules="passwordRules"
                            required
                          >
                          </v-text-field>
                         <v-text-field
                            v-on:keypress.enter.prevent
                            label="Confirmar nueva Pass"
                            name="Password"
                            prepend-icon="mdi-lock"
                            type="password"
                            color="indigo"
                            v-model="Password2"
                            :rules="passwordRules"
                            required
                          >
                          </v-text-field>
                    </v-form>
                    <h2 class="text-center mt-3 final" >
                        <router-link  :to="{ name: 'Login'}"  style="text-decoration: none; color: inherit"> 
                            Volver a Ingreso
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
                    Sign in
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
        Password2:"",
        estado:false,
        valid: true,
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
        ...mapMutations("TextoSnack", ["agregarSnack"]),
        ...mapMutations("loading", ["loadingFunction"]),
        forgot(e){
            if(this.Password1!=this.Password2){
                this.agregarSnack('Las contraseñas no coinciden');
            }
            else{
                this.loadingFunction();
                this.axios.put("/reset-password", {passwrod1: this.Pasword1, password2:this.Password2})
                    .then((res) => {
                        this.respuesta = res.data.mensaje;
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