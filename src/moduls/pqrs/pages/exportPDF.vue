<template>
	<div>
		<img src="../../../../public/Image/Logo_Nitt.jpg" style="width: 200px;">
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
								<div>{{ pqrs.register_date }}</div>
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
									ÁREA ENCARGADA
								</span>
							</div>
						</th>
						<td colspan="3" v-if="pqrs.id_area">{{ pqrs.id_area.name }}</td>
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
						<td v-if="pqrs.id_status">{{ pqrs.id_status.status }}</td>
						<th class="th_row_icon_spn">
							<div class="icons">
								<iconsSvg terminos="true" />
								<span>
									NÚM. RADICADO
								</span>
							</div>
						</th>
						<td>{{ pqrs.id }}</td>
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
						<td v-if="pqrs.id_customer">{{ pqrs.id_customer.fullname }}</td>
						<th class="th_row_icon_spn">
							<div class="icons">
								<iconsSvg contacto="true" />
								<span>
									CONTACTO
								</span>
							</div>
						</th>
						<td v-if="pqrs.id_customer">{{ pqrs.id_customer.celphone }}</td>
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
						<td v-if="pqrs.id_customer">{{ pqrs.id_customer.document_type }} -
							{{ pqrs.id_customer.document }}
						</td>
						<th class="th_row_icon_spn">
							<div class="icons">
								<iconsSvg email="true" />
								<span>
									EMAIL
								</span>
							</div>
						</th>
						<td v-if="pqrs.id_customer">{{ pqrs.id_customer.email }}</td>
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
						<td colspan="3">{{ pqrs.description }}</td>
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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import pqrs_apiHandler, { actions, customer_base_endpoint, pqrs_base_endpoint } from '../../pqrs/APIHandler.pqrs';
import { formatDate } from '../../utilidades/formarDate';
import { generateHTMLContent } from '../utilidades/arcPDF.JS'


const route = useRoute()
const time = 1000;

const pqrs = ref({
	id: "",
	document_type: "",
	document: "",
	fullname: "",
	register_date: "",
	email: "",
	celphone: "",
	observation: "",
	id_area: "",
})

const created = async () => {
	try {
		const id = route.params.id;
		const res = await pqrs_apiHandler.cargarDatos(id, pqrs_base_endpoint + actions.getBy);
		if (!res || !res.register_date) {
			console.error('Los datos obtenidos de la API no contienen la fecha esperada.');
			return;
		}
		res.register_date = formatDate(res.register_date);
		// Asignar los datos actualizados a tu variable de pqrs.value
		pqrs.value = { ...pqrs.value, ...res };

		// Resto de tu lógica...
	} catch (error) {
		console.error('Error al obtener o procesar los datos:', error);
	}
};
const openPDFView = () => {
	const htmlContent = generateHTMLContent(pqrs);

	// Abrir una nueva ventana o pestaña con el contenido HTML
	const newWindow = window.open('', '_blank');
	newWindow.document.open();
	newWindow.document.write(htmlContent);

	newWindow.document.close();

	// Esperar un breve momento y luego imprimir la nueva ventana
	setTimeout(() => {
		newWindow.print();
	}, time);
};

onMounted(() => {
	created()
})

</script>
