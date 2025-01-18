import '../css/app.css';
import './bootstrap';

import { createApp } from 'vue'
import Login from "@/Pages/Auth/Login.vue";
import {createMemoryHistory, createRouter, createWebHistory} from "vue-router";
import Welcome from "@/Pages/Welcome.vue";
import App from "@/App.vue";
import {createPinia} from "pinia";
import Register from "@/Pages/Auth/Register.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import PostsIndex from "@/Pages/Dashboard/Posts/PostsIndex.vue";
import PostsCreate from "@/Pages/Dashboard/Posts/PostsCreate.vue";
import {useAuthStore} from "@/stores/auth.store.js";

const pinia = createPinia();

const app = createApp(App);

const routes = [
    {
        path: '/',
        component: Login,
        name: 'login',
        meta: {
            guest: true,
        }
    },
    {
        path: '/register',
        component: Register,
        name: 'register',
        meta: {
            guest: true,
        }
    },
    {
        path: '/posts',
        component: PostsIndex,
        name: 'posts.index',
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/posts/create',
        component: PostsCreate,
        name: 'posts.create',
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/posts/:id/edit',
        component: PostsCreate,
        name: 'posts.edit',
        meta: {
            requiresAuth: true,
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const {auth} = useAuthStore();

    if (to.meta.guest) {
        if (auth?.access_token) {
            next({name: 'posts.index'})

            return;
        }
        next();
        return;
    }


    if (to.meta.requiresAuth && !auth?.access_token) {
        next({name: 'login'});
        return;
    }

    next();
});

app.use(router);
app.use(pinia);

app.mount('#app');
