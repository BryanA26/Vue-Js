<template>
	<div class="mb-3">
		<label :for="inputId" class="form-label">{{ label }}</label>
		<textarea class="form-control" :id="inputId" :value="textValue" @input="$emit('update:textValue', $event.target.value)" :rows="rows" :maxlength="maxlength" :required="true" :readonly="editable" :disabled="editable"></textarea>
	</div>
</template>

<script setup>

const props = defineProps({
	inputId: String,
	textValue: String,
	label: String,
	rows: Number,
	maxlength: Number,
	editable: Boolean
})
defineEmits(['update:textValue'])
</script>