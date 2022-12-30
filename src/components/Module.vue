<template>
    <tr class="border-b text- border-gray-500 sm:text-base">
        <td>{{subjectName}}</td>
        <td class="text-center">{{firstModule}}</td>
        <td class="text-center">{{secondModule}}</td>
        <td class="text-center">{{offset}}</td>
        <td class="text-center">{{exam}}</td>
    </tr>
</template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'TimetableComponent',
    props: {
      subjectName: String,
      firstModule: Number,
      secondModule: Number,
      offset: Number,
      exam: Number,
    },
  });
  </script>