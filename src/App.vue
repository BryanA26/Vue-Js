
<template>
	<div id="app">
		<div class="header">
			<router-link to="/crear">Crear</router-link>
			|
			<router-link to="/editar">Editar</router-link>
			|
			<router-link to="/Listar">Listar</router-link>
			|
			<router-link to="/exportPDF">Exportar PDF</router-link>

		</div>
		<div class="main">
			<router-view></router-view>
		</div>
	</div>
</template>


