<template>
  <div class="container_counter_text">
    <div class="counter_text_input" :id="inputId">
      {{ txtValue.length }}
    </div>
    <label class="label_counter_text" :for="inputId">
      {{ label }}
    </label>
  </div>
</template>
<script setup>
const props = defineProps({
  label: String,
  inputId: String,
  txtValue: String,
})
</script>

<style>
.container_counter_text {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 1em;
}

.label_counter_text {
  text-align: right;
  font-size: 1em;
  color: #999;
}

.counter_text_input {
  text-align: right;
  font-size: 1em;
  color: #999;
}
</style>
