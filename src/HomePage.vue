<script setup>
    
</script>

<template>
    <div class="background-container">
        <h1 class="fw-bold">Te damos la Bienvenida a Vue-Stream</h1>    
        <p class="description">
            Explora las últimas películas populares, emocionantes series de televisión,noticias y videojuegos. 
            Encuentra recomendaciones, trailers y detalles sobre los mejores contenidos de entretenimiento.
        </p>
    </div>
</template>

<style scoped>
 /*estilo para ponerle una imagen de fondo a este componente */
.background-container {
    background-image: url('./images/fondoHome.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
}

h1 {
    color: rgb(251, 251, 251);
    text-shadow: 2px 2px 4px rgba(218, 219, 228, 0.5);
    font-size: 5rem; /* Tamaño de fuente más grande */
    margin-bottom: 10px; /* Espacio entre el título y la descripción */
}
.description {
    color : rgb(255, 254, 255);
    font-size: 2.5rem;
    margin-top: 10px;
    max-width: 80%; /* Limita el ancho para que no se vea demasiado extenso */
}
</style>