<template>
	<div>
		<button class="btn btn-warning" type="button" id="search-button" @click="openPDFView">Descargar PDF</button>
	</div>

	<head>
		<div>
			<img src="/public/Image/Logo_Nitt.jpg" style="width: 200px;">
		</div>
	</head>

	<body>
		<h3> PETICIONES - QUEJAS - RECLAMOS - SUGERENCIAS </h3>
		<table class="table table-bordered" >
			<thead class="thead-dark">
				<tr>
					<th colspan="4">
						<div class="icons" style="display: block;">
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
					<th colspan="2">
						<div class="icons">
							<iconsSvg Area="true" />
							<span>
								ÁREA ENCARGADA
							</span>
						</div>
					</th>
					<td colspan="2">{{ pqrs.area_enc }}</td>
				</tr>

			</thead>
			<tbody>
				<tr>
					<th>
						<div class="icons">
							<iconsSvg nombres="true" />
							<span>
								NOMBRES Y APELLIDOS
							</span>
						</div>
					</th>
					<td>{{ pqrs.nombres_apellidos }}</td>

					<th>
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
					<th>
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
					<th>
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
					<th>
						<div class="icons">
							<iconsSvg estado="true" />
							<span>
								ESTADO
							</span>
						</div>
					</th>
					<td>{{pqrs.estado}}</td>
					<th>
						<div class="icons">
							<iconsSvg terminos="true" />
							<span>
								ACEPTÓ TERMINOS Y CONDICIONES
							</span>
						</div>
					</th>
					<td>{{ pqrs.gdpr }}</td>
				</tr>
				<tr>
					<th colspan="2">
						<div class="icons">
							<iconsSvg mensaje="true" />
							<span>
								MENSAJE
							</span>
						</div>
					</th>
					<td colspan="2">{{pqrs.mensaje}}</td>
				</tr>
				<tr>
					<th colspan="2">
						<div class="icons">
							<iconsSvg observaciones="true" />
							<span>
								OBSERVACIONES
							</span>
						</div>
					</th>
					<td colspan="2">{{pqrs.observaciones}}</td>
				</tr>
				<!-- Agrega más filas según sea necesario -->
			</tbody>
		</table>

	</body>
</template>

<style scoped>
/* Estilos para la tabla */
table {

	border-collapse: collapse;
	margin: auto;
	width: auto;
}

h3{
	text-align: center;
	margin-top: 3.75rem;
	margin-bottom: 3.75rem;
	font-family: Arial, Helvetica, sans-serif;
}
.icons {
	display: inline-flex;
	align-items: center;
	gap: 0.1rem;
}

th,
td {
	/* border: 1px solid black; */
	padding: 10px;
	text-align: center;
	width: 200px !important;
	height: 30px;
    font-family: Arial, Helvetica, sans-serif;
}

th {
	background-color: #f2f2f2;
}
</style>
<script setup>
import iconsSvg from '../components/iconsSvg.vue';
import { fecha,info,area,nombres,contacto,documento,email,estado,terminos,mensaje,observaciones } from '../components/svg';
import {cargarDatosPqr} from '../fetch.query';
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';


const route = useRoute()

const image = '/public/Image/Logo_Nitt.jpg';

const pqrs = ref({
	tipo_doc: "",
	id_pqrs: "",
	fecha_registro: "",
	email: "",
	tel: "",
	mensaje: "",
	estado: "",
	area_enc: "",
	identificacion:"",
	observaciones:"",
	nombres_apellidos:"",
    gdpr:"SI"
})

const created = async () => {
	const id = 366
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
			}

			.icons {
				display: inline-flex;
				align-items: center;
				gap: 0.1rem;
			}

			h2{
				text-align: center;
				margin-top:3.75rem;
				margin-bottom: 3.75rem;
				font-family: Arial, Helvetica, sans-serif;
			}

			th,
			td {
				padding: 10px;
				text-align: center;
				width: 200px !important;
				height: 50px;
				font-family: Arial, Helvetica, sans-serif;
			}

			th {
				background-color: #f2f2f2;
			}
			</style>

            <div>
              <img src=${image} class="cabecera" alt="Descripción de la imagen" style="width: 200px;>
            </div>
        </head>
		<body>
            <div style="margin-top: 20px;">
              <h2>PETICIONES - QUEJAS - RECLAMOS - SUGERENCIAS</h2>
            </div>
			<table class="table table-bordered">
			<thead class="thead-dark">
				<tr>
					<th colspan="4">
						<div class="icons" style="display:block;">
							${fecha}
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
					<th colspan="2">
						<div class="icons">
							${area}
							<span>
								ÁREA ENCARGADA
							</span>
						</div>
					</th>
					<td colspan="2">${pqrs.value.area_enc}</td>
				</tr>

			</thead>
			<tbody>
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
								ACEPTÓ TERMINOS Y CONDICIONES
							</span>
						</div>
					</th>
					<td>${pqrs.value.gdpr}</td>
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
				<tr>
					<th colspan="2">
						<div class="icons">
							${observaciones}
							<span>
								OBSERVACIONES
							</span>
						</div>
					</th>
					<td colspan="2">${pqrs.value.observaciones}</td>
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
	newWindow.print()
	newWindow.document.close();
};

onMounted(()=>{
	created()
})

</script>

