<template>
	<div class="main-zone">
	  <div
		class="dropzone-container"
		@dragover="dragoverFile"
		@dragleave="dragleaveFile"
		@drop="dropFile"
		:style="isDraggingFile && 'border-color: green;'"
	  >
		<input
		  type="file"
		  multiple
		  name="file"
		  id="fileInput"
		  class="hidden-input"
		  @change="onChangeFile"
		  ref="inputFile"
		  accept=".jpg,.jpeg,.mp4,.msword,.pdf,.docx"
		/>

		<label for="fileInput" class="file-label">
		  <div v-if="isDraggingFile">Suelta tus imágenes aquí</div>
		  <div v-else>
			Arrastra tus archivos o <strong>haz clic aquí</strong> para subirlos,
			maximo <strong>10</strong> archivos permitidos
			<p class="error-img">
			  Las imágenes en formato JPG o JPEG, archivos PDF y WORD deben pesar como máximo 1 MB cada uno. Los videos MP4 deben pesar como máximo 20 MB cada uno.
			</p>
		  </div>
		</label>

		<div class="preview-container mt-4" v-if="files && files.length">
			<div v-for="(file, index) in files" :key="index" class="preview-card">
				<div>
				<!-- Utiliza v-if para renderizar la imagen si el archivo es una imagen -->
				<img v-if="isImage(file)" class="preview-img" :src="generateURL(file)" />
				<!-- Utiliza v-if para renderizar el icono si el archivo no es una imagen -->
				<div v-else v-html="getFileIcon(file)"></div>
				<p class="truncateText">{{ file.name }}</p>
			</div>
			<div>
			  <button
				class="ml-2 button-delete"
				type="button"
				title="Remove file"
				@click="removeFile(index)"
			  >
				<b>×</b>
			  </button>
			</div>
		  </div>
		</div>
	  </div>

	  <!-- Modal -->
	  <div v-if="showModal" class="modal">
		<div class="modal-content">
		  <span class="close" @click="showModal = false">&times;</span>
		  <p v-if="modalMessage" v-html="modalMessage"></p>
		  <a v-if="modalLink" :href="modalLink" target="_blank" v-html="modalLinkText"></a>
		</div>
	  </div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { pdf, docs, img, video } from './svg.js'
const emit = defineEmits(["onChangeFile"])
const files = ref([])
const isDraggingFile = ref(false)
const inputFile = ref()
const showModal = ref(false)
let modalMessage = ''
let modalLink = ''
let modalLinkText = ''

function isImage(file) {
  return file.type.includes('image');
}

function generateURL(file) {
  const fileSrc = URL.createObjectURL(file)
  setTimeout(() => {
    URL.revokeObjectURL(fileSrc)
  }, 2000)
  return fileSrc
}
function getFileIcon(file) {
	if (file.type.includes('pdf')) {
		return pdf
	} else if (file.type.includes('msword') || file.type.includes('docx') || file.type.includes('doc')) {
		return docs
	} else if (file.type.includes('image')) {
		return img
	} else if (file.type.includes('video')) {
		return video
	}
}
/**
 *@description EL limite de peso por video, va a ser 20mb
 */
const MAX_SIZE_VIDEO = 20 * 1e6

/**
 *@description EL limite de peso por imagen, va a ser 1mb
 */
const MAX_SIZE_IMAGE = 1 * 1e6

/**
 *@description EL limite de peso por imagen, va a ser 1mb
 */
const MAX_SIZE_PDF = 1 * 1e6

/**
 *@description Esta funcion ingresa los archivos del input file a un array
 */
function onChangeFile() {
	if (!(inputFile.value && inputFile.value.files)) return
	for (let index = 0; index < inputFile.value.files.length; index++) {
		const fileFromInput = inputFile.value.files[index]

		const regexMatchWordDocument =
			/^application\/vnd\.openxmlformats\-officedocument\.wordprocessingml\.document$/
		const regexMatchFiles = /jpeg|jpg|mp4|msword|pdf|docx/
		if (files.value.length > 9) {
			mostrarModal("Solo se permiten hasta 10 archivos")
			return
		}
		if (
			!regexMatchFiles.test(fileFromInput.type) &&
			!regexMatchWordDocument.test(fileFromInput.type)
		) {
			mostrarModal("Has intentado subir un archivo con un formato no permitido, solo se pueden subir archivos jpg,jpeg,pdf, docx y mp4")
			continue
		}
		if (
			fileFromInput.type.includes("mp4") &&
			fileFromInput.size > MAX_SIZE_VIDEO
		) {
			mostrarModal(`Intento subir un video que pesa más de ${MAX_SIZE_VIDEO / 1e6} MB. Puedes comprimir el video usando este <a href="https://www.freeconvert.com/es/" target="_blank">enlace</a>.`)
			continue;
		}
		if (
			fileFromInput.type.includes("jpeg") &&
			fileFromInput.size > MAX_SIZE_IMAGE
		) {
			mostrarModal(`Intento subir una imagen que pesa mas de ${MAX_SIZE_IMAGE / 1e6}MB. Puedes comprimir la imagen usando este <a href="https://www.iloveimg.com/es/comprimir-imagen" target="_blank">enlace</a`)
			continue
		}

		if (
			fileFromInput.type.includes("jpg") &&
			fileFromInput.size > MAX_SIZE_IMAGE
		) {
			mostrarModal(`Intento subir una imagen que pesa mas de ${MAX_SIZE_IMAGE / 1e6}MB. Puedes comprimir la imagen usando este <a href="https://www.iloveimg.com/es/comprimir-imagen" target="_blank">enlace</a`)
			continue
		}
		if (
			fileFromInput.type.includes("pdf") &&
			fileFromInput.size > MAX_SIZE_IMAGE
		) {
			mostrarModal(`Intento subir un pdf que pesa mas de ${MAX_SIZE_PDF / 1e6}MB. Puedes comprimir el pdf usando este <a href="https://www.ilovepdf.com/es/comprimir_pdf" target="_blank">enlace</a`)
			continue
		}

		if (
			regexMatchWordDocument.test(fileFromInput.type) &&
			fileFromInput.size > MAX_SIZE_IMAGE
		) {
			mostrarModal(`Intento subir un archivo word que pesa mas de ${MAX_SIZE_PDF / 1e6}MB. Puedes comprimir el documento usando este <a href="https://www.youcompress.com/es/word/" target="_blank">enlace</a`)
			continue
		}

		files.value = [...files.value, fileFromInput]
		emit("onChangeFile", files.value)
	}
}

function dragoverFile(e) {
	e.preventDefault()
	isDraggingFile.value = true
}

function dragleaveFile() {
	isDraggingFile.value = false
}

function dropFile(e) {
	e.preventDefault()
	if (!inputFile.value) return
	inputFile.value.files = e.dataTransfer?.files
	onChangeFile()
	isDraggingFile.value = false
}

function removeFile(index) {
	if (files.value) {
		files.value.splice(index, 1)
	}
}

function mostrarModal(message, link = null) {
	modalMessage = message
	modalLink = link
	showModal.value = true
}
</script>

<style>
.button-delete {
	background-color: transparent;
	border: none;
	color: red;
	margin-left: -2rem;
}
.button-delete.hover {
	background-color: aliceblue;
	color: red
}
.main-zone {
	display: flex;
	flex-grow: 1;
	align-items: center;
	height: 20hv;
	justify-content: center;
	text-align: center;
}

.dropzone-container {
	padding: 1rem;
	border: 1px solid #e2e8f0;
	border: 2px dashed;
	width: 64rem;
	border-color: #9e9e9e;
	margin: 1rem;
}

.hidden-input {
	opacity: 0;
	overflow: hidden;
	position: absolute;
	width: 1px;
	height: 1px;
}

.file-label {
	font-size: 20px;
	display: block;
	cursor: pointer;
}

.preview-container {
	display: flex;
	flex-wrap: wrap;
	width: 60vw;
	margin-top: 2rem;
}

.preview-card {
	display: flex;
	padding: 5px;
	margin-left: 5px;
}


.error-img {
	color: gray;
	font-size: 1rem;
}

.truncateText {
    max-width: 5rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

/* Modal styles */
.modal {
	display: block;
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0,0,0,0.4);
}

.modal-content {
	background-color: #fefefe;
	margin: 15% auto;
	padding: 20px;
	border: 1px solid #888;
	width: 80%;
}

.close {
	color: #aaaaaa;
	float: right;
	font-size: 28px;
	font-weight: bold;
}

.close:hover,
.close:focus {
	color: #000;
	text-decoration: none;
	cursor: pointer;
}
.preview-img {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px solid #a2a2a2;
  background-color: #a2a2a2;
}
</style>
