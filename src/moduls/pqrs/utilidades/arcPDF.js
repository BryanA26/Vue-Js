
import { fecha, info, area, nombres, contacto, documento, terminos, email, mensaje } from '../../../components/svg';

export const generateHTMLContent = (pqrs) => {

	return `
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
				print-color-adjust: exact;
				-webkit-print-color-adjust:exact;
			}

			.img_logo {
				background-image: url('https://portadainmobiliaria.com/webapi/Logo_Nit.jpg');
				height:6.25rem;
				width:12rem;
				background-size: cover;
				print-color-adjust: exact;
				-webkit-print-color-adjust:exact;
			}

			</style>

			<div style="margin-top: 20px;">
				<div class="img_logo">
				</div>
			  <h3>Formulario PETICIONES - QUEJAS - RECLAMOS - SUGERENCIAS </h3>
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
							<div>${pqrs.value ? pqrs.value.register_date : pqrs.register_date ? pqrs.register_date : 'Fecha no disponible'}</div>
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
					<td colspan="3">${pqrs.value ? pqrs.value.id_area.name : pqrs.id_area.name}</td>

				</tr>

			</thead>
			<tbody>
				<tr>
					<th>
						<div class="icons">
							${status}
							<span>
								ESTADO
							</span>
						</div>
					</th>
					<td>${pqrs.value ? pqrs.value.id_status.status : pqrs.id_status.status}</td>
					<th>
						<div class="icons">
							${terminos}
							<span>
								NÚM. RADICADO
							</span>
						</div>
					</th>
					<td>${pqrs.value ? pqrs.value.id : pqrs.id}</td>
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
					<td>${pqrs.value ? pqrs.value.id_customer.fullname : pqrs.fullname}</td>
					<th>
						<div class="icons">
							${contacto}
							<span>
								CONTACTO
							</span>
						</div>
					</th>
					<td>${pqrs.value ? pqrs.value.id_customer.celphone : pqrs.celphone}</td>
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
					${pqrs.value ? pqrs.value.id_customer.document_type : pqrs.document_type}-
					${pqrs.value ? pqrs.value.id_customer.document : pqrs.document}
				</td>
					<th>
						<div class="icons">
							${email}
							<span>
								EMAIL
							</span>
						</div>
					</th>
					<td>${pqrs.value ? pqrs.value.id_customer.email : pqrs.email}</td>
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
					<td colspan="2">${pqrs.value ? pqrs.value.description : pqrs.description}</td>
				</tr>
			</tbody>
		</div>
				<!-- Agrega más filas según sea necesario -->
	</body>
	</html>
	`;
};
