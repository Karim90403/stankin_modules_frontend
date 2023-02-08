<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router'
import router from '../router/index';
import { useStore } from 'vuex';
import axios from 'axios';

const route = useRoute()
const store = useStore()

onMounted(() => {
    store.state.isModules = true;
    store.state.isTimetable = false;
    store.state.isOtherPeople = false;
})

onMounted(async () => {
    try {
        let response = await axios.post("http://localhost:8014/api/getToken", {
            code: route.query.code
        })
        console.log(response.data.access_token); 
        store.state.access_token = response.data.access_token
        localStorage.setItem("accessToken", JSON.stringify(store.state.access_token))
        router.push("/modules")
    } catch (error) {
        console.log(error);
    }
}

)
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <table class="w-4/5 shadow-2xl table-auto rounded bg-white sm:w-1/2">
            <thead class="text-sm sm:text-base">
                <tr class="border-b-2 border-gray-500">
                    <td>Предмет</td>
                    <td class=" text-center">М1</td>
                    <td class=" text-center">М2</td>
                    <td class=" text-center">Зач</td>
                    <td>Экз</td>
                </tr>
            </thead>
            <tbody>
                <TheModule v-for="subject in 11" :key="subject"></TheModule>
                <tr v-for="subject in 11" :key="subject" class="border-b text-sm border-gray-500 sm:text-base">
                    <td>-------------</td>
                    <td class="text-center">--</td>
                    <td class="text-center">--</td>
                    <td class="text-center">--</td>
                    <td class="text-center">--</td>
                </tr>
                <tr>
                    <td class="text-sm sm:text-base">
                        Ожидаемый рейтинг: --
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
td {
    padding: .5em;
}

@media (min-width: 640px) {
    td {
        padding: .5em 1em .5em 1em;
    }
}
</style>