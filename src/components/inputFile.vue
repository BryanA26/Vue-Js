<template>
	<div class="file-upload">
	  <label :for="inputId" class="custom-file-upload">{{ buttonText }}</label>
	  <input :id="inputId" :accept="acceptedFileTypes" type="file" @change="onFileChange" style="display: none;" />
	  <span>
		{{ displayText }}
		<button v-if="fileSelected" @click="cancelSelection" class="cancel-button">x</button>
	  </span>
	</div>
  </template>

  <script>
  import { ref } from 'vue';

  export default {
	props: {
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
	},
	setup(props) {
	  const fileSelected = ref(false);
	  const displayText = ref('No se ha seleccionado archivo');

	  const onFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
		  displayText.value = file.name;
		  fileSelected.value = true;
		}
	  };

	  const cancelSelection = () => {
		fileSelected.value = false;
		displayText.value = 'No se ha seleccionado archivo';
		const input = document.getElementById(props.inputId);
		if (input) {
		  input.value = '';
		}
	  };

	  return {
		fileSelected,
		displayText,
		onFileChange,
		cancelSelection,
	  };
	},
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
  }

  .cancel-button {
	background-color: transparent;
	color: #ff0000;
	border: none;
	cursor: pointer;
	margin-left: 6px;
  }
  .cancel-button:hover {
	background-color: #db4444;
	color: #ffffff;
	border: none;
	cursor: pointer;
	margin-left: 6px;
	border-radius: 100em;
  }
  </style>
