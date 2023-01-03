<script setup lang="ts">
import { onMounted } from 'vue';
import router from './router/index';
import { useStore } from 'vuex';

const store = useStore()

const toModules = ():void => {
    if(!store.state.isModules){
      router.push('/modules')
      store.state.isModules = true;
      store.state.isTimetable = false;
      store.state.isOtherPeople = false;
    }
}

const toTimetable = ():void => {
  if(!store.state.isTimetable){
    router.push('/timetable')
    store.state.isModules = false;
    store.state.isTimetable = true;
    store.state.isOtherPeople = false;
  }
}

const toOtherPeople = ():void => {
  if(!store.state.sOtherPeople){
    router.push('/otherPeople')
    store.state.isModules = false;
    store.state.isTimetable = false;
    store.state.isOtherPeople = true;

  }
}

onMounted(() => {
  console.log(useStore())
    if(!store.state.verify){
      router.push('/register')
    }
    else{
      if(store.state.group.length>0){
      router.push('/timetable')
      }
      else{
        router.push('/otherPeople')
      }
    }
})
</script>

<template>
  <div v-if="store.state.verify" class="p-4 top-1/3 absolute hidden w-24 sm:block">
    <div class="py-4 px-2 text-gray-900 bg-white rounded shadow-lg ">
      <span class="cursor-pointer px-2 block mb-5" @click="toModules()">
        <img alt="modules" class="p-2 transition duration-300 rounded-full" src="./assets/modules.svg" :class="store.state.isModules ? 'bg-gray-200' : 'bg-white'">
      </span>
      <span class="cursor-pointer px-2 block mb-5" @click="toTimetable()">
        <img alt="timetable" class="p-2 transition duration-300 rounded-full" src="./assets/calendar.svg" :class="store.state.isTimetable ? 'bg-gray-200' : 'bg-white'">
      </span>
      <span class="cursor-pointer px-2 block" @click="toOtherPeople()">
        <img alt="others" class="p-2 transition duration-300 rounded-full" src="./assets/others.svg" :class="store.state.isOtherPeople ? 'bg-gray-200' : 'bg-white'">
      </span>
    </div>
  </div>

  <div v-if="store.state.verify" class="p-4 w-full block fixed bottom-0 sm:hidden">
      <div class="p-2 text-gray-900 bg-white rounded-lg shadow-lg flex justify-around">
        <span class="cursor-pointer w-12 px-2 block" @click="toModules()">
          <img alt="modules" class="p-2 transition duration-300 rounded-full" src="./assets/modules.svg" :class="store.state.isModules ? 'bg-gray-200' : 'bg-white'">
        </span>
        <span class="cursor-pointer w-12 px-2 block" @click="toTimetable()">
          <img alt="timetable" class="p-2 transition duration-300 rounded-full" src="./assets/calendar.svg" :class="store.state.isTimetable ? 'bg-gray-200' : 'bg-white'">
        </span>
        <span class="cursor-pointer w-12 px-2 block" @click="toOtherPeople()">
          <img alt="others" class="p-2 transition duration-300 rounded-full" src="./assets/others.svg" :class="store.state.isOtherPeople ? 'bg-gray-200' : 'bg-white'">
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