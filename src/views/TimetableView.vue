<script setup lang="ts">
import { ref, computed } from 'vue';
import Timetable from '@/components/Timetable.vue'; // @ is an alias to /src
let id = 0

const items = ref<Array<any>>([
  {dayWeek: "Пн", date: 12.12, id: id++, isActive: true},
  {dayWeek: "Вт", date: 13.12, id: id++, isActive: false},
  {dayWeek: "Ср", date: 14.12, id: id++, isActive: false},
  {dayWeek: "Чт", date: 15.12, id: id++, isActive: false},
  {dayWeek: "Пт", date: 16.12, id: id++, isActive: false},
  {dayWeek: "Сб", date: 17.12, id: id++, isActive: false},
  {dayWeek: "Вс", date: 18.12, id: id++, isActive: false},
])

const subjects = ref<Array<any>>([
  {startTime: "12:20", endTime: "14:00", name: "Компьютерная графика и геометрия",auditory: "0408", professor: "Толок А.В.", typeOf: "Семинары", id: id++,},
  {startTime: "14:10", endTime: "15:50", name: "Архитектура ЭВМ и ВС", auditory: "0308", professor: "Саркисова И.О.", typeOf: "Лабараторные занятия", id: id++},
  {startTime: "16:00", endTime: "17:40", name: "Программирование специализированных вычислительных устройств", auditory: "210(a)", professor: "Волкова О.Р.", typeOf: "Лекции" , id: id++}
])

const Activate = (id: number): void => {
 items.value.forEach(item =>{
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
    <div v-for="item in items" :key="item.id" class="flex items-center cursor-pointer transition duration-300 my-2 px-4 py-3 mx-3 rounded-full shadow flex-col sm:h-auto" :class="item.isActive ? 'bg-slate-300' : 'bg-white hover:bg-slate-200'" @click="Activate(item.id)">
      <span class="text-xs sm:text-sm">{{item.dayWeek}}</span>
      <span class="text-xs sm:text-sm">{{item.date}}</span>
    </div>  
  </div>
  <img class="h-7 absolute top-5 cursor-pointer right-3 z-10 sm:top-24 sm:right-12 sm:h-10"  src="../assets/right.png">


  <div class="flex items-center flex-col mt-12" v-if="subjects.length < 0">
    <Timetable 
    v-for="subject in subjects"
    :key="subject.id"
    :startTime="subject.startTime"
    :endTime="subject.endTime" 
    :subject="subject.name"
    :auditory="subject.auditory"
    :professor="subject.professor"
    :typeSubject="subject.typeOf"
    ></Timetable>
  </div>
  <div class="text-center absolute top-0 -z-10 text-xl w-screen h-screen flex flex-col justify-center items-center sm:text-2xl§  Бвшм сдфыы=Эеуче-сутеук фиыщдгеу ещз-0 еуче-чд ц-ыскуут р-ыскуут адуч адуч-сщд огыешан-сутеук шеуьы-сутеук ыьЖеуче-2чд>Э м-удыуЮ
" v-else>
    <img src="../assets/chill.svg" class="w-1/4">
    Нет пар
  </div>
</template>