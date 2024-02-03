<template>
  <div>
    <h4 class="mb-4" align="justify">
      En esta pestaña se crean los partidos disponibles para los usuarios con
      las reglas correspondientes para cada uno.
    </h4>

    <h4 class="mb-2" align="justify">
      1) Elija el torneo de donde se obtendran los equipos ("Tipo de partido" -
      seleccione sus opciones - presionar
      <v-btn color="primary" dark x-small>Buscar Equipos</v-btn> ).
    </h4>

    <h4 class="mb-2" align="justify">
      2) Defina hora-fecha y equipos a enfrentar luego presione
      <v-btn color="orange" dark x-small>Crear Partido</v-btn> .
    </h4>

    <h4 class="mb-2" align="justify">
      3) Agregue las reglas al partido y edite sus valores de apuesta (si es
      necesario).
    </h4>

    <h4 align="justify">
      4) Cuando tenga todos los partidos creados presione
      <v-btn color="primary" dark x-small>Enviar Partidos</v-btn> . <br />Al
      presionar "Enviar Partidos", todos los partidos creados se enviarán a la
      sección "INICIAR PARTIDOS" y a la interfaz del usuario directamente para
      su juego. Finalmente si limpiará la tabla de esta sección. En caso de
      errores ir a pestaña "INICIAR PARTIDOS" para eliminar partidos erróneos.
    </h4>

    <br />

    <v-row>
      <v-col>
        <formEquipos></formEquipos>
      </v-col>
      <v-col v-if="confirmacion === true">
        <pickerTime></pickerTime>
        <pickerDate></pickerDate>
        <v-select
          :items="torneos.equipos"
          v-model="equipo1"
          label="Equipo Local"
        ></v-select>
        <v-select
          :items="torneos.equipos"
          v-model="equipo2"
          label="Equipo Visita"
        ></v-select>
        <h4>Valores de Apuesta:</h4>
        <v-row>
          <v-col>
            <v-text-field
              type="number"
              v-model.number="apuesta[0]"
              min="0"
              label="Apuesta L"
              outlined
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              type="number"
              v-model.number="apuesta[1]"
              min="0"
              label="Apuesta E"
              outlined
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              type="number"
              v-model.number="apuesta[2]"
              min="0"
              label="Apuesta V"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center mt-4">
          <v-btn dark color="orange accent-4" @click="nuevoPartido()"
            >Crear Partido</v-btn
          >
        </v-row>
      </v-col>
    </v-row>
    <tablaPartidos></tablaPartidos>
    <selectRuleMatch></selectRuleMatch>
    <editRuleMatch></editRuleMatch>
    <dialogoConfirmar></dialogoConfirmar>
    <editApuesta></editApuesta>
  </div>
</template>

<script>
import formEquipos from "@/components/forms/selectForm/formEquipos";
import pickerTime from "@/components/forms/selectForm/pickerTime";
import pickerDate from "@/components/forms/selectForm/pickerDate";
import tablaPartidos from "@/components/tables/tablaPartidos";
import selectRuleMatch from "@/components/dialog/selectRuleMatch.vue";
import editRuleMatch from "@/components/dialog/editRuleMatch.vue";
import dialogoConfirmar from "@/components/utils/dialog/dialogConfirmar.vue";
import editApuesta from "@/components/dialog/editApuesta.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Armado",
  components: {
    formEquipos,
    pickerTime,
    pickerDate,
    tablaPartidos,
    selectRuleMatch,
    editRuleMatch,
    dialogoConfirmar,
    editApuesta,
  },
  data: () => ({
    equipo1: "",
    equipo2: "",
    apuesta: [],
  }),
  computed: {
    ...mapState("teams", ["torneos", "confirmacion"]),
    ...mapState("match", ["tiempo", "fecha"]),
  },
  methods: {
    ...mapMutations("match", ["agregarPartido"]),
    ...mapMutations("textoSnack", ["agregarSnack"]),
    nuevoPartido() {
      let nuevoPartido = {
        local: this.equipo1,
        visita: this.equipo2,
        torneo: this.torneos.torneo,
        horaPartido: this.tiempo,
        fechaPartido: this.fecha,
        apuesta: this.apuesta,
      };
      let vacio = true;
      for (let valor of Object.values(nuevoPartido)) {
        if (valor === "" || valor === null) {
          vacio = false;
        }
      }
      if (vacio === false) {
        const snack = "Faltan datos por llenar";
        this.agregarSnack(snack);
      }
      if (this.apuesta.length < 3) {
        const snack = "Faltan los valores de apuesta";
        this.agregarSnack(snack);
      } else {
        this.axios
          .post(`/matches/match`, nuevoPartido)
          .then((res) => {
            let partido = res.data;
            this.agregarPartido(partido);
            let Snack = "Partido Agregado";
            this.agregarSnack(Snack);
          })
          .catch((e) => {
            console.log(e.response.data.mensaje);
          });
      }
    },
  },
};
</script>

