<template>
	<div class="container">
		<div class="card">
			<div class="card-header text-center">

				<b>Formulario de Actualización de Peticiones Quejas y Reclamos</b>

			</div>
			<div class="card-body my-2">
				<form v-on:submit.prevent="actualizarPqr">
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
										<input type="text" class="form-control " v-model="pqrs.tel" id="floatingInputGroup2" placeholder="tel" required>
										<label for="floatingInputGroup2">Número de contacto</label>
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
										<label for="textAreaMensaje" class="form-label">Mensaje</label>
										<textarea class="form-control" v-model="pqrs.mensaje" id="textAreaMensaje" rows="3" maxlength="180" :readonly="true"></textarea>
									</div>
								</div>
							</div>
							<div class="col-md-6">
								<div class="container">
									<div class="mb-3">
										<label for="textAreaObservaciones" class="form-label">Observaciones</label>
										<textarea class="form-control" v-model="pqrs.observaciones" id="textAreaObservaciones" rows="3" maxlength="180"></textarea>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
				<div class="text-center">
					<button type="submit" class="btn btn-danger mx-2" @click="volver">Atras</button>
					<button type="submit" class="btn btn-primary mx-2" @click="actualizarPqr">Actualizar</button>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
import inputText from '../components/inputText.vue';
import selectS from '../components/select-s.vue';
import containerText from '../components/containerText.vue';

export default {

	components: {
		inputText,
		selectS,
		containerText,
	},

	data() {
		return {
			pqrs: {
				tipo_doc: "",
				id_pqrs: "",
				fecha_registro: "",
				email: "",
				tel: "",
				mensaje: "",
				estado: "",
				area_enc: ""

			},

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

			],

			docOptions: [
				{ value: 'CC', label: 'Cédula de Ciudadanía - CC' },
				{ value: 'CE', label: 'Cédula de Extranjería - CE' },
				{ value: 'PA', label: 'Pasaporte - PA' },
				{ value: 'NIT', label: 'Número de Identificación Tributaria - NIT' },
			],

			estadOptions: [
				{ value: 'SIN GESTIONAR', label: 'SIN GESTIONAR' },
				{ value: 'EN ESTUDIO', label: 'EN ESTUDIO' },
				{ value: 'GESTIONADO', label: 'GESTIONADO' },
			]
		}

	},

	created() {
		const id = this.$route.params.id
		this.cargarDatosPqr(id);
	},


	methods: {

		volver() {
			this.$router.push("/Listar")
		},

		cargarDatosPqr(id) {

			const options = {
				method: 'GET',
				headers: {
					'User-Agent': 'Insomnia/2023.5.6',
					Authorization: import.meta.env.VITE_API_TOKEN
				},

			};

			fetch(`http://10.1.1.8/api/v1/pqrs/?id=${id}`, options)

				.then(respuesta => respuesta.json())
				.then(datosRespuesta => {
					this.pqrs = datosRespuesta.data;
					console.log(datosRespuesta.data)

				})

				.catch(error => {
					console.error('Error al enviar la solicitud:', error);

				});

		},

		actualizarPqr() {

			let datosEnviar = {
				id_pqrs: this.pqrs.id_pqrs,
				nombres_apellidos: this.pqrs.nombres_apellidos,
				tipo_doc: this.pqrs.tipo_doc,
				identificacion: this.pqrs.identificacion,
				email: this.pqrs.email,
				tel: this.pqrs.tel,
				observaciones: this.pqrs.observaciones,
				area_enc: this.pqrs.area_enc,
				estado: this.pqrs.estado

			}

			const url = `http://10.1.1.8/api/v1/pqrs/`;

			const options = {
				method: 'PUT',
				headers: {
					'User-Agent': 'Insomnia/2023.5.6',
					Authorization: import.meta.env.VITE_API_TOKEN
				},
				body: JSON.stringify(datosEnviar)
			};

			fetch(url, options)
				.then((respuesta) => respuesta.json())
				.then((data) => {
					console.log(data);
					window.location.href = "/Listar";
				})
				.catch((error) => {
					// Manejo de errores en caso de que la solicitud falle
					console.error("Error al enviar la solicitud de actualización:", error);
				});
		}

	}
}

</script>


