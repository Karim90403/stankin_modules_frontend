<script setup lang="ts">
import { ref } from 'vue';
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
      <div class="mt-52 w-4/5 p-5 shadow-2xl rounded bg-white sm:w-1/2 sm:p-16">
        <span class="flex justify-center"><img alt="logo" class="w-52" src="../assets/logo.svg"></span>
        <div class="flex justify-between sm:justify-around">
            <h1 class="cursor-pointer text-xl text-center my-4 transition duration-300 sm:text-3xl" :class="isNeedRegistration ? 'text-emerald-300 border-b border-emerald-300' : 'text-slate-400 hover:border-b hover:border-slate-400'" @click="isNeedRegistration = true">Регистрация</h1>
            <h1 class="cursor-pointer text-xl text-center my-4 transition duration-300 sm:text-3xl" :class="!isNeedRegistration ? 'text-emerald-300 border-b border-emerald-300' : 'text-slate-400 hover:border-b hover:border-slate-400'" @click="isNeedRegistration = false">Авторизация</h1>
        </div>
        <div v-if="isNeedRegistration">
          <div v-if="isUserRegistred" class="text-sm mx-auto text-center transition duration-300 text-red-400 my-2 sm:text-xl">Пользователь с данным именем уже зарегестрирован</div>
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
        </div> 
        <div v-else>
          <div v-if="showMessage" class="text-sm text-center mx-auto transition duration-300  text-red-400 my-2 sm:text-xl">Данный пользователь не зарегестрирован</div>
          <form @submit.prevent="Login()" class="w-full h-full mt-8 space-y-6 flex flex-col justify-center items-center" action="#" method="POST">
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
                      <label for="password" class="sr-only">Password</label>
                      <input id="password" v-model="userPassword" name="password" type="password"
                          autocomplete="current-password" required
                          class="appearance-none rounded-none relative block px-3 py-2 text-sm border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-900 focus:border-red-900 focus:z-10 sm:text-2xl lg:text-sm"
                          placeholder="Пароль">
                  </div>
                </div>
                <button type="submit"
                    class="group relative text-center cursor-pointer  py-2 px-10 border text-sm border-transparent font-medium rounded-md text-white bg-slate-500 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-700 sm:text-2xl sm:px-20 lg:text-sm">
                    Войти
                </button>
          </form>
        </div>
      </div>
    </div>
</template>