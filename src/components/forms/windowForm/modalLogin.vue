<template>
  <div class="container">
    <!-- window de ingreso -->
    <v-row align="center" justify="center">
      <v-col cols="10" sm="10" md="10">
        <v-row>
          <v-col cols="12" sm="6" class="text-center subtitulo olvido">
            <div>
              To test the administrator options try:
            </div>
            <div>
              email:adminuser@laucha.com
            </div>
            <div>
              pass:123123
            </div>
          </v-col>
          <v-col cols="12" sm="6" class="text-center subtitulo olvido">
            <div>
              Or the user playing:
            </div>
            <div>
              email:jschacosta@gmail.com
            </div>
            <div>
              pass:123123
            </div>
          </v-col>
        </v-row>

        <v-card class="elevation-12 mt-3">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="8">
                  <v-card-text class="mt-5">
                    <h1 class="text-center black--text titulo mb-4">
                      Iniciar Sesión
                    </h1>
                    <h3 class="text-center subtitulo mlt-4">
                      Ingresa con tu correo
                    </h3>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-text-field
                        label="Email"
                        v-model="Email"
                        :rules="emailRules"
                        name="Email"
                        prepend-icon="mdi-email"
                        type="text"
                        color="indigo"
                        required
                      >
                      </v-text-field>
                      <v-text-field
                        :append-icon="mostrarPass1 ? 'mdi-eye' : 'mdi-eye-off'"
                        v-model="Password1"
                        :rules="passwordRules"
                        id="password"
                        label="Password"
                        name="Password"
                        prepend-icon="mdi-lock"
                        :type="mostrarPass1 ? 'text' : 'password'"
                        @click:append="mostrarPass1 = !mostrarPass1"
                        color="indigo"
                        required
                        @keyup.enter="signIn()"
                      >
                      </v-text-field>
                    </v-form>
                    <h2 class="text-center mt-3 olvido">
                      <router-link
                        :to="{ name: 'Forgot' }"
                        style="text-decoration: none; color: inherit"
                      >
                        ¿Olvidaste tu contraseña?
                      </router-link>
                    </h2>
                  </v-card-text>
                  <div class="text-center mt-3">
                    <v-btn
                      rounded
                      color="indigo"
                      dark
                      :disabled="!valid"
                      @click="signIn()"
                      >Sign in</v-btn
                    >
                  </div>
                </v-col>
                <v-col cols="12" md="4" class="blue-grey darken-4">
                  <v-card-text class="white--text mt-5">
                    <h3 class="text-center tituloLat">
                      ¿No tienes una cuenta?
                    </h3>
                    <h4 class="text-center subtituloLat">
                      Crea tu cuenta y comienza a jugar
                    </h4>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn rounded outlined dark @click="step++">Sign Up</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>

            <!-- Ventana Registrate -->
            <v-window-item :value="2">
              <v-row class="fill-height">
                <v-col cols="12" md="4" class="blue-grey darken-4">
                  <v-card-text class="white--text mt-5-">
                    <h3 class="text-center tituloLat">
                      ¿Ya tienes una cuenta?
                    </h3>
                    <h4 class="text-center subtituloLat">
                      Ingresa presionando Sign in
                    </h4>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn rounded outlined dark @click="step--">Sign In</v-btn>
                  </div>
                </v-col>
                <v-col cols="12" md="8">
                  <v-card-text class="mt-5-">
                    <h1 class="text-center titulo">Registrate</h1>
                    <h2 class="text-center subtitulo mt-4">
                      Completa los campos para registrarte
                    </h2>
                    <v-form
                      ref="form"
                      v-model="valid"
                      lazy-validation
                      class="mr-2"
                    >
                      <v-row>
                        <v-col cols="12" lg="6">
                          <v-text-field
                            label="Nombre"
                            name="Name"
                            prepend-icon="person"
                            type="text"
                            color="indigo"
                            v-model="Name"
                            :rules="nameRules"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" lg="6">
                          <v-text-field
                            label="Apellido"
                            name="Apellido"
                            prepend-icon="person"
                            type="text"
                            color="indigo"
                            v-model="lastName"
                            :rules="lastNameRules"
                            required
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-text-field
                        label="Email"
                        name="Email"
                        prepend-icon="mdi-email"
                        type="email"
                        color="indigo"
                        v-model="Email"
                        :rules="emailRules"
                        required
                      >
                      </v-text-field>
                      <v-row>
                        <v-col cols="12" lg="6">
                          <v-text-field
                            :append-icon="
                              mostrarPass2 ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            label="Pass"
                            name="Password"
                            prepend-icon="mdi-lock"
                            :type="mostrarPass2 ? 'text' : 'password'"
                            color="indigo"
                            v-model="Password1"
                            @click:append="mostrarPass2 = !mostrarPass2"
                            :rules="passwordRules"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" lg="6">
                          <v-text-field
                            :append-icon="
                              mostrarPass3 ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            label="Confirmar Pass"
                            name="Password"
                            prepend-icon="mdi-lock"
                            :type="mostrarPass3 ? 'text' : 'password'"
                            color="indigo"
                            v-model="Password2"
                            @click:append="mostrarPass3 = !mostrarPass3"
                            :rules="passwordRules"
                            required
                            @keyup.enter="signUp()"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                  <div class="text-center mt-n5">
                    <v-btn
                      rounded
                      color="indigo"
                      dark
                      :disabled="!valid"
                      @click="signUp()"
                      >Sign Up</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapMutations, mapState, mapActions } from "vuex";
import router from "@/router/index";
import formEquiposVue from "../selectForm/formEquipos.vue";
export default {
  name: "modalLogin",
  data: () => ({
    step: 1, // para cambio de ventana sign in/sign Up
    valid: true, //para validar campos de formularios
    Name: "",
    lastName: "",
    Email: "",
    Password1: "",
    Password2: "",
    mostrarPass1: false,
    mostrarPass2: false,
    mostrarPass3: false,
    nameRules: [
      (v) => !!v || "El nombre es requerido",
      (v) =>
        (v && v.length < 25) || "El nombre debe tener máximo 20 carácteres",
    ],
    lastNameRules: [
      (v) => !!v || "El apellido es requerido",
      (v) =>
        (v && v.length < 25) || "El apellido debe tener máximo 20 carácteres",
    ],
    passwordRules: [
      (v) => !!v || "La contraseña es requerida",
      (v) =>
        (v && v.length >= 6) ||
        "La contraseña debe tener al menos 6 carácteres",
    ],
    emailRules: [
      (v) => !!v || "Email is requerido",
      (v) => /.+@.+\..+/.test(v) || "E-mail no es válido",
    ],
  }),
  props: {
    source: String,
  },
  methods: {
    ...mapMutations("textoSnack", ["agregarSnack"]),
    ...mapMutations("loading", ["loadingFunction"]),
    ...mapActions(["guardarUsuario"]),
    validate() {
      this.$refs.form.validate(); //bloquea boton si no se cumplen las rules
    },
    signIn() {
      this.loadingFunction();
      this.axios
        .post("/users/sign-in", { email: this.Email, password: this.Password1 })
        .then((res) => {
          const token = res.data.token;
          this.guardarUsuario(token);
          this.loadingFunction();
          // router.push({ name: "Home" });
          this.$router.push({ name: "Home" });
        })
        .catch((e) => {
          this.loadingFunction();
          let error = e.response.data.mensaje;
          this.agregarSnack(error);
        });
      this.$refs.form.reset(); // elimina info de los campos
      this.$refs.form.resetValidation(); //elimina campos en rojo
    },
    signUp() {
      const nameIsValid = !!this.Name;
      const passwordIsValid = !!this.Password1 && !!this.Password2;
      const lastNameIsValid = !!this.lastName;
      const emailIsValid = !!this.Email;
      const formIsValid =
        nameIsValid && lastNameIsValid && emailIsValid && passwordIsValid;
      if (formIsValid) {
        if (this.Password1 != this.Password2) {
          this.agregarSnack("Las contraseñas no coinciden");
          this.$refs.form.resetValidation(); //elimina campos en rojo
        } else {
          this.loadingFunction();
          this.axios
            .post("/users/sign-up", {
              name: this.Name,
              lastname: this.lastName,
              email: this.Email,
              password1: this.Password1,
              password2: this.Password2,
            })
            .then((res) => {
              const token = res.data.token;
              this.guardarUsuario(token);
              this.loadingFunction();
              // router.push({ name: "Home" });
              this.$router.push({ name: "Home" });
              // window.location.href = "https://apuestalaucha.herokuapp.com/";
            })
            .catch((e) => {
              this.loadingFunction();
              if (!!e.response.data.error.errors.email.properties.message) {
                this.agregarSnack(
                  e.response.data.error.errors.email.properties.message
                );
              } else {
                this.agregarSnack(e.response.data.mensaje);
              }
            });
          this.$refs.form.reset(); // elimina info de los campos
          this.$refs.form.resetValidation(); //elimina campos en rojo
        }
      } else {
        this.agregarSnack("Hay campos sin rellenar");
        this.$refs.form.reset(); // elimina info de los campos
        this.$refs.form.resetValidation(); //elimina campos en rojo
      }
    },
  },
};
</script>

<style scoped>
.titulo {
  font-size: 40px;
  font-weight: 400; /* 400px es normal */
}
.subtitulo {
  font-size: 15px;
  font-weight: 400;
}
.tituloLat {
  font-size: 30px;
  font-weight: 350;
  margin-bottom: 15px;
}
.subtituloLat {
  font-size: 15px;
  font-weight: 400;
}
.olvido {
  font-size: 15px;
  font-weight: 600;
}
</style>
