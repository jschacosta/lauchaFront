<template>
  <v-app>
      <Navbar/>
      <v-main>
          <transition name='fade'>
        <router-view class="marginbottom"></router-view>
          </transition>
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
.slide-enter-active,
.slide-leave-active{
  transition: opacity 1s, transform 1s;
}
.slide-enter,
.slide-leave-to{
  opacity: 0;
  transform: translate(-30%);
}

.moveUp-enter-active{
  animation: fadeIn 1s ease-in;
}
@keyframes fadeIn{
  0%{
    opacity:0;
  }
  50%{
    opacity:0.5;
  }
  100%{
    opacity: 1;
  }
}
.moveUp-leave-active{
  animation:moveUp 0.3s easy-in;
}
@keyframes fadeIn{
  0%{
    transform: translateY(0);
  }

  100%{
    transform: translateY(-400px);
  }
}
.fade-enter-active{
      animation: fadeIn 0.3s ease-in;
}
@keyframes fadeIn{
  0%{
    opacity:0;
  }
  50%{
    opacity:0.5;
  }
  100%{
    opacity: 1;
  }
}


.fade-leave-active{
    animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn{
  0%{
    opacity:1;
  }
  50%{
    opacity:0.5;
  }
  100%{
    opacity: 0;
  }
}  
</style>

