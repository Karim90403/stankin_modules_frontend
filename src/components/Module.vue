<template>
    <tr class="border-b border-gray-500">
        <td class="border-r border-gray-500">{{subjectName}}</td>
        <td class="border-r border-gray-500 text-center">{{firstModule}}</td>
        <td class="border-r border-gray-500 text-center">{{secondModule}}</td>
        <td class="border-r border-gray-500 text-center">{{offset}}</td>
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