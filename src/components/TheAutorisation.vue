<script setup lang="ts">
import { ref } from 'vue';
import router from '../router/index';
import { useStore } from 'vuex';
import axios from 'axios';

const store = useStore();

const userLogin = ref<string>("")
const userGroup = ref<string>("")
const userPassword = ref<string>("")
const showMessage = ref<boolean>(false)

const Login = async () => {
  try {
    let response = await axios.post("http://localhost:8014/api/autorisation", { login: userLogin.value, password: userPassword.value })
    router.push('/')
    store.state.verify = true
    store.state.isTimetable = true
    store.state.group = userGroup.value
    localStorage.setItem("userToken", JSON.stringify(response.data.token))
  }catch (error) {
    console.log(error);
    showMessage.value = true
  }
}
</script>

<template>
    <div v-if="showMessage" class="text-sm text-center mx-auto transition duration-300  text-red-400 my-2 sm:text-xl">Данный пользователь не зарегестрирован</div>
    <form @submit.prevent="Login()" class="w-full h-full mt-8 space-y-6 flex flex-col justify-center items-center" action="#" method="POST">
      <input type="hidden" name="remember" value="true">
      <div class="rounded-md shadow-md drop-shadow-xl -space-y-px">
        <label for="Login" class="sr-only">Login</label>
        <input id="Login" v-model="userLogin" name="Login" type="text" autocomplete="Login"
          required
          class="appearance-none rounded-none relative block px-3 py-2 text-sm border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-900 focus:border-red-900 focus:z-10 sm:text-2xl lg:text-sm"
          placeholder="Логин">
        <label for="password" class="sr-only">Password</label>
        <input id="password" v-model="userPassword" name="password" type="password"
          autocomplete="current-password" required
          class="appearance-none rounded-none relative block px-3 py-2 text-sm border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-900 focus:border-red-900 focus:z-10 sm:text-2xl lg:text-sm"
          placeholder="Пароль">
      </div>
      <button type="submit"
          class="group relative text-center cursor-pointer shadow-xl drop-shadow-2xl py-2 px-10 border text-sm border-transparent font-medium rounded-md text-white bg-slate-500 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-700 sm:text-2xl sm:px-20 lg:text-sm">
          Войти
      </button>
    </form>
</template>