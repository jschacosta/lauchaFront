import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

//vue axios 
Vue.use(VueAxios, axios)
// Agregamos la URL base de nuestra API
axios.defaults.baseURL = 'http://pollagol.herokuapp.com/api'; // para el caso local

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
