<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import MoviePersonajes from './MoviePersonajes.vue';

const route = useRoute();
const { id } = route.params; // Obtener el ID de la película desde la URL

const movie = ref({});
const isLoading = ref(true);
const error = ref(null);

const api_key = 'ae6de426f3f3c5afd841ee86f301c6f6';//mi clave del api que obtuve de MDTB
const base_url = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=es-ES`;

// Función para obtener los detalles de la película
const getMovieDetails = async () => {
  try {
    const response = await axios.get(base_url);
    movie.value = response.data; // Guardar los datos de la película
  } catch (err) {
    error.value = "Error fetching movie details.";
  } finally {
    isLoading.value = false;
  }
};

getMovieDetails();
</script>

<template>
  <div class="background-container">
    <!-- Estado de carga -->
    <div v-if="isLoading">
      <p>Cargando los detalles de la pelicula...</p>
    </div>

    <!-- Mensaje de error -->
    <div v-else-if="error">
      <p class="text-danger">{{ error }}</p>
    </div>

    <!-- Mostrar detalles de la película -->
    <div v-else class="d-flex align-items-center">
      <div class="mr-4" style="flex-shrink: 0; margin-right: 20px;">
        <!-- Imagen del póster -->
        <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" 
          :alt="movie.title" class="img-fluid"
          style="max-width: 800px; height: auto; object-fit: cover; border-radius: 15px; margin-top: 20px;" 
        />
        
      </div>

      <div style="margin-left: 20px;">
        <h1>{{ movie.title }}</h1>

        <!-- Información de la película -->
        <p><strong>Descripcion:</strong> {{ movie.overview }}</p>
        <p><strong>Añio de publicacion:</strong> {{ movie.release_date }}</p>
        <p><strong>Rating:</strong> {{ movie.vote_average }}</p>

        <!-- Mostrar los personajes de la película -->
        <MoviePersonajes :movieId="id" />

        <!-- Botón para regresar -->
        <RouterLink to="/movie" class="btn btn-secondary mt-3">Back to Movies</RouterLink>
      </div>
    </div>
  </div>
</template>
<style scoped>
.background-container {
  background-color: #85c9d6; /* Color de fondo */
  padding: 20px;
  min-height: 100vh; /* Asegura que el fondo cubra toda la altura de la pantalla */
}
</style>