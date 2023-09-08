<template>
	<div class="container">
		<div class="card">
			<div class="card-header text-center">
				PQRS
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
							<td class="text-center">
								<a name="" id="" class="btn btn-primary" href="#" role="button">Editar</a>
							</td>
							<td class="text-center">
								<a name="" id="" class="btn btn-warning" href="#" role="button" data-bs-toggle="modal" data-bs-target="detallesModal" @click="abrirModal(api.index)">Detalles</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

		</div>
	</div>

	<div class="modal" id="detallesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="exampleModalLabel">Detalles</h1>
					<button type="button" class="btn-close" @click="cerrarModal" data-bs-dismiss="modal" aria-label="Cerrar"></button>
				</div>
				<div class="modal-body" v-if="apis[obj_index_position]">
					{{ apis[obj_index_position].mensaje }}
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cerrarModal">Close</button>
				</div>
			</div>
		</div>
	</div>
</template>



<script setup>

import { useRouter } from 'vue-router';
const router = useRouter();
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
const obj_index_position = ref(undefined)
// Método para abrir el modal
const abrirModal = (index) => {
	obj_index_position.value = index - 1
	const modal = new bootstrap.Modal(document.getElementById('detallesModal'));
	modal.show();
};

const cerrarModal = () => {
	const modal = new bootstrap.Modal(document.getElementById('detallesModal'));
	modal.hide();
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
			state.apis.push(api);
		});
	})
	.catch(error => {
		console.error('Error en la solicitud:', error);
		console.log('Respuesta completa:', error.response);
	});
</script>


