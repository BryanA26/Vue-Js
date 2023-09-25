<template>
	<div class="container" ref="container" @scroll="loadMoreOnScroll">
		<div class="card">
			<div class="card-header d-flex justify-content-between align-items-center">
				<b>PQRS</b>

				<div class="search-icon">
					<div class="search-container">
						<button type="button" class="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="toggleSearch">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
								<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
							</svg>
						</button>
						<div v-if="showSearch" class="search-input">
							<input v-model="filterText" type="text" class="form-control" placeholder="Buscar" aria-label="Buscar" aria-describedby="search-button" />
							<button @click="searchOnServer" class="btn btn-primary" type="button" id="search-button">
								Buscar
							</button>
						</div>
					</div>
				</div>
			</div>
			<table class="table">
				<thead class="table-light">
					<tr>
						<th scope="col">Id</th>
						<th scope="col">Nombre</th>
						<th scope="col">Identificación</th>
						<th scope="col">Correo</th>
						<th scope="col">Contacto</th>
						<th scope="col">Estado</th>
						<th scope="col">Área Encargada</th>
						<th scope="col" colspan="2" class="text-center">Acciones</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="api in filterApi" :key="api.index">
						<td scope="row">{{ api.id_pqrs }}</td>
						<td scope="row">{{ api.nombres_apellidos }}</td>
						<td scope="row">{{ api.identificacion }}</td>
						<td scope="row">{{ api.email }}</td>
						<td scope="row">{{ api.tel }}</td>
						<td scope="row"><span class="badge text-bg-warning">{{ api.estado }}</span> </td>
						<td scope="row"><b>{{ api.area_enc }}</b></td>
						<td class="text-center">
							<div class="btn-group">
								<button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									Acciones
								</button>
								<div class="dropdown-menu">
									<router-link :to="'/editar/' + api.id_pqrs" class="dropdown-item" href="#">Gestionar</router-link>
									<a class="dropdown-item" href="#">Exportar PDF</a>
								</div>
							</div>
						</td>
						<td class="text-center">
							<div class="btn-group"></div>
							<button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Detalles
							</button>
							<div class="dropdown-menu">
								<a name="" id="" class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="detallesModal" @click="abrirModal(api.mensaje)">Mensaje</a>

								<a name="" id="" class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="detallesModal" @click="abrirModal(api.observaciones)">Observaciones</a>
							</div>
						</td>
					</tr>

				</tbody>
			</table>
			<div v-if="isLoading" class="spinner-row">
				<div class="d-flex justify-content-center align-items-center h-100">
					<div class="spinner-border" role="status">
						<span class="visually-hidden">Cargando</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<modalRespuesta :mensaje="detalles"></modalRespuesta>
</template>



<script setup>
import modalRespuesta from '../components/modalRespuesta.vue';
import { reactive, ref, onMounted, onUnmounted, computed } from 'vue'
import { loadInitialData } from '../fetch.query';

const loadedData = ref([]);
const isLoading = ref(false);
const pagina = ref(1);

const totalPages = ref(1);
const filterText = ref("");
const showSearch = ref(false)

const filterApi = computed(() => {
	const searchText = filterText.value.toLowerCase().trim()

	if (searchText === '') {
		return loadedData.value;
	}


	return loadedData.value.filter(api => {
		// Personaliza cómo quieres que se realice la búsqueda aquí
		return (
			api.id_pqrs.toString().toLowerCase().includes(searchText) ||
			api.nombres_apellidos.toLowerCase().includes(searchText) ||
			api.identificacion.toString().toLowerCase().includes(searchText) ||
			api.email.toLowerCase().includes(searchText) ||
			api.tel.toString().toLowerCase().includes(searchText) ||
			api.estado.toLowerCase().includes(searchText) ||
			api.area_enc.toLowerCase().includes(searchText)

		)
	})

})

const toggleSearch = () => {
	showSearch.value = !showSearch.value
}

const moreData = async () => {

	if (pagina.value <= totalPages.value) {
		isLoading.value = true;
		const newData = await loadInitialData(pagina.value);

		if (newData.rows.pages !== totalPages.value) {
			totalPages.value = newData.rows.pages;
		}

		loadedData.value = [...loadedData.value, ...newData.data];
		isLoading.value = false;

		pagina.value++;
	}
};


const loadMoreOnScroll = () => {
	const container = document.querySelector('.container');

	if (container.scrollTop + container.clientHeight >= container.scrollHeight && !isLoading.value) {
		moreData();
	}

};

const searchOnServer = () => {

	cargarDatosPagina();
};


const detalles = ref(undefined)
// Método para abrir el modal
const abrirModal = (index) => {
	detalles.value = index
	const modal = new bootstrap.Modal(document.getElementById('detallesModal'));
	modal.show();
};

const cargarDatosPagina = () => {
	if (pagina.value > totalPages.value)

		return;
}

onMounted(async () => {

	await moreData();


	window.addEventListener('scroll', e => {
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !isLoading.value) {
			moreData();
		}

	})
});


onUnmounted(() => {

	window.removeEventListener('scroll', moreData);
});


</script>


<style>
.container {
	margin: auto;
	max-width: 100%;
	padding: 1.25rem;
	text-align: center;
}

.card {
	border: 1px inset;
	border-radius: 0.3125rem;
	box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
}

.table {
	width: 100%;
	margin-bottom: 0;
}

.dropdown-item:hover {
	background-color: #8cb3db;
	/* Cambia el color de fondo al pasar el puntero */
	color: #333;
	/* Cambia el color del texto al pasar el puntero */
}

/* Paginador */
.pagination-container {
	display: flex;
	align-items: center;
	margin-top: 20px;

}

.paginate-buttons {
	height: 30px;
	width: 30px;
	border-radius: 20px;
	cursor: pointer;
	background-color: rgb(242, 242, 242);
	border: 1px solid rgb(217, 217, 217);
	color: black;
}

.paginate-buttons:hover {
	background-color: #d8d8d8;
}

.active-page {
	background-color: #3498db;
	border: 1px solid #3498db;
	color: white;
}

.active-page:hover {
	background-color: #2988c8;
}

.bi-search {
	fill: currentColor;
	/* Utiliza el color actual del texto para el relleno */
	margin-left: auto;
	/* Desplaza el ícono hacia la derecha */
}

.search-container {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	/* Alineación hacia la derecha */
	margin-bottom: 10px;
}

.search-button {
	margin-left: 10px;
	/* Espacio a la izquierda del botón */
}

.search-input {
	display: flex;
	align-items: center;
}

thead {
	position: sticky;
	top: 0;
	background-color: #fff;
	z-index: 1;
}

/* Estilos para la fila del spinner */
.spinner-row {
	height: 60px;
	/* Ajusta la altura según tus necesidades */
}

@media (max-width: 768px) {
	.table thead {
		display: none;
	}

	.table tbody tr {
		display: block;
		margin-bottom: 1.25rem;
		border: 1px solid #ddd;
		border-radius: 0.3125rem;
	}

	.table tbody td {
		display: block;
		text-align: left;
	}

	.table tbody td::before {
		content: attr(data-label);
		font-weight: bold;
		display: block;
	}

	.boton {
		margin: 1.25rem 0;
		width: 100%;
	}
}

@media (min-width: 769px) {
	.table {
		font-size: 0.875rem;
	}

	.boton {
		margin-right: 0.625rem;
	}
}
</style>