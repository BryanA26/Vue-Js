import { createRouter, createWebHistory } from "vue-router";
import Home from '../pages/Home.vue'
import Details from '../pages/Details.vue'
import Listar from '../pages/Listar.vue'

const routes =[
    {
        path:'/',
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
    }
]


const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router