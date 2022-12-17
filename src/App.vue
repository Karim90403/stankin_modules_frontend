<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import router from './router/index';
import { useStore } from 'vuex';

const isModules = ref<boolean>(false)
const isTimetable = ref<boolean>(true)
const store = useStore()

const toModules = ():void => {
    if(isTimetable.value){
      router.push('/modules')
      isModules.value = true;
      isTimetable.value = false
    }
}

const toTimetable = ():void => {
  if(isModules.value){
    router.push('/')
      isModules.value = false;
      isTimetable.value = true
  }
}

onMounted(() => {
  console.log(useStore())
    if(!store.state.verify){
      router.push('/register')
    }
})
</script>

<template>
  <div v-if="store.state.verify" class="p-4 top-1/3 absolute hidden w-24 sm:block">
    <div class="py-4 px-2 text-gray-900 bg-white rounded shadow-lg ">
      <span class="cursor-pointer px-2 block mb-5" @click="toModules()">
        <img alt="modules" class="p-2 rounded-full" src="./assets/modules.svg" :class="isModules ? 'bg-gray-200' : 'bg-white'">
      </span>
      <span class="cursor-pointer px-2 block" @click="toTimetable()">
        <img alt="timetable" class="p-2 rounded-full" src="./assets/calendar.svg" :class="isTimetable ? 'bg-gray-200' : 'bg-white'">
      </span>
    </div>
  </div>

  <div v-if="store.state.verify" class="p-4 w-full block fixed bottom-0 sm:hidden">
      <div class="p-2 text-gray-900 bg-white rounded-lg shadow-lg flex justify-around">
        <span class="cursor-pointer w-12 px-2 block" @click="toModules()">
          <img alt="modules" class="p-2  rounded-full" src="./assets/modules.svg" :class="isModules ? 'bg-gray-200' : 'bg-white'">
        </span>
        <span class="cursor-pointer w-12 px-2 block" @click="toTimetable()">
          <img alt="timetable" class="p-2 rounded-full" src="./assets/calendar.svg" :class="isTimetable ? 'bg-gray-200' : 'bg-white'">
        </span>
      </div>
    </div>
  <router-view/>
</template>

<style>
body{
background-color: #dedede;
}
</style>