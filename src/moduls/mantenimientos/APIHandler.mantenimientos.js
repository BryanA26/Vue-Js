import APIHandler, { entidades, actions } from '../../APIHandler';
const BASE_URL = import.meta.env.VITE_BASE_URL_API_V2

const maintenance_base_endpoint = `${BASE_URL}/${entidades.maintenance}/`;
const customer_base_endpoint = `${BASE_URL}/${entidades.customer}/`
const headquarter_base_endpoint = `${BASE_URL}/${entidades.headquarter}/`
const category_base_endpoint = `${BASE_URL}/${entidades.category}/`
const API_TOKEN = import.meta.env.VITE_API_V2_TOKEN

const maintenance_apiHandler = new APIHandler(maintenance_base_endpoint, API_TOKEN);

export {
	customer_base_endpoint,
	headquarter_base_endpoint,
	category_base_endpoint,
	maintenance_base_endpoint,
	actions,
};
export default maintenance_apiHandler;

