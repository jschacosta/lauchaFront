<template>
  <div>
    <v-btn
      class="my-5"
      @click="dialogo = true"
      v-if="torneos[0].name === ''"
      rounded
      color="primary"
      dark
      >Crear Torneo</v-btn
    >
    <v-btn
      class="my-5"
      v-if="torneos[0].name != ''"
      rounded
      color="error"
      @click="terminarTorneo()"
      dark
      >Terminar Torneo</v-btn
    >
    <v-card class="pa-0 mx-auto" v-if="torneos[0].name != ''" max-width="800px">
      <v-system-bar color="#2C3A47"></v-system-bar>
      <v-list class="pa-0 mb-5">
        <v-list-item-group class="pa-0">
          <v-list-item class="pa-0">
            <v-row class="text-center">
              <v-col cols="6">
                {{ torneos[0].name }}
              </v-col>
              <v-col cols="2"> {{ torneos[0].players.length }}/25 </v-col>
              <v-col cols="4">
                <v-btn
                  small
                  @click="edicion('true')"
                  v-if="torneos[0].edition === 'false'"
                  rounded
                  color="success"
                  dark
                  >Activar Edicion</v-btn
                >
                <v-btn
                  small
                  @click="edicion('false')"
                  v-if="torneos[0].edition === 'true'"
                  rounded
                  color="warning"
                  dark
                  >Desactivar Edicion</v-btn
                >
              </v-col>
            </v-row>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-dialog v-model="dialogo" max-width="500px" persistent>
      <v-card class="container">
        <v-card-title> Escribe el nombre del torneo </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="nombre"
            label="Nombre del Torneo"
            type="text"
            outlined
            dense
            class="mr-10 ml-5"
            @keyup.enter="
              crearTorneo();
              dialogo = false;
            "
          >
            Escribe el nombre para el Torneo
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialogo = false" color="green darken-1" text
            >Cancelar</v-btn
          >
          <v-btn
            @click="
              crearTorneo();
              dialogo = false;
            "
            color="green darken-1"
            text
            >Crear Torneo</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "CreateTorneo",
  data: () => ({
    dialogo: false,
    nombre: null,
    creado: false,
  }),
  computed: {
    ...mapState("relato", ["partidosCalendario"]),
    ...mapState("torneo", ["torneos", "boton", "botonDos"]),
  },
  methods: {
    ...mapMutations("loading", ["loadingFunction"]),
    ...mapMutations("confirmar", ["confirmar"]),
    ...mapMutations("torneo", [
      "obtenerTorneos",
      "cambiarBoton",
      "eliminarTorneo",
    ]),
    ...mapActions("relato", ["obtenerCalendario"]),
    async crearTorneo() {
      this.loadingFunction();
      var partidos = [];
      await this.axios
        .get(`/matches/match-estado/POR-JUGAR`)
        .then((res) => {
          this.obtenerCalendario(partidos);
          partidos = res.data;
        })
        .catch((e) => {
          console.log(e.response.data.mensaje);
        });
      const nuevoTorneo = {
        name: this.nombre,
        edition: "true",
        matches: [],
      };
      for (let item of partidos) {
        const elemento = {
          _id: item._id,
          score: null,
          ruleResult: [],
          valorRegla: [],
          apuesta: item.apuesta,
          ruleApuesta: [],
          valorApuestaRegla: [],
        };
        for (let objeto of item.rules) {
          elemento.valorApuestaRegla.push(objeto.options.values);
        }
        nuevoTorneo.matches.push(elemento);
      }
      await this.axios
        .post(`/torneos/torneos`, nuevoTorneo)
        .then((res) => {
          this.obtenerTorneos(res.data);
        })
        .catch((e) => {
          console.log(e.response.data.mensaje);
        });
      this.loadingFunction();
    },
    edicion(estado) {
      this.loadingFunction();
      const elTorneo = this.torneos[0];
      elTorneo.edition = estado;
      this.axios
        .put(`/torneos/torneos`, elTorneo)
        .then((res) => {
          const array = [];
          array.push(res.data);
          this.obtenerTorneos(array);
          this.loadingFunction();
        })
        .catch((e) => {
          console.log(e.response.data.mensaje);
          this.loadingFunction();
        });
    },
    terminarTorneo() {
      const info = {
        titulo: `¿Quieres terminar el Torneo: ${this.torneos[0].name}?`,
        cuerpo:
          "Al terminar el torneo, toda la información asociada será borrada de manera permanente",
        boton: "finishTorneo",
        datos: [],
      };
      info.datos = this.torneos[0]._id;
      this.confirmar(info);
    },
  },
};
</script>
