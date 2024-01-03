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
import { ref } from 'vue';
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
	await fetchDataFromAPI(HEADQUARTER_URL, reportOptions);
});

onMounted(async () => {
	await fetchDataFromAPI(CATEGORY_URL, categoriaOptions);
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


			const customerCreado = await apiHandler.fetchPost(datoscustomer, apiHandler.secondaryUrl);
			return customerCreado.id;
		}
	} catch (error) {
		console.error('Error al crear o buscar el cliente:', error);
		throw new Error('Hubo un problema al crear o buscar el cliente');
	}
};
const crearMantenimiento = async () => {
  try {
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

      // Actualizar el campo url_img en el registro del mantenimiento
      mantenimiento.value.url_img = `URL de la imagen del mantenimiento ${mantenimientoCreado.id}`;

      router.push({ name: 'ExportarMantenimiento', params: { id: mantenimientoCreado.id } });

      // Habilitar la subida de la imagen después de que el mantenimiento se haya creado
      await handleFileChange(idMantenimiento);
    } else {
      throw new Error('El nuevo mantenimiento no fue creado correctamente o no tiene un ID válido.');
    }
  } catch (error) {
    console.error('Error al realizar el proceso:', error);
    // Manejar errores generales
  }
};

const handleFileChange = async (idMantenimiento) => {
  try {
    const selectedFile = document.getElementById('fileInput').files[0]; // Obtener el archivo seleccionado

    if (selectedFile) {

      const formData = new FormData();
      formData.append('archivo', selectedFile);

      const response = await fetch(`${UPLOAD_URL}/archivo/${idMantenimiento}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': apiHandler.apiToken
        }
      });

      if (response.ok) {
        const url = await response.json();

        // Actualizar el campo url_img con la URL del archivo subido
        mantenimiento.value.url_img = url; // Actualiza según la estructura de tu objeto

        // Crear objeto con el campo url_img para actualizar en el servidor
        const datosActualizar = {
          url_img: url,
        };

        // Realizar la actualización del campo url_img en el servidor
        const options = {
          method: 'PUT',
          headers: {
            'Authorization': apiHandler.apiToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datosActualizar),
        };

        const updateResponse = await fetch(`${UPDATE_URL}/${idMantenimiento}`, options);

        if (updateResponse.ok) {
        } else {
          console.error('Error al actualizar el campo url_img en el servidor:', updateResponse.statusText);
        }
      } else {
        console.error('Error al subir el archivo:', response.statusText);
      }
    }
  } catch (error) {
    console.error('Error en la subida del archivo:', error);
  }
};

</script>