<template>
	<div class="container">

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

					<!-- <div class="container">
						<div class="mb-3">
							<label for="textArea" class="form-label">Mensaje</label>
							<textarea class="form-control" v-model="pqrs.mensaje" id="textArea" rows="3" maxlength="180"></textarea>
						</div>
					</div> -->
					<div class="container">
						<ContainerText inputId="textArea" label="Mensaje" :rows="3" :maxlength="180" v-model="pqrs.mensaje" />
					</div>
					
					<div class="mb-3">
						<label for="gdprCheck" class="form-label">GDPR</label>
						<div class="form-check">
							<input class="form-check-input" type="checkbox" value="" v-model="pqrs.gdpr" id="defaultCheck1">
							<label class="form-check-label" for="defaultCheck1">
								Acepto el consentimiento para tratamiento de datos personales. Acepto el manual de políticas
								y procedimientos.
							</label>
						</div>
					</div>

					<button type="submit" class="btn btn-primary">ENVIAR PQR</button>

				</form>
			</div>

		</div>
	</div>
</template>


<script>
import ContainerText from '../components/containerText.vue';
import InputText from '../components/inputText.vue';
import selectS from '../components/select-s.vue';

export default {
	components: {
		InputText,
		selectS,
		ContainerText
	},

	data() {
		return {
			pqrs: {
				identificacion: "",
				nombres_apellidos: "",
				mensaje: "",
				tipo_doc: "",
			},

			docOptions: [
				{ value: 'CC', label: 'Cédula de Ciudadanía - CC' },
				{ value: 'CE', label: 'Cédula de Extranjería - CE' },
				{ value: 'PA', label: 'Pasaporte - PA' },
				{ value: 'NIT', label: 'Número de Identificación Tributaria - NIT' },
			],

			areaOptions: [
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

			]

		}
	},

	methods: {
		crearPqr() {
			this.pqrs.nombres_apellidos = this.pqrs.nombres_apellidos.toUpperCase();
			this.pqrs.mensaje = this.pqrs.mensaje.toUpperCase();

			console.log(this.pqrs);
			let datosEnviar = {
				tipo_doc: this.pqrs.tipo_doc,
				identificacion: this.pqrs.identificacion,
				nombres_apellidos: this.pqrs.nombres_apellidos,
				email: this.pqrs.email,
				tel: this.pqrs.tel,
				mensaje: this.pqrs.mensaje,
				area_enc: this.pqrs.area_enc,
				gdpr: this.pqrs.gdpr,
				estado: "SIN GESTIONAR",
			};
			const options = {
				method: 'POST',
				headers: {
					'User-Agent': 'Insomnia/2023.5.6',
					Authorization: import.meta.env.VITE_API_TOKEN
				},
				body: JSON.stringify(datosEnviar)
			};
			fetch('http://10.1.1.8/api/v1/pqrs/', options)
				.then(respuesta => respuesta.json())
				.then(datosRespuesta => {
					console.log(datosRespuesta);
					window.location.href = 'Listar';
				})
				.catch(error => {
					console.error('Error al enviar la solicitud:', error);
				});
		}
	},

}
</script>


