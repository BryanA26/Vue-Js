<template>
	<div class="container">
		<div class="card">
			<div class="card-header text-center">
				<b>PQRS</b>
			</div>
			<div class="card-body">
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
						<tr v-for="api in apis" :key="api.index">
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
			</div>
		</div>
	</div>
	<modalRespuesta :mensaje="detalles"></modalRespuesta>
</template>



<script setup>
import modalRespuesta from '../components/modalRespuesta.vue';
import { reactive, toRefs, ref } from 'vue'


const state = reactive({
	apis: []
})
const { apis } = toRefs(state)
const options = {
	method: 'GET',
	headers: {
		'User-Agent': 'Insomnia/2023.5.6',
		Authorization: import.meta.env.VITE_API_TOKEN
	},
}
const detalles = ref(undefined)
// Método para abrir el modal
const abrirModal = (index) => {
	detalles.value = index
	const modal = new bootstrap.Modal(document.getElementById('detallesModal'));
	modal.show();
};


fetch('http://10.1.1.8/api/v1/pqrs/', options)
	.then(response => response.json())
	.then(data => {
		console.log(data);
		data.data.forEach((element, index) => {
			const api = {
				...element,
				index: index + 1
			};
			state.apis.unshift(api);
		});
	})
	.catch(error => {
		console.error('Error en la solicitud:', error);
		console.log('Respuesta completa:', error.response);
	});
</script>


<style>
.container {
	margin: auto;
	max-width: 100%;
	padding: 1.25rem;
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