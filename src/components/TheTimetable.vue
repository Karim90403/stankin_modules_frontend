<script setup lang="ts">
import { ref } from 'vue';
import TheTimetablePart from '@/components/TheTimetablePart.vue'; // @ is an alias to /src

const groupChecker = ref<boolean>(true)
let id = 0;

interface subject{
  startTime: string,
  endTime: string,
  name: string,
  auditory: string,
  professor: string,
  typeOf: string,
  id: number
}

const subjects = ref<Array<subject>>([
  {startTime: "12:20", endTime: "14:00", name: "Компьютерная графика и геометрия",auditory: "0408", professor: "Толок А.В.", typeOf: "Семинары", id: id++,},
  {startTime: "14:10", endTime: "15:50", name: "Архитектура ЭВМ и ВС", auditory: "0308", professor: "Саркисова И.О.", typeOf: "Лабараторные занятия", id: id++},
  {startTime: "16:00", endTime: "17:40", name: "Программирование специализированных вычислительных устройств", auditory: "210(a)", professor: "Волкова О.Р.", typeOf: "Лекции" , id: id++}
])
</script>

<template>
  <div class="flex items-center flex-col mt-12" v-if="subjects.length > 0">
    <TheTimetablePart 
    v-for="subject in subjects"
    :key="subject.id"
    :startTime="subject.startTime"
    :endTime="subject.endTime" 
    :subject="subject.name"
    :auditory="subject.auditory"
    :professor="subject.professor"
    :typeSubject="subject.typeOf"
    ></TheTimetablePart>
    <div class="mt-4 w-4/5 px-5 py-3 h-20 shadow-xl rounded bg-gradient-to-r from-white flex justify-between items-center sm:w-1/2"></div>

  </div>
  <div class="text-center absolute top-0 -z-10 text-xl w-screen h-screen flex flex-col justify-center items-center sm:text-2xl" v-else-if="groupChecker">
    <img src="../assets/chill.svg" class="w-1/4" alt="chill">
    Нет пар
  </div>
  <div class="text-center absolute top-0 -z-10 text-xl w-screen h-screen flex flex-col justify-center items-center sm:text-2xl" v-else-if="!groupChecker">
    <img src="../assets/alt-sub.svg" class="w-1/4" alt="not correct grpup">
    Не удалось обнаружить вашу группу
  </div>
</template>