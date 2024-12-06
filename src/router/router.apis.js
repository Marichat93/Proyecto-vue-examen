import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../HomePage.vue';

const routes = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/movie',
            name: 'movie',
            component: () => import('../movies/MoviesApi.vue')
        },
        {
            path: '/movie/:id',
            name: 'movie-details',
            component: () => import('../movies/components/MovieDetails.vue')//cargar componente de detalles
        },
        {
            path: '/videogame',
            name: 'videogame',
            component: () => import('../videogame/VideogameApi.vue')
        },
        //ruta para los detalles de los video juegos
        {
            path: '/videogame/:id',
            name: 'videogame-details',
            component: () => import('../videogame/components/VideogameDetails.vue') // Cargar el componente de detalles
        },
        {
            path: '/post',
            name: 'post',
            component: () => import('../posts/PostsApi.vue')
        },
        // Ruta para el detalle de los posts
        {
            path: '/post/:id',
            name: 'post-details',
            component: () => import('../posts/components/PostDetails.vue') // Cargar el componente de detalles
        },
        {
            path: '/tv',
            name: 'tv',
            component: () => import('../tv/TvApi.vue')
        },
        // Ruta de detalle de TV
        {
            path: '/tv/:id',
            name: 'tv-details',
            component: () => import('../tv/components/TvDetails.vue')
        },
    ]
});

export default routes;
