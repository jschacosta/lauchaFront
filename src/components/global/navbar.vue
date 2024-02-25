<template>
  <div style="-webkit-app-region:drag">
    <!-- Navbar para Usuario y Admin -->
    <v-app-bar app color="#2C3A47" dark>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="clickable"
        v-if="(imagen === 'sm' || imagen === 'md') && !rutaAdmin"
      ></v-app-bar-nav-icon>
      <v-app-bar-nav-icon
        @click.stop="mini = !mini"
        class="clickable"
        v-if="rutaAdmin"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="d-flex align-center">
        <span class="text-uppercase" v-if="!rutaAdmin">
          <router-link
            :to="{ name: 'Home' }"
            style="text-decoration: none; color: inherit"
          >
            Laucha App
          </router-link>
        </span>
        <a
          class="ml-5 mt-1"
          target="_blank"
          href="https://www.instagram.com/lauchadearea/?hl=es-la"
          ><img
            class="text-center"
            src="../../../public/instaa.png"
            alt="Paris"
            width="18"
            height="18"
          />
        </a>
      </v-toolbar-title>
      <v-toolbar-title>
        <span
          class="text-uppercase "
          :class="imagen === 'xs' ? 'body-3' : 'h2'"
          v-if="rutaAdmin"
          >Panel de Control</span
        >
      </v-toolbar-title>
      <v-item-group
        multiple
        v-if="(imagen === 'lg' || imagen === 'xl') && !rutaAdmin"
      >
        <v-item v-for="item in itemsRevisado" :key="item.text">
          <v-btn
            route
            :to="item.route"
            class="mx-2"
            :disabled="
              item.text === 'Mis Torneos' || item.text === 'Mis Stats'
                ? true
                : false
            "
            text
            small
            outlined
            color="white"
          >
            <caption>
              {{
                item.text
              }}
            </caption>
          </v-btn>
        </v-item>
      </v-item-group>
      <v-spacer />
      <v-btn
        small
        outlined
        color="orange"
        :to="{ name: 'Login' }"
        v-if="!estaActivo && !rutaLogin"
      >
        <v-icon>person</v-icon>
        <caption>
          Acceder
        </caption>
      </v-btn>
      <!-- Boton Salir User -->
      <UserButton v-if="estaActivo && !rutaAdmin"></UserButton>
      <!-- Boton Salir Admin -->
      <v-btn
        fab
        small
        class="mr-2"
        color="#2C3A47"
        :to="{ name: 'Home' }"
        v-if="estaActivo && rutaAdmin"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <!-- loading Bar -->
      <loadingBar></loadingBar>
    </v-app-bar>

    <!-- Config Menu Lateral -->
    <v-navigation-drawer
      fixed
      v-model="drawer"
      :temporary="!rutaAdmin ? true : false"
      color="#2C3A47"
      dark
      :permanent="rutaAdmin ? true : false"
      :mini-variant="!rutaAdmin ? false : mini"
      :app="rutaAdmin ? true : false"
    >
      <!--Menu Lateral Usuario  -->
      <NavUser v-if="!rutaAdmin"></NavUser>
      <!-- Menu Lateral Admin -->
      <NavAdmin v-if="rutaAdmin"></NavAdmin>
    </v-navigation-drawer>

    <!-- Botón flotante para subir página -->
    <v-btn
      v-scroll="onScroll"
      bottom
      color="orange darken-3"
      dark
      fab
      fixed
      right
      @click="toTop"
      class="clickable"
      v-if="imagen === 'xl' || imagen === 'lg'"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import router from "@/router/index";
import NavUser from "./sidebar/User";
import NavAdmin from "./sidebar/Admin";
import UserButton from "./sidebar/UserButton";
import loadingBar from "../utils/bars/loadingBar.vue";

export default {
  name: "Navbar",
  components: {
    NavUser,
    NavAdmin,
    UserButton,
    loadingBar,
  },
  data: () => ({
    props: {
      source: String,
    },
    drawer: null,
    mini: true,
    fab: false, //este es para el boton flotante te envia a la zona superior
    itemsNav: [
      { icon: "emoji_events", text: "Mis Torneos", route: "/torneos" },
      { icon: "fas fa-chart-pie", text: "Mis Stats", route: "/stats" },
      { icon: "fas fa-book", text: "Reglas", route: "/rules" },
    ],
  }),
  computed: {
    ...mapGetters(["estaActivo"]),
    ...mapState(["token"]),
    itemsRevisado() {
      if (this.token != "") {
        return this.itemsNav;
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
    rutaAdmin() {
      return this.$route.path.includes("admin");
    },
    rutaLogin() {
      return (
        this.$route.path.includes("login") ||
        this.$route.path.includes("reset") ||
        this.$route.path.includes("forgot")
      );
    },
  },
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.onScrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>
<style>
.clickable {
  -webkit-app-region: no-drag;
}
</style>
