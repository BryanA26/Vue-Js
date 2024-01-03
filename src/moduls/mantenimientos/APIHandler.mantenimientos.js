import APIHandler from '../../APIHandler';

const url = 'https://apicrinmo.azurewebsites.net/maintenance/create';
/* const url = 'http://localhost:4000/maintenance/create'; */

const secondaryUrl = 'https://apicrinmo.azurewebsites.net/customer/create'
/* const secondaryUrl = 'http://localhost:4000/customer/create' */


const API_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImxvY2FsLXRlc3QtY2xpZW50LTAyIiwiaWF0IjoxNzAyOTk1NzI3LCJleHAiOjE3MzQ1MzE3Mjd9.mSTrPCZ3uEKaiPYWcNuT5TsFEyRVd0foJMMVMjzczKA"

const apiHandler = new APIHandler(url, API_TOKEN, secondaryUrl);


export const UPDATE_URL = 'https://apicrinmo.azurewebsites.net/maintenance/update'

// enpoind= imagenes
/* export const UPLOAD_URL = 'http://localhost:4000/maintenance/uploadImageMaintenance'; */
export const UPLOAD_URL = 'https://apicrinmo.azurewebsites.net/maintenance/uploadImageMaintenance';


/* export const CATEGORY_URL = 'http://localhost:4000/category/getAll'; */
export const CATEGORY_URL = 'https://apicrinmo.azurewebsites.net/category/getAll';


/* export const HEADQUARTER_URL = 'https://apicrinmo.azurewebsites.net/headquarter/getAll' */
export const HEADQUARTER_URL = 'http://localhost:4000/headquarter/getAll'


export const GETBY_URL = 'https://apicrinmo.azurewebsites.net/maintenance/getBy';
/* export const GETBY_URL = 'http://localhost:4000/maintenance/getBy';*/


export const GETBY_URL2 = 'https://apicrinmo.azurewebsites.net/customer/getBy';
/* export const GETBY_URL2  = 'http://localhost:4000/customer/getBy';*/



  export default apiHandler;

