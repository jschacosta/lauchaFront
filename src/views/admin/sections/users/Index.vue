<template>
  <div>
    <v-tabs
      v-model="tab"
      background-color="white"
      color="primary"
      next-icon="mdi-arrow-right-bold-box-outline"
      prev-icon="mdi-arrow-left-bold-box-outline"
      show-arrows
    >
      <v-tab href="#one">
        <i class="fa fa-cog"></i>
        Gestión Usuarios
      </v-tab>
      <v-tab href="#two">
        <i class="fa fa-cogs"></i>
        Torneo
      </v-tab>
      <v-tabs-items :value="tab">
        <!-- Tab1 -->
        <v-tab-item value="one">
          <v-container fluid>
            <Users></Users>
          </v-container>
        </v-tab-item>
        <!-- Tab2 -->
        <v-tab-item value="two">
          <v-container fluid>
            <Torneo></Torneo>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>
<script>
import Users from "./tabs/Users";
import Torneo from "./tabs/Torneo";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "Index",
  components: {
    //son vistas pero se consideran como componentes para comodidad
    Torneo,
    Users,
  },
  computed: {
    ...mapState("torneo", ["torneos", "contadorTorneo"]),

    tab: {
      set(tab) {
        this.$router.replace({ query: { ...this.$route.query, tab } });
      },
      get() {
        return this.$route.query.tab;
      },
    },
  },
  methods: {
    ...mapMutations("loading", ["loadingFunction"]),
    ...mapMutations("torneo", ["pedirContador"]),
    ...mapActions("torneo", ["agregarPorJugar", "puntajes"]),
  },
  async created() {
    if (this.contadorTorneo === false) {
      this.loadingFunction();
      this.axios
        .get(`/torneos/find`)
        .then((res) => {
          const todoTorneo = res.data;
          this.puntajes(res.data);
          this.axios
            .get(`/matches/match-estado/JUGANDO&POR-JUGAR&TERMINADO`)
            .then((respuesta) => {
              const ambosArreglos = [todoTorneo, respuesta.data];
              this.loadingFunction();
              this.agregarPorJugar(ambosArreglos);
              this.pedirContador();
            })
            .catch((e) => {
              this.loadingFunction();
              console.log(e.response.data.mensaje);
            });
        })
        .catch((e) => {
          this.puntajes([{ name: "", players: [] }]);
          this.loadingFunction();
          console.log(e.response.data.mensaje);
        });
    }
  },
};
</script>