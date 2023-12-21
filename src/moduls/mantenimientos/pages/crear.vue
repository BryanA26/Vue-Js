<template>
	<div class="container-sm">

		<div class="card">
			<div class="card-header text-center">
				Formulario Mantenimientos y Reparaciones
			</div>
			<div class="card-body my-2">
				<form v-on:submit.prevent="crearMantenimiento">

					<selectS inputId="'floatingSelect'" :selected-value="mantenimiento.reportar" :label="'Reportar a *'" :options="reportOptions" @update:select-value="mantenimiento.reportar = $event" :editable="true" /><br>
					<selectS inputId="'floatingSelect'" :selected-value="mantenimiento.tipo_doc" :label="'Tipo de Identificación *'" :options="docOptions" @update:select-value="mantenimiento.tipo_doc = $event" :editable="true" />

					<div class="my-3">
						<InputText type="text" inputId="floatingInputGroup1" v-model="mantenimiento.identificacion" placeholder="Documento" label="Número de Identificación" errormessage="Este campo es obligatorio*" />
					</div>

					<div class="my-3">
						<InputText type="text" inputId="floatingInputGroup1" v-model="mantenimiento.nombres_apellidos" placeholder="nombre" label="Nombres y Apellidos" errormessage="Este campo es obligatorio*" />
					</div>
					<div class="my-3">
						<InputText type="text" inputId="floatingInputGroup1" v-model="mantenimiento.tel" placeholder="tel" label="Número de Contacto" errormessage="Este campo es obligatorio*" />
					</div>
					<div class="my-3">
						<InputText type="email" inputId="floatingInputGroup1" v-model="mantenimiento.email" placeholder="email" label="Correo electrónico" errormessage="Este campo es obligatorio*" />
					</div>
					<div class="my-3">
						<InputText type="text" inputId="floatingInputGroup1" v-model="mantenimiento.address" placeholder="direccion" label="Dirección" errormessage="Este campo es obligatorio*" />
					</div>

					<div class="my-3">
						<selectS inputId="'floatingSelect'" :selected-value="mantenimiento.area_enc" :label="'Categoria *'" :options="categoriaOptions" @update:select-value="mantenimiento.area_enc = $event" :editable="true" />
					</div>

					<div class="container">
						<ContainerText :textValue="mantenimiento.mensaje" inputId="textArea" label="Descripción" :rows="3" :maxlength="180" @update:textValue="mantenimiento.mensaje = $event" />
					</div>
					<div class="my-3">
						<InputText type="file" id="archivo" name="archivo" accept="image/*" @change="onFileChange" />
					</div>

					<button type="submit" :textValue="mantenimiento.imag" class="btn btn-primary" :disabled="enviando">ENVIAR</button>

				</form>
			</div>

		</div>
	</div>
</template>


<script setup>
import ContainerText from '../../../components/containerText.vue';
import InputText from '../../../components/inputText.vue';
import selectS from '../../../components/select-s.vue';
// import { fetchPost } from '../fetch.query';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter()
const enviando = ref(false)
const onFileChange = (event) => {
  const selectedFile = event.target.files[0];
  // Aquí puedes realizar operaciones con el archivo seleccionado
};
const mantenimiento = ref({
	reportar: "",
	tipo_doc: "",
	identificacion: "",
	nombres_apellidos: "",
	email: "",
	address: "",
	tel: "",
	area_enc: "",
	mensaje: "",
	imag: "",
	gdpr: false
})
const reportOptions = ref([
	{ value: 'Laureles', label: 'Laureles' },
	{ value: 'Colores', label: 'Colores' },
	{ value: 'Poblado', label: 'Poblado' },
	{ value: 'Envigado', label: 'Envigado' },
	{ value: 'Sabaneta', label: 'Sabaneta' },
	{ value: 'Estrella', label: 'Estrella' },
	{ value: 'Bello', label: 'Bello' },
	{ value: 'Rionegro', label: 'Rionegro' },
	{ value: 'Fontibon-Bogota', label: 'Fontibon-Bogota' },
	{ value: 'Mosquera-Cundinamarca', label: 'Mosquera-Cundinamarca' },
])
const docOptions = ref([
	{ value: 'CC', label: 'CC' },
	{ value: 'CE', label: 'CE' },
	{ value: 'NIT', label: 'NIT' },
	{ value: 'PAS', label: 'PAS' },
])

const categoriaOptions = ref([
	{ value: 'Acabados', label: 'Acabados' },
	{ value: 'Carpinteria', label: 'Carpinteria' },
	{ value: 'Cerrajería', label: 'Cerrajería' },
	{ value: 'Control de Plagas', label: 'Control de Plagas' },
	{ value: 'Electricidad', label: 'Electricidad' },
	{ value: 'Impermeabilización', label: 'Impermeabilización' },
	{ value: 'Gasodomésticos', label: 'Gasodomésticos' },
	{ value: 'Pisos', label: 'Pisos' },
	{ value: 'Plomeria', label: 'Plomeria' },
	{ value: 'Vidrieras y Ventanas', label: 'Vidrieras y Ventanas' },
	{ value: 'Varios Servicios', label: 'Varios Servicios' },
])


const crearMantenimiento = async () => {

	if (enviando.value) {
		return;
	}

	enviando.value = true;
	mantenimiento.value.nombres_apellidos = mantenimiento.value.nombres_apellidos.toUpperCase();
	mantenimiento.value.mensaje = mantenimiento.value.mensaje.toUpperCase();

	let datosEnviar = {
		reportar: mantenimiento.value.reportar,
		tipo_doc: mantenimiento.value.tipo_doc,
		identificacion: mantenimiento.value.identificacion,
		nombres_apellidos: mantenimiento.value.nombres_apellidos,
		email: mantenimiento.value.email,
		tel: mantenimiento.value.tel,
		mensaje: mantenimiento.value.mensaje,
		area_enc: mantenimiento.value.area_enc,
		gdpr: mantenimiento.value.gdpr,
/* 		estado: "SIN GESTIONAR",
 */	}

	router.push({ path: 'exportPDF/:id'})

}


</script>


