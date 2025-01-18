import {acceptHMRUpdate, defineStore} from "pinia";
import axios from 'axios';

export const useAuthStore = defineStore('auth-store', {
    state: () => ({
        auth: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null,
    }),
    actions: {
        async login(form){
            const config = {
                url: '/login',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                data: form
            };

            return axios(config);
        },
        async register(form){
            const config = {
                url: '/register',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                data: form
            };

            return axios(config);
        },
        logout() {
            const config = {
                method: 'post',
                url: 'logout',
                headers: {
                    'Accept': 'application/json',
                }
            }
            return axios(config).finally(() => {
                localStorage.removeItem('auth');
                useAuthStore().$reset();
            });
        },
    }
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}


