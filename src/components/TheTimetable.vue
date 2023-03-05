<script setup lang="ts">
import { ref, onMounted, onBeforeMount, watch } from 'vue';
import { useStore } from "vuex";
import { defineProps } from 'vue';
import TheTimetablePart from '@/components/TheTimetablePart.vue'; // @ is an alias to /src
import BaseIcon from '@/components/BaseIcon.vue';
import axios from 'axios';

let id = 0;
const groupChecker = ref<boolean>(false)
const mountCheker = ref<boolean>(false)
const pairsChecker = ref<boolean>(false)
let store = useStore()

interface subject{
  startTime: string,
  endTime: string,
  name: string,
  auditory: string,
  lecturer: string,
  typeOf: string,
  group: string,
  id: number
}

interface Row{
  class_name: string,  
  class_type: string,
  end_time: string,
  group_name: string,
  place: string,
  professor: string, 
  start_time: string,
  id: number
}

const props = defineProps({
  findedDate: Date
})

const date = ref<Date>(props.findedDate ?? new Date())
const subjects = ref<Array<subject>>([])

  watch(() => props, findedDate => {
      console.log(
        "Watch props.selected function called with args:",
        findedDate
      );
    });

onBeforeMount( () => { mountCheker.value = true })
onMounted( async () => { 
  try{
    if(store.state.isLecturer.lenght === undefined){
      store.state.isLecturer = eval(localStorage.getItem("isLecturer") ?? "false")
    }
    if(store.state.isLecturer == false){
      if(store.state.group.lenght === undefined){
        store.state.group = localStorage.getItem("group") ?? "default"
      }
    }
    else{
      if(store.state.lecturer.lenght === undefined){
        store.state.lecturer = localStorage.getItem("lecturer") ?? "default"
      }
    }
    let res = await axios.post("/api/getTimetable", {
        isLecturer: store.state.isLecturer,
        lecturer: eval(store.state.lecturer),
        group: eval(store.state.group),
        date: date.value.toISOString().substring(0, 10)
      })      
    groupChecker.value = true
    
    if(store.state.isLecturer){
      let groups = ref<Array<string>>([])
      let lection = ref<string>("")
      res.data.rows.forEach((row: Row, index: number) => {
        if(row.class_type == "лекции"){
          if(lection.value != row.class_name){
            lection.value = row.class_name
            groups.value = []
            groups.value.push(row.group_name)
          }
          else {
            groups.value.push(row.group_name)
            if(index+1 == res.data.rowCount){
              subjects.value.push(
                {startTime: new Date(new Date(row.start_time).getTime()).toLocaleTimeString("ru-RU",  { hour: "2-digit", minute: "2-digit" }), endTime: new Date(new Date(row.end_time).getTime()).toLocaleTimeString("ru-RU",  { hour: "2-digit", minute: "2-digit" }) , name: row.class_name ,auditory: row.place , lecturer: row.professor , typeOf: row.class_type , group: groups.value.join() , id: id++,},
              )
            }
            else if(res.data.rows[index+1].class_name != lection.value){
              subjects.value.push(
                {startTime: new Date(new Date(row.start_time).getTime()).toLocaleTimeString("ru-RU",  { hour: "2-digit", minute: "2-digit" }), endTime: new Date(new Date(row.end_time).getTime()).toLocaleTimeString("ru-RU",  { hour: "2-digit", minute: "2-digit" }) , name: row.class_name ,auditory: row.place , lecturer: row.professor , typeOf: row.class_type , group: groups.value.join() , id: id++,},
              )
            }
          }
        }
        else{
          subjects.value.push(
            {startTime: new Date(new Date(row.start_time).getTime()).toLocaleTimeString("ru-RU",  { hour: "2-digit", minute: "2-digit" }), endTime: new Date(new Date(row.end_time).getTime()).toLocaleTimeString("ru-RU",  { hour: "2-digit", minute: "2-digit" }) , name: row.class_name ,auditory: row.place , lecturer: row.professor , typeOf: row.class_type , group: row.group_name , id: id++,},
          )
        }
      });
    }
    else{
      res.data.rows.forEach((row: Row) => {
        subjects.value.push(
          {startTime: new Date(new Date(row.start_time).getTime()).toLocaleTimeString("ru-RU",  { hour: "2-digit", minute: "2-digit" }), endTime: new Date(new Date(row.end_time).getTime()).toLocaleTimeString("ru-RU",  { hour: "2-digit", minute: "2-digit" }) , name: row.class_name ,auditory: row.place , lecturer: row.professor , typeOf: row.class_type , group: row.group_name , id: id++,},
        )
      });
    }
    if(res.data.rowCount > 0){
      pairsChecker.value = true
    }
  }
  catch (error){
    console.log(error);
    groupChecker.value = false
  }
})
</script>

<template>
  <div class="flex items-center flex-col mt-12" v-if="!mountCheker">
    <div class="mt-4 w-4/5 px-5 py-3 h-20 shadow-xl rounded bg-gradient-to-r from-white flex justify-between items-center sm:w-1/2"></div>
    <div class="mt-4 w-4/5 px-5 py-3 h-20 shadow-xl rounded bg-gradient-to-r from-white flex justify-between items-center sm:w-1/2"></div>
    <div class="mt-4 w-4/5 px-5 py-3 h-20 shadow-xl rounded bg-gradient-to-r from-white flex justify-between items-center sm:w-1/2"></div>
  </div>
  <div class="text-center absolute top-0 -z-10 text-xl w-screen h-screen flex flex-col justify-center items-center sm:text-2xl" v-else-if="!groupChecker">
    <BaseIcon class="w-1/4" icon="none" viewBox="0 0 64 64" stroke-width="2" stroke="#000000" fill="none"/>
    Не удалось обнаружить вашу группу
  </div>
  <div class="text-center absolute top-0 -z-10 text-xl w-screen h-screen flex flex-col justify-center items-center sm:text-2xl" v-else-if="!pairsChecker">
    <BaseIcon class="w-1/4" icon="chill" viewBox="0 0 64 64" stroke-width="3" stroke="#000000" fill="none"/>
    Нет пар
  </div>
  <div class="flex items-center flex-col mt-12" v-else-if="subjects.length > 0">
    <TheTimetablePart 
    v-for="subject in subjects"
    :key="subject.id"
    :startTime="subject.startTime"
    :endTime="subject.endTime" 
    :subject="subject.name"
    :auditory="subject.auditory"
    :lecturer="subject.lecturer"
    :typeSubject="subject.typeOf"
    :isLecturer="store.state.isLecturer"
    :group="subject.group"
    ></TheTimetablePart>
  </div>
</template>