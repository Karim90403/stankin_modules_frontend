<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  startTime: String,
  endTime: String,
  subject: String,
  auditory: String,
  typeSubject: String,
  lecturer: String,
  isLecturer: String,
  group: String
})
</script>

<template>
  <div class="mt-4 w-4/5 px-5 py-3 shadow-2xl rounded bg-white flex justify-between items-center sm:w-1/2">
    <div class="flex w-5/6 flex-col sm:w-5/6">
      <span>{{props.subject}}</span>
      <span v-if="isLecturer" class="text-xs">{{props.typeSubject}} у {{props.group}}</span>
      <span v-else class="text-xs">{{props.typeSubject}} ведёт {{props.lecturer}}</span>
      <span class="text-gray-500">{{props.auditory}}</span>
    </div>
    <div class="flex flex-col">
      <span>{{props.startTime}}</span>
      <span>{{props.endTime}}</span>
    </div>
  </div>
</template>