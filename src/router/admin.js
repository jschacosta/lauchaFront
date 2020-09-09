export default [
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
            component: () => import(/* webpackChunkName: "Admin-Partidos" */ '../views/admin/sections/create/Index'),
            meta:{requireAuth:['ADMIN','EDITOR']}
          },
          {
            path: 'play', 
            name: 'Play',
            component: () => import(/* webpackChunkName: "Admin-Relatos" */ '../views/admin/sections/relato/Calendar'),
            meta:{requireAuth:['ADMIN','EDITOR','RELATOR']}
          },
          {
            path: '/admin/play/:id',
            name: 'MatchLive',
            component: () => import(/* webpackChunkName: "Admin-Relatos" */ '../views/admin/sections/relato/LiveMatch'),
            meta:{requireAuth:['ADMIN','EDITOR','RELATOR']}
          }, 
          {
            path: 'analitycs',
            name: 'Analitycs',
            component: () => import(/* webpackChunkName: "Admin-Analytics" */ '../views/admin/sections/Analitycs'),
            meta:{requireAuth:['ADMIN']}
          },
          {
            path:'users',
            name:'Users',
            component: () => import(/* webpackChunkName: "Admin-Users" */ '../views/admin/sections/Users'),
            meta:{requireAuth:['ADMIN']},
          },
          {
            path: 'profile',
            name: 'AdminProfile',
            component: () => import(/* webpackChunkName: "Admin-Profile" */ '../views/admin/sections/AdminProfile'),
            meta:{requireAuth:['ADMIN','EDITOR','RELATOR']}
          },
        ]
      },
]