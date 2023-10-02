<script setup>
import { ref } from "vue";
const msg = ref("Hello World!");
const new_msg = ref(undefined);
const changeMsg = () => {
	msg.value = new_msg.value
};
</script>
<template>
	<h1>
		{{ msg }}
	</h1>
	<input type="text" v-model="new_msg">
	<button @click="changeMsg">Click me</button>
</template>