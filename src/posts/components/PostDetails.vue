<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';

  const route = useRoute();
  const { id } = route.params; // Se obtiene  el ID de la noticia (usamos la URL de la noticia como ID en este caso)

  const post = ref(null);
  const isLoading = ref(true);
  const error = ref(null);

  const apiKey = '66ed84ab97244a1d9c29069233eecf8a'; // la clave que obtuve de  de API de NewsAPI
  const baseUrl = `https://newsapi.org/v2/everything?apiKey=${apiKey}&q=${id}`;

  //no olvidemos que axios nos devuelve en formato JSON automaticamente
  const getPostDetails = async () => {
    try {
      const response = await axios.get(baseUrl);
      post.value = response.data.articles[0]; // Obtener los detalles de la noticia usando la URL como parámetro
    } catch (err) {
      error.value = 'Error al obtener los detalles del artículo.';
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    getPostDetails(); // Obtener los detalles de la noticia cuando el componente se monta
  });
</script>

<template>
  <div class="background-container">
    <!-- Estado de carga -->
    <div v-if="isLoading">
      <p>Cargando detalles...</p>
    </div>

    <!-- Manejo de errores -->
    <div v-else-if="error">
      <p class="text-danger">{{ error }}</p>
    </div>

    <!-- Mostrar detalles de la noticia -->
    <div v-else>
      <h3>{{ post.title }}</h3>
      <p>{{ post.content }}</p>
      <p><strong>Fuente:</strong> <a :href="post.url" target="_blank">{{ post.source.name }}</a></p>
      <p><strong>Publicado el:</strong> {{ post.publishedAt }}</p>
      <p><strong>Leer mas:</strong> <a :href="post.url" target="_blank">{{ post.source.name }}</a></p>
      <!-- Botón para regresar -->
      <RouterLink to="/post" class="btn btn-secondary mt-3">Back to Post</RouterLink>
    </div>
  </div>
</template>
<style scoped>
.background-container {
  background-color: #a1d6e0; /* Color de fondo */
  padding: 20px;
  min-height: 100vh; /* Asegura que el fondo cubra toda la altura de la pantalla */
}
</style>