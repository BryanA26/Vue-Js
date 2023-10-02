<template>
	<div>
		<button @click="openPDFView">Abrir vista en PDF</button>
	</div>

	<head>
		<div>
			<img src="/public/Image/Logo_Nitt.png" style="width: 200px;">
		</div>
	</head>

	<body>
		<h1 style="text-align: center; margin-top: 20px; font-family: Arial, Helvetica, sans-serif;"> PETICIONES - QUEJAS - RECLAMOS - SUGERENCIAS </h1>
		<table>
            <thead>
                <tr>
                    <th colspan="4">FECHA DE REGISTRO</th>
				</tr>
				<tr>
					<th colspan="4">INFORMACIÓN GENERAL</th>
				</tr>
				<tr>
                    <th colspan="2">ÁREA ENCARGADA</th>
					<td colspan="2">Encabezado 2</td>
				</tr>

            </thead>
            <tbody>
                <tr>
                    <td>Dato 1</td>
                    <td>Dato 2</td>
                    <td>Dato 3</td>
                    <td>Dato 4</td>
                </tr>
                <tr>
                    <td>Dato 4</td>
                    <td>Dato 5</td>
                    <td>Dato 6</td>
                    <td>Dato 6</td>
                </tr>
                <!-- Agrega más filas según sea necesario -->
            </tbody>
        </table>

	</body>
</template>

<style>
/* Estilos para la tabla */
table {
	width: 100%;
	border-collapse: collapse;
}

th, td {
	border: 1px solid black;
	padding: 10px;
	text-align: center;
}

th {
	background-color: #f2f2f2;
}




</style>
<script setup>
const image = '/public/Image/Logo_Nitt.png';

const openPDFView = () => {
	// Contenido que deseas mostrar en la nueva ventana o pestaña
	const htmlContent = `
	  <html>
		<head>
			<style>
			/* Estilos para la tabla */
			table {
				width: 100%;
				border-collapse: collapse;
			}

			th, td {
				border: 1px solid black;
				padding: 10px;
				text-align: center;
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
              <h1 style="text-align: center; margin-top: 50px; font-family: Arial, Helvetica, sans-serif;">PETICIONES - QUEJAS - RECLAMOS - SUGERENCIAS</h1>
            </div>
			<table>
            <thead>
                <tr>
                    <th colspan="4">Encabezado 1</th>
				</tr>
				<tr>
					<th colspan="4">Encabezado 2</th>
				</tr>
				<tr>
                    <th colspan="2">Encabezado 3</th>
					<th colspan="2">Encabezado 2</th>
				</tr>

            </thead>
            <tbody>
                <tr>
                    <td>Dato 1</td>
                    <td>Dato 2</td>
                    <td>Dato 3</td>
                    <td>Dato 4</td>
                </tr>
                <tr>
                    <td>Dato 4</td>
                    <td>Dato 5</td>
                    <td>Dato 6</td>
                    <td>Dato 6</td>
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
</script>

