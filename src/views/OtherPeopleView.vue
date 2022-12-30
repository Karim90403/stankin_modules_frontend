<script setup lang="ts">
import { ref, computed } from 'vue';
import router from '../router/index';
import { useStore } from 'vuex';

const store = useStore()

const isProfessor = ref<boolean>(false)
const inputValue = ref<string>("")
const activeFlag = ref<boolean>(false)

const watchProfessor = ():void => {isProfessor.value = true}
const watchGroup = ():void => {isProfessor.value = false}
const clearValue = ():void => {inputValue.value = ""}
const groupList = ref<Array<string>>([
    "ИДБ-21-01",
    "ИДБ-21-02",
    "ИДБ-21-03",
    "ИДБ-21-04"
])

const professorList = ref<Array<string>>([
    "Толок А.В.",
    "Саркисова И.О.",
    "Волкова О.Р."
])

const toTimetable = ():void => {
  if(!store.state.isTimetable){
    router.push('/timetable')
    store.state.isModules = false;
    store.state.isTimetable = true;
    store.state.isOtherPeople = false;
  }
}

 const filtredList = computed(():Array<string> =>{
    if(isProfessor.value){
        return professorList.value.filter(name => {
            return name.toUpperCase().indexOf(inputValue.value.toUpperCase()) !== -1
        })
    }
    else{
        return groupList.value.filter(name => {
            return name.toUpperCase().indexOf(inputValue.value.toUpperCase()) !== -1
        })
    }
})
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <div class="w-4/5 shadow-2xl py-7 rounded bg-white sm:w-1/2">
            <span class="text-xl text-center block w-full text-black sm:text-2xl">Узнать расписание</span>
            <div class="flex justify-around my-10">
                <span class="text-lg cursor-pointer transition duration-300 sm:text-xl" :class="!isProfessor ? 'text-emerald-300 border-b border-emerald-300' : 'text-slate-400 hover:border-b hover:border-slate-400'" @click="watchGroup()">Группы</span>
                <span class="text-lg cursor-pointer transition duration-300 sm:text-xl" :class="isProfessor ? 'text-emerald-300 border-b border-emerald-300' : 'text-slate-400 hover:border-b hover:border-slate-400'" @click="watchProfessor()">Преподавателя</span>
            </div>
            <div class="flex justify-center mt-10 mb-5">
                <div class="flex w-5/6 items-center border-b border-slate-500 py-2 sm:w-2/3">
                    <input class="appearance-none text-xs bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none sm:text-lg" v-model="inputValue" @focus="activeFlag = true" @blur="activeFlag = false" type="text" :placeholder="isProfessor ? 'Введите ФИО': 'Введите номер'" aria-label="Full name">
                    <button class="flex-shrink-0 bg-slate-500 text-xs hover:bg-slate-700 border-slate-500 hover:border-slate-700 border-2 text-white py-1 px-2 rounded sm:text-sm sm:border-4" type="button">
                    Ввести
                    </button>
                    <button class="flex-shrink-0 text-xs border-transparent border text-slate-500 hover:text-slate-800 py-1 px-2 rounded sm:text-sm" type="button" @click="clearValue()">
                    Стереть
                    </button>
                </div>
            </div>
            <div class="flex justify-center absolute w-screen z-10 right-0">
                <div class="w-4/5 flex justify-center sm:w-1/2">
                    <ul class="px-2 py-2 w-5/6 shadow-md bg-slate-50 opacity-95 transition-all duration-300 ease-in-out h-auto rounded sm:w-2/3" v-if="filtredList.length > 0" :class="activeFlag ? '' : 'h-0 py-0 overflow-hidden'">
                        <li v-for="(name) in filtredList" :key="name"
                            class="px-2 py-1 sm:text-2xl lg:text-xl">
                            {{ name }}
                        </li>
                    </ul>
                </div>
                
            </div>
            <div class="flex justify-center my-3">
                <span class="group relative text-center cursor-pointer mt-5 py-2 w-2/3 border text-xs font-medium rounded-md text-white bg-slate-500 hover:bg-slate-600 focus:ring-2 focus:ring-offset-2 focus:ring-slate-700 sm:text-2xl lg:text-sm sm:w-1/2" @click="toTimetable()">
                    Посмотреть расписание
                </span>
             </div>
        </div>
    </div>
</template>