<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Loading from './components/Loading.vue';

const posts = ref([]); // Lista para almacenar los artículos
const isLoading = ref(true); // Estado de carga
const error = ref(null); // Manejo de errores

const apiKey = '66ed84ab97244a1d9c29069233eecf8a'; // Esta es mi  clave de API que obtuve de  de NewsAPI
const baseUrl = `https://newsapi.org/v2/everything?q=technology&language=es&apiKey=${apiKey}`; // Búsqueda de noticias de tecnología en español

// Esta funcion es para obtener noticias 
const getPosts = async () => {
    try {
        const response = await axios.get(baseUrl);
        posts.value = response.data.articles; // Almacenar los artículos
    } catch (err) {
        error.value = "Error al obtener las noticias."; // Manejo de errores
    } finally {
        isLoading.value = false; // Finalizar el estado de carga
    }
};

// Ejecutar la función al montar el componente
onMounted(() => {
    getPosts();
});
</script>

<template>
    <div class="background-container">
        <!-- Estado de carga -->
        <div v-if="isLoading">
            <p>Cargando noticias...</p>
        </div>

        <!-- Manejo de errores -->
        <div v-else-if="error">
            <p class="text-danger">{{ error }}</p>
        </div>

        <!-- Mostrar lista de noticias -->
        <div v-else>
            <h3>Noticias en español</h3>
            <ul>
                <li v-for="post in posts" :key="post.url" class="post-item">
                    <!-- Enlace a los detalles de la noticia -->
                    <RouterLink :to="`/post/${post.title}`">
                        <h4 class="game-title">{{ post.title }}</h4>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
.background-container {
  background-image: url('/src/posts/images/fondoPost.png'); /* imagen de fondo*/
  background-size: cover; /* Esto hace que la imagen cubra todo el fondo */
  background-position: center; /* Centra la imagen */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
  padding: 20px;
  min-height: 100vh; /* Asegura que el fondo cubra toda la altura de la ventana */
  color: white; /* Color blanco para el texto sobre fondo oscuro */
}
.post-item {
  margin-bottom: 15px; /* Espacio entre los elementos de la lista */
}
.game-title {
  color: #f0e9e9; /*color de titulo */
  transition: color 0.3s ease; /* Transición suave para el cambio de color */
}
.game-title:hover {
  color: #ff4500; /*Cuando pasa el mouse sobre el titulo*/
}
</style>
