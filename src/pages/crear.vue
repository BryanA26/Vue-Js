<template>
	<div class="container-sm">

		<div class="card">
			<div class="card-header text-center">

				Formulario Peticiones Quejas y Reclamos
			</div>
			<div class="card-body my-2">
				<form v-on:submit.prevent="crearPqr">

					<selectS inputId="'floatingSelect'" :selected-value="pqrs.tipo_doc" :label="'Tipo de Identificación *'" :options="docOptions" @update:select-value="pqrs.tipo_doc = $event" :editable="true" />

					<div class="my-3">
						<InputText type="text" inputId="floatingInputGroup1" v-model="pqrs.identificacion" placeholder="Documento" label="Número de Identificación" errormessage="Este campo es obligatorio*" />
					</div>

					<div class="my-3">
						<InputText type="text" inputId="floatingInputGroup1" v-model="pqrs.nombres_apellidos" placeholder="nombre" label="Nombres y Apellidos" errormessage="Este campo es obligatorio*" />
					</div>

					<div class="my-3">
						<InputText type="text" inputId="floatingInputGroup1" v-model="pqrs.email" placeholder="email" label="Correo electrónico" errormessage="Este campo es obligatorio*" />
					</div>
					<div class="my-3">
						<InputText type="text" inputId="floatingInputGroup1" v-model="pqrs.tel" placeholder="tel" label="Número de Contacto" errormessage="Este campo es obligatorio*" />
					</div>
					<div class="my-3">
						<selectS inputId="'floatingSelect'" :selected-value="pqrs.area_enc" :label="'Área encargada *'" :options="areaOptions" @update:select-value="pqrs.area_enc = $event" :editable="true" />
					</div>

					<div class="container">
						<ContainerText :textValue="pqrs.mensaje" inputId="textArea" label="Mensaje" :rows="3" :maxlength="180" @update:textValue="pqrs.mensaje = $event" />
					</div>

					<div class="mb-3">
						<label for="gdprCheck" class="form-label">GDPR</label>
						<div class="form-check">
							<input class="form-check-input" type="checkbox" value="" v-model="pqrs.gdpr" id="defaultCheck1" required>
							<label class="form-check-label" for="defaultCheck1">
								Acepto el consentimiento para tratamiento de datos personales. Acepto el manual de políticas
								y procedimientos.
							</label>
						</div>
					</div>

					<button type="submit" class="btn btn-primary" :disabled="enviando">ENVIAR PQR</button>

				</form>
			</div>

		</div>
	</div>
</template>


<script setup>
import ContainerText from '../components/containerText.vue';
import InputText from '../components/inputText.vue';
import selectS from '../components/select-s.vue';
import { fetchPost } from '../fetch.query';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter()
const enviando = ref(false)

const pqrs = ref({
	tipo_doc: "",
	identificacion: "",
	nombres_apellidos: "",
	email: "",
	tel: "",
	area_enc: "",
	mensaje: "",
	gdpr: false
})

const docOptions = ref([
	{ value: 'CC', label: 'Cédula de Ciudadanía - CC' },
	{ value: 'CE', label: 'Cédula de Extranjería - CE' },
	{ value: 'PA', label: 'Pasaporte - PA' },
	{ value: 'NIT', label: 'Número de Identificación Tributaria - NIT' },
])

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


const crearPqr = async () => {

	if (enviando.value) {
		return;
	}

	enviando.value = true;
	pqrs.value.nombres_apellidos = pqrs.value.nombres_apellidos.toUpperCase();
	pqrs.value.mensaje = pqrs.value.mensaje.toUpperCase();

	let datosEnviar = {
		tipo_doc: pqrs.value.tipo_doc,
		identificacion: pqrs.value.identificacion,
		nombres_apellidos: pqrs.value.nombres_apellidos,
		email: pqrs.value.email,
		tel: pqrs.value.tel,
		mensaje: pqrs.value.mensaje,
		area_enc: pqrs.value.area_enc,
		gdpr: pqrs.value.gdpr,
		estado: "SIN GESTIONAR",
	}
	try {
		await fetchPost(datosEnviar)
			.then((res) => {
				router.push({ name: 'Exportar', params: { id: res.new_id } })
			})
	} catch (error) {
		console.log("Error creating PQR:", error)
	 }
}


</script>


