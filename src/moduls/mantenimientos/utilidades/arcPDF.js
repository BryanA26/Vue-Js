import {
  fecha,
  info,
  area,
  nombres,
  contacto,
  documento,
  terminos,
  email,
  mensaje,
  estado,
} from "../../../components/svg"
import { maintenance_base_deployed_enpoint } from "../APIHandler.mantenimientos"
export const generateHTMLContent = (mantenimiento) => {
  const htmlWithStyles = `
  <html>
		<head>
		<div style="margin-top: 20px;">
			<div class="img_logo">
			</div>
	  		<h3>Formulario Mantenimientos y Reparaciones</h3>
	  		<p style="text-align: center;">Gracias por informarnos sobre la situación que se presenta en su inmueble queremos informarle que hemos recibido su solicitud y entendemos la importancia de resolverlo rápidamente.<br>
	  		Nuestro equipo de Mantenimiento se pondrá en contacto con usted en breve para asegurar una solución rápida.<br>
			Agradecemos su paciencia y confianza.<br><br>
	  		Atentamente,
	 		<b>Equipo de Mantenimiento de Portada Inmobiliaria.</b><br><br></p>
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
							<div>${mantenimiento.value ? mantenimiento.value.register_date : mantenimiento.register_date ? mantenimiento.register_date : "Fecha no disponible"}</div>
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
							${estado}
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
					<td><strong>${mantenimiento.value ? mantenimiento.value.record : mantenimiento.record}</strong></td>
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
					<td>${mantenimiento.value ? mantenimiento.value.id_customer.cellphone : mantenimiento.cellphone}</td>
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
				<h3>IMAGENES</h3>
				<ul>
				${getImagenesEnlaces(mantenimiento.value || mantenimiento)}
				</ul>
			  </div>
				<!-- Agrega más filas según sea necesario -->
	</body>
	</html>`
  return htmlWithStyles
}
function getImagenesEnlaces(mantenimiento) {
  // Verifica si la propiedad 'url_img' existe y es un array
  if (mantenimiento && mantenimiento.url_img) {
    let nombresArchivos

    try {
      // Intenta analizar la cadena JSON
      nombresArchivos = JSON.parse(mantenimiento.url_img)
    } catch (error) {
      // Si hay un error al analizar, asume que la cadena ya es un array
      nombresArchivos = mantenimiento.url_img
    }

    // Si nombresArchivos es un array, construye las etiquetas de imagen con estilos
    if (Array.isArray(nombresArchivos)) {
      const maintenanceId = mantenimiento.id
      const imagenes = nombresArchivos.map((nombreArchivo) => {
        // Obtén la extensión del nombre de archivo
        const extension = nombreArchivo.split(".").pop()
        // Construye la URL de la imagen utilizando la extensión del archivo
        const urlImagen = `${maintenance_base_deployed_enpoint}/files/maintenance/${maintenanceId}/${extension}/${nombreArchivo}`
        return `<img src=${urlImagen} alt="Imagen" style="max-width: 15%; height: auto; margin-right: 5px; display: inline-block;">`
      })

      // Utiliza un div para contener las imágenes y muestra horizontalmente
      return `<div>${imagenes.join("")}</div>`
    } else {
      // Si no hay imágenes disponibles
      return "<div>No hay imágenes disponibles</div>"
    }
  } else {
    // Si no hay imágenes disponibles
    return "<div>No hay imágenes disponibles</div>"
  }
}
