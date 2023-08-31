<script setup>
import { reactive, toRefs } from 'vue'
const state = reactive({
  apis: []
})

const { apis } = toRefs(state)

const options = {
  method: 'GET',
  headers: {
    'User-Agent': 'Insomnia/2023.5.6',
    Authorization: import.meta.env.VITE_API_TOKEN
  }
};


fetch('http://10.1.1.8/api/', options)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    data.data.forEach((element, index) => {
      const api = {
        ...element,
        index: index + 1
      };
      state.apis.push(api);
    });
  });
</script>


<template>
  <div>
    <h1>Home</h1>

    <ul>
      <li v-for="api in apis" :key="api.index">

        <router-link :to="`details/${api.index}`"> {{ api.nombres_apellidos }}</router-link>
        #{{ api.index }}
      </li>
    </ul>
  </div>
</template>