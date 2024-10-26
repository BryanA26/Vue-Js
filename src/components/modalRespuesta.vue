<template>
	<div id="detallesModal" class="modal"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="exampleModalLabel">Detalles</h1>
					<button type="button" class="btn-close" @click="cerrarModal" data-bs-dismiss="modal" aria-label="Cerrar"></button>
				</div>
				<div class="modal-body">
					{{ mensaje }}
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cerrarModal">Cerrar</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>

const props = defineProps({
	mensaje: String
})
const cerrarModal = () => {
	const modal = new bootstrap.Modal(document.getElementById('detallesModal'));
	modal.hide();
}

</script>