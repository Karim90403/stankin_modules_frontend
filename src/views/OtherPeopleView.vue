<script setup lang="ts">
import { ref } from 'vue';

const isProfessor = ref<boolean>(true)
const inputValue = ref<string>("")

const watchProfessor = ():void => {isProfessor.value = true}
const watchGroup = ():void => {isProfessor.value = false}
const clearValue = ():void => {inputValue.value = ""}


</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <div class="w-4/5 shadow-2xl py-7 table-auto rounded bg-white sm:w-1/2">
            <span class="text-xl text-center block w-full text-black sm:text-2xl">Узнать расписание</span>
            <div class="flex justify-around my-10">
                <span class="text-lg cursor-pointer sm:text-xl" :class="!isProfessor ? 'text-green-300' : 0" @click="watchGroup()">Группы</span>
                <span class="text-lg cursor-pointer sm:text-xl" :class="isProfessor ? 'text-green-300' : 0" @click="watchProfessor()">Преподавателя</span>
            </div>
            <div class="flex justify-center mt-10 mb-5">
                <div class="flex w-full items-center border-b border-slate-500 py-2 sm:w-2/3">
                    <input class="appearance-none text-xs bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none sm:text-lg" v-model="inputValue" type="text" :placeholder="isProfessor ? 'Введите ФИО преподавателя': 'Введите номер группы'" aria-label="Full name">
                    <button class="flex-shrink-0 bg-slate-500 text-xs hover:bg-slate-700 border-slate-500 hover:border-slate-700 border-4 text-white py-1 px-2 rounded sm:text-sm" type="button">
                    Ввести
                    </button>
                    <button class="flex-shrink-0 text-xs border-transparent border-4 text-slate-500 hover:text-slate-800 py-1 px-2 rounded sm:text-sm" type="button" @click="clearValue()">
                    Стереть
                    </button>
                </div>
            </div>
            <div class="flex justify-center my-3">
                <button class="group relative text-center cursor-pointer mt-5 py-2 w-2/3 border text-xs border-transparent font-medium rounded-md text-white bg-slate-500 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-700 sm:text-2xl lg:text-sm sm:w-1/2">
                    Посмотреть расписание
                </button>
             </div>
        </div>
    </div>
</template>

