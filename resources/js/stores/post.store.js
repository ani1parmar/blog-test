import {acceptHMRUpdate, defineStore} from "pinia";
import axios from 'axios';

export const usePostStore = defineStore('post-store', {
    state: () => ({
        posts: {},
    }),
    actions: {
        index(params = {}){
            const config = {
                url: '/posts',
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                },
                params: params
            };

            return axios(config).then((res) => {
                this.posts = res.data;
            });
        },
        store(form = {}){
            const config = {
                method: 'post',
                url: 'posts',
                headers: {
                    'Accept': 'application/json',
                },
                data: form
            }
            return axios(config);
        },
        update(form = {}){
            const config = {
                method: 'put',
                url: `posts/${form.id}`,
                headers: {
                    'Accept': 'application/json',
                },
                data: form
            }
            return axios(config);
        },
        view(id){
            const config = {
                url: `posts/${id}`,
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                },
            };

            return axios(config);
        },
        destroy(id){
            const config = {
                method: 'delete',
                url: `/posts/${id}`,
                headers: {
                    'Accept': 'application/json',
                },
            }

            return axios(config);
        }
    }
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot))
}


