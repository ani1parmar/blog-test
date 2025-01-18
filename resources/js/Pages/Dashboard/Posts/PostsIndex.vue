<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import {storeToRefs} from "pinia";
import {usePostStore} from "@/stores/post.store.js";
import Pagination from "@/Components/Pagination.vue";
import {onMounted, ref} from "vue";

const {posts} = storeToRefs(usePostStore());

usePostStore().index();

const getPostsParams = ref({});

const deletePost = (id) => {
    usePostStore().destroy(id).then((res) => {
        usePostStore().index();
    });
}
</script>

<template>
    <AuthenticatedLayout>
        <div class="mb-4 flex items-center justify-between">
            <h1 class="text-xl text-white">Posts</h1>

            <router-link :to="{name : 'posts.create'}">
                Add Post
            </router-link>
        </div>

        <div class="relative overflow-x-auto rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Id
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Title
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Description
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="post in posts.data" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ post.id }}
                    </th>
                    <td class="px-6 py-4">
                        {{ post.title }}
                    </td>
                    <td class="px-6 py-4">
                        {{ post.description }}
                    </td>
                    <td class="px-6 py-4">
                        <router-link :to="{name: 'posts.edit', params: {id : post.id}}" class="text-yellow-500">Edit</router-link>
                        <button @click="deletePost(post.id)" class="ml-2 text-red-500">Delete</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <Pagination
            :data="posts?.meta"
            @pagination-change-page="(params) => usePostStore().index({...getPostsParams, ...params})"
            class="my-6 flex justify-center"
        />
    </AuthenticatedLayout>
</template>
