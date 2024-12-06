<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div>
    <!--Mi barra de navegacion con color de fondo-->
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #154c79;">
      <div class="container-fluid">
        <!--Un pequeño titulo-->
        <RouterLink to="/" class="navbar-brand">Mi Página</RouterLink>

        <!-- Botón de menú para cuando la pantalla se reduzca -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Enlaces de mi menu -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/videogame" class="nav-link">VideoGames</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/movie" class="nav-link">Movie</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/post" class="nav-link">Post News</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/tv" class="nav-link">Tv</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container-fluid">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
/* Estilos para los enlaces */
.nav-link {
  color: white;
  text-decoration: none;
  font-size: 20px;
}

.nav-link:hover {
  color: #f0f0f0;
}
</style>
