<template>
  <v-app>
      <Navbar/>
      <v-main>
        <router-view class="marginbottom"></router-view >
          <SnackBar></SnackBar>
      </v-main>
      <Footer/>
  </v-app> 
</template>
<script>
import Navbar from './components/global/navbar';
import Footer from './components/global/footer';
import SnackBar from '@/components/utils/alerts/snackbar.vue'
import {mapActions} from 'vuex'
export default {
  name: 'App',
  components: {
    Footer,
    Navbar,
    SnackBar
  },
  methods: {
    ...mapActions(['leerToken']),
  }
};
</script>
<style scoped>
.marginbottom{
  margin-bottom: 250px;
}
</style>

