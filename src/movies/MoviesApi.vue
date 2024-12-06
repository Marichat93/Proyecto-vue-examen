<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import Loading from './components/Loading.vue';

const api_key = 'ae6de426f3f3c5afd841ee86f301c6f6';//mi clave de MDTB 
const base_url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=es-ES`;

const isLoading = ref(true)//funcion de si esta cargado
const nowplaying = ref([])

const getNowPlayingMovies = async () => {
    isLoading.value = true; // Está cargando datos
    const resp = await fetch(base_url);
    const data = await resp.json()
    nowplaying.value = data.results.map((movie) => {
        return {
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            poster_path: movie.poster_path
        }
    })
    setTimeout(() => {
        isLoading.value = false;
    }, 200)
}

getNowPlayingMovies()
</script>

<template>
  <div class="background-container">
    <!-- estado de carga -->
    <Loading v-if="isLoading">
      <p>Cargando peliculas...</p>
    </Loading>
    <div v-else>
      <h1 class="text-center">Lista de películas populares</h1>
      <template v-for="m in nowplaying" :key="m.id">
        <RouterLink :to="`/movie/${m.id}`">
            <h2 class="game-title">{{ m.title }}</h2>
         </RouterLink> <br>
      </template>
    </div>
  </div>
</template>

<style scoped>
.background-container {
  background-image: url('/src/movies/images/fondoMovie.jpg'); /* imagen de fondo*/
  background-size: cover; /* Esto hace que la imagen cubra todo el fondo */
  background-position: center; /* Centra la imagen */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
  padding: 20px;
  min-height: 100vh; /* Asegura que el fondo cubra toda la altura de la ventana */
  color: white; /* Color blanco para el texto sobre fondo oscuro */
}
.game-title {
  color: #f0e9e9; /*color de titulo */
  transition: color 0.3s ease; /* Transición suave para el cambio de color */
}
.game-title:hover {
  color: #ff4500; /* Color cuando el título es hovered*/
}
</style>
