<script setup>
import { useRoute } from 'vue-router'
import { reactive, toRefs, ref } from 'vue'

const state = reactive({
	api: ref(null),

})
console.log("🚀 ~ file: Details.vue:9 ~ state:", state.api)


const a = ref(false)
const options = {
	method: 'GET',
	headers: {
		'User-Agent': 'Insomnia/2023.5.6',
		Authorization: 'token'
	}
};
const ruta = useRoute()
const { api } = toRefs(state)
fetch(`http://10.1.1.8/api/?id=${ruta.params.id}`, options)
	.then(response => response.json())
	.then(data => {
		console.log(data)
		state.api = data
		console.log("🚀 ~ file: Details.vue:32 ~ state:", state)
		a.value = true


	})
console.log(ruta.params.id)
</script>
<template>
	<div>


		<h1>Detalles</h1>
		<div v-if="api">
			<h1>{{ api.data.email }}</h1>

		</div>
		<div v-else>
			<p>No hay datos disponibles</p>
		</div>
		<router-link to="/">Home</router-link>
	</div>
</template>