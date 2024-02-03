<template>
  <div class="d-flex justify-center">
    <v-card class="elevation-15" max-width="800px">
      <v-card-title>
        <v-text-field
          v-model="search"
          dense
          append-icon="mdi-magnify"
          label=" Buscar Jugador"
          single-line
          hide-details
          class="elevation-3"
        >
        </v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="torneos[0].players"
        :search="search"
        class="elevation-2"
      >
        <template v-slot:[`item.accion`]="{ item }">
          <v-btn
            class="mr-2 mx-2"
            small
            tile
            color="primary"
            @click="verJugador(item._id)"
          >
            <i class="fas fa-search"></i>
            Puntajes
          </v-btn>
          <v-btn
            class="mr-2 mx-2"
            small
            tile
            large
            color="error"
            icon
            @click="kickUser(item)"
          >
            <i class="fas fa-skull"></i>
            Kick
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template> 
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "tablaTorneoPlayers",
  data: () => ({
    search: "",
    headers: [
      { text: "JUGADOR", align: "center", sortable: true, value: "nickName" },
      { text: "CORREO", align: "center", sortable: true, value: "email" },
      { text: "ID", align: "center", sortable: true, value: "_id" },
      { text: "ACCION", align: "center", value: "accion", sortable: false },
    ],
  }),
  computed: {
    ...mapState("torneo", ["torneos"]),
  },
  methods: {
    ...mapMutations("loading", ["loadingFunction"]),
    ...mapMutations("textoSnack", ["agregarSnack"]),
    ...mapMutations("confirmar", ["confirmar"]),
    ...mapActions("torneo", ["agregarPorJugar", "puntajes"]),
    kickUser(player) {
      const info = {
        titulo: `¿Está seguro de expulsar a ${player.email}?`,
        cuerpo:
          "Al expulsar, toda la información del jugador en el torneo será borrada de manera permanente",
        boton: "kickPlayer",
        datos: [],
      };
      info.datos = player._id;
      this.confirmar(info);
    },
    verJugador(id) {
      this.$router.push({ path: `/admin/torneos/${id}` });
    },
  },
};
</script>
