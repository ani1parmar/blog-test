<script setup>
import {computed, onMounted} from "vue";

const props = defineProps({
    data: {
        type: Object,
        default: {},
    },
});

const prevPage = computed(() => {
    return props.data.links[0]
})

const nextPage = computed(() => {
    return props.data.links[props.data.links.length - 1]
})

defineEmits(['paginationChangePage']);

const getQueryParams = (url) => {
    const paramArr = url.slice(url.indexOf('?') + 1).split('&');
    const params = {};
    paramArr.map(param => {
        const [key, val] = param.split('=');
        params[key] = decodeURIComponent(val);
    })
    return params;
}

</script>
<template>
    <nav v-if="data?.last_page > 1">
        <ul class="inline-flex -space-x-px">
            <li class="lg:hidden">
                <button
                    @click="$emit('paginationChangePage', getQueryParams(prevPage.url))"
                    class="px-3 py-2 bg-white text-gray-500 leading-tight border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                    :class="{
                        'hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white' : prevPage.url,
                        'cursor-not-allowed' : !prevPage.url
                    }"
                    :disabled="prevPage.url == null"
                    v-html="'&laquo; Previous'"
                />
                <button
                    @click="$emit('paginationChangePage', getQueryParams(nextPage.url))"
                    class="px-3 py-2 ml-3 bg-white text-gray-500 leading-tight border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                    :class="{
                        'hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white' : nextPage.url,
                        'cursor-not-allowed' : !nextPage.url
                    }"
                    :disabled="nextPage.url == null"
                    v-html="'Next &raquo;'"
                />
            </li>
            <li v-for="link in data?.links || []" class="hidden lg:block">
                <button
                    @click="$emit('paginationChangePage', getQueryParams(link.url))"
                    class="px-3 py-2 leading-tight border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                    :class="{
                        'hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white' : link.url,
                        'bg-white text-gray-500' : !link.active,
                        'bg-blue-50 text-blue-600 dark:!bg-gray-600 dark:!border-gray-700 dark:!text-gray-400' : link.active
                    }"
                    :disabled="link.url == null"
                    v-html="link.label"
                />
            </li>
        </ul>
    </nav>
</template>
