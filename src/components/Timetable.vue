<template>
  <div class="mt-4 w-4/5 px-5 py-3 shadow-2xl rounded bg-white flex justify-between items-center sm:w-1/2">
    <div class="flex w-5/6 flex-col sm:w-5/6">
      <span>{{subject}}</span>
      <span class="text-xs">{{typeSubject}} ведёт {{professor}}</span>
      <span class="text-gray-500">{{auditory}}</span>
    </div>
    <div class="flex flex-col">
      <span>{{startTime}}</span>
      <span>{{endTime}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TimetableComponent',
  props: {
    startTime: String,
    endTime: String,
    subject: String,
    auditory: String,
    typeSubject: String,
    professor: String
  },
});
</script>