<script setup>
import {onMounted} from "vue";

const props = defineProps({
    message: {

    },
});
</script>

<template>
    <div v-show="message">

        <p v-if="typeof message == 'string'" class="text-sm text-red-600 dark:text-red-400">
            {{ message }}
        </p>

        <p v-else class="text-sm text-red-600 dark:text-red-400" v-for="error in message">
            {{ error }}
        </p>
    </div>
</template>
