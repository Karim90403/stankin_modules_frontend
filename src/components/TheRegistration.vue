<script setup lang="ts">
import { ref } from 'vue';
import router from '../router/index';
import { useStore } from 'vuex';

const store = useStore();

const isUserRegistred = ref<boolean>(false)
const userLogin = ref<string>("")
const userGroup = ref<string>("")
const userPassword = ref<string>("")

const Verify = async () => {
  try {
    router.push('/timetable')
    store.state.verify = true
    store.state.isTimetable = true
  }catch (error) {
    console.log(error);
    isUserRegistred.value = true
  }
}

</script>

<template>
    <div v-if="isUserRegistred" class="text-sm mx-auto text-center transition duration-300 text-red-400 my-2 sm:text-xl">Неверный логин или пароль</div>
    <form @submit.prevent="Verify()" class="w-full h-full mt-8 space-y-6 flex flex-col justify-center items-center" action="#" method="POST">
        <input type="hidden" name="remember" value="true">
        <div class="rounded-md shadow-sm -space-y-px">
        <div>
            <label for="Login" class="sr-only">Login</label>
            <input id="Login" v-model="userLogin" name="Login" type="text" autocomplete="Login"
                required
                class="appearance-none rounded-none relative block px-3 py-2 text-sm border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-900 focus:border-red-900 focus:z-10 sm:text-2xl lg:text-sm"
                placeholder="Логин">
        </div>
        <div>
            <label for="Login" class="sr-only">Group</label>
            <input id="Login" v-model="userGroup" name="Login" type="text" autocomplete="Login"
                required
                class="appearance-none rounded-none relative block px-3 py-2 text-sm border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-900 focus:border-red-900 focus:z-10 sm:text-2xl lg:text-sm"
                placeholder="Группа">
        </div>
        <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" v-model="userPassword" name="password" type="password"
                autocomplete="current-password" required
                class="appearance-none rounded-none relative block px-3 py-2 text-sm border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-900 focus:border-red-800 focus:z-10 sm:text-2xl lg:text-sm"
                placeholder="Пароль">
        </div>
        </div>
        <button type="submit"
            class="group relative text-center py-2 px-7 text-sm border border-transparent font-medium rounded-md text-white bg-slate-500 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-700 sm:text-2xl lg:text-sm">
            Зарегестрироваться
        </button>
    </form>
</template>