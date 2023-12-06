import { createRouter, createWebHashHistory } from "vue-router";
import Home from '../pages/Home.vue'
import Details from '../pages/Details.vue'
import Listar from '../pages/Listar.vue'
import crear from '../pages/crear.vue'
import editar from '../pages/editar.vue'
import Exportar from '../pages/exportPDF.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/details/:id',
		name: 'Detalles',
		component: Details
	},
	{
		path: '/Listar/',
		name: 'Listar',
		component: Listar
	},
	{
		path: '/crear/',
		name: 'Crear',
		component: crear
	},
	{
		path: '/editar/:id',
		name: 'Editar',
		component: editar
	},
	{
		path: '/exportPDF/:id',
		name: 'Exportar',
		component: Exportar
	}
]
const routes_portada = [
	{
		path: '/',
		name: 'Home',
		component: crear
	},
	{
		path: '/exportPDF/:id',
		name: 'Exportar',
		component: Exportar
	}
]


// const router = createRouter({
// 	history: createWebHashHistory(import.meta.env.BASE_URL),
// 	routes
// })

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes_portada
})

export default router