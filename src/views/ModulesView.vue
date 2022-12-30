<script setup lang="ts">
import { ref } from 'vue';
import Module from '@/components/Module.vue'; // @ is an alias to /src
let id = 0;
const modules = ref<Array<any>>([
  { name: "Компьютерная графика и геометрия", firstModule: 45, secondModule: 54, offset: 45, id: id++ },
  { name: "Архитектура ЭВМ и ВС", firstModule: 54, secondModule: 54, exam: 45, id: id++ },
  { name: "Программирование специализированных вычислительных устройств", firstModule: 45, secondModule: 45, exam: 54, id: id++ },
  { name: "Политология", firstModule: 45, secondModule: 54, offset: 45, id: id++ },
  { name: "Физика", firstModule: 54, secondModule: 54, exam: 45, id: id++ },
  { name: "Иностранный язык", firstModule: 45, secondModule: 45, offset: 54, id: id++ },
  { name: "Философия", firstModule: 45, secondModule: 54, offset: 45, id: id++ },
  { name: "Учебная практика", firstModule: 54, secondModule: 54, offset: 45, id: id++ },
  { name: "Объектно ориентированное программирование", firstModule: 45, secondModule: 45, exam: 54, id: id++ },
])
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <table class="w-4/5 shadow-2xl table-auto    Бефиду сдфыы=Эц-4/5 ырфвщц-2чд ефиду-фгещ кщгтвув ип-цршеу ыьЖц-1/2ЭЮ
 rounded bg-white sm:w-1/2">
      <thead class="text-sm sm:text-base">
        <tr class="border-b-2 border-gray-500">
          <td>Предмет</td>
          <td class=" text-center">М1</td>
          <td class=" text-center">М2</td>
          <td class=" text-center">Зач</td>
          <td>Экз</td>
        </tr>
      </thead>
      <tbody>
        <Module v-for="subject in modules" :key="subject.id" :subjectName="subject.name"
          :firstModule=subject.firstModule :secondModule=subject.secondModule :offset="subject.offset"
          :exam="subject.exam"></Module>
        <tr>
          <td class="text-xs sm:text-base">
            Ожидаемый рейтинг: 54
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
td {
    padding: .5em;
  }

@media (min-width: 640px) {
  td {
    padding: .5em 1em .5em 1em;
  }
}
</style>