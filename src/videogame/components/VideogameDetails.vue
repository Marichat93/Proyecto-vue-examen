<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const { id } = route.params; // Obtener el ID del videojuego 

const gameDetails = ref(null);
const isLoading = ref(true);

const api_key = '77c0060e68e448a7bfaf8ad31a91f080'; // Aqui reemplazo con la clave de API que obtuve de RAWG
const base_url = `https://api.rawg.io/api/games/${id}?key=${api_key}&lang=es-ES`; // para idioma español

const getGameDetails = async () => {
  try {
    const response = await axios.get(base_url);
    gameDetails.value = response.data;
  } catch (error) {
    console.error('Error al obtener los detalles del juego:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  getGameDetails();
});
</script>

<template>
  <div class="background-container">
    <!-- Paara estado de carga -->
    <div v-if="isLoading" class="text-center my-5">
      <p>Cargando detalles del videojuego...</p>
    </div>

    <!-- Mostramos un mensaje de error -->
    <div v-else-if="error" class="text-danger text-center my-5">
      <p>{{ error }}</p>
    </div>

    <!-- Mostrar detalles del videojuego -->
    <div v-else class="d-flex align-items-start mt-4">
      <!-- Imagen del videojuego -->
      <div class="me-4">
        <img
          :src="gameDetails.background_image"
          :alt="gameDetails.name"
          class="img-fluid rounded shadow"
          style="max-width: 600px;"
        />
      </div>

      <!-- Información del videojuego -->
      <div>
        <h1 class="mb-3">{{ gameDetails.name }}</h1>
        <p><strong>Lanzamiento:</strong> {{ gameDetails.released }}</p>
        <p><strong>Calificación:</strong> {{ gameDetails.rating }}</p>
        <p><strong>Descripción:</strong> {{ gameDetails.description_raw }}</p>

        <!-- Botón para regresar -->
        <RouterLink to="/videogame" class="btn btn-secondary  mt-3">Back to VideoGames</RouterLink>
      </div>
    </div>
  </div>
</template>
<style scoped>
.background-container {
  background-color: #47bcd3; /* Color de fondo */
  padding: 20px;
  min-height: 100vh; /* Asegura que el fondo cubra toda la altura de la pantalla */
}
</style>