<template>
	<div class="container">

		<div class="card">
			<div class="card-header text-center">

				Formulario Peticiones Quejas y Reclamos
			</div>
			<div class="card-body my-2">
				<form v-on:submit.prevent="crearPqr">
					<div class="form-floating">
						<select class="form-select" id="floatingSelect" v-model="pqrs.tipo_doc" aria-label="Floating label select example">
							<option selected>Selecciona el documento</option>
							<option value="CC">Cédula de Ciudadanía - CC</option>
							<option value="CE">Cédula de Extranjería - CE</option>
							<option value="PA">Pasaporte - PA</option>
						</select>
						<label for="floatingSelect">Tipo de Identificación *</label>
					</div>

					<div class="my-3">
						<div class="input-group has-validation">
							<div class="form-floating ">
								<input type="text" class="form-control" v-model="pqrs.identificacion" id="floatingInputGroup2" placeholder="documento" required>
								<label for="floatingInputGroup2">Número de identificación</label>
							</div>
							<div class="invalid-feedback">
								Este campo es obligatorio*
							</div>
						</div>
					</div>

					<div class="my-3">
						<div class="input-group has-validation">
							<div class="form-floating ">
								<input type="text" class="form-control" v-model="pqrs.nombres_apellidos"  id="floatingInputGroup2" placeholder="nombre" required>
								<label for="floatingInputGroup2">Nombres y Apellidos</label>
							</div>
							<div class="invalid-feedback">
								Este campo es obligatorio*
							</div>
						</div>
					</div>

					<div class="my-3">
						<div class="input-group has-validation">
							<div class="form-floating">
								<input type="text" class="form-control" v-model="pqrs.email" id="floatingInputGroup2" placeholder="email" required>
								<label for="floatingInputGroup2">Email</label>
							</div>
							<div class="invalid-feedback">
								Este campo es obligatorio*
							</div>
						</div>
					</div>

					<div class="my-3">
						<div class="input-group has-validation">
							<div class="form-floating">
								<input type="text" class="form-control " v-model="pqrs.tel" id="floatingInputGroup2" placeholder="tel" required>
								<label for="floatingInputGroup2">Teléfono o Celular</label>
							</div>
							<div class="invalid-feedback">
								Este campo es obligatorio*
							</div>
						</div>
					</div>

					<div class="container">
						<div class="mb-3">
							<label for="textArea" class="form-label">Mensaje</label>
							<textarea class="form-control" v-model="pqrs.mensaje"  id="textArea" rows="3" maxlength="180"></textarea>
						</div>
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
export default {
	data() {
		return {
			pqrs: {
				nombres_apellidos: "",
				mensaje: "",
			}
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
				gdpr: this.pqrs.gdpr,
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
	}




}
</script>


