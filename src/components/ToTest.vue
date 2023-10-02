<template>
	<div>
		<h1>My Component</h1>
		<input type="text" v-model="inputValue">
		<button @click="handleClick">Submit</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			inputValue: ''
		}
	},
	methods: {
		handleClick() {
			console.log(this.inputValue)
			// do something with the input value
		}
	}
}
</script>
