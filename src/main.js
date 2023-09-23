import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/routes'
import  VueAwesomePaginate  from 'vue-awesome-paginate'
import "vue-awesome-paginate/dist/style.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

createApp(App)
	.use(router)
	.use(VueAwesomePaginate)
	.mount('#apivue')
