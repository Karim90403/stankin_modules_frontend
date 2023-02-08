<script setup lang="ts">
import { ref,onMounted } from 'vue';
import TheModule from '@/components/TheModule.vue'; // @ is an alias to /src
let id = 0;


interface module{
  name: string,
  firstModule: number,
  secondModule: number,
  offset?: number,
  exam?: number,
  id: number
}

const modules = ref<Array<module>>([
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

onMounted( () => {
  if(!localStorage.getItem("accessToken")){
    window.location.href = 'https://lk.stankin.ru/webapi/oauth/authorize?response_type=code&client_id=StankinModules&redirect_uri=https://localhost:8080/oauthresponse'
  }
})
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <table class="w-4/5 shadow-2xl table-auto rounded bg-white sm:w-1/2">
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
        <TheModule v-for="subject in modules" :key="subject.id" :subjectName="subject.name"
          :firstModule=subject.firstModule :secondModule=subject.secondModule :offset="subject.offset"
          :exam="subject.exam"></TheModule>
        <tr>
          <td class="text-sm sm:text-base">
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