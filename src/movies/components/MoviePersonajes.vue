<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
  movieId: {
    type: Number,
    required: true
  }
});

const personajes = ref([]);  //para los personajes
const isLoading = ref(true);
const error = ref(null);

// API Key para TMDB
const api_key = 'ae6de426f3f3c5afd841ee86f301c6f6'; 
const base_url = `https://api.themoviedb.org/3/movie/${props.movieId}/credits?api_key=${api_key}&language=es-ES`;

const getPersonajes = async () => {  // funcion para obtener los personajes
  try {
    const response = await axios.get(base_url);
    // Obtener solo los primeros 5 personajes
    personajes.value = response.data.cast.slice(0, 5);  // 
  } catch (err) {
    error.value = "Error al obtener los personajes.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {//onMounted se utiliza para ejecutar codigo que necesita acceder al DOM
  getPersonajes();
});
</script>

<template>
  <div>
    <!-- Estado de carga -->
    <div v-if="isLoading">
      <p>Cargando personajes...</p>
    </div>

    <!--Mostrar un mensaje de error -->
    <div v-else-if="error">
      <p class="text-danger">{{ error }}</p>
    </div>

    <!-- Mostrar los personajes -->
    <div v-else>
      <h3>Personajes</h3>
      <div class="d-flex justify-content-start">
        <!--mostrar los personajes en una fila -->
        <div
          v-for="(personaje, index) in personajes" 
          :key="index"
          class="card m-2"
          style="width: 150px; text-align: center;"
        >
          <img
            v-if="personaje.profile_path"
            :src="'https://image.tmdb.org/t/p/w500/' + personaje.profile_path"
            :alt="personaje.name"
            class="card-img-top"
            style="height: 200px; object-fit: cover;"
          />
          <div class="card-body">
            <h5 class="card-title">{{ personaje.name }}</h5>  
            <p class="card-text">{{ personaje.character }}</p> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
