import { createRouter, createWebHistory } from "vue-router";
import Home from '../pages/Home.vue'
import Details from '../pages/Details.vue'
import Listar from '../pages/Listar.vue'
import crear from '../pages/crear.vue'

const routes =[
    {
        path:'/',
        name:'Home',
        component:Home
    },
    { 
        path:'/details/:id',
        name:'Detalles',
        component:Details
    },
    { 
        path:'/Listar/',
        name:'Listar',
        component:Listar
    },
    { 
        path:'/crear/',
        name:'Crear',
        component:crear
    }
    
]


const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router