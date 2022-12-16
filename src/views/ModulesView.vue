<template>
  <div class="flex justify-center items-center h-screen">
    <table class="w-4/5 shadow-2xl table-auto rounded bg-white sm:w-1/2">
      <thead>
        <tr class="border-b-2 border-gray-500">
          <td class="border-r border-gray-500">Предмет</td>
          <td class="border-r border-gray-500 text-center">М1</td>
          <td class="border-r border-gray-500 text-center">М2</td>
          <td class="border-r border-gray-500 text-center">Зач</td>
          <td>Экз</td>
        </tr>
      </thead>
      <tbody>
        <Module v-for="subject in modules" :key="subject.id" :subjectName="subject.name"
          :firstModule=subject.firstModule :secondModule=subject.secondModule :offset="subject.offset"
          :exam="subject.exam"></Module>
        <tr>
          <td class="">
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

<script lang="ts">
import { defineComponent } from 'vue';
import Module from '@/components/Module.vue'; // @ is an alias to /src
let id = 0;
export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      modules: [
        { name: "Компьютерная графика и геометрия", firstModule: 45, secondModule: 54, offset: 45, id: id++ },
        { name: "Архитектура ЭВМ и ВС", firstModule: 54, secondModule: 54, exam: 45, id: id++ },
        { name: "Программирование специализированных вычислительных устройств", firstModule: 45, secondModule: 45, exam: 54, id: id++ },
        { name: "Политология", firstModule: 45, secondModule: 54, offset: 45, id: id++ },
        { name: "Физика", firstModule: 54, secondModule: 54, exam: 45, id: id++ },
        { name: "Иностранный язык", firstModule: 45, secondModule: 45, offset: 54, id: id++ },
        { name: "Философия", firstModule: 45, secondModule: 54, offset: 45, id: id++ },
        { name: "Учебная практика", firstModule: 54, secondModule: 54, offset: 45, id: id++ },
        { name: "Объектно ориентированное программирование", firstModule: 45, secondModule: 45, exam: 54, id: id++ },
      ]
    }
  },
  components: {
    Module,
  }
})
</script>