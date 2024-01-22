
import { fecha, info, nombres, contacto, documento, terminos, email, mensaje } from '../../../components/svg';

export const generateHTMLContent = (public_services) => {

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
			  <h3>Formulario Mantenimientos y Reparaciones</h3>
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
							<div>${public_services.value ? public_services.value.register_date : public_services.register_date ? public_services.register_date : 'Fecha no disponible'}</div>
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
					<td>${public_services.value ? public_services.value.id_status.status : public_services.id_status.status}</td>
					<th>
						<div class="icons">
							${terminos}
							<span>
								NÚM. RADICADO
							</span>
						</div>
					</th>
					<td>${public_services.value ? public_services.value.id : public_services.id}</td>
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
					<td>${public_services.value ? public_services.value.id_customer.fullname : public_services.fullname}</td>

					<th>
						<div class="icons">
							${contacto}
							<span>
								CONTACTO
							</span>
						</div>
					</th>
					<td>${public_services.value ? public_services.value.id_customer.celphone : public_services.celphone}</td>
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
					${public_services.value ? public_services.value.id_customer.document_type : public_services.document_type}-
					${public_services.value ? public_services.value.id_customer.document : public_services.document}
				</td>

					<th>
						<div class="icons">
							${email}
							<span>
								EMAIL
							</span>
						</div>
					</th>
					<td>${public_services.value ? public_services.value.id_customer.email : public_services.email}</td>
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
					<td colspan="2">${public_services.value ? public_services.value.description : public_services.description}</td>
				</tr>
				</tbody>
				</table><br>

				<!-- Agrega más filas según sea necesario -->
	</body>
	</html>
	`;
  };
