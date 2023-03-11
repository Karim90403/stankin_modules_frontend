<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TheModule from '@/components/TheModule.vue'; // @ is an alias to /src
import TheModuleRaiting from '@/components/TheModuleRaiting.vue'; // @ is an alias to /src
import axios from 'axios';

let semesters = ref<Array<string>>(['---']);
const modules = ref<Array<module>>()

interface module{
  subject: subject,
  marks: marks
}

interface subject{
  title: string,
  factor: number
}

interface marks{
  module1: grade,
  module2: grade,
  credit?: grade,
  exam?: grade
}

interface grade{ 
  value: number,
  color: number
}

const getModules = async(event: Event) => {
  try{
    const semester = event.target as HTMLInputElement;
    let response = await axios.post("/api/getModules", {
        token: localStorage.getItem("accessToken"),
        semester: semester.value 
    })
    modules.value = response.data.modules
  }
  catch(error){
    console.log(error)
  }
}

onMounted( async() => {
  try{
    let response = await axios.post("/api/getSemesters", {
        token: localStorage.getItem("accessToken")
    })
    semesters.value = response.data
  }
  catch(error){
    console.log(error)
  }
  try{
    let response = await axios.post("/api/getModules", {
        token: localStorage.getItem("accessToken"),
        semester: semesters.value[semesters.value.length - 1]
    })
    modules.value = response.data.modules
  }
  catch(error){
    console.log(error)
  }
})

onMounted( () => {
  if(!localStorage.getItem("accessToken")){
    window.location.href = 'https://lk.stankin.ru/webapi/oauth/authorize?response_type=code&client_id=StankinModules&redirect_uri=https://stankinstudy.online/oauthresponse'
  }
})
</script>

<template>
  <div class="flex justify-center">
    <div class="mt-3 sm:absolute xl:w-96">
      <select @change="getModules($event)" class="form-select shadow-xl drop-shadow-2xl appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-sky-600 focus:outline-none" aria-label="Default select example">
        <option v-for="semester in semesters" :key="semester" :value="semester">{{ semester }}</option>
      </select>
    </div>
  </div>
  <div class="flex justify-center mt-4 mb-3 sm:items-center sm:h-screen">
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
        <TheModule v-for="mod in modules" :key=mod.subject.title :subjectName="mod.subject.title"
        :first-module="mod.marks.module1?.value ?? 0" :secondModule="mod.marks.module2?.value ?? 0" :offset="mod.marks.credit?.value" 
        :exam="mod.marks.exam?.value"></TheModule>
        <TheModuleRaiting v-for="mod in modules" :key=mod.subject.title :subjectName="mod.subject.title"
        :first-module="mod.marks.module1?.value ?? 0"/>
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