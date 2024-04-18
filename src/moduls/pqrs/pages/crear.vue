<template>
	<div class="container-sm">

		<div class="card">
			<div class="card-header text-center">

				Formulario Peticiones Quejas y Reclamos
			</div>
			<div class="card-body my-2">
				<form v-on:submit.prevent="crearPqr">

					<selectS inputId="'floatingSelect'" :selected-value="pqrs.document_type" :label="'Tipo de Identificación *'" :options="docOptions" @update:select-value="pqrs.document_type = $event" :editable="true" />

					<div class="my-3">
						<InputText type="text" inputId="floatingInputGroup1" v-model="pqrs.document" placeholder="Documento" label="Número de Identificación" errormessage="Este campo es obligatorio*" @input="filterNonNumeric" :max="10" fullname />
					</div>

					<div class="my-3">
						<InputText type="text" inputId="floatingInputGroup1" v-model="pqrs.fullname" :max="50" placeholder="nombre" label="Nombres y Apellidos" errormessage="Este campo es obligatorio*" />
					</div>

					<div class="my-3">
						<InputText type="email" inputId="floatingInputGroup1" v-model="pqrs.email" :max="50" placeholder="email" label="Correo electrónico" errormessage="Este campo es obligatorio*" />
					</div>
					<div class="my-3">
						<InputText type="text" inputId="floatingInputGroup1" v-model="pqrs.celphone" :max="10" placeholder="celphone" label="Número de Contacto" errormessage="Este campo es obligatorio*" @input="filterNonNumeric" />
					</div>
					<div class="my-3">
						<selectS inputId="'floatingSelect'" :selected-value="pqrs.id_area" :label="'Área encargada *'" :options="areaOptions" @update:select-value="pqrs.id_area = $event" :editable="true" />
					</div>

					<div class="container">
						<ContainerText :textValue="pqrs.description" inputId="textArea" label="Mensaje" :rows="3" :maxlength="180" @update:textValue="pqrs.description = $event" />
					</div>

					<div class="mb-3">
						<label for="gdprCheck" class="form-label" style="color:rgba(33, 37, 41, 0.75)">Reglamento General de Protección de Datos *</label>
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
import ContainerText from '../../../components/containerText.vue';
import InputText from '../../../components/inputText.vue';
import selectS from '../../../components/select-s.vue';
import { useRouter } from 'vue-router';
import { onMounted, ref} from 'vue';
import { formatDate } from '../../utilidades/formarDate';
import pqrs_apiHandler, { actions, customer_base_endpoint, pqrs_base_endpoint, area_base_endpoint } from '../APIHandler.pqrs'
import { generateHTMLContent } from '../utilidades/arcPDF.js'


const router = useRouter()
const enviando = ref(false)
const loading = ref(false)

const pqrs = ref({
	document_type: "",
	document: "",
	fullname: "",
	email: "",
	celphone: "",
	id_area: "",
	description: "",
})
const filterNonNumeric = (event) => {
	const input = event.target;
	input.value = input.value.replace(/\D/g, '');
};
const docOptions = ref([
	{ value: 'CC', label: 'Cédula de Ciudadanía - CC' },
	{ value: 'CE', label: 'Cédula de Extranjería - CE' },
	{ value: 'PA', label: 'Pasaporte - PA' },
	{ value: 'NIT', label: 'Número de Identificación Tributaria - NIT' },
])

const areaOptions = ref([])
const fetchDataFromAPI = async (url, optionsRef) => {
	try {
		loading.value = true;
		const responseData = await pqrs_apiHandler.getRequest(url);
		if (!responseData || responseData.length === 0) {
			throw new error('no se encontraron datos')
		}
		const fomarttedData = responseData.map((item) => ({
			value: item.id,
			label: item.name,
		}));
		optionsRef.value = fomarttedData;
	} catch (error) {
		console.error('Hubo un error al obtener los datos:', error);
	} finally {
		loading.value = false
	}
}

onMounted(async () => {
	try {
		await Promise.all([
			fetchDataFromAPI(area_base_endpoint + actions.getAll, areaOptions),
		]);
	} catch (error) {
		console.error('Error al cargar datos iniciales:', error);
	}
});
const buscarClienteExistente = async (document, email) => {
	try {
		const endpoint = `${customer_base_endpoint}/${actions.getBy}/?document=${document}&email=${email}`;
		const clienteExistente = await pqrs_apiHandler.getRequest(endpoint);

		return clienteExistente;
	} catch (error) {
		console.error('Error al buscar el cliente existente:', error);
		throw new Error('Hubo un problema al buscar el cliente existente');
	}
};

const crearcustomer = async () => {
	try {
		// Validar si el cliente ya existe
		const clienteExistente = await buscarClienteExistente(pqrs.value.document, pqrs.value.email);
		if (clienteExistente) {
			// El cliente ya existe, retornar su ID
			return clienteExistente.id;
		} else {
			// El cliente no existe, crearlo
			const datoscustomer = {
				document: pqrs.value.document,
				fullname: pqrs.value.fullname.toUpperCase(),
				document_type: pqrs.value.document_type,
				email: pqrs.value.email,
				celphone: pqrs.value.celphone,
			};


			const customerCreado = await pqrs_apiHandler.fetchPost(datoscustomer, customer_base_endpoint + "/" + actions.create);
			return customerCreado.id;
		}
	} catch (error) {
		console.error('Error al crear o buscar el cliente:', error);
		alert('Hubo un problema al crear o buscar el cliente. Por favor, inténtalo de nuevo más tarde.');
		throw error;
	}
};

const enviarCorreoDesdeCreated = async (idPqrs) => {
	try {
		const res = await pqrs_apiHandler.cargarDatos(idPqrs, pqrs_base_endpoint + actions.getBy);
		if (!res || !res.register_date) {
			console.error('Los datos obtenidos de la API no contienen la fecha esperada.');
			return;
		}
		res.register_date = formatDate(res.register_date);

		// Asignar los datos actualizados a tu variable de pqrs.value
		pqrs.value = { ...pqrs.value, ...res };

		// Enviar correo con los datos actualizados
		if (pqrs.value) {
			const datosAEnviar = {
				email: pqrs.value.email,
				subjectEmail: "PORTADA INMOBILIARIA",
				bodyEmail: generateHTMLContent(pqrs.value),
			};

			const endpointEmail = `${customer_base_endpoint}${actions.sendEmail}`;
			const response = await pqrs_apiHandler.enviarDatosEspecificos(datosAEnviar, endpointEmail);
		}
	} catch (error) {
		console.error('Error al obtener o procesar los datos o al enviar el correo electrónico:', error);
	}
};

const crearPqr = async () => {
	try {
		if (!enviando.value) {
			enviando.value = true;

			const customerId = await crearcustomer();

			pqrs.value.fullname = pqrs.value.fullname.toUpperCase();
			pqrs.value.description = pqrs.value.description.toUpperCase();

			const datosEnviar = {
				description: pqrs.value.description,
				id_customer: { id: customerId },
				id_area: pqrs.value.id_area,
				id_status: { id: 1 }
			}
			const pqrsCreado = await pqrs_apiHandler.fetchPost(datosEnviar, pqrs_base_endpoint + "/" + actions.create);

			if (!pqrsCreado || pqrsCreado.id === undefined) {
				throw new error('el nuevo pqrs no fue creacdo correctamente o no tiene un ID valido')
			}
			const idPqrs = pqrsCreado.id;
			router.push({ name: 'Exportar', params: { id: idPqrs } })
			await enviarCorreoDesdeCreated(idPqrs);

		}
	} catch (error) {
		console.error('error al crar el pqrs');
		alert('Hubo un problema al registrar la pqrs. Por favor, intentalo de nuevo mas tarde.');
		throw error;
	} finally {
		enviando.value = false
	}
}


</script>


