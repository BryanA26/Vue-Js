
import { fecha, info, area, nombres, contacto, documento, terminos, email, mensaje } from '../../../components/svg';
import maintenance_apiHandler, { actions, customer_base_endpoint, category_base_endpoint, headquarter_base_endpoint, maintenance_base_endpoint } from '../APIHandler.mantenimientos';

export const generateHTMLContent = (mantenimiento) => {

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
							<div>${mantenimiento.value ? mantenimiento.value.register_date : mantenimiento.register_date ? mantenimiento.register_date : 'Fecha no disponible'}</div>
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
					<td colspan="3">${mantenimiento.value ? mantenimiento.value.id_headquarter.headquarter : mantenimiento.id_headquarter.headquarter}</td>

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
					<td>${mantenimiento.value ? mantenimiento.value.id_status.status : mantenimiento.id_status.status}</td>
					<th>
						<div class="icons">
							${terminos}
							<span>
								NÚM. RADICADO
							</span>
						</div>
					</th>
					<td>${mantenimiento.value ? mantenimiento.value.id : mantenimiento.id}</td>
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
					<td>${mantenimiento.value ? mantenimiento.value.id_customer.fullname : mantenimiento.fullname}</td>

					<th>
						<div class="icons">
							${contacto}
							<span>
								CONTACTO
							</span>
						</div>
					</th>
					<td>${mantenimiento.value ? mantenimiento.value.id_customer.celphone : mantenimiento.celphone}</td>
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
					${mantenimiento.value ? mantenimiento.value.id_customer.document_type : mantenimiento.document_type}-
					${mantenimiento.value ? mantenimiento.value.id_customer.document : mantenimiento.document}
				</td>

					<th>
						<div class="icons">
							${email}
							<span>
								EMAIL
							</span>
						</div>
					</th>
					<td>${mantenimiento.value ? mantenimiento.value.id_customer.email : mantenimiento.email}</td>
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
					<td colspan="2">${mantenimiento.value ? mantenimiento.value.description : mantenimiento.description}</td>
				</tr>
				</tbody>
				</table><br>
				<div>
				<h2>${mensaje}</h2>
				<h3>IMAGENES</h3>
				<ul>
				${getImagenesEnlaces(mantenimiento.value || mantenimiento)}
				</ul>
			  </div>

				<!-- Agrega más filas según sea necesario -->
	</body>
	</html>
	`;
  };
  function getImagenesEnlaces(mantenimiento) {
	// Verifica si la propiedad 'url_img' existe y es un array
	if (mantenimiento && mantenimiento.url_img) {
	  let nombresArchivos;

	  try {
		// Intenta analizar la cadena JSON
		nombresArchivos = JSON.parse(mantenimiento.url_img);
	  } catch (error) {
		// Si hay un error al analizar, asume que la cadena ya es un array
		nombresArchivos = mantenimiento.url_img;
	  }

	  // Si nombresArchivos es un array, construye los enlaces
	  if (Array.isArray(nombresArchivos)) {
		const maintenanceId = mantenimiento.id || mantenimiento.value.id; // Usar mantenimiento.id si existe, de lo contrario mantenimiento.value.id
		const enlaces = nombresArchivos.map(nombreArchivo => {
		  const urlImagen = `${maintenance_base_endpoint}${maintenanceId}/${nombreArchivo}`;
		  return `<li><a href="${urlImagen}" target="_blank">Enlace a la imagen</a></li>`;
		});

		return enlaces.join('');
	  } else {
		return '<li>No hay imágenes disponibles</li>';
	  }
	} else {
	  return '<li>No hay imágenes disponibles</li>';
	}
  }

