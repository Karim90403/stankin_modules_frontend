<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import router from '../router/index';
import { useStore } from 'vuex';
import axios from 'axios';

const store = useStore()

const isProfessor = ref<boolean>(false)
const inputValue = ref<string>("")
const activeFlag = ref<boolean>(false)

const watchProfessor = ():void => {isProfessor.value = true}
const watchGroup = ():void => {isProfessor.value = false}
const clearValue = ():void => {inputValue.value = ""}
const groupList = ref<Array<string>>([
    "АДБ-22-01",
	"АДБ-22-02",
	"АДБ-22-03",
	"АДБ-22-04",
	"АДБ-22-06",
	"АДБ-22-07",
	"АДБ-22-08",
	"АДБ-22-09",
	"АДБ-22-10",
	"АДБ-22-11",
	"ИДБ-22-01",
	"ИДБ-22-02",
	"ИДБ-22-03",
	"ИДБ-22-04",
	"ИДБ-22-05",
	"ИДБ-22-06",
	"ИДБ-22-07",
	"ИДБ-22-08",
	"ИДБ-22-09",
	"ИДБ-22-10",
	"ИДБ-22-11",
	"ИДБ-22-12",
	"ИДБ-22-13",
	"ИДБ-22-14",
	"ИДБ-22-15",
	"ИДБ-22-16",
	"МДБ-22-02",
	"МДБ-22-03",
	"МДБ-22-04",
	"МДБ-22-05",
	"МДБ-22-06",
	"МДБ-22-07",
	"МДБ-22-08",
	"МДБ-22-09",
	"МДБ-22-10",
	"ЭДБ-22-01",
	"ЭДБ-22-02",
	"ЭДБ-22-03",
	"ЭДБ-22-05",
	"ЭДБ-22-06",
	"ЭДБ-22-07",
	"ЭДБ-22-08",
	"ЭДБ-22-09",
	"ЭДБ-22-10",
	"АДБ-21-01",
	"АДБ-21-02",
	"АДБ-21-04",
	"АДБ-21-06",
	"АДБ-21-07",
	"АДБ-21-08",
	"АДБ-21-09",
	"АДБ-21-10",
	"АДБ-21-11",
	"ИДБ-21-01",
	"ИДБ-21-02",
	"ИДБ-21-03",
	"ИДБ-21-04",
	"ИДБ-21-05",
	"ИДБ-21-06",
	"ИДБ-21-07",
	"ИДБ-21-08",
	"ИДБ-21-09",
	"ИДБ-21-10",
	"ИДБ-21-11",
	"ИДБ-21-12",
	"МДБ-21-03",
	"МДБ-21-04",
	"МДБ-21-05",
	"МДБ-21-06",
	"МДБ-21-07",
	"МДБ-21-09",
	"ЭДБ-21-01",
	"ЭДБ-21-01(ИН)",
	"ЭДБ-21-02(02)",
	"ЭДБ-21-02(03)",
	"ЭДБ-21-03",
	"ЭДБ-21-05",
	"ЭДБ-21-06",
	"ЭДБ-21-09",
	"ЭДБ-21-10",
	"АДБ-20-01",
	"АДБ-20-02",
	"АДБ-20-03",
	"АДБ-20-06",
	"АДБ-20-07",
	"АДБ-20-08",
	"АДБ-20-09",
	"АДБ-20-10",
	"АДБ-20-11",
	"АДБ-21-12",
	"ИДБ-20-01",
	"ИДБ-20-02",
	"ИДБ-20-03",
	"ИДБ-20-04",
	"ИДБ-20-05",
	"ИДБ-20-06",
	"ИДБ-20-07",
	"ИДБ-20-08",
	"ИДБ-20-09",
	"ИДБ-20-10",
	"ИДБ-20-11",
	"ИДБ-20-12",
	"МДБ-20-03",
	"МДБ-20-04",
	"МДБ-20-05",
	"МДБ-20-06",
	"МДБ-20-07",
	"МДБ-20-10",
	"МДБ-20-13",
	"МДБ-20-14",
	"МДБ-21-12",
	"ЭДБ-20-01",
	"ЭДБ-20-01(ИН)",
	"ЭДБ-20-02(УП)",
	"ЭДБ-20-02(УПР)",
	"ЭДБ-20-02(УЧР)",
	"ЭДБ-20-05",
	"ЭДБ-20-08",
	"АДБ-19-01",
	"АДБ-19-02",
	"АДБ-19-03",
	"АДБ-19-06",
	"АДБ-19-08",
	"АДБ-19-09",
	"АДБ-19-10",
	"АДБ-19-11",
	"АДБ-20-12",
	"ИДБ-19-01",
	"ИДБ-19-02(АП)",
	"ИДБ-19-02(ПО)",
	"ИДБ-19-03",
	"ИДБ-19-05",
	"ИДБ-19-06",
	"ИДБ-19-07",
	"ИДБ-19-09",
	"ИДБ-19-10",
	"ИДБ-19-11",
	"МДБ-19-03",
	"МДБ-19-04",
	"МДБ-19-05",
	"МДБ-19-06",
	"МДБ-19-07",
	"МДБ-19-09",
	"МДБ-19-10",
	"МДБ-20-12",
	"ЭДБ-19-01",
	"ЭДБ-19-02",
	"ЭДБ-19-03(УП)",
	"ЭДБ-19-03(УЧР)",
	"ЭДБ-19-05",
	"ЭДБ-19-06",
	"МДС-18-01",
	"МДС-19-01",
	"МДС-19-02",
	"МДС-20-01",
	"МДС-20-02",
	"МДС-21-01",
	"МДС-21-02",
	"МДС-22-11",
	"МДС-22-12",
	"МДС-22-13",
	"АДМ-22-01",
	"АДМ-22-02",
	"АДМ-22-03",
	"АДМ-22-04",
	"АДМ-22-05",
	"АДМ-22-06",
	"АДМ-22-07",
	"ИДМ-22-01",
	"ИДМ-22-02",
	"ИДМ-22-03(ИГ)",
	"ИДМ-22-03(ПМ2)",
	"ИДМ-22-03(ФМ)",
	"ИДМ-22-04",
	"ИДМ-22-05",
	"ИДМ-22-06",
	"ИДМ-22-07(ПМ1)",
	"МДМ-22-01(КМ)",
	"МДМ-22-01(ТМ)",
	"МДМ-22-02",
	"МДМ-22-03",
	"МДМ-22-04",
	"МДМ-22-05",
	"МДМ-22-06",
	"МДМ-22-07",
	"ЭДМ-22-02(ГМУ)",
	"ЭДМ-22-02(МВБ)",
	"ЭДМ-22-02(УП)",
	"ЭДМ-22-02(ФМ)",
	"ЭДМ-22-04",
	"ЭДМ-22-05",
	"ЭДМ-22-08",
	"ЭДМ-22-09",
	"АДМ-21-01",
	"АДМ-21-02",
	"АДМ-21-03",
	"АДМ-21-04",
	"АДМ-21-05",
	"ИДМ-21-01",
	"ИДМ-21-02",
	"ИДМ-21-03(ИГ)",
	"ИДМ-21-03(ПРМ)",
	"ИДМ-21-03(ФМ)",
	"ИДМ-21-04",
	"ИДМ-21-05",
	"ИДМ-21-06",
	"ИДМ-21-08",
	"МДМ-21-01(КМ)",
	"МДМ-21-01(ТМ)",
	"МДМ-21-02",
	"МДМ-21-03",
	"МДМ-21-04(СПД)",
	"МДМ-21-04(СТ)",
	"МДМ-21-06",
	"МДМ-21-07",
	"МДМ-21-11",
	"МДМ-21-12",
	"ЭДМ-21-02(ГМУ)",
	"ЭДМ-21-02(МВБ)",
	"ЭДМ-21-02(УП)",
	"ЭДМ-21-02(УЧР)",
	"ЭДМ-21-02(ФМ)",
	"ЭДМ-21-04",
	"ЭДМ-21-05",
	"ЭДМ-21-08",
	"ЭДМ-21-09",
	"ЭВМ-22-01(ГМУ)",
	"ЭВМ-22-01(МВБ)",
	"ЭВМ-22-01(УП)",
	"ЭВМ-22-01(ФМ)",
	"ЭВМ-21-01(ГМУ)",
	"ЭВМ-21-01(МВБ)",
	"ЭВМ-21-01(УП)",
	"ЭВМ-21-01(УЧР)",
	"ЭВМ-21-01(ФМ)",
	"АСП-20-01(09-1)",
	"АСП-20-01(09-2)",
	"АСП-20-01(09-6)",
	"АСП-20-02(15-1)",
	"АСП-20-02(15-2)",
	"АСП-20-02(15-3)",
	"АСП-20-03",
	"АСП-21-01",
	"АСП-21-02(15-1)",
	"АСП-21-02(15-2)",
	"АСП-21-03",
	"АСП-22-01",
	"АСП-22-02",
	"АСП-22-03"
])

const lecturersList = ref<Array<string>>([
    "Андреев В.П.",
	"Бадалова А.Г.",
	"Еленева Ю.Я.",
	"Кириллов А.К.",
	"Коган Ю.Г.",
	"Лыткин Д.Н.",
	"Мартинова Л.И.",
	"Михайлова М.В.",
	"Позднеев Б.М.",
	"Ревина М.А.",
	"Тимирязев В.А.",
	"Уварова Л.А.",
	"Фролов А.В."
])

const toTimetable = ():void => {
  if(!store.state.isTimetable){
    router.push('/')
    store.state.isModules = false;
    store.state.isTimetable = true;
    store.state.isOtherPeople = false;
  }
}

const changeInput = (newValue:string):void => {
    activeFlag.value = true
    inputValue.value = newValue
}

const blureInput = ():void => {
    const chengeFlag = ():void => {activeFlag.value = false}
    setTimeout(chengeFlag,100)
}

onMounted(async () => {
    try {
        let resGroups = await axios.get("https://api.stbot.sdore.me/schedule/groups/")
        let resLectures = await axios.get("https://api.stbot.sdore.me/lecturer/")
        console.log("группы",resGroups)
        console.log("преподы",resLectures)
    }catch (error) {
        console.log(error);
    }
})

const filtredList = computed(():Array<string> =>{
    if(isProfessor.value){
        return lecturersList.value.filter(name => {
            return name.toUpperCase().indexOf(inputValue.value.toUpperCase()) !== -1
        })
    }
    else{
        return groupList.value.filter(name => {
            return name.toUpperCase().indexOf(inputValue.value.toUpperCase()) !== -1
        })
    }
})
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <div class="w-4/5 shadow-2xl py-7 rounded bg-white sm:w-1/2">
            <span class="text-xl text-center block w-full text-black sm:text-2xl">Узнать расписание</span>
            <div class="flex justify-around my-10">
                <span class="text-lg cursor-pointer transition duration-300 sm:text-xl" :class="!isProfessor ? 'text-cyan-600 border-b border-cyan-600' : 'text-slate-400 hover:border-b hover:border-slate-400'" @click="watchGroup()">Группы</span>
                <span class="text-lg cursor-pointer transition duration-300 sm:text-xl" :class="isProfessor ? 'text-cyan-600 border-b border-cyan-600' : 'text-slate-400 hover:border-b hover:border-slate-400'" @click="watchProfessor()">Преподавателя</span>
            </div>
            <div class="flex justify-center mt-10">
                <div class="flex w-5/6 items-center border-b border-slate-500 py-2 sm:w-2/3">
                    <input class="appearance-none text-xs bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none sm:text-lg" v-model="inputValue" @focus="activeFlag = true" @blur="blureInput()" type="text" :placeholder="isProfessor ? 'Введите ФИО': 'Введите номер'" aria-label="Full name">
                    <button class="flex-shrink-0 bg-slate-500 text-xs shadow-md drop-shadow-2xl hover:bg-slate-700 border-slate-500 hover:border-slate-700 border-2 text-white py-1 px-2 rounded sm:text-sm sm:border-4" type="button" @click="clearValue">
                    Стереть
                    </button>
                </div>
            </div>
            <div class="flex justify-center absolute w-screen z-10 right-0">
                <div class="w-4/5 flex justify-center sm:w-1/2">
                    <ul class="px-2 py-2 w-5/6 overflow-x-scroll shadow-xl rounded-t-none text-base bg-slate-100 transition-all duration-300 ease-in-out h-auto max-h-60 rounded sm:max-h-72 sm:w-2/3 sm:text-sm" v-if="filtredList.length > 0" :class="activeFlag ? '' : 'h-0 py-0 overflow-hidden'">
                        <li v-for="(name) in filtredList" :key="name" @click="changeInput(name)"
                            class="px-2 py-1 cursor-pointer w-full sm:text-2xl lg:text-xl">
                            {{ name }}
                        </li>
                    </ul>
                </div>
                
            </div>
            <div class="flex justify-center mb-3 mt-8">
                <span class="group relative text-center shadow-xl drop-shadow-2xl cursor-pointer mt-5 py-2 w-2/3 border border-slate-500 text-xs font-medium rounded-md text-white bg-slate-500 hover:bg-slate-600 focus:ring-2 focus:ring-offset-2 focus:ring-slate-700 sm:text-2xl lg:text-sm sm:w-1/2" @click="toTimetable()">
                    Посмотреть расписание
                </span>
             </div>
        </div>
    </div>
</template>