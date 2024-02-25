import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueAxios from "vue-axios";
import axios from "axios";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
// Agregamos la URL base de nuestra API
axios.defaults.baseURL = "http://localhost:3000/api"; // para el caso local
// axios.defaults.baseURL = "https://lauchapp.up.railway.app/api"; // para el caso local

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
