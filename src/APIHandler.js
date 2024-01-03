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
	async actualizar(datosEnviar) {
		const options = {
			method: 'PUT',
			headers: {
				Authorization: this.apiToken,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(datosEnviar),
		};

		try {
			const response = await fetch(this.apiUrl, options);
			const data = await response.json();
		} catch (error) {
			console.error('Error al enviar la solicitud de actualización:', error);
			throw new Error('Hubo un problema al enviar la solicitud de actualización');
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

	async uploadAndGetUrl(file, inputFileUrl) {
		const formData = new FormData();
		formData.append('archivo', file);

		const options = {
			method: 'POST',
			headers: {
				Authorization: this.apiToken,
			},
			body: formData,
		};

		try {
			// Subir el archivo utilizando el método fetch
			const uploadResponse = await fetch(inputFileUrl, options);
			if (!uploadResponse.ok) {
				throw new Error(`Error en la solicitud: ${uploadResponse.status} ${uploadResponse.statusText}`);
			}

			const responseData = await uploadResponse.json();
			return responseData.url; // Suponiendo que el servidor devuelve la URL del archivo
		} catch (error) {
			console.error('Error al cargar el archivo:', error);
			throw new Error('Hubo un problema al cargar el archivo');
		}
	}


}