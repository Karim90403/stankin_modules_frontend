<script setup lang="ts">
import { computed } from 'vue';
import router from './router/index';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router'
import BaseIcon from '@/components/BaseIcon.vue';

const store = useStore()
const route = useRoute()

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
    router.push('/')
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

const routeName = computed(():string | null | undefined=>{
  return route.name
})
</script>

<template>
  <div v-if="routeName!='register'" class="p-4 top-1/3 absolute hidden w-24 sm:block">
    <div class="py-4 px-2 text-gray-900 bg-white rounded shadow-lg ">
      <span class="cursor-pointer block transition duration-300 rounded-full mb-5" @click="toModules()" :class="routeName=='modules' ? 'text-blue-300' : 'text-slate-400'">
        <BaseIcon icon="modules" viewBox="0 0 100 100" class="fill-current"/>
      </span>
      <span class="cursor-pointer px-2 transition duration-300 block mb-5" @click="toTimetable()" :class="routeName=='timetable'? 'text-blue-300' : 'text-slate-400'">
        <BaseIcon icon="calendar" viewBox="0 0 20 20" class="fill-current"/>
      </span>
      <span class="cursor-pointer px-2 transition duration-300 block" @click="toOtherPeople()" :class="routeName=='otherPeople' ? 'text-blue-300' : 'text-slate-400'">
        <BaseIcon icon="others" viewBox="0 0 56 56" class="fill-current"/>
      </span>
    </div>
  </div>

  <div v-if="routeName!='register'" class="p-4 w-full block fixed bottom-0 sm:hidden">
      <div class="p-2 text-gray-900 bg-white rounded-lg shadow-lg drop-shadow-xl flex justify-around">
        <span class="cursor-pointer w-12 px-2 block transition duration-300" @click="toModules()" :class="routeName=='modules' ? 'text-blue-300' : 'text-slate-400'">
          <BaseIcon icon="modules" viewBox="0 0 100 100" class="fill-current"/>
        </span>
        <span class="cursor-pointer w-12 px-2 block transition duration-300" @click="toTimetable()" :class="routeName=='timetable' ? 'text-blue-300' : 'text-slate-400'">
          <BaseIcon icon="calendar" viewBox="0 0 20 20" class="fill-current"/>
        </span>
        <span class="cursor-pointer w-12 px-2 block transition duration-300" @click="toOtherPeople()" :class="routeName=='otherPeople' ? 'text-blue-300' : 'text-slate-400'">
          <BaseIcon icon="others" viewBox="0 0 56 56" class="fill-current"/>
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