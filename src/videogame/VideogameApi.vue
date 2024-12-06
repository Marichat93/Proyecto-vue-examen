<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Loading from './components/Loading.vue';
const games = ref([]);
const isLoading = ref(true);
const error = ref(null);

// mi clave
const apiKey = '77c0060e68e448a7bfaf8ad31a91f080'; // Esta es mi clave de api que otube de Rawg
const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&page_size=10&lang=es-ES`;

// Función para obtener videojuegos
const getGames = async () => {
  try {
    const response = await axios.get(apiUrl);
    games.value = response.data.results; // Obtener los resultados
  } catch (err) {
    error.value = 'Error al obtener los videojuegos'; //si hay errores
  } finally {
    isLoading.value = false; // si termino de cargarse
  }
};

onMounted(() => {
  getGames(); // Obtener los juegos cuando el componente se monta
});
</script>

<template>
  <div class="background-container">
    <!-- El estasdo de carga -->
    <div v-if="isLoading">
      <p>Cargando videojuegos...</p>
    </div>

    <!-- manejar los errrores-->
    <div v-else-if="error">
      <p class="text-danger">{{ error }}</p>
    </div>

    <!-- Mostrar lista de videojuegos -->
    <div v-else>
      <h1>Videojuegos Populares</h1>
      <ul>
        <li v-for="videogame in games" :key="videogame.id">
          <!-- Enlace a los detalles del videojuego -->
          <RouterLink :to="`/videogame/${videogame.id}`">
            <h2 class="game-title">{{ videogame.name }}</h2> 
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.background-container {
  background-image: url('/src/videogame/images/fondoJuego.jpg'); /* imagen de fondo para este componente*/
  background-size: cover; /* Con esto le decimos que la imagen cubra todo el contenedor */
  background-position: center; /* Con esto centramos la imagen */
  background-repeat: no-repeat; /* Para que la imagen no se repita*/
  padding: 20px; 
  min-height: 100vh; /* Con esto le decimos que cubra todo el exterior */
  color: white; /* Color blanco para el texto sobre fondo oscuro */
}
.game-title {
  color: #f0e9e9; /*color de titulo */
  transition: color 0.3s ease; /* Transición suave para el cambio de color */
}
.game-title:hover {
  color: #ff4500; /* Color cuando el mouse pasa sobre el titulo*/
}
</style>