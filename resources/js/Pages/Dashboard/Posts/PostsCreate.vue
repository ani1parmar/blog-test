<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import InputError from "@/Components/InputError.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import {onMounted, reactive} from "vue";
import {usePostStore} from "@/stores/post.store.js";
import {storeToRefs} from "pinia";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();

const form = reactive({
    id: null,
    title: '',
    description: '',
    processing: false,
    errors: {},
})

onMounted(() => {
    if (route.params.id) {
        usePostStore().view(route.params.id).then((res) => {
            console.log(res.data)
            form.id = res.data.data.id;
            form.title = res.data.data.title;
            form.description = res.data.data.description;
        });
    }
})

const submit = async () => {
    if (route.params.id) {
        usePostStore().update(form).then((res) => {
            router.push({name: 'posts.index'});
        });
    } else {
        usePostStore().store(form).then((res) => {
            router.push({name: 'posts.index'});
        });
    }
}
</script>

<template>
    <AuthenticatedLayout>
        <div class="mb-4 flex items-center justify-between">
            <h1 class="text-xl text-white">{{ route.params.id ? 'Edit' :  'Create' }} Post</h1>

            <router-link :to="{name : 'posts.index'}">
                Back
            </router-link>
        </div>

        <form @submit.prevent="submit" class="max-w-6xl">
            <div>
                <InputLabel for="title" value="Title" />

                <TextInput
                    id="title"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.title"
                    required
                    autofocus
                />

                <InputError class="mt-2" :message="form.errors.title" />
            </div>

            <div class="mt-4">
                <InputLabel for="description" value="Description" />

                <TextInput
                    id="description"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.description"
                    required
                />

                <InputError class="mt-2" :message="form.errors.description" />
            </div>

            <div class="mt-4">
                <PrimaryButton
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >
                    {{ route.params.id ? 'Update' :  'Save' }}
                </PrimaryButton>
            </div>
        </form>
    </AuthenticatedLayout>
</template>
