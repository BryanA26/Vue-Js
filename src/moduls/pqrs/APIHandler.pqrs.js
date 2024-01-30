import APIHandler, { entidades, actions } from '../../APIHandler';
const BASE_URL = import.meta.env.VITE_BASE_URL_API_V2

const pqrs_base_endpoint = `${BASE_URL}/${entidades.pqrs}/`;
const customer_base_endpoint = `${BASE_URL}/${entidades.customer}/`
const area_base_endpoint = `${BASE_URL}/${entidades.area}/`
const API_TOKEN = import.meta.env.VITE_API_V2_TOKEN

const pqrs_apiHandler = new APIHandler(pqrs_base_endpoint, API_TOKEN);

export {
	customer_base_endpoint,
	area_base_endpoint,
	pqrs_base_endpoint,
	actions,
};
export default pqrs_apiHandler;

