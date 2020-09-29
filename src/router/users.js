export default [
  {
    path: '/torneos',
    name: 'Torneos',
    component: () => import(/* webpackChunkName: "Login" */ '../views/users/Torneos')  
  },
  {
    path: '/torneos/:id',
    name: 'TorneosOtros',
    component: () => import(/* webpackChunkName: "Login" */ '../views/users/JugadasOtros')  
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
]