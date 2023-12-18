import { createRouter, createWebHashHistory } from "vue-router";
import Home from '../pages/Home.vue'
import Details from '../pages/Details.vue'
import Listar from '../moduls/pqrs/pages/Listar.vue'
import crear from '../moduls/pqrs/pages/crear.vue'
import editar from '../moduls/pqrs/pages//editar.vue'
import Exportar from '../moduls/pqrs/pages/exportPDF.vue'

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
		component: Home
	},
	{
		path: '/pqrs/exportPDF/:id',
		name: 'Exportar',
		component: Exportar,
	},
	{
		path: '/pqrs/crear/',
		name: 'Crear',
		component: crear
	}
]



// const router = createRouter({
// 	history: createWebHashHistory(import.meta.env.BASE_URL),
// 	routes
// })

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: routes_portada
})

export default router
