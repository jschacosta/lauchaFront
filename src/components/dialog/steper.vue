<template >
  <div>
    <v-dialog
      v-model="dialogo.estado"
      persistent
     style="position:relative"
     :style="pantalla.width<800?'margin-top:1400px':''"
      :max-width="pantalla.width>800?'800px':''"
      :fullscreen="pantalla.width>800?false:true"
      :retain-focus="false"

      
      
    >
      <v-btn
      v-if="pantalla.width<800"
        color="primary"
        fab
        x-small
        style="position: absolute; right: 0px; z-index: 1000"
        :style="dialogo.paso==1?'top:65px':''"
       
        @click="cerrarDialog()"
        >X</v-btn
      >
        
      <v-stepper
      :style="pantalla.width<800 && dialogo.paso==1?'margin-top:80px':''"
        v-model="dialogo.paso"
        dark
        dense
       
      >

      
        <v-btn
    
        color="primary"
        fab
        v-if="pantalla.width>=800"
        x-small
        style="position: absolute; right: 0px; z-index: 1000"
        
       
        @click="cerrarDialog()"
        >X</v-btn
      >
        <!-- <v-row class="mt-3 mb-1 mx-2" v-if="pantalla.width>800">
          <v-btn class="mx-4"  x-small color="primary" v-if="dialogo.paso===losPartidos.length+1" @click="dialogo.paso=1"> <v-icon left>keyboard_arrow_left</v-icon > Inicio</v-btn>
          <v-spacer></v-spacer>
          <v-btn  class="mx-3"  x-small color="success" v-if="dialogo.paso===losPartidos.length+1" @click="enviar();cerrarDialog()">
             Enviar <v-icon right>fas fa-share</v-icon></v-btn>
            <v-btn color="white" fab x-small outlined class="mx-3"  @click.stop ="cerrarDialog()">X</v-btn>
        </v-row> -->
        
        <!-- ENCABEZADO - PASO 1 -->
        <!-- <v-stepper-header
          v-if="
            (imagen === 'xl' || imagen === 'lg') &&
            losPartidos.length < 7 &&
            dialogo.paso != 1
          "
        >
          <v-stepper-step editable :complete="dialogo.paso > 1" :step="1"
            >Inicio</v-stepper-step
          > -->
          <!-- ENCABEZADO - PASOS INTERMEDIOS-->
          <!-- <div v-for="(item, i) of losPartidos" :key="i">
            <v-stepper-step editable :complete="dialogo.paso > i + 2" :step="i + 2"
              >P{{ i + 1 }}</v-stepper-step
            >
            <v-divider v-if="i !== losPartidos.length"></v-divider>
          </div>
        </v-stepper-header> -->
        <v-stepper-items>
          <!-- CUERPO - PASO 1 -->
          <v-stepper-content :step="1">
            <v-card class="mb-5 pa-8" color="#2C3A47">
              <h2
                class="ml-5 mb-2 font-weight-light"
                style="text-align: center"
              >
                Bienvenido al torneo {{ espacio + espacio }}
                {{ torneos[0].name }}
              </h2>
              <h4 v-if="!dialogo.cambiarName" class="ml-5 font-weight-light" style="text-align: justify">
                Esta será tu carta de vaticinios para los próximos encuentros
                deportivos. Muestra tu jerarquía y sapiencia frente a tus
                débiles adversarios
              </h4>
              <h4
                class="mt-5 ml-5 mb-10 font-weight-regular"
                style="text-align: justify"
              >
                Escribe el nombre con el que serás conocido en este torneo.
              </h4>
              <v-text-field
                label="Escribe tu nombre de Jugador"
                color="white"
                v-model="nickName.name"
                :rules="nameRules"
                :disabled="estado ? true : false"
                @keyup.enter="!estado ? revNombre() : nextStep(1)"
              >
              </v-text-field>
            </v-card>
            <v-row>
              <v-spacer></v-spacer>
              <v-btn
                v-if="!estado"
                class="mx-3"
                color="primary"
                small
                @click="revNombre()"
              >
                Siguiente</v-btn
              >
              <v-btn
                v-if="estado && !dialogo.cambiarName"
                class="mx-3"
                color="success"
                small
                @click="
                  nextStep(1);
                  estado = false;
                "
              >
                Iniciar {{dialogo.cambiarName}} </v-btn
              >
              <v-btn v-if="dialogo.cambiarName && estado " small  class="mx-3" color="success"  @click="cambiarNombre()">
             Cambiar <v-icon right>fas fa-share</v-icon></v-btn>
            </v-row>
          </v-stepper-content>
          <!-- CUERPO - PASOS INTERMEDIOS -->
          <div v-for="(partido, j) of losPartidos" :key="j">
            <v-stepper-content :step="j + 2" class="pa-3">
              <v-row
                dense
                class="mb-2"
                v-if="
                  (imagen === 'xs' ||
                    imagen === 'sm' ||
                    imagen === 'md' ||
                    losPartidos.length >= 7) &&
                  dialogo.paso != 1 + losPartidos.length
                "
              >
                <v-btn
                  class="mx-4"
                  fab
                  small
                  color="primary"
                  @click="
                    nextStep(j);
                    scrollToTop();
                  "
                  v-if="j + 2 != losPartidos.length + 1"
                >
                  <v-icon>keyboard_arrow_left</v-icon>
                </v-btn>
                <v-btn
                  class="mx-4"
                  fab
                  small
                  color="primary"
                  @click="
                    nextStep(j + 2);
                    scrollToTop();
                  "
                  v-if="j + 2 != losPartidos.length + 1"
                >
                  <v-icon>keyboard_arrow_right</v-icon>
                </v-btn>
              </v-row>

              <v-card class="mb-3" color="#2C3A47">
                <v-row class="d-flex justify-center align-center" dense>
                  <v-col
                    class="d-flex justify-center align-center text-center text-caption"
                    cols="3"
                    v-if="imagen === 'xs'"
                  >
                    {{ partido.local }}
                  </v-col>
                  <v-col
                    class="d-flex justify-center align-center text-center"
                    cols="3"
                    v-if="imagen != 'xs'"
                  >
                    {{ partido.local }}
                  </v-col>
                  <v-col
                    class="mt-6 d-flex justify-start align-center"
                    cols="2"
                  >
                    <v-text-field
                      label="Goles"
                      class="centered-input pa-0"
                      type="number"
                      v-model.number="partido.score[0]"
                      min="0"
                      :rules="numberRules"
                    ></v-text-field>
                  </v-col>
                  <v-col class="d-flex justify-center align-center" cols="2">
                    <h3>-</h3>
                  </v-col>
                  <v-col
                    class="mt-6 d-flex justify-start align-center"
                    cols="2"
                  >
                    <v-text-field
                      label="Goles"
                      class="centered-input pa-0"
                      type="number"
                      v-model.number="partido.score[1]"
                      min="0"
                      :rules="numberRules"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    class="d-flex justify-center align-center text-center"
                    cols="3"
                    v-if="imagen != 'xs'"
                  >
                    {{ partido.visita }}
                  </v-col>
                  <v-col
                    class="d-flex justify-center align-center text-center text-caption"
                    cols="3"
                    v-if="imagen === 'xs'"
                  >
                    {{ partido.visita }}
                  </v-col>
                </v-row>

                <v-row class="d-flex justify-center align-center" dense>
                  <h2 class="font-weight-light mb-2">Juega</h2>
                </v-row>

                <v-row class="ma-0 pa-0 mb-5" dense>
                  <v-col class="d-flex flex-column justify-center align-center">
                    <p class="ma-0 pa-0">Local</p>
                    <v-chip
                      class="ma-1 font-weight-bold"
                      color="lime accent-4"
                      text-color="black"
                    >
                      {{ partido.apuesta[0] }}
                    </v-chip>
                  </v-col>
                  <v-col
                    class="pa-0 ma-0 d-flex flex-column justify-center align-center"
                  >
                    <p class="ma-0 pa-0">Empate</p>
                    <v-chip
                      class="ma-1 font-weight-bold"
                      color="lime accent-4"
                      text-color="black"
                    >
                      {{ partido.apuesta[1] }}
                    </v-chip>
                  </v-col>
                  <v-col
                    class="pa-0 ma-0 d-flex flex-column justify-center align-center"
                  >
                    <p class="ma-0 pa-0">Visita</p>
                    <v-chip
                      class="ma-1 font-weight-bold"
                      color="lime accent-4"
                      text-color="black"
                    >
                      {{ partido.apuesta[2] }}
                    </v-chip>
                  </v-col>
                </v-row>

                <v-btn
                  class="ml-2"
                  color="primary"
                  x-small
                  v-if="index != -1"
                  @click="uncheck(j)"
                  >Limpiar Jugadas</v-btn
                >
                <div v-for="(item2, k) of partido.rules" :key="k">
                  <v-row>
                    <h4 class="mt-1 mb-2 mx-5 font-weight-regular">
                      {{ item2.text }}
                    </h4>
                  </v-row>

                  <v-radio-group v-model="partido.ruleElections[k]">
                    <v-row
                      dense
                      v-for="(texto, m) of partido.rules[k].options.text"
                      :key="m"
                    >
                      <v-col>
                        <v-radio class="mx-8" :label="texto" :value="m">
                        </v-radio>
                      </v-col>
                      <v-col>
                        {{ partido.rules[k].options.values[m] }} pts
                      </v-col>
                    </v-row>
                  </v-radio-group>
                </div>
              </v-card>

              <v-row dense>
                <v-btn
                  class="mx-4"
                  fab
                  small
                  color="primary"
                  @click="
                    nextStep(j);
                    scrollToTop();
                  "
                  v-if="j + 2 != losPartidos.length + 1"
                >
                  <v-icon>keyboard_arrow_left</v-icon>
                </v-btn>
                <v-btn
                  class="mx-4"
                  fab
                  small
                  color="primary"
                  @click="
                    nextStep(j + 2);
                    scrollToTop();
                  "
                  v-if="j + 2 != losPartidos.length + 1"
                >
                  <v-icon>keyboard_arrow_right</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
              </v-row>
            </v-stepper-content>
          </div>
          <v-row class="mx-2 mb-3">
            <v-spacer></v-spacer>
            <v-btn
              class="mx-3"
              color="success"
              v-if="dialogo.paso === losPartidos.length + 1"
              @click="
                enviar();
                cerrarDialog();
              "
            >
              Enviar <v-icon right>fas fa-share</v-icon></v-btn
            >
            <!-- <v-btn
              v-if="dialogo.paso === losPartidos.length + 1"
              text
              @click="cerrarDialog()"
              >Salir</v-btn
            > -->
          </v-row>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "Steper",
  data: () => ({
    
    espacio: "\u00A0", // '\u00A0' es un espacio en html
    estado: false,
    numberRules: [
      (v) => v >= 0 || "No es válido",
      (v) => v < 10 || "¿No será mucho?",
    ],
    nameRules: [
      (v) => v.length < 16 || "Nombre muy largo",
      (v) => v.length > 3 || "Nombre muy corto",
    ],
  }),
  computed: {
    ...mapState("torneo", ["torneos", "porJugar", "dialogo"]),
    ...mapState(["_id", "nombre", "apellido", "losTorneos", "usuarioDB"]),
    pantalla(){
      return{width:window.innerWidth,height:window.innerHeight}
    },
    inicial() {
      return this.nombre.charAt(0).toUpperCase();
    },
    apellidoCortado() {
      return this.apellido.slice(1);
    },
    elApellido() {
      return this.apellido.charAt(0).toUpperCase();
    },
    nickName() {
      var nombre = this.inicial + "." + this.elApellido + this.apellidoCortado;
      return { name: nombre };
    },
    index() {
      return this.torneos[0].players.findIndex((item) => item._id === this._id);
    },
    losPartidos() {
      if (this.torneos[0].players.length === 0) {
        //no hay jugadores
        for (let item of this.porJugar) {
          item.ruleElections = [];
        }
        return this.porJugar;
      }
      if (this.torneos[0].players.length != 0) {
        // hay jugadores
        const index = this.torneos[0].players.findIndex(
          (item) => item._id === this._id
        );
        if (index === -1) {
          for (let item of this.porJugar) {
            //el jugador no está aun en el torneo
            item.ruleElections = [];
          }
          return this.porJugar;
        }
        if (index != -1) {
          // el jugador ya está en el torneo
          const arrayJugador = [];
          const matchUsuario = this.torneos[0].players[index].matches;
          for (let item of matchUsuario) {
            for (let item2 of this.porJugar) {
              if (item._id === item2._id) {
                item.rules = item2.rules;
                item.apuesta = item2.apuesta;
                item.local = item2.local;
                item.visita = item2.visita;
                item._id = item2._id;
                arrayJugador.push(item);
              }
            }
          }
          return arrayJugador;
        }
      }
    },

    imagen() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "xs";
        case "sm":
          return "sm";
        case "md":
          return "md";
        case "lg":
          return "lg";
        case "xl":
          return "xl";
      }
    },
  },
  methods: {
    ...mapActions(["guardarUsuario"]),
    ...mapMutations("loading", ["loadingFunction"]),
    ...mapMutations("torneo", ["cambiarDialog", "obtenerTorneos"]),
    ...mapMutations("textoSnack", ["agregarSnack", "agregarSnackSteper"]),
    ...mapActions("torneo", ["agregarPorJugar", "puntajes"]),
    nextStep(n) {
      if (n === this.losPartidos.length + 1) {
        this.dialogo.paso = 1;
      } else {
        this.dialogo.paso = n + 1;
      }
    },
    scrollToTop() {
      document.getElementsByClassName("v-dialog--active")[0].scrollTop = 0;
    },
    cerrarDialog() {
      this.cambiarDialog(false);
      // this.$forceUpdate()
      this.dialogo.estado = false;
      this.dialogo.paso = 1;
      this.dialogo.cambiarName=false
      this.estado=false
    },
    uncheck(j, k) {
      console.log("hola");
      this.losPartidos[j].ruleElections = [];
    },
    enviar() {
      this.loadingFunction();
      const player = {
        _id: this._id,
        nickName: this.nickName.name,
        email: this.usuarioDB.data.email,
        position: null,
        matches: [],
      };
      var j = 0;
      for (let partido of this.losPartidos) {
        if (partido.score[0] < 0) {
          partido.score[0] = 0;
        }
        if (partido.score[1] < 0) {
          partido.score[1] = 0;
        }
        player.matches.push({
          _id: partido._id,
          score: partido.score,
          ruleElections: [],
        });
        const a = partido.rules.length;
        const b = partido.ruleElections.length;
        player.matches[j].ruleElections = partido.ruleElections;
        for (let i = 0; i < a - b; i++) {
          player.matches[j].ruleElections.push(null);
        }
        j++;
      }
      const index = this.torneos[0].players.findIndex(
        (item) => item._id === this._id
      );
      // En caso que sea nuevo en el torneo, se debe agregar el id de torneo a su usuario
      if (index === -1) {
        const paraToken = {
          torneoId: this.torneos[0]._id,
          usuarioId: this._id,
        };
        this.axios
          .put(`/user-torneo`, paraToken)
          .then((res) => {
            localStorage.removeItem("token");
            this.guardarUsuario(res.data);
          })
          .catch((e) => {
            console.log(e.response.data.mensaje);
          });
        const elTorneo = this.torneos[0];
        elTorneo.players.push(player);
        //Luego se agregan los datos del jugador al torneo
        this.axios
          .put(`/torneos`, elTorneo)
          .then((res) => {
            const array = [];
            array.push(res.data);
            this.puntajes(array);
            let aviso = "Jugadas ingresadas con éxito";
            this.agregarSnack(aviso);
            this.loadingFunction();
          })
          .catch((e) => {
            console.log(e.response.data.mensaje);
            this.loadingFunction();
          });
          
      }
      // En caso que esté editando sus datos del torneo
      if (index != -1) {
        const elTorneo = this.torneos[0];
        const indexPlayer = elTorneo.players.indexOf(player.idPlayer);
        elTorneo.players[index].nickName = this.nickName.name;
        for (let item of elTorneo.players[index].matches) {
          for (let item2 of player.matches) {
            if (item._id === item2._id) {
              item = item2;
            }
          }
        }
        this.axios
          .put(`/torneos-confirmar`, elTorneo)
          .then((res) => {
            if (res.data === "false") {
              let aviso = "No es momento de editar ahora";
              this.agregarSnack(aviso);
              this.loadingFunction();
            }
            if (res.data != "false") {
              const array = [];
              array.push(res.data);
              this.puntajes(array);
              let aviso = "Jugadas actualizadas";
              this.agregarSnack(aviso);
              this.loadingFunction();
            }
          })
          .catch((e) => {
            console.log(e.response.data.mensaje);
            this.loadingFunction();
          });
      }
      this.cerrarDialog()
    },
    cambiarNombre(){
      this.loadingFunction();
     const player = {
        _id: this._id,
        nickName: this.nickName.name,
        email: this.usuarioDB.data.email,
        position: null,
        matches: [],
      };
      var j = 0;
      for (let partido of this.losPartidos) {
        if (partido.score[0] < 0) {
          partido.score[0] = 0;
        }
        if (partido.score[1] < 0) {
          partido.score[1] = 0;
        }
        player.matches.push({
          _id: partido._id,
          score: partido.score,
          ruleElections: [],
        });
        const a = partido.rules.length;
        const b = partido.ruleElections.length;
        player.matches[j].ruleElections = partido.ruleElections;
        for (let i = 0; i < a - b; i++) {
          player.matches[j].ruleElections.push(null);
        }
        j++;
      }
      const index = this.torneos[0].players.findIndex(
        (item) => item._id === this._id
      );
      const elTorneo = this.torneos[0];
        const indexPlayer = elTorneo.players.indexOf(player.idPlayer);
        elTorneo.players[index].nickName = this.nickName.name
        this.axios
          .put(`/torneos-confirmar`, elTorneo)
          .then((res) => {
            if (res.data === "false") {
              let aviso = "No es momento de editar ahora";
              this.agregarSnack(aviso);
              this.loadingFunction();
            }
            if (res.data != "false") {
              const array = [];
              array.push(res.data);
              this.puntajes(array);
              let aviso = "Nombre Actualizado";
              this.agregarSnack(aviso);
              this.loadingFunction();
            }
          })
          .catch((e) => {
            console.log(e.response.data.mensaje);
            this.loadingFunction();
          });
          this.cerrarDialog()
    },
    revNombre() {
      const array = [];
      const largo = this.nickName.name.length;
      if (this.torneos[0].players.length > 0) {
        for (let jugador of this.torneos[0].players) {
          let coso = jugador.nickName.toLowerCase();
          array.push(coso);
        }
        const index = this.torneos[0].players.findIndex(
          (item) => item._id === this._id
        );
        if (index != -1 && index != undefined) {
          var index2 = array.findIndex(
            (item) =>
              item === this.torneos[0].players[index].nickName.toLowerCase()
          );
          array.splice(index2, 1);
        }
      }
      const nombreOcupado = array.includes(this.nickName.name.toLowerCase());
      if (nombreOcupado) {
        let aviso = "Este nombre ya está en uso en el torneo";
        this.agregarSnackSteper(aviso);
      }
      if (largo <= 3) {
        let aviso = "Nombre muy corto";
        this.agregarSnackSteper(aviso);
      }
      if (largo > 15) {
        let aviso = "Nombre muy Largo";
        this.agregarSnackSteper(aviso);
      }
      if (!nombreOcupado && largo < 16 && largo > 3) {
        this.estado = true;
      }
    },
  },
};
</script>
<style scoped>
.centered-input >>> input {
  text-align: center;
}
.ancho {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.v-dialog{
  box-shadow: none !important;
}
</style>