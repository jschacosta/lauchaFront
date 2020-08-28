export default [
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "Login" */ '../views/login/Login.vue')  
    },
    {
        path: '/forgot-password',
        name: 'Forgot',
        component: () => import(/* webpackChunkName: "Forget" */ '../views/login/Forgot.vue'), 
    },
    {
        path: '/reset-password/:id',
        name: 'Reset',
        component: () => import(/* webpackChunkName: "Reset" */ '../views/login/Reset.vue'), 
    },
]