import { createRouter, createWebHashHistory } from "vue-router";
import Home from '../pages/Home.vue'
import Details from '../pages/Details.vue'
import Listar from '../moduls/pqrs/pages/Listar.vue'
import crear from '../moduls/pqrs/pages/crear.vue'
import editar from '../moduls/pqrs/pages//editar.vue'
import Exportar from '../moduls/pqrs/pages/exportPDF.vue'
import ExportarMantenimiento from '../moduls/mantenimientos/pages/exportPDF.vue'
import crearMantenimiento from '../moduls/mantenimientos/pages/crear.vue'
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
	},
	{
		path: '/mantenimientos/exportPDF/:id',
		name: 'ExportarMatenimento',
		component: ExportarMantenimiento,
	},
	{
		path: '/mantenimientos/crear/',
		name: 'CrearMantenimientos',
		component: crearMantenimiento
	},

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
		component: Home
	},
	{
		path:'/PDFcrinmo/:id',
		name: 'ExportPdfCrinmo',
		component: ExportPdfCrinmo
	},
	{
		path: '/mantenimientos/exportPDF/:id',
		name: 'ExportarMatenimento',
		component: ExportarMantenimiento,
	},
	{
		path: '/mantenimientos/crear/',
		name: 'CrearMantenimientos',
		component: crearMantenimiento
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
	},
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
