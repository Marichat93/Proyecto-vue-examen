<script setup>
  import { ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import Loading from './components/Loading.vue';
  
  const api_key = 'ae6de426f3f3c5afd841ee86f301c6f6'; //mi clave de api que obtuve de TMDB
  const base_url = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=es-ES`;
  
  const isLoading = ref(true);
  const tvShows = ref([]);
  //funcion para obtener los shows
  const getPopularTVShows = async () => {
    isLoading.value = true; // Está cargando datos
    const resp = await fetch(base_url);
    const data = await resp.json();
    
    tvShows.value = data.results.map((show) => {
      return {
        id: show.id,
        name: show.name,
        overview: show.overview,
        poster_path: show.poster_path,
      };
    });
    
    // Después de 2 segundos, actualizamos isLoading
    setTimeout(() => {
      isLoading.value = false;
    }, 200);
  };
  
  getPopularTVShows(); // Llamada a la función para cargar los datos
</script>
  
<template>
    <div class="background-container">
      <!-- Cargando los datos -->
      <Loading v-if="isLoading"></Loading>
      
      <!-- Muetra las series cuando los datos están listos -->
      <div v-else>
        <h1 class="text-center">List de Shows de TV populares</h1>
        
        <template v-for="show in tvShows" :key="show.id">
          <RouterLink :to="`/tv/${show.id}`"> 
            <h3 class="game-title">{{ show.name }}</h3> 
          </RouterLink> <br>
        </template>
      </div>
    </div>
</template>
<style scoped>
.background-container {
  background-image: url('/src/tv/images/fondoTV.png'); /* imagen de fondo para este componente*/
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
  color: #ff4500; /* Color cuando pasa el mouse sobre el titulo*/
}
</style>