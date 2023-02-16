<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps({
  subjectName: String,
  firstModule: Number
})
</script>

<template>
   <tr v-if="props.subjectName == 'Рейтинг'">
      <td class="text-sm sm:text-base">
        Рейтинг: {{ props.firstModule }}
      </td>
    </tr>
</template>