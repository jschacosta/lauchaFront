<template>
  <v-list class="pa-0 ma-0 encabezado">
    <p class="text-center text-caption" v-if="imagen === 'xs'">
      Voltea el telefono para más detalles
    </p>
    <v-list-item-group class="pa-0 ma-0 text-center">
      <v-list-item-content class="pa-0 ma-0 ">
        <v-row class="text-center ma-0 pa-0 text-caption ">
          <v-col cols="2" class="ancho" v-if="imagen != 'xs'">PARTIDO</v-col>
          <v-col cols="2" class="ancho" v-if="imagen === 'xs'">P</v-col>
          <v-col cols="2" class="ancho" v-if="imagen === 'xs'">RES</v-col>
          <v-col cols="2" class="ancho" v-if="imagen != 'xs'">RESULTADO</v-col>
          <v-col cols="2" class="ancho" v-if="imagen != 'xs'">DIF GOLES</v-col>
          <v-col cols="2" class="ancho" v-if="imagen === 'xs'">DG</v-col>
          <v-col
            cols="2"
            class="ancho"
            v-if="imagen != 'xs' && imagen != 'sm' && imagen != 'md'"
            >MARC EXACTO</v-col
          >
          <v-col
            cols="2"
            class="ancho"
            v-if="imagen === 'sm' || imagen === 'md'"
            >M EXACTO</v-col
          >
          <v-col cols="2" class="ancho" v-if="imagen === 'xs'">ME</v-col>
          <v-col
            cols="2"
            class="ancho"
            v-if="imagen != 'xs' && imagen != 'sm' && imagen != 'md'"
            >ESPECIALS</v-col
          >
          <v-col
            cols="2"
            class="ancho"
            v-if="imagen === 'sm' || imagen === 'md'"
            >ESPECIALS</v-col
          >
          <v-col cols="2" class="ancho" v-if="imagen === 'xs'">PE</v-col>
          <v-col class="ancho" v-if="imagen != 'xs'">TOTAL</v-col>
          <v-col class="ancho" v-if="imagen === 'xs'">T</v-col>
        </v-row>
      </v-list-item-content>

      <v-row
        v-for="(item, i) of puntosSeparados.matches"
        :key="i"
        class="pa-0 ma-0 text-center normal"
      >
        <v-col cols="2" class="ancho d-flex align-center font-weight-bold">
          P{{ i + 1 }}
        </v-col>
        <v-list-item-content
          v-for="(item2, j) of item"
          :key="j"
          class="pa-0 ma-0"
          background-color="primary"
        >
          <v-col
            cols="2"
            class="ancho "
            v-if="item2 != null && item2 != 0 && imagen != 'xs'"
          >
            <v-chip
              :x-small="imagen === 'xs' ? true : false"
              :color="item2 > 0 ? 'primary' : 'error'"
              >{{ item2 }}</v-chip
            ></v-col
          >
          <v-col
            cols="2"
            class="ancho py-5"
            v-if="item2 === null || item2 === 0"
          ></v-col>

          <v-col
            cols="2"
            class="ancho "
            v-if="item2 != null && item2 != 0 && imagen === 'xs'"
            :class="item2 > 0 ? 'primary--text' : 'error--text'"
          >
            {{ item2 }}</v-col
          >
        </v-list-item-content>
        <v-divider vertical v-if="imagen != 'xs'"></v-divider>

        <v-col
          v-if="item.reduce((a, b) => a + b, 0) != 0 && imagen != 'xs'"
          cols="2"
          class="ancho"
          ><v-chip
            :x-small="imagen === 'xs' ? true : false"
            :color="item.reduce((a, b) => a + b, 0) > 0 ? 'primary' : 'error'"
            >{{ item.reduce((a, b) => a + b, 0) }}</v-chip
          ></v-col
        >

        <v-col
          v-if="item.reduce((a, b) => a + b, 0) === 0 && imagen != 'xs'"
          cols="2"
          class="ancho"
          ><v-chip
            :x-small="imagen === 'xs' ? true : false"
            color="grey white--text"
            class="px-5"
            >0</v-chip
          ></v-col
        >

        <v-col
          v-if="item.reduce((a, b) => a + b, 0) != 0 && imagen === 'xs'"
          cols="2"
          class="ancho"
          :class="
            item.reduce((a, b) => a + b, 0) > 0 > 0
              ? 'primary--text'
              : 'error--text'
          "
          >{{ item.reduce((a, b) => a + b, 0) }}</v-col
        >

        <v-col
          v-if="item.reduce((a, b) => a + b, 0) === 0 && imagen === 'xs'"
          cols="2"
          class="ancho gris"
        >
          -{{ item.reduce((a, b) => a + b, 0) }}00
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row dense :class="imagen === 'xs' ? 'mx-4' : 'mx-1'">
        <v-col :cols="imagen === 'xs' ? '6' : '8'"></v-col>
        <v-col :cols="imagen === 'xs' ? '4' : '2'">TOTAL</v-col>
        <v-col cols="2">{{ sumadeTodo }}</v-col>
      </v-row>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MiniTabla",
  computed: {
    ...mapState("torneo", ["puntosSeparados"]),
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
    sumadeTodo() {
      const array = this.puntosSeparados.matches.reduce(
        (r, a) => a.map((b, i) => (r[i] || 0) + b),
        []
      );
      return array.reduce((a, b) => a + b, 0);
    },
  },
};
</script>

<style scoped>
.ancho {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  max-width: 800px;
}
.encabezado {
  background-color: #2c3a47;
  color: white;
}
.gris {
  color: #e0e0e0;
}
.normal {
  background-color: #e0e0e0;
  color: #2c3a47;
}
</style>
