import { createApp } from 'vue'
import App from './App.vue'
import Home from "./Home.vue"
import PlaylistPage from "./PlaylistPage.vue"
import {createRouter} from "vue-router"
import {createWebHistory} from "vue-router"

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/playlist/:id',
        component: PlaylistPage
    }
]
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})
createApp(App).use(router).mount('#app')
