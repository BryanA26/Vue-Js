<template>
	<div class="input-group has-validation">
	  <div class="form-floating">
		<input
		  autocomplete="off"
		  class="form-control"
		  :type="type"
		  :value="selectedCountry"
		  @input="handleInput"
		  @blur="handleBlur"
		  :id="inputId"
		  placeholder="Extencion"
		  required
		/>

		<label :for="inputId">{{ label }}</label>

		<ul v-show="showList">
		  <!-- Iteración sobre los países filtrados -->
		  <li v-for="(country, index) in filteredCountries" :key="index" @click="selectCountry(country)">
			<img :src="country.flag" alt="Flag" class="country-flag" />
			{{ formatCountryOption(country) }}
		  </li>
		</ul>
	  </div>

	  <!-- Sección para mostrar el mensaje de error en caso de validación incorrecta -->
	  <div class="invalid-feedback">
		{{ errorMessage }}
	  </div>
	</div>
  </template>

  <script setup>
  import { ref, onMounted, getCurrentInstance, defineProps } from 'vue';

  const props = defineProps({
	type: String,
	inputId: String,
	errorMessage: String,
	label: String,
	modelValue: String,
  });

  const instance = getCurrentInstance();

  const selectedCountry = ref(null); // Inicializar con un valor nulo
  const allCountries = ref([]);
  const filteredCountries = ref([]);
  const showList = ref(false);

  // Función ejecutada después de que el componente se monta
  onMounted(async () => {
	try {
	  // Obtener datos de países desde la API
	  const response = await fetch('https://restcountries.com/v3.1/all?lang=es');
	  const data = await response.json();

	  // Mapear datos de países y asignar a la variable reactiva
	  allCountries.value = data.map((country) => ({
		name: country.name.common || '',
		callingCode: country?.idd?.root || '',
		suffixes: country?.idd?.suffixes || [],
		flag: country.flags?.png || country.flags?.svg || '',
		translations: country.translations,
	  }));

	  // Inicializar la lista filtrada con todos los países
	  filteredCountries.value = allCountries.value;
	} catch (error) {
	  // Manejar errores al obtener información de países
	  console.error('Error al obtener la información de los países:', error);
	}
  });

  // Función para filtrar la lista de países según el texto ingresado
  const filterCountries = () => {
	const searchText = selectedCountry.value.toLowerCase();

	// Aplicar el límite deseado, por ejemplo, 10 países
	const limit = 10;
	const filtered = allCountries.value.filter((country) => {
	  const lowerCaseName = country.name.toLowerCase();
	  const lowerCaseNativeName = country.translations?.spa?.common.toLowerCase();

	  return (
		lowerCaseName.includes(searchText) ||
		lowerCaseNativeName.includes(searchText) ||
		(country.callingCode + country.suffixes.join('')).includes(searchText)
	  );
	});

	// Asignar solo los primeros 'limit' países a filteredCountries.value
	filteredCountries.value = filtered.slice(0, limit);

	showList.value = filteredCountries.value.length > 0;
  };

  // Función para seleccionar un país y actualizar el valor del input
  const selectCountry = (country) => {
	const root = country.callingCode;
	const suffixes = country.suffixes;

	// Verificar si hay más de un sufijo
	selectedCountry.value = suffixes.length > 1 ? root : root + suffixes[0];

	showList.value = false; // Oculta la lista después de seleccionar un país

	// Emitir el evento personalizado 'update:modelValue' con el nuevo valor
	instance.emit('update:modelValue', selectedCountry.value);
  };

  // Función para manejar la entrada de texto en el input
  const handleInput = (event) => {
	// Actualizar directamente el modelo (modelValue)
	instance.emit('update:modelValue', event.target.value);

	// Actualizar la variable selectedCountry y filtrar la lista de países
	selectedCountry.value = event.target.value;
	filterCountries();
  };

  // Función para manejar el evento blur del input
  const handleBlur = () => {
	// Si el valor del campo no es un país seleccionado, restablecer a nulo
	if (
	  !allCountries.value.some(
		(country) => country.callingCode + country.suffixes.join('') === selectedCountry.value
	  )
	) {
	  selectedCountry.value = null;
	  instance.emit('update:modelValue', null);
	}
  };

  // Función para formatear la opción de país para mostrar en la lista
  const formatCountryOption = (country) => {
	const root = country.callingCode;
	const suffixes = country.suffixes;

	// Verificar si hay más de un sufijo
	const displaySuffix = suffixes.length > 1 ? '' : suffixes[0];

	return `${country.translations?.spa?.common || country.name} (${root}${displaySuffix})`;
  };
  </script>

  <style>
  /* Estilo para la bandera del país en la lista */
  .country-flag {
	width: 20px;
	height: 20px;
	margin-right: 5px;
  }

  /* Estilos para la lista de países */
  ul {
	list-style-type: none;
	padding: 0;
	margin: 0;
  }

  /* Estilo para los elementos de la lista (países) */
  li {
	cursor: pointer;
  }
  li:hover {
	background-color: rgb(231, 205, 205);
  }
  </style>
