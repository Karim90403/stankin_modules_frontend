<script setup lang="ts">
import { defineComponent,ref } from 'vue';
import router from '../router/index';
import { useStore } from 'vuex';

const store: any = useStore();
const userLogin = ref<string>("")
const userPassword = ref<string>("")
const showMessage = ref<boolean>(false)
const isUserRegistred = ref<boolean>(false)
const isNeedRegistration = ref<boolean>(true)

const Verify = async () => {
  try {
    router.push('/')
    store.state.verify = true
  }catch (error) {
    console.log(error);
    isUserRegistred.value = true
  }
}

const Login = async () => {
  try {
    router.push('/')
    store.state.verify = true
  }catch (error) {
    console.log(error);
    showMessage.value = true
  }
}
</script>

<template>
    <div class="flex justify-center">
      <div class="mt-52 w-4/5 p-16 shadow-2xl rounded bg-white sm:w-1/2">
        <span class="flex justify-center"><img alt="logo" class="w-52" src="../assets/logo.svg"></span>
        <div class="flex justify-center">
            <h1 class="cursor-pointer text-3xl text-center text-black my-4" :class="isNeedRegistration ? 'underline' : 0" @click="isNeedRegistration = true">Регистрация</h1>
            <span class="text-3xl text-center text-black my-4">/</span>
            <h1 class="cursor-pointer text-3xl text-center text-black my-4" :class="!isNeedRegistration ? 'underline' : 0" @click="isNeedRegistration = false">Авторизация</h1>
        </div>
        <div v-if="isNeedRegistration">
          <div v-if="isUserRegistred" class="text-xl mx-auto text-center text-red-400 my-2">Пользователь с данным именем уже зарегестрирован</div>
          <form @submit.prevent="Verify()" class="w-full h-full mt-8 space-y-6 flex flex-col justify-center items-center" action="#" method="POST">
              <input type="hidden" name="remember" value="true">
              <div class="rounded-md shadow-sm -space-y-px">
                  <div>
                      <label for="Login" class="sr-only">Login</label>
                      <input id="Login" v-model="userLogin" name="Login" type="text" autocomplete="Login"
                          required
                          class="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-900 focus:border-red-900 focus:z-10 sm:text-2xl lg:text-sm"
                          placeholder="Логин">
                  </div>
                  <div>
                      <label for="password" class="sr-only">Password</label>
                      <input id="password" v-model="userPassword" name="password" type="password"
                          autocomplete="current-password" required
                          class="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-900 focus:border-red-800 focus:z-10 sm:text-2xl lg:text-sm"
                          placeholder="Пароль">
                  </div>
              </div>
              <div>
                  <button type="submit"
                      class="group relative text-center py-2 px-7 border border-transparent font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 sm:text-2xl lg:text-sm">
                      Зарегестрироваться
                  </button>
              </div>
          </form>
        </div> 
        <div v-else>
          <div v-if="showMessage" class="text-xl text-center mx-auto text-red-400 my-2">Данный пользователь не зарегестрирован</div>
          <form @submit.prevent="Login()" class="w-full h-full mt-8 space-y-6 flex flex-col justify-center items-center" action="#" method="POST">
              <input type="hidden" name="remember" value="true">
              <div class="rounded-md shadow-sm -space-y-px">
                  <div>
                      <label for="Login" class="sr-only">Login</label>
                      <input id="Login" v-model="userLogin" name="Login" type="text" autocomplete="Login"
                          required
                          class="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-900 focus:border-red-900 focus:z-10 sm:text-2xl lg:text-sm"
                          placeholder="Логин">
                  </div>
                  <div>
                      <label for="password" class="sr-only">Password</label>
                      <input id="password" v-model="userPassword" name="password" type="password"
                          autocomplete="current-password" required
                          class="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-900 focus:border-red-900 focus:z-10 sm:text-2xl lg:text-sm"
                          placeholder="Пароль">
                  </div>
              </div>
              <div>
                  <button type="submit"
                      class="group relative text-center cursor-pointer  py-2 px-20 border border-transparent font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 sm:text-2xl lg:text-sm">
                      Войти
                  </button>
              </div>
          </form>
        </div>
      </div>
    </div>
</template>