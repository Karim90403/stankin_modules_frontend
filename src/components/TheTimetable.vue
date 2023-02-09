<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
import TheTimetablePart from '@/components/TheTimetablePart.vue'; // @ is an alias to /src
import BaseIcon from '@/components/BaseIcon.vue';
import axios from 'axios';
import { useStore } from "vuex";
import { defineProps } from 'vue';

const groupChecker = ref<boolean>(false)
const mountCheker = ref<boolean>(false)
const pairsChecker = ref<boolean>(false)
let id = 0;
let store = useStore()

interface subject{
  startTime: string,
  endTime: string,
  name: string,
  auditory: string,
  lecturer: string,
  typeOf: string,
  id: number
}

const props = defineProps({
  findedDate: Date
})

const date = ref<Date>(props.findedDate ?? new Date())

const subjects = ref<Array<subject>>([
  {startTime: "12:20", endTime: "14:00", name: "Компьютерная графика и геометрия",auditory: "0408", lecturer: "Толок А.В.", typeOf: "Семинары", id: id++,},
  {startTime: "14:10", endTime: "15:50", name: "Архитектура ЭВМ и ВС", auditory: "0308", lecturer: "Саркисова И.О.", typeOf: "Лабараторные занятия", id: id++},
  {startTime: "16:00", endTime: "17:40", name: "Программирование специализированных вычислительных устройств", auditory: "210(a)", lecturer: "Волкова О.Р.", typeOf: "Лекции" , id: id++}
])

onBeforeMount( () => { mountCheker.value = true })

onMounted( async () => {
  try{
    if(store.state.reqestAdress.lenght === undefined){
      store.state.reqestAdress = `${eval(localStorage.getItem("reqestAdress") ?? "default")}`
    }
    console.log(`${(store.state.reqestAdress).replaceAll(' ', '.')}&date=${date.value.toISOString().substring(0, 10)}`);
    let res = await axios.post("http://localhost:8014/api/getData", { url: `${(store.state.reqestAdress).replaceAll(' ', '.')}&date=${date.value.toISOString().substring(0, 10)}`})
    console.log(res.data);
    groupChecker.value = true
    if(res.data.pairs.length > 0){
      pairsChecker.value = true
    }
  }
  catch (error){
    console.log(error);
    groupChecker.value = false
  }
})
</script>

<template>
  <div class="flex items-center flex-col mt-12" v-if="!mountCheker">
    <div class="mt-4 w-4/5 px-5 py-3 h-20 shadow-xl rounded bg-gradient-to-r from-white flex justify-between items-center sm:w-1/2"></div>
    <div class="mt-4 w-4/5 px-5 py-3 h-20 shadow-xl rounded bg-gradient-to-r from-white flex justify-between items-center sm:w-1/2"></div>
    <div class="mt-4 w-4/5 px-5 py-3 h-20 shadow-xl rounded bg-gradient-to-r from-white flex justify-between items-center sm:w-1/2"></div>
  </div>
  <div class="text-center absolute top-0 -z-10 text-xl w-screen h-screen flex flex-col justify-center items-center sm:text-2xl" v-else-if="!groupChecker">
    <BaseIcon class="w-1/4" icon="none" viewBox="0 0 64 64" stroke-width="2" stroke="#000000" fill="none"/>
    Не удалось обнаружить вашу группу
  </div>
  <div class="text-center absolute top-0 -z-10 text-xl w-screen h-screen flex flex-col justify-center items-center sm:text-2xl" v-else-if="pairsChecker">
    <BaseIcon class="w-1/4" icon="chill" viewBox="0 0 64 64" stroke-width="3" stroke="#000000" fill="none"/>
    Нет пар
  </div>
  <div class="flex items-center flex-col mt-12" v-else-if="subjects.length > 0">
    <TheTimetablePart 
    v-for="subject in subjects"
    :key="subject.id"
    :startTime="subject.startTime"
    :endTime="subject.endTime" 
    :subject="subject.name"
    :auditory="subject.auditory"
    :lecturer="subject.lecturer"
    :typeSubject="subject.typeOf"
    ></TheTimetablePart>
  </div>
</template>