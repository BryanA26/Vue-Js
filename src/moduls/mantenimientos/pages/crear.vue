<template>
	<div class="container-sm">

		<div class="card">
			<div class="card-header text-center">
				Formulario Mantenimientos y Reparaciones
			</div>
			<div class="card-body my-2">
				<form v-on:submit.prevent="crearMantenimiento">
					<div v-if="loading" class="loading-text">Cargando datos...</div>


					<selectS inputId="'floatingSelect'" :selected-value="mantenimiento.headquarter" :label="'Reportar a *'" :options="reportOptions" @update:select-value="mantenimiento.headquarter = $event" :editable="!loading" /><br>
					<selectS inputId="'floatingSelect'" :selected-value="mantenimiento.document_type" :label="'Tipo de Identificación *'" :options="docOptions" @update:select-value="mantenimiento.document_type = $event" :editable="true" />

					<div class="my-3">
						<InputText type="text" inputId="floatingInputGroup1" v-model="mantenimiento.document" placeholder="Documento" label="Número de Identificación" errormessage="Este campo es obligatorio*" @input="filterNonNumeric" :max="10" />
					</div>

					<div class="my-3">
						<InputText type="text" inputId="floatingInputGroup1" v-model="mantenimiento.fullname" placeholder="nombre" label="Nombres y Apellidos" errormessage="Este campo es obligatorio*" :max="50" />
					</div>
					<div class="form-group">
						<CountrySelector class="input-field2" type="text" inputId="floatingInputGroup2" v-model="mantenimiento.cellphoneExt" placeholder="extencion" label="Pais o Indicativo" errormessage="Este campo es obligatorio*" :max="10" :autocomplete="true"/>
						<InputText class="input-field" type="text" inputId="floatingInputGroup2" v-model="mantenimiento.cellphone" placeholder="telefono" label="Número de Contacto" errormessage="Este campo es obligatorio*" @input="filterNonNumeric" :max="10" />
					</div>
					<div class="my-3">
						<InputText type="email" inputId="floatingInputGroup1" v-model="mantenimiento.email" placeholder="email" label="Correo electrónico" errormessage="Este campo es obligatorio*" :max="50" />
					</div>
					<div class="my-3">
						<InputText type="text" inputId="floatingInputGroup1" v-model="mantenimiento.address_maintenance" placeholder="direccion" label="Dirección" errormessage="Este campo es obligatorio*" :max="50" />
					</div>

					<div class="my-3">
						<selectS inputId="'floatingSelect'" :selected-value="mantenimiento.category" :label="'Categoría *'" :options="categoriaOptions" @update:select-value="mantenimiento.category = $event" :editable="!loading" />
					</div>

					<div class="container">
						<ContainerText :textValue="mantenimiento.description" inputId="textArea" label="Descripción" :rows="3" :maxlength="180" @update:textValue="mantenimiento.description = $event" />
					</div>
					<div class="my-3">
						<label style="color:rgba(33, 37, 41, 0.75)">Cargar Imagen*</label>
						<FileInput @on-change-file="(eventFiles) => (files = eventFiles)" />
					</div>

					<div class="mb-3">
						<label for="gdprCheck" class="form-label" style="color:rgba(33, 37, 41, 0.75)">Reglamento General de Protección de Datos *</label>
						<div class="form-check">
							<input class="form-check-input" type="checkbox" value="" id="defaultCheck1" required>
							<label class="form-check-label" for="defaultCheck1">
								Acepto el consentimiento para tratamiento de datos personales. Acepto el manual de políticas
								y procedimientos.
							</label>
						</div>
					</div>
					<button type="submit" class="btn btn-primary" :disabled="enviando">ENVIAR</button>

				</form>
			</div>

		</div>
	</div>
</template>


<script setup>
import ContainerText from '../../../components/containerText.vue';
import InputText from '../../../components/inputText.vue';
import selectS from '../../../components/select-s.vue';
import FileInput from '../../../components/inputFile.vue';
import CountrySelector from '../../../components/contryDatalis.vue';
import maintenance_apiHandler, { actions, customer_base_endpoint, category_base_endpoint, headquarter_base_endpoint, maintenance_base_endpoint } from '../APIHandler.mantenimientos';
import { useRouter } from 'vue-router';
import { ref, resolveDirective } from 'vue';
import { onMounted } from 'vue';
import { generateHTMLContent } from '../utilidades/arcPDF.js'
import { formatDate } from '../../utilidades/formarDate'
import styles from '../utilidades/cssPlantilla.css';


const router = useRouter()
const enviando = ref(false)
const loading = ref(false)
const files = ref([])

const mantenimiento = ref({
	headquarter: "",
	document_type: "",
	document: "",
	fullname: "",
	cellphone: "",
	cellphoneExt: "",
	email: "",
	address_maintenance: "",
	category: "",
	description: "",
	url_img: "",
	id_customer: "",
})
const filterNonNumeric = (event) => {
	const input = event.target;
	input.value = input.value.replace(/\D/g, '');
};

const docOptions = ref([
	{ value: 'CC', label: 'CC' },
	{ value: 'CE', label: 'CE' },
	{ value: 'NIT', label: 'NIT' },
	{ value: 'PAS', label: 'PAS' },
])

const categoriaOptions = ref([]);
const reportOptions = ref([]);

const fetchDataFromAPI = async (url, optionsRef) => {
	try {
		loading.value = true;
		const responseData = await maintenance_apiHandler.getRequest(url);

		if (!responseData || responseData.length === 0) {
			throw new Error('No se encontraron datos');
		}

		const formattedData = responseData.map((item) => ({
			value: item.id,
			label: item.headquarter || item.category,
		}));
		optionsRef.value = formattedData;
	} catch (error) {
		console.error('Hubo un error al obtener los datos:', error);
		throw error;
	} finally {
		loading.value = false;
	}
};

onMounted(async () => {
	try {
		await Promise.all([
			fetchDataFromAPI(headquarter_base_endpoint + actions.getAll, reportOptions),
			fetchDataFromAPI(category_base_endpoint + actions.getAll, categoriaOptions)
		]);
	} catch (error) {
		console.error('Error al cargar datos iniciales:', error);
		console.error('No se encontraron datos iniciales. Por favor, inténtalo de nuevo más tarde.');
	}
});


const buscarClienteExistente = async (document, email) => {
	try {
		const endpoint = `${customer_base_endpoint}/${actions.getBy}/?document=${document}`;
		const clienteExistente = await maintenance_apiHandler.getRequest(endpoint);

		return clienteExistente;
	} catch (error) {
		console.error('Error al buscar el cliente existente:', error);
		throw new Error('Hubo un problema al buscar el cliente existente');
	}
};

const crearcustomer = async () => {
	try {
		// Validar si el cliente ya existe
		const clienteExistente = await buscarClienteExistente(mantenimiento.value.document);
		const cellphone = `${mantenimiento.value.cellphoneExt} ${mantenimiento.value.cellphone}`; // Elimina el símbolo '+'
		if (clienteExistente) {
			// El cliente ya existe, retornar su ID
			return clienteExistente.id;
		} else {
			// El cliente no existe, crearlo
			const datoscustomer = {
				document: mantenimiento.value.document,
				fullname: mantenimiento.value.fullname.toUpperCase(),
				document_type: mantenimiento.value.document_type,
				email: mantenimiento.value.email,
				cellphone: cellphone,
			};


			const customerCreado = await maintenance_apiHandler.fetchPost(datoscustomer, customer_base_endpoint + "/" + actions.create);
			return customerCreado.id;
		}
	} catch (error) {
		console.error('Error al crear o buscar el cliente:', error);
		alert('Hubo un problema al crear o buscar el cliente. Por favor, inténtalo de nuevo más tarde.');
		throw error;
	}
};
const enviarCorreoDesdeCreated = async (idMantenimiento) => {
	try {
		// Obtener datos específicos del mantenimiento
		const res = await maintenance_apiHandler.cargarDatos(idMantenimiento, maintenance_base_endpoint + actions.getBy);

		if (!res) {
			console.error('No se obtuvieron datos de la API.');
			return;
		}

		if (res.register_date) {
			// Si hay una fecha en los datos, formatearla y asignarla
			res.register_date = formatDate(res.register_date);
		} else {
			console.warn('Los datos obtenidos de la API no contienen la fecha esperada.');
		}

		// Asignar los datos actualizados a tu variable de mantenimiento.value
		mantenimiento.value = { ...mantenimiento.value, ...res };

		// Verificar si los datos necesarios están presentes
		if (mantenimiento.value && mantenimiento.value.email) {
			// Obtener el contenido HTML generado
			const htmlContent = generateHTMLContent(mantenimiento.value);


			// Combinar HTML y CSS
			const bodyEmail = `
        <html>
          <head>
            <style>
              ${styles}
            </style>
          </head>
          <body>
            ${htmlContent}
          </body>
        </html>
      `;

			// Enviar el correo con la cadena combinada como cuerpo
			const datosAEnviar = {
				email: mantenimiento.value.email,
				subjectEmail: "PORTADA INMOBILIARIA",
				bodyEmail: bodyEmail,
			};

			const endpointEmail = `${customer_base_endpoint}${actions.sendEmail}`;
			const response = await maintenance_apiHandler.enviarDatosEspecificos(datosAEnviar, endpointEmail);

			// Puedes agregar un console.log para verificar la respuesta
		} else {
			console.error('Datos necesarios para el correo electrónico no disponibles.');
		}
	} catch (error) {
		console.error('Error al obtener o procesar los datos o al enviar el correo electrónico:', error);
	}
};

const crearMantenimiento = async () => {
	try {
		if (!enviando.value) {
			enviando.value = true;

			const customerId = await crearcustomer();
            // Generar el radicado
            const radicado = await maintenance_apiHandler.generateRecord(mantenimiento.value.document); // Ajusta el parámetro según corresponda

			const datosEnviar = {
				address_maintenance: mantenimiento.value.address_maintenance,
				description: mantenimiento.value.description.toUpperCase(),
				id_headquarter: mantenimiento.value.headquarter,
				id_category: mantenimiento.value.category,
				id_customer: { id: customerId },
				id_status: { id: 3 },
				finalized: false,
                record: radicado
            };

			const mantenimientoCreado = await maintenance_apiHandler.fetchPost(datosEnviar, maintenance_base_endpoint + "/" + actions.create);

			if (!mantenimientoCreado || mantenimientoCreado.id === undefined) {
				throw new Error('El nuevo mantenimiento no fue creado correctamente o no tiene un ID válido.');
			}

			const idMantenimiento = mantenimientoCreado.id;

			// Esperar a que se complete la carga de la imagen
			await handleFileChange(idMantenimiento);

			// Llama a la función enviarCorreo después de la carga de la imagen
			await enviarCorreoDesdeCreated(idMantenimiento);

			// Redirige después de completar todas las operaciones asincrónicas
			router.push({ name: 'ExportarMantenimiento', params: { id: idMantenimiento } });
		}
	} catch (error) {
		console.error('Error al crear el mantenimiento:', error);
		alert('Hubo un problema al crear el mantenimiento. Por favor, inténtalo de nuevo más tarde.');
		throw error;
	} finally {
		enviando.value = false;
	}
};


const handleFileChange = async (idMantenimiento) => {
	try {
		if (files) {

			const formData = new FormData();
			const fotos = []
			for (const archivo of files.value) {

				formData.append('archivo', archivo);
			}
			const uploadUrl = `${maintenance_base_endpoint}uploadMultipleImage/archivo/${idMantenimiento}`;
			const uploadResponse = await maintenance_apiHandler.uploadMultiple(uploadUrl, formData);
			if (uploadResponse) {
				// Actualizar el campo url_img con la URL del archivo subido
				mantenimiento.value.url_img = uploadResponse; // Actualiza según la estructura de tu objeto
				const updateUrl = `${maintenance_base_endpoint}${actions.update}/${idMantenimiento}`;
				// Actualizar en el servidor
				const updateResponse = await maintenance_apiHandler.fetchPut(updateUrl, { url_img: uploadResponse });

				if (updateResponse) {
				} else {
					console.error('Error al actualizar el campo url_img en el servidor');
				}
			} else {
				console.error('Error al subir el archivo');
			}
		}
	} catch (error) {
		console.error('Error en la subida del archivo:', error);
	}
};

</script>
<style>
.form-group {
	display: flex;
}

.input-field {
	margin-right: 10px;
	flex: 1;
}

.input-field2 {
	width: 150px;
	margin-right: 10px;
}
</style>