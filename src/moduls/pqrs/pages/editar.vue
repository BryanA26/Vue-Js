<template>
	<div class="container">
		<div class="card">
			<div class="card-header text-center">

				<b>Formulario de Actualización de Peticiones Quejas y Reclamos</b>

			</div>
			<div class="card-body my-2">
				<form v-on:submit.prevent="prepareData">
					<div class="row">
						<div class="col-md-6">
							<selectS inputId="'floatingSelect'" :selected-value="pqrs.area_enc" :label="'Área encargada *'" :options="areaOptions" @update:select-value="pqrs.area_enc = $event" :editable="false" />
						</div>

						<div class="col-md-6">
							<div class="input-group has-validation">
								<div class="form-floating ">
									<inputText type="text" inputId="floatingInputGroup1" v-model="pqrs.id_pqrs" placeholder="id" label="Número de Radicado" :editable="true" />
								</div>
							</div>
						</div>

						<div class="col-md-6">
							<div class="my-3">
								<div class="input-group has-validation">
									<div class="form-floating ">
										<inputText type="text" inputId="floatingInputGroup1" v-model="pqrs.fecha_registro" placeholder="id" label="Número de Radicado" :editable="true" />
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-6">
							<div class="my-3">
								<div class="form-floating">
									<selectS inputId="'floatingSelect'" :selected-value="pqrs.estado" :label="'Estado *'" :options="estadOptions" @update:select-value="pqrs.estado = $event" :editable="true" />
								</div>
							</div>
						</div>

						<div class="col-md-6">
							<div class="form-floating">
								<selectS inputId="'floatingSelect'" :selected-value="pqrs.tipo_doc" :label="'Área encargada *'" :options="docOptions" @update:select-value="pqrs.tipo_doc = $event" :editable="false" />
							</div>
						</div>

						<div class="col-md-6">
							<div class="input-group has-validation">
								<div class="form-floating">
									<inputText type="text" inputId="floatingInputGroup1" v-model="pqrs.identificacion" placeholder="Documento" label="Número de Identificación" :editable="true" />
								</div>
							</div>
						</div>

						<div class="col-md-6">
							<div class="my-3">
								<div class="input-group has-validation">
									<div class="form-floating">
										<inputText type="text" inputId="floatingInputGroup1" v-model="pqrs.nombres_apellidos" placeholder="nombre" label="Nombres y Apellidos" :editable="true" />
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-6">
							<div class="my-3">
								<div class="input-group has-validation">
									<div class="form-floating">
										<inputText type="text" inputId="floatingInputGroup1" v-model="pqrs.tel" placeholder="tel" label="Número de contacto" :editable="true" />
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-12 text-center">
							<div class="">
								<div class="input-group has-validation mx-auto">
									<div class="form-floating">
										<inputText type="text" inputId="floatingInputGroup1" v-model="pqrs.email" placeholder="id" label="Correo Electrónico" :editable="true" />
									</div>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6">
								<div class="container">
									<div class="mb-3">
										<containerText inputId="textArea" label="Mensaje" :rows="3" :maxlength="180" :text-value="pqrs.mensaje" />
									</div>
								</div>
							</div>

							<div class="col-md-6">
								<div class="mb-3">
									<div class="container">
										<containerText inputId="textArea" label="Observaciones" :rows="3" :maxlength="180" :text-value="pqrs.observaciones" @update:textValue="pqrs.observaciones = $event" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
				<div class="text-center">
					<button type="submit" class="btn btn-danger mx-2" @click="volver">Atras</button>
					<button type="submit" class="btn btn-primary mx-2" @click="prepareData">Actualizar</button>
				</div>
			</div>
		</div>
	</div>
</template>


<script setup>
import inputText from '../../../components/inputText.vue';
import selectS from '../../../components/select-s.vue';
import containerText from '../../../components/containerText.vue';
import { ref, onMounted } from 'vue';
import { cargarDatosPqr, actualizarPqr } from '../../../fetch.query';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const pqrs = ref({
	tipo_doc: "",
	id_pqrs: "",
	fecha_registro: "",
	email: "",
	tel: "",
	mensaje: "",
	estado: "",
	area_enc: ""
})

const areaOptions = ref([
	{ value: 'Administración', label: 'Administración' },
	{ value: 'Administraciones', label: 'Administraciones' },
	{ value: 'Arrendamientos', label: 'Arrendamientos' },
	{ value: 'Cartera', label: 'Cartera' },
	{ value: 'Contabilidad', label: 'Contabilidad' },
	{ value: 'Gestión Humana', label: 'Gestión Humana' },
	{ value: 'Jurídico', label: 'Jurídico' },
	{ value: 'Mantenimientos', label: 'Mantenimientos' },
	{ value: 'Recibimientos', label: 'Recibimientos' },
	{ value: 'Servicios Públicos', label: 'Servicios Públicos' },
	{ value: 'Tesorería', label: 'Tesorería' },
	{ value: 'Ventas', label: 'Ventas' },

])

const docOptions = ref([
	{ value: 'CC', label: 'Cédula de Ciudadanía - CC' },
	{ value: 'CE', label: 'Cédula de Extranjería - CE' },
	{ value: 'PA', label: 'Pasaporte - PA' },
	{ value: 'NIT', label: 'Número de Identificación Tributaria - NIT' },
])

const estadOptions = ref([
	{ value: 'SIN GESTIONAR', label: 'SIN GESTIONAR' },
	{ value: 'EN ESTUDIO', label: 'EN ESTUDIO' },
	{ value: 'GESTIONADO', label: 'GESTIONADO' },
])

const created = async () => {
	const id = route.params.id
	pqrs.value = await cargarDatosPqr(id);
}

const volver = () => {
	router.push('/Listar')
}

const prepareData = () => {
	pqrs.value.observaciones = pqrs.value.observaciones.toUpperCase();
	let datosEnviar = {
		id_pqrs: pqrs.value.id_pqrs,
		nombres_apellidos: pqrs.value.nombres_apellidos,
		tipo_doc: pqrs.value.tipo_doc,
		identificacion: pqrs.value.identificacion,
		email: pqrs.value.email,
		tel: pqrs.value.tel,
		observaciones: pqrs.value.observaciones,
		area_enc: pqrs.value.area_enc,
		estado: pqrs.value.estado,
		mensaje: pqrs.value.mensaje
	}
	actualizarPqr(datosEnviar)
	router.push('/Listar')
}

onMounted(()=>{
	created()
})

</script>


