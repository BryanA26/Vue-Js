<script setup>
import { reactive, toRefs } from 'vue'
const state = reactive({
	apis: []
})

const { apis } = toRefs(state)

</script>


<template>
	<div>
		<h1>Home</h1>

		<ul>
			<li v-for="api in apis" :key="api.index">

				<router-link :to="`/details/${api.index}`"> {{ api.nombres_apellidos }}</router-link>
				#{{ api.index }}
			</li>
		</ul>
	</div>
</template>