import APIHandler, { entidades, actions } from '../../APIHandler';
const BASE_URL = import.meta.env.VITE_BASE_URL_API_V2

const public_services_base_endpoint = `${BASE_URL}/${entidades.public_services}/`;
const customer_base_endpoint = `${BASE_URL}/${entidades.customer}/`
const API_TOKEN = import.meta.env.VITE_API_V2_TOKEN

const public_services_apiHandler = new APIHandler(public_services_base_endpoint, API_TOKEN);

export {
	customer_base_endpoint,
	public_services_base_endpoint,
	actions,
};
export default public_services_apiHandler;

