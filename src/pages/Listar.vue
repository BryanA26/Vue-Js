

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

fetch('http://10.1.1.8/api/v1/pqrs/', options)
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
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
        console.log('Respuesta completa:', error.response);
    });
</script>

<template>
    <div class="container">
        <div class="card">
            <div class="card-header text-center">
                PQRS
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Identificación</th>
                            <th>Correo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="api in apis" :key="api.index">
                            <td>{{ api.id_pqrs }}</td>
                            <td>{{ api.nombres_apellidos }}</td>
                            <td>{{ api.identificacion }}</td>
                            <td>{{ api.email }}</td>
                            <td>
                                <a name="" id="" class="btn btn-primary" href="#" role="button" style="margin-right: 10px;">Editar</a>
                                <a name="" id="" class="btn btn-warning" href="#" role="button">Detalles</a>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

        </div>
    </div>
</template>


