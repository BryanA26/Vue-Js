<template>
	<div class="container-sm">

		<div class="card">
			<div class="card-header text-center">
				Formulario Servicios Públicos
			</div>
			<div class="card-body my-2">
				<form v-on:submit.prevent="crearPublicServices">
					<div v-if="loading" class="loading-text">Cargando datos...</div>
					<selectS inputId="'floatingSelect'" :selected-value="public_services.document_type" :label="'Tipo de Identificación *'" :options="docOptions" @update:select-value="public_services.document_type = $event" :editable="true" />

					<div class="my-3">
						<InputText type="text" inputId="floatingInputGroup1" v-model="public_services.document" placeholder="Documento" label="Número de Identificación*" errormessage="Este campo es obligatorio*" @input="filterNonNumeric" :max="10" />
					</div>

					<div class="my-3">
						<InputText type="text" inputId="floatingInputGroup1" v-model="public_services.fullname" placeholder="nombre" label="Nombres y Apellidos*" errormessage="Este campo es obligatorio*" :max="50" />
					</div>
					<div class="my-3">
						<InputText type="email" inputId="floatingInputGroup1" v-model="public_services.email" placeholder="email" label="Correo electrónico*" errormessage="Este campo es obligatorio*" :max="50" />
					</div>
					<div class="my-3">
						<InputText type="text" inputId="floatingInputGroup1" v-model="public_services.celphone" placeholder="telefono" label="Número de Contacto*" errormessage="Este campo es obligatorio*" @input="filterNonNumeric" :max="10" />
					</div>
					<div class="container">
						<ContainerText :textValue="public_services.description" inputId="textArea" label="Mensaje*" :rows="3" :maxlength="180" @update:textValue="public_services.description = $event" />
					</div>
					<div class="mb-3">
						<label for="gdprCheck" class="form-label" style="color:rgba(33, 37, 41, 0.75)">Reglamento General de Protección de Datos *</label>
						<div class="form-check">
							<input class="form-check-input" type="checkbox" value="" v-model="public_services.gdpr" id="defaultCheck1" required>
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
import public_services_apiHandler, { actions, customer_base_endpoint, public_services_base_endpoint } from '../APIHandler.public_services';
import { useRouter } from 'vue-router';
import { ref, resolveDirective } from 'vue';
import { generateHTMLContent } from '../utilidades/arcPDF.JS'


const router = useRouter()
const enviando = ref(false)
const loading = ref(false)

const public_services = ref({
	document_type: "",
	document: "",
	fullname: "",
	celphone: "",
	email: "",
	description: "",
	id_customer: "",
})
const filterNonNumeric = (event) => {
	const input = event.target;
	input.value = input.value.replace(/\D/g, '');
};

const docOptions = ref([
	{ value: 'CC', label: 'Cédula de Ciudadanía-CC' },
	{ value: 'CE', label: 'Cédula de Extranjería-CE' },
	{ value: 'PAS', label: 'Pasaporte-PA' },
])


const buscarClienteExistente = async (document, email) => {
	try {
		const endpoint = `${customer_base_endpoint}/${actions.getBy}/?document=${document}`;
		const clienteExistente = await public_services_apiHandler.getRequest(endpoint);

		return clienteExistente;
	} catch (error) {
		console.error('Error al buscar el cliente existente:', error);
		throw new Error('Hubo un problema al buscar el cliente existente');
	}
};

const crearcustomer = async () => {
	try {
		// Validar si el cliente ya existe
		const clienteExistente = await buscarClienteExistente(public_services.value.document);

		if (clienteExistente) {
			// El cliente ya existe, retornar su ID
			return clienteExistente.id;
		} else {
			// El cliente no existe, crearlo
			const datoscustomer = {
				document: public_services.value.document,
				fullname: public_services.value.fullname.toUpperCase(),
				document_type: public_services.value.document_type,
				email: public_services.value.email,
				celphone: public_services.value.celphone,
			};


			const customerCreado = await public_services_apiHandler.fetchPost(datoscustomer, customer_base_endpoint + "/" + actions.create);
			return customerCreado.id;
		}
	} catch (error) {
		console.error('Error al crear o buscar el cliente:', error);
		alert('Hubo un problema al crear o buscar el cliente. Por favor, inténtalo de nuevo más tarde.');
		throw error;
	}
};
const enviarCorreoDesdeCreated = async (idpublic_services) => {
  try {
    // Obtener datos específicos del public_services
    const res = await public_services_apiHandler.cargarDatos(idpublic_services, public_services_base_endpoint + actions.getBy);

    if (!res || !res.register_date) {
      console.error('Los datos obtenidos de la API no contienen la fecha esperada.');
      return;
    }

    // Asignar los datos actualizados a tu variable de public_services.value
    public_services.value = { ...public_services.value, ...res };

    // Verificar si los datos necesarios están presentes
    if (public_services.value && public_services.value.email && public_services.value.register_date) {
      const datosAEnviar = {
        email: public_services.value.email,
        subjectEmail: "PORTADA INMOBILIARIA",
        bodyEmail: generateHTMLContent(public_services.value),
      };

      const endpointEmail = `${customer_base_endpoint}${actions.sendEmail}`;
      const response = await public_services_apiHandler.enviarDatosEspecificos(datosAEnviar, endpointEmail);

      // Puedes agregar un console.log para verificar la respuesta
    } else {
      console.error('Datos necesarios para el correo electrónico no disponibles.');
    }
  } catch (error) {
    console.error('Error al obtener o procesar los datos o al enviar el correo electrónico:', error);
  }
};

const crearPublicServices = async () => {
    try {
        if (!enviando.value) {
            enviando.value = true;

            const customerId = await crearcustomer();

            const datosEnviar = {
                address_public_services: public_services.value.address_public_services,
                description: public_services.value.description.toUpperCase(),
                id_customer: { id: customerId },
                id_status: { id: 3 },
            };

            const public_servicesCreado = await public_services_apiHandler.fetchPost(datosEnviar, public_services_base_endpoint + "/" + actions.create);

            if (!public_servicesCreado || public_servicesCreado.id === undefined) {
                throw new Error('El nuevo public_services no fue creado correctamente o no tiene un ID válido.');
            }

            const idpublic_services = public_servicesCreado.id;

            // Llama a la función enviarCorreo después de la carga de la imagen
            await enviarCorreoDesdeCreated(idpublic_services);

            // Redirige después de completar todas las operaciones asincrónicas
            router.push({ name: 'ExportarPublicServices', params: { id: idpublic_services } });
        }
    } catch (error) {
        console.error('Error al crear el public_services:', error);
        alert('Hubo un problema al crear el public_services. Por favor, inténtalo de nuevo más tarde.');
        throw error;
    } finally {
        enviando.value = false;
    }
};


</script>