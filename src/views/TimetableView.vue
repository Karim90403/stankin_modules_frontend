<script setup lang="ts">
import { ref } from 'vue';
import TheTimetable from '@/components/TheTimetable.vue'; // @ is an alias to /src

let id = 0

interface day{
  dayWeek: string,
  date: number,
  id: number,
  isActive: boolean
}

const days = ref<Array<day>>([
  {dayWeek: "Пн", date: 12.12, id: id++, isActive: true},
  {dayWeek: "Вт", date: 13.12, id: id++, isActive: false},
  {dayWeek: "Ср", date: 14.12, id: id++, isActive: false},
  {dayWeek: "Чт", date: 15.12, id: id++, isActive: false},
  {dayWeek: "Пт", date: 16.12, id: id++, isActive: false},
  {dayWeek: "Сб", date: 17.12, id: id++, isActive: false},
  {dayWeek: "Вс", date: 18.12, id: id++, isActive: false},
])

const Activate = (id: number): void => {
  days.value.forEach(item =>{
  if (item.id == id) {
    item.isActive = true;
  } else if (item.id != id && item.isActive == true){
    item.isActive = false;
  }
 })
}
</script>

<template>
  <img class="h-7 absolute top-5 cursor-pointer  left-3 z-10 sm:top-24 sm:left-12 sm:h-10" src="../assets/left.png">
  <div class="flex mt-1 bg-transparent overflow-y-scroll z-10 ml-10 sm:left-0 w-4/5 sm:w-full sm:ml-0 sm:mt-16 sm:justify-center sm:items-center">
    <div v-for="item in days" :key="item.id" class="flex items-center cursor-pointer transition duration-300 my-2 px-4 py-3 mx-3 rounded-full shadow flex-col sm:h-auto" :class="item.isActive ? 'bg-slate-300' : 'bg-white hover:bg-slate-200'" @click="Activate(item.id)">
      <span class="text-xs sm:text-sm">{{item.dayWeek}}</span>
      <span class="text-xs sm:text-sm">{{item.date}}</span>
    </div>  
  </div>
  <img class="h-7 absolute top-5 cursor-pointer right-3 z-10 sm:top-24 sm:right-12 sm:h-10"  src="../assets/right.png">
  <TheTimetable></TheTimetable>
</template>