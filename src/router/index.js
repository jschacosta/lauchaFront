import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'
//Import Routes
import AdminRoutes from './admin'
import UserRoutes from './users'
import LoginRoutes from './login'

Vue.use(VueRouter)

const router  = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    ...UserRoutes,
    ...AdminRoutes,
    ...LoginRoutes,
    { 
      path: '/401',
      name: 'UnAuthorized',
      component: () => import(/* webpackChunkName: "No Autorizado" */ '../views/error/UnAuthorized'), 
    },
    {
      path: '/404',
      alias:'*',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "NotFound" */ '../views/error/NotFound'), 
    }
  ]
})
router.beforeEach((to, from, next) => {
  store.dispatch('leerToken').then(()=>{
    const auth=to.matched.some(record => record.meta.requireAuth);
    if(auth){
      if(!store.state.token){
        next({name:'UnAuthorized'})
      }
      else{
        if (to.meta.requireAuth.indexOf(store.state.role)===-1 ){
          next({name:'UnAuthorized'})
        }
        else{
          next()
        }
      }
    }
    else{
      next()
    }
  })
});
export default router;
