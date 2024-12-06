<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  const route = useRoute();
  const { id } = route.params; // Obtener el ID de la serie desde la URL
  
  const tvShow = ref({});
  const isLoading = ref(true);
  const error = ref(null);
  
  const api_key = 'ae6de426f3f3c5afd841ee86f301c6f6'; //mi clave que obtuve de TMDB 
  const base_url = `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=es-ES`;
  
  // Función para obtener los detalles de la serie
  const getTvShowDetails = async () => {
    try {
      const response = await axios.get(base_url);
      tvShow.value = response.data; // Guardar los detalles de la serie
    } catch (err) {
      error.value = "Error para obtener los detalles de TVs.";
    } finally {
      isLoading.value = false;
    }
  };
  
  onMounted(() => {
    getTvShowDetails(); // Obtener los detalles de la serie cuando el componente se monta
  });
</script>
  



<template>
  <div class="background-container">
    <!-- Estado de carga -->
    <div v-if="isLoading">
      <p>Cargando los detalles de los shows de TV...</p>
    </div>

    <!-- Mensaje de error -->
    <div v-else-if="error">
      <p class="text-danger">{{ error }}</p>
    </div>

    <!-- Mostrar detalles de la serie -->
    <div v-else class="d-flex align-items-start">
      <div class="mr-4" style="flex-shrink: 0; margin-right: 20px;">
        <!-- Imagen del póster de la serie -->
        <img
          :src="'https://image.tmdb.org/t/p/w500/' + tvShow.poster_path"
          :alt="tvShow.name"
          class="img-fluid"
          style="max-width: 300px; height: auto; object-fit: cover;"
        />
      </div>
      
      <div style="margin-left: 20px;">
        <h1>{{ tvShow.name }}</h1>

        <!-- Información de la serie -->
        <!-- si no hay desccripcion,se muestra "sin desccripcion" -->
        <p><strong>Detalles:</strong> {{ tvShow.overview || 'Sin descripción' }}</p> 
        <p><strong>Año de lanzamiento:</strong> {{ tvShow.first_air_date }}</p>
        <p><strong>Rating:</strong> {{ tvShow.vote_average }}</p>

        <!-- Botón para regresar -->
        <RouterLink to="/tv" class="btn btn-secondary mt-3">Back to TV Shows</RouterLink>
      </div>
    </div>
  </div>
</template>
<style scoped>
.background-container {
  background-color: #8fe1f1; /* Color de fondo */
  padding: 20px;
  min-height: 100vh; /* Asegura que el fondo cubra toda la altura de la pantalla */
}
</style>