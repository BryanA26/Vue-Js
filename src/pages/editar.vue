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
							<div class="form-floating">
								<select class="form-select" id="floatingSelect" v-model="pqrs.area_enc" aria-label="Floating label select example">
									<option selected></option>
									<option value="Administración">Administración</option>
									<option value="Administraciones">Administraciones</option>
									<option value="Arrendamientos">Arrendamientos</option>
									<option value="Cartera">Cartera</option>
									<option value="Contabilidad">Contabilidad</option>
									<option value="Gestión Humana">Gestión Humana</option>
									<option value="Jurídico">Jurídico</option>
									<option value="Mantenimientos">Mantenimientos</option>
									<option value="Recibimientos">Recibimientos</option>
									<option value="Servicios Públicos">Servicios Públicos</option>
									<option value="Ventas">Ventas</option>
								</select>
								<label for="floatingSelect">Área encargada</label>
							</div>
						</div>

						<div class="col-md-6">
							<div class="">
								<div class="input-group has-validation">
									<div class="form-floating ">
										<input type="text" class="form-control" v-model="pqrs.id_pqrs" id="floatingInputGroup2" placeholder="id" required readonly>
										<label for="floatingInputGroup2" readonly>Número de Radicado</label>
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-6">
							<div class="my-3">
								<div class="input-group has-validation">
									<div class="form-floating ">
										<input type="text" class="form-control" v-model="pqrs.fecha_registro" id="floatingInputGroup2" placeholder="fecha" required readonly>
										<label for="floatingInputGroup2">Fecha de registro</label>
									</div>

								</div>
							</div>
						</div>

						<div class="col-md-6">
							<div class="my-3">
								<div class="form-floating">
									<select class="form-select" id="floatingSelect" v-model="pqrs.estado" aria-label="Floating label select example">
										<option selected>SIN GESTIONAR</option>
										<option>EN ESTUDIO</option>
										<option>GESTIONADO</option>
									</select>
									<label for="floatingSelect">Estado</label>
								</div>
							</div>
						</div>

						<div class="col-md-6">
							<div class="form-floating">
								<select class="form-select" id="floatingSelect" v-model="pqrs.tipo_doc" aria-label="Floating label select example">
									<option selected></option>
									<option value="CC">Cédula de Ciudadanía - CC</option>
									<option value="CE">Cédula de Extranjería - CE</option>
									<option value="PA">Pasaporte - PA</option>
								</select>
								<label for="floatingSelect">Tipo de Identificación *</label>
							</div>
						</div>

						<div class="col-md-6">
							<div class="input-group has-validation">
								<div class="form-floating">
									<input type="text" class="form-control " v-model="pqrs.identificacion" id="floatingInputGroup2" placeholder="Documento" required>
									<label for="floatingInputGroup2">Identificación</label>
								</div>
							</div>
						</div>

						<div class="col-md-6">
							<div class="my-3">
								<div class="input-group has-validation">
									<div class="form-floating">
										<input type="text" class="form-control " v-model="pqrs.nombres_apellidos" id="floatingInputGroup2" placeholder="nombre" required>
										<label for="floatingInputGroup2">Nombres y Apellidos</label>
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
										<input type="text" class="form-control " v-model="pqrs.email" id="floatingInputGroup2" placeholder="email" required>
										<label for="floatingInputGroup2">Email</label>
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
export default {
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

			}
		}

	},

	created() {
		const id = this.$route.params.id
		this.cargarDatosPqr(id);
	},


	methods: {

		volver(){
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


