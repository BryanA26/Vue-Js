<template>
	<div class="container-sm">

		<div class="card">
			<div class="card-header text-center">
				Formulario Mantenimientos y Reparaciones
			</div>
			<div class="card-body my-2">
				<form v-on:submit.prevent="crearMantenimiento">

					<selectS inputId="'floatingSelect'" :selected-value="mantenimiento.headquarter" :label="'Reportar a *'" :options="reportOptions" @update:select-value="mantenimiento.headquarter = $event" :editable="true" /><br>
					<selectS inputId="'floatingSelect'" :selected-value="mantenimiento.document_type" :label="'Tipo de Identificación *'" :options="docOptions" @update:select-value="mantenimiento.document_type = $event" :editable="true" />

					<div class="my-3">
						<InputText type="text" inputId="floatingInputGroup1" v-model="mantenimiento.document" placeholder="Documento" label="Número de Identificación" errormessage="Este campo es obligatorio*" @input="filterNonNumeric" :max="10" />
					</div>

					<div class="my-3">
						<InputText type="text" inputId="floatingInputGroup1" v-model="mantenimiento.fullname" placeholder="nombre" label="Nombres y Apellidos" errormessage="Este campo es obligatorio*" :max="50" />
					</div>
					<div class="my-3">
						<InputText type="text" inputId="floatingInputGroup1" v-model="mantenimiento.phone" placeholder="telefono" label="Número de Contacto" errormessage="Este campo es obligatorio*" @input="filterNonNumeric" :max="10" />
					</div>
					<div class="my-3">
						<InputText type="email" inputId="floatingInputGroup1" v-model="mantenimiento.email" placeholder="email" label="Correo electrónico" errormessage="Este campo es obligatorio*" :max="50" />
					</div>
					<div class="my-3">
						<InputText type="text" inputId="floatingInputGroup1" v-model="mantenimiento.address_maintenance" placeholder="direccion" label="Dirección" errormessage="Este campo es obligatorio*" :max="50" />
					</div>

					<div class="my-3">
						<selectS inputId="'floatingSelect'" :selected-value="mantenimiento.category" :label="'Categoria *'" :options="categoriaOptions" @update:select-value="mantenimiento.category = $event" :editable="true" />
					</div>

					<div class="container">
						<ContainerText :textValue="mantenimiento.description" inputId="textArea" label="Descripción" :rows="3" :maxlength="180" @update:textValue="mantenimiento.description = $event" />
					</div>
					<div class="my-3">
						<label style="color:rgba(33, 37, 41, 0.75)">Cargar Imagen*</label>
						<FileInput :buttonText="'Subir Imagen'" :textValue="mantenimiento.url_img" id="archivo" name="archivo" :inputId="'fileInput'" :acceptedFileTypes="'image/jpeg, image/png, image/gif'" />
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
import apiHandler from '../APIHandler.mantenimientos';
import { CATEGORY_URL, HEADQUARTER_URL, UPLOAD_URL, GETBY_URL2, UPDATE_URL } from '../APIHandler.mantenimientos';
import { useRouter } from 'vue-router';
import { ref, resolveDirective } from 'vue';
import { onMounted } from 'vue';

const router = useRouter()
const enviando = ref(false)

const mantenimiento = ref({
	headquarter: "",
	document_type: "",
	document: "",
	fullname: "",
	phone: "",
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
		const responseData = await apiHandler.getRequest(url);
		const formattedData = responseData.map((item) => ({
			value: item.id,
			label: item.headquarter || item.category,
		}));
		optionsRef.value = formattedData;
	} catch (error) {
		console.error('Hubo un error al obtener los datos:', error);
	}
};

onMounted(async () => {
	await Promise.all([
		fetchDataFromAPI(HEADQUARTER_URL, reportOptions),
		fetchDataFromAPI(CATEGORY_URL, categoriaOptions)
	]);
});

const buscarClienteExistente = async (document, email) => {
	try {
		const endpoint = `${GETBY_URL2}/?document=${document}&email=${email}`;
		const clienteExistente = await apiHandler.getRequest(endpoint);

		return clienteExistente;
	} catch (error) {
		console.error('Error al buscar el cliente existente:', error);
		throw new Error('Hubo un problema al buscar el cliente existente');
	}
};

const crearcustomer = async () => {
	try {
		// Validar si el cliente ya existe
		const clienteExistente = await buscarClienteExistente(mantenimiento.value.document, mantenimiento.value.email);

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
				phone: mantenimiento.value.phone,
			};


			const customerCreado = await apiHandler.fetchPost(datoscustomer, apiHandler.azureWebAppApiEndpointCreateCustomer);
			return customerCreado.id;
		}
	} catch (error) {
		console.error('Error al crear o buscar el cliente:', error);
		throw new Error('Hubo un problema al crear o buscar el cliente');
	}
};
const crearMantenimiento = async () => {
	try {
		if (!enviando.value) { // Evitar múltiples envíos si ya se está enviando
			enviando.value = true; // Cambiar el estado a "enviando"

			const customerId = await crearcustomer();

			const datosEnviar = {
				address_maintenance: mantenimiento.value.address_maintenance,
				description: mantenimiento.value.description.toUpperCase(),
				id_headquarter: mantenimiento.value.headquarter,
				id_category: mantenimiento.value.category,
				id_customer: { id: customerId },
				id_status: { id: 3 },
			};

			const mantenimientoCreado = await apiHandler.fetchPost(datosEnviar);

			if (!mantenimientoCreado || mantenimientoCreado.id === undefined) {
				throw new Error('El nuevo mantenimiento no fue creado correctamente o no tiene un ID válido.');
			}
			const idMantenimiento = mantenimientoCreado.id; // Define idMantenimiento aquí

			// Redirigir si el mantenimiento se creó exitosamente
			if (mantenimientoCreado && mantenimientoCreado.id !== undefined) {
				mantenimiento.value.url_img = `URL de la imagen del mantenimiento ${mantenimientoCreado.id}`;
				router.push({ name: 'ExportarMantenimiento', params: { id: mantenimientoCreado.id } });
				await handleFileChange(idMantenimiento);
			} else {
				throw new Error('El nuevo mantenimiento no fue creado correctamente o no tiene un ID válido.');
			}
		}
	} catch (error) {
		console.error('Error al realizar el proceso:', error);
		// Manejar errores generales
	} finally {
		enviando.value = false; // Restablecer el estado del botón después de completar la operación
	}
};
const handleFileChange = async (idMantenimiento, apiToken) => {
  try {
    const selectedFile = document.getElementById('fileInput').files[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append('archivo', selectedFile);

      const uploadUrl = `${UPLOAD_URL}/archivo/${idMantenimiento}`;

      // Subir archivo
      const uploadResponse = await apiHandler.uploadFile(uploadUrl, formData, apiToken);

      if (uploadResponse) {

        // Actualizar el campo url_img con la URL del archivo subido
        mantenimiento.value.url_img = uploadResponse; // Actualiza según la estructura de tu objeto


        const updateUrl = `${UPDATE_URL}/${idMantenimiento}`;

        // Actualizar en el servidor
        const updateResponse = await apiHandler.fetchPut(updateUrl, { url_img: uploadResponse }, apiToken);

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