import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

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
    {
      path: '/torneos',
      name: 'Torneos',
      component: () => import(/* webpackChunkName: "Login" */ '../views/users/Torneos')  
    },
    {
      path: '/stats',
      name: 'Stats',
      component: () => import(/* webpackChunkName: "Login" */ '../views/users/Stats')  
    },
    {
      path: '/rules',
      name: 'Rules',
      component: () => import(/* webpackChunkName: "Login" */ '../views/users/Rules')  
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import(/* webpackChunkName: "Login" */ '../views/users/Profile')  
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "Login" */ '../views/Login')  
    },
    { 
      path: '/admin', 
      redirect: '/admin/dashboard',
      
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import(/* webpackChunkName: "Admin" */ '../views/admin/Index'),          
      children:[
        {
          path:'dashboard',
          name:'Dashboard',
          component: () => import(/* webpackChunkName: "Dashboard" */ '../views/admin/sections/Dashboard'),
          meta:{requireAuth:['ADMIN','EDITOR','RELATOR']},
        },
        {
          path:'edit',
          name:'Edit',
          component: () => import(/* webpackChunkName: "Admin-Editar" */ '../views/admin/sections/edit/Index'),
          meta:{requireAuth:['ADMIN','EDITOR']},     
        },
        {
          path: 'create',
          name: 'Create',
          component: () => import(/* webpackChunkName: "Admin-Partidos" */ '../views/admin/sections/Create'),
          meta:{requireAuth:['ADMIN','EDITOR']}
        },
        {
          path: 'play',
          name: 'Play',
          component: () => import(/* webpackChunkName: "Admin-Partidos" */ '../views/admin/sections/Play'),
          meta:{requireAuth:['ADMIN','EDITOR','RELATOR']}
        },
        {
          path: 'analitycs',
          name: 'Analitycs',
          component: () => import(/* webpackChunkName: "Admin-Partidos" */ '../views/admin/sections/Analitycs'),
          meta:{requireAuth:['ADMIN']}
        },
        {
          path:'users',
          name:'Users',
          component: () => import(/* webpackChunkName: "Admin-Usuarios" */ '../views/admin/sections/Users'),
          meta:{requireAuth:['ADMIN']},
        },
        {
          path: 'profile',
          name: 'AdminProfile',
          component: () => import(/* webpackChunkName: "Admin-Partidos" */ '../views/admin/sections/AdminProfile'),
          meta:{requireAuth:['ADMIN','EDITOR','RELATOR']}
        },
      ]
    },
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
