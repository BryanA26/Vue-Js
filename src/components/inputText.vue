<template>
	<div class="">
		<div class="input-group has-validation">
			<div class="form-floating ">
				<input :type="type" class="form-control background_color_inp" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :id="inputId" :placeholder="placeholder" :required="true" :readonly="editable" :disabled="editable">
				<label :for="inputId">{{ label }}</label>
			</div>
			<div class="invalid-feedback">
				{{ errorMessage }}
			</div>
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	type: String,
	inputId: String,
	modelValue: String,
	placeholder: String,
	label: String,
	errorMessage: String,
	editable: Boolean,

})
defineEmits(['update:modelValue'])

</script>
