<template>
	<div>
		<img src="https://portadainmobiliaria.com/webapi/Logo_Nit.jpg" style="width: 200px;">
		<h3> Formulario Mantenimientos y Reparaciones </h3>
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
								<div>{{ mantenimiento.register_date }}</div>
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
				</thead>
				<tbody>
					<tr>
						<th class="th_row_icon_spn">
							<div class="icons">
								<iconsSvg Area="true" />
								<span>
									Reportado A
								</span>
							</div>
						</th>
						<td colspan="3" v-if="mantenimiento.id_headquarter">{{ mantenimiento.id_headquarter.headquarter }}</td>
					</tr>
					<tr>
						<th class="th_row_icon_spn">
							<div class="icons">
								<iconsSvg estado="true" />
								<span>
									ESTADO
								</span>
							</div>
						</th>
						<td v-if="mantenimiento.id_status">{{ mantenimiento.id_status.status }}</td>
						<th class="th_row_icon_spn">
							<div class="icons">
								<iconsSvg terminos="true" />
								<span>
									NÚM. RADICADO
								</span>
							</div>
						</th>
						<td>{{ mantenimiento.id }}</td>
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
						<td v-if="mantenimiento.id_customer">{{ mantenimiento.id_customer.fullname }}</td>

						<th class="th_row_icon_spn">
							<div class="icons">
								<iconsSvg contacto="true" />
								<span>
									CONTACTO
								</span>
							</div>
						</th>
						<td v-if="mantenimiento.id_customer">{{ mantenimiento.id_customer.cellphone }}</td>
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
						<td v-if="mantenimiento.id_customer">
							{{ mantenimiento.id_customer.document_type }} - {{ mantenimiento.id_customer.document }}
						</td>
						<th class="th_row_icon_spn">
							<div class="icons">
								<iconsSvg email="true" />
								<span>
									EMAIL
								</span>
							</div>
						</th>
						<td v-if="mantenimiento.id_customer">{{ mantenimiento.id_customer.email }}</td>
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
						<td colspan="3">{{ mantenimiento.description }}</td>
					</tr>
					<!-- Agrega más filas según sea necesario -->
				</tbody>
			</table>
		</div>
		<div class="btn_download_pdf">
			<button class="btn btn-primary" type="button" id="download-pdf-button" @click="generatePDF" :disabled="descargandoPDF">Descargar PDF
			</button>
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
	font-family: Arial, Helvetica, sans-serif solid;
	font-size: 1.5rem;
}

.icons {
	display: flex;
	justify-content: center;
	gap: 0.1rem;
}

.fecha_hora_span {
	display: flex;
	flex-direction: column;
	align-items: center;
}

th,
td {
	/* border: 1px solid black; */
	padding: 5px;
	text-align: center;
	max-width: 12.5rem;
	min-width: 18.75rem;
	height: auto;
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

@media (width:1024px) {

	th,
	td {
		min-width: 13.75rem;
	}
}

@media (max-width: 768px) {

	h3 {
		font-size: 1.2rem
	}

	.table thead {
		display: inherit;
	}

	.th_row_icon_spn {
		display: flex;
		height: auto;
	}

	.table tbody tr {
		display: flex;
		flex-direction: column;
		border: 1px solid #ddd;
		border-radius: 0.3125rem;
		margin: auto;

	}
}
</style>
<script setup>
import iconsSvg from '../../../components/iconsSvg.vue';
import maintenance_apiHandler, { actions, maintenance_base_endpoint } from '../APIHandler.mantenimientos';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { generateHTMLContent } from '../utilidades/arcPDF.JS'
import { formatDate } from '../../utilidades/formarDate'
import styles from '../utilidades/cssPlantilla.css';
const VITE_PORTADA_API = import.meta.env.VITE_PORTADA_API_URL
const route = useRoute()
const time = 1000;

const mantenimiento = ref({
	id: "",
	register_date: "",
	status: "",
	headquarter: "",
	document_type: "",
	document: "",
	fullname: "",
	cellphone: "",
	email: "",
	address: "",
	category: "",
	description: "",


})

const estilos = `
<style>
    ${styles}
 </style>
`;
const descargandoPDF = ref(false); // Bandera para rastrear si se está descargando el PDF
const generatePDF = async () => {
	// Evitar que se inicie otra descarga mientras una está en progreso
	if (descargandoPDF.value) {
		return;
	}

	try {
		// Establecer la bandera a true para desactivar el botón
		descargandoPDF.value = true;

		// Obtener el contenido HTML generado
		const htmlContent = generateHTMLContent(mantenimiento);

		// Realizar la solicitud al servidor
		const response = await fetch(VITE_PORTADA_API, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				template: htmlContent,
				styles: estilos,
			}),
		});

		// Verificar si la respuesta es exitosa (código 200 OK)
		if (response.ok) {
			// Proceder con la apertura del PDF en una nueva pestaña
			const pdfBlob = await response.blob();
			const pdfUrl = window.URL.createObjectURL(pdfBlob);

			// Crear un elemento de enlace invisible
			const link = document.createElement('a');
			link.href = pdfUrl;
			link.target = '_blank'; // Abrir en una nueva pestaña
			link.download = `MANTENIMIENTO_${mantenimiento.value.id}.pdf`;
			link.click();
		} else {
			// Manejar el error de manera adecuada
			console.error('Error en la solicitud:', response.statusText);
		}
	} catch (error) {
		console.error('Error al generar o abrir el PDF:', error);
	} finally {
		// Establecer la bandera a false para volver a activar el botón
		descargandoPDF.value = false;
	}
};
const created = async () => {
	try {
		const id = route.params.id;
		const res = await maintenance_apiHandler.cargarDatos(id, maintenance_base_endpoint + actions.getBy);
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

	} catch (error) {
		console.error('Error al obtener o procesar los datos:', error);
	}
};


onMounted(() => {
	created()
})

</script>
