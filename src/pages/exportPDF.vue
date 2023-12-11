<template>
	<div>
		<img src="/public/Image/Logo_Nitt.jpg" style="width: 200px;">
		<h3> PETICIONES - QUEJAS - RECLAMOS - SUGERENCIAS </h3>
	</div>

	<body>
		<div class="table-responsive">
			<table class="table table-bordered">
				<thead class="thead-dark">
					<tr>
						<th colspan="4">
							<div class="icons fecha_hora_span">
								<!-- <iconsSvg fecha="true" /> -->
								<span>FECHA Y HORA DE REGISTRO</span>
								<div>{{ pqrs.fecha_registro }}</div>
							</div>
						</th>
					</tr>
					<tr>
						<th colspan="4">
							<div class="icons">
								<iconsSvg info="true" />
								<span>
									INFORMACIÓN GENERAL
								</span>
							</div>
						</th>
					</tr>
					<tr>
						<th colspan="1">
							<div class="icons">
								<iconsSvg Area="true" />
								<span>
									ÁREA ENCARGADA
								</span>
							</div>
						</th>
						<td colspan="3">{{ pqrs.area_enc }}</td>
					</tr>

				</thead>
				<tbody>
					<tr>
						<th class="th_row_icon_spn">
							<div class="icons">
								<iconsSvg estado="true" />
								<span>
									ESTADO
								</span>
							</div>
						</th>
						<td>{{ pqrs.estado }}</td>
						<th class="th_row_icon_spn">
							<div class="icons">
								<iconsSvg terminos="true" />
								<span>
									NÚM. RADICADO
								</span>
							</div>
						</th>
						<td>{{ pqrs.id_pqrs }}</td>
						</tr>
						<tr>
						<th class="th_row_icon_spn">
							<div class="icons">
								<iconsSvg nombres="true" />
								<span>
									NOMBRES Y APELLIDOS
								</span>
							</div>
						</th>
						<td>{{ pqrs.nombres_apellidos }}</td>

						<th class="th_row_icon_spn">
							<div class="icons">
								<iconsSvg contacto="true" />
								<span>
									CONTACTO
								</span>
							</div>
						</th>
						<td>{{ pqrs.tel }}</td>
					</tr>
						<tr>
						<th class="th_row_icon_spn">
							<div class="icons">
								<iconsSvg documento="true" />
								<span>
									DOCUMENTO
								</span>
							</div>
						</th>
						<td>{{ pqrs.tipo_doc }} -
							{{ pqrs.identificacion }}
						</td>
						<th class="th_row_icon_spn">
							<div class="icons">
								<iconsSvg email="true" />
								<span>
									EMAIL
								</span>
							</div>
						</th>
						<td>{{ pqrs.email }}</td>
					</tr>
					<tr>
						<th class="th_row_icon_spn" colspan="1">
							<div class="icons">
								<iconsSvg mensaje="true" />
								<span>
									MENSAJE
								</span>
							</div>
						</th>
						<td colspan="3">{{ pqrs.mensaje }}</td>
					</tr>
					<!-- Agrega más filas según sea necesario -->
				</tbody>
			</table>
		</div>
		<div class="btn_download_pdf">
			<button class="btn btn-primary" type="button" id="search-button" @click="openPDFView">Descargar PDF</button>
		</div>
	</body>
</template>

<style scoped>
/* Estilos para la tabla */

table {
	border-collapse: collapse;
	margin: auto;
	width: auto;
}

h3 {
	text-align: center;
	margin-top: 3.25rem;
	margin-bottom: 3.25rem;
	font-family: Arial, Helvetica, sans-serif;
}

.icons {
	display: flex;
	justify-content: center;
	gap: 0.1rem;
}

.fecha_hora_span{
	display: flex;
	flex-direction: column;
	align-items: center;
}

th,
td {
	/* border: 1px solid black; */
	padding: 5px;
	text-align: center;
	max-width: 200px!important;
	height: 30px;
	font-family: Arial, Helvetica, sans-serif;
	border: 0.0625rem solid #ccc;
	word-wrap: break-word;
	white-space: normal;
}

th {
	background-color: #f2f2f2;
}

.btn_download_pdf {
	display: flex;
	justify-content: center;
	margin-top: 1em;
}

@media (max-width: 768px) {
	.table thead {
		display: inherit;
	}

	.th_row_icon_spn {
		display: flex;
	}

}
</style>
<script setup>
import iconsSvg from '../components/iconsSvg.vue';
import { fecha, info, area, nombres, contacto, documento, email, estado, terminos, mensaje, observaciones } from '../components/svg';
import { cargarDatosPqr } from '../fetch.query';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const time = 1000;

const pqrs = ref({
	tipo_doc: "",
	id_pqrs: "",
	fecha_registro: "",
	email: "",
	tel: "",
	mensaje: "",
	estado: "",
	area_enc: "",
	identificacion: "",
	observaciones: "",
	nombres_apellidos: "",
	gdpr: "SI"
})

const created = async () => {
	const id = route.params.id
	pqrs.value = await cargarDatosPqr(id);
}

const openPDFView = () => {
	// Contenido que deseas mostrar en la nueva ventana o pestaña
	const htmlContent = `
	  <html>
		<head>
			<style scoped>

			table {

				border-collapse: collapse;
				margin: auto;
				width: auto;
			}

			.icons {
				display: inline-flex;
				align-items: center;
				gap: 0.1rem;
			}

			h3{
				text-align: center;
				margin-top:3.25rem;
				margin-bottom: 3.25rem;
				font-family: Arial, Helvetica, sans-serif;
			}

			th,
			td {
				padding: 10px;
				font-size: 12px;
				text-align: center;
				max-width: 200px !important;
				height: 30px;
				font-family: Arial, Helvetica, sans-serif;
				border: 0.0625rem solid #ccc;
				word-wrap: break-word;
				white-space: normal;
			}

			th {
				background-color: #f2f2f2;
			}

			.img_logo {
				background-image: url('/public/Image/Logo_Nitt.jpg');
				height:6.25rem;
				width:12rem;
				background-size: cover;
			}

			</style>

			<div style="margin-top: 20px;">
				<div class="img_logo">
				</div>
              <h3>PETICIONES - QUEJAS - RECLAMOS - SUGERENCIAS</h3>
            </div>
        </head>
		<body>
			<table class="table table-bordered">
			<thead class="thead-dark">
				<tr>
					<th colspan="4">
						<div class="icons" style="display:block;">

							<span>
								FECHA DE REGISTRO
							</span>
							<div>${pqrs.value.fecha_registro}</div>
						</div>
					</th>
				</tr>
				<tr>
					<th colspan="4">
						<div class="icons">
							${info}
							<span>
								INFORMACIÓN GENERAL
							</span>
						</div>
					</th>
				</tr>
				<tr>
					<th colspan="1">
						<div class="icons">
							${area}
							<span>
								ÁREA ENCARGADA
							</span>
						</div>
					</th>
					<td colspan="3">${pqrs.value.area_enc}</td>
				</tr>

			</thead>
			<tbody>
				<tr>
					<th>
						<div class="icons">
							${estado}
							<span>
								ESTADO
							</span>
						</div>
					</th>
					<td>${pqrs.value.estado}</td>
					<th>
						<div class="icons">
							${terminos}
							<span>
								NÚM. RADICADO
							</span>
						</div>
					</th>
					<td>${pqrs.value.id_pqrs}</td>
				</tr>
				<tr>
					<th>
						<div class="icons">
							${nombres}
							<span>
								NOMBRES Y APELLIDOS
							</span>
						</div>
					</th>
					<td>${pqrs.value.nombres_apellidos}</td>

					<th>
						<div class="icons">
							${contacto}
							<span>
								CONTACTO
							</span>
						</div>
					</th>
					<td>${pqrs.value.tel}</td>
				</tr>
				<tr>
					<th>
						<div class="icons">
							${documento}
							<span>
								DOCUMENTO
							</span>
						</div>
					</th>
					<td>
						${pqrs.value.tipo_doc}-
						${pqrs.value.identificacion}
					</td>
					<th>
						<div class="icons">
							${email}
							<span>
								EMAIL
							</span>
						</div>
					</th>
					<td>${pqrs.value.email}</td>
				</tr>
				<tr>
					<th colspan="2">
						<div class="icons">
							${mensaje}
							<span>
								MENSAJE
							</span>
						</div>
					</th>
					<td colspan="2">${pqrs.value.mensaje}</td>
				</tr>
				<!-- Agrega más filas según sea necesario -->
			</tbody>
		</table>

	</body>
	</html>
	`;

	// Abrir una nueva ventana o pestaña con el contenido HTML
	const newWindow = window.open('', '_blank');
	newWindow.document.open();
	newWindow.document.write(htmlContent);

	setTimeout(() => {
		newWindow.print()
		newWindow.document.close();

	}, time);
};

onMounted(() => {
	created()
})

</script>
