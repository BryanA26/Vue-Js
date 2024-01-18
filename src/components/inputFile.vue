<template>
	<div class="file-upload">
		<label :for="inputId" class="custom-file-upload">{{ buttonText }}</label>
		<input :id="inputId" :accept="acceptedFileTypes" multiple type="file" @change="onFileChange" style="display: none;" />
		<span v-for="file in selectedFiles" :key="file.name">
			{{ file.name }}
		</span>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
	buttonText: {
		type: String,
		default: 'Elegir Archivo',
	},
	inputId: {
		type: String,
		default: 'fileInput',
	},
	acceptedFileTypes: {
		type: String,
		default: '',
	},
});

const selectedFiles = ref([]);

const onFileChange = (event) => {
	const files = event.target.files;
	if (files.length > 0) {
		selectedFiles.value = Array.from(files);
	}
};
</script>

<style scoped>
.file-upload {
	display: flex;
	align-items: center;
}

.custom-file-upload {
	padding: 8px 12px;
	background-color: #1ABCA1;
	color: white;
	border: none;
	cursor: pointer;
	margin-right: 10px;
}

.custom-file-upload:hover {
	background-color: #15947f;
}

span {
	font-size: 14px;
	margin-right: 10px;
}

</style>
