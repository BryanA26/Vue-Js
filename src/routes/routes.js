import { createRouter, createWebHashHistory } from "vue-router";
import Home from '../pages/Home.vue'
import Details from '../pages/Details.vue'
import Listar from '../pages/Listar.vue'
import crear from '../pages/crear.vue'
import editar from '../pages/editar.vue'
import Exportar from '../pages/exportPDF.vue'
import ExportPdfCrinmo from '../pages/PDFcrinmo.vue'

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
	},
	{
		path:'/PDFcrinmo/:id',
		name: 'ExportPdfCrinmo',
		component: ExportPdfCrinmo
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

const routes_crinmo = [
	{
		path: '/editar/:id',
		name: 'Editar',
		component: editar
	},
	{
		path: '/',
		name: 'Home',
		component: Listar
	},
	{
		path:'/PDFcrinmo/:id',
		name: 'ExportPdfCrinmo',
		component: ExportPdfCrinmo
	}
]


// const router = createRouter({
// 	history: createWebHashHistory(import.meta.env.BASE_URL),
// 	routes
// })

// const router = createRouter({
// 	history: createWebHashHistory(import.meta.env.BASE_URL),
// 	routes: routes_portada
// })

const router = createRouter ({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: routes_crinmo
})

export default router
