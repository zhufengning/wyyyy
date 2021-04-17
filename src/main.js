import { createApp } from 'vue'
import App from './App.vue'
import Home from "./Home.vue"
import {createRouter} from "vue-router"
import {createWebHashHistory} from "vue-router"

const routes = [
    {
        path: '/',
        component: Home
    }
]
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})
createApp(App).use(router).mount('#app')
