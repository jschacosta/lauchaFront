<template>
  <v-row justify="center">
    <v-dialog v-model="usuarioEdit.estado" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Usuario: {{ usuarioEdit.usuario.email }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['USER', 'EDITOR', 'RELATOR', 'ADMIN']"
                  v-model="nuevoRole"
                  label="Rol"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="usuarioEdit.estado = false"
            >Cancelar</v-btn
          >
          <v-btn color="blue darken-1" text @click="cambiarRol()"
            >Cambiar Rol</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  name: "editarRol",
  data: () => ({
    nuevoRole: "",
  }),
  computed: {
    ...mapState("userAdmin", ["usuarioEdit"]),
    ...mapState(["token"]),
    config() {
      return { headers: { token: this.token } };
    },
  },
  methods: {
    ...mapMutations("loading", ["loadingFunction"]),
    ...mapMutations("userAdmin", ["nuevoRol"]),
    cambiarRol() {
      this.loadingFunction();
      const nuevoUsuario = this.usuarioEdit.usuario;
      let id = nuevoUsuario._id;
      nuevoUsuario.role = this.nuevoRole;
      this.axios
        .put(`/users/admin/user/${id}`, nuevoUsuario, this.config)
        .then((res) => {
          let usuario = res.data;
          this.nuevoRol(usuario);
          this.loadingFunction();
          //cerra Dialog
          this.usuarioEdit.estado = false;
        })
        .catch((e) => {
          this.loadingFunction();
          console.log(e.response);
        });
    },
  },
};
</script>
