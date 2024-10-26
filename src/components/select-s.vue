<template>
	<div class="form-floating">
		<select class="form-select" :id="inputId" @change="$emit('update:selectValue', $event.target.value)" :value="selectedValue" :aria-label="label" :disabled="!editable" required>
			<option :value="''"></option>
			<option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
		</select>
		<label :for="inputId">{{ label }}</label>
	</div>
</template>

<script setup>

const props = defineProps({
	inputId: String,
	selectedValue: String,
	label: String,
	options: Array,
	editable: Boolean,
})

defineEmits(['update:selectValue'])
</script>

<style scoped>
:root {
	--text-select-color: #000;
}

.form-select>option {
	color: var(--text-select-color);
}
</style>