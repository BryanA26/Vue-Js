<script setup>
import { reactive, toRefs } from "vue"

/**
 * @todo region temporal para redirigir al formulario por defecto: mantenimientos
 */
// Region: temporal- form options
import { useRouter } from "vue-router"

const router = useRouter()

router.push({ name: "CrearMantenimientos" })
// EndRegion: temporal- form options

const state = reactive({
  apis: [],
})

const { apis } = toRefs(state)
</script>

<template>
  <div>
    <router-link to="/mantenimientos/crear">
      <button class="custom-button">MANTENIMIENTOS</button>
    </router-link>
  </div>
</template>

<style>
.custom-button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.custom-button:hover {
  background-color: #2980b9;
}
</style>
