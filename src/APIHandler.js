/* APIHandler */
export default class APIHandler {
	constructor(apiUrl, apiToken, secondaryUrl) {
		this.apiUrl = apiUrl;
		this.apiToken = apiToken;
		this.secondaryUrl = secondaryUrl;
	}
	async fetchPost(datosEnviar, url = this.apiUrl) {
		const options = {
			method: 'POST',
			headers: {
				Authorization: this.apiToken,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(datosEnviar),
		};

		try {
			const response = await fetch(url, options);
			return await response.json();
		} catch (error) {
			console.error('Error al enviar la solicitud:', error);
			throw new Error('Hubo un problema al enviar la solicitud');
		}
	}
	async cargarDatos(id, endpointURL) {
		const sendid = id
		const options = {
			method: 'GET',
			headers: {
				Authorization: this.apiToken,
				'Content-Type': 'application/json',
			},

		};

		try {
			const response = await fetch(`${endpointURL}?id=${id}`, options);
			const datosRespuesta = await response.json()
			return datosRespuesta;
		} catch (error) {
			console.error('Error al cargar los datos:', error);
			throw new Error('Hubo un problema al cargar los datos');
		}
	}

	async loadInitialData(pagina = 1) {
		const initialLoadAmount = 10;
		const options = {
			method: 'GET',
			headers: {
				Authorization: this.apiToken,
			},
		};
		try {
			const response = await fetch(`${this.apiUrl}?limit=${initialLoadAmount}&page=${pagina}`, options);
			if (!response.ok) {
				throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
			}
			const responsejs = await response.json();
			return responsejs;
		} catch (error) {
			console.error('Error al cargar los datos iniciales:', error);
			throw new Error('Hubo un problema al cargar los datos iniciales');
		}
	}

	async filterData(pagina) {
		const itemsPerPage = 10;
		const options = {
			method: 'GET',
			headers: {
				Authorization: this.apiToken,
			},
		};

		try {
			const response = await fetch(`${this.apiUrl}?limit=${itemsPerPage}&page=${pagina}`, options);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error en la solicitud:', error);
			throw new Error('Hubo un problema al filtrar los datos');
		}
	}
	async getRequest(url) {
		const options = {
			method: 'GET',
			headers: {
				Authorization: this.apiToken,
			},
		};

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
			}

			return response.json();
		} catch (error) {
			console.error('Error al hacer la solicitud:', error);
			throw new Error('Hubo un problema al hacer la solicitud');
		}
	}



	async fetchPut(url, datosActualizar) {
		const options = {
			method: 'PUT',
			headers: {
				Authorization: this.apiToken,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(datosActualizar),
		};

		try {
			const response = await fetch(url, options);
			if (response.ok) {
				return true;
			} else {
				console.error('Error al actualizar el campo url_img en el servidor:', response.statusText);
				return false;
			}
		} catch (error) {
			console.error('Error al enviar la solicitud:', error);
			throw new Error('Hubo un problema al enviar la solicitud');
		}
	}


	async uploadFile(uploadUrl, formData) {
		const uploadOptions = {
			method: 'POST',
			body: formData,
			headers: {
				Authorization: this.apiToken,
			}
		};

		try {
			const uploadResponse = await fetch(uploadUrl, uploadOptions);

			if (!uploadResponse.ok) {
				const errorMessage = await uploadResponse.text();
				console.error('Error al subir el archivo:', errorMessage || uploadResponse.statusText);
				throw new Error(`Error al subir el archivo: ${errorMessage || uploadResponse.statusText}`);
			}

			const responseText = await uploadResponse.text();
			return responseText; // Retornar la respuesta sin procesar
		} catch (error) {
			console.error('Error en la subida del archivo:', error.message);
			throw new Error(`Error en la subida del archivo: ${error.message}`);
		}
	};
	async enviarDatosEspecificos(datos, endpointEspecifico) {
		const options = {
			method: 'POST',
			headers: {
				Authorization: this.apiToken,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(datos),
		};

		try {
            const response = await fetch(`${endpointEspecifico}`, options);
			if (!response.ok) {
				throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
			}
			const responseData = await response.json();
			return responseData;
		} catch (error) {
			console.error('Error al enviar los datos al endpoint específico:', error);
			throw new Error('Hubo un problema al enviar los datos al endpoint específico');
		}
	}


}

export const entidades = {
	maintenance: "maintenance",
	customer: "customer",
	category: "category",
	headquarter: "headquarter",
}

export const actions = {
	getAll: "getAll",
	getBy: "getBy",
	create: "create",
	update: "update",
	sendEmail: "sendEmail",
	uploadImageMaintenance: "uploadImageMaintenance",
}

