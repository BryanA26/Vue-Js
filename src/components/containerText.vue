<template>
		<div class="mb-3">
			<label :for="inputId" class="form-label">{{label}}</label>
			<textarea class="form-control" :id="inputId" @input="$emit('update:textValue', $event.target.value)" :rows="rows" :maxlength="maxlength" :required="true"></textarea>
		</div>

</template>

<script setup>

const props = defineProps({
		inputId: String,
		textValue: String,
		label: String,
		editable: Boolean,
		rows: Number,
		maxlength: Number,
		
})
defineEmits (['update:textValue'])
</script>