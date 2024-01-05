import APIHandler from '../../APIHandler';
import { entidades, actions } from '../../APIHandler';
const BASE_URL = import.meta.env.VITE_BASE_URL

const azureWebAppApiEndpointCreateMaintenance = `${BASE_URL}/${entidades.maintenance}/${actions.create}`;
const azureWebAppApiEndpointCreateCustomer = `${BASE_URL}/${entidades.customer}/${actions.create}`
const azureWebAppApiEndpointCreateCustomer_API_TOKEN = import.meta.env.VITE_API_TOKEN

const apiHandler = new APIHandler(azureWebAppApiEndpointCreateMaintenance, azureWebAppApiEndpointCreateCustomer_API_TOKEN, azureWebAppApiEndpointCreateCustomer);


export const UPDATE_URL = `${BASE_URL}/${entidades.maintenance}/${actions.update}`

export const UPLOAD_URL = `${BASE_URL}/${entidades.maintenance}/${actions.uploadImageMaintenance}`;

export const CATEGORY_URL = `${BASE_URL}/${entidades.category}/${actions.getAll}`;

export const HEADQUARTER_URL = `${BASE_URL}/${entidades.headquarter}/${actions.getAll}`


export const GETBY_URL = `${BASE_URL}/${entidades.maintenance}/${actions.getBy}`;

export const GETBY_URL2 = `${BASE_URL}/${entidades.customer}/${actions.getBy}`;

export default apiHandler;

