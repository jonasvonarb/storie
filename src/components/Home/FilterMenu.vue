<template>
  <div v-for="text in responses?.projects?.[0]?.allTagClients" class="grid-item">
    {{ text.label }}
  </div>

  <div>
  </div>
</template>

<script setup>
import { useApiStore } from '@/stores'
import { watch } from 'vue'

const { responses } = useApiStore()

// console.log('Test:', responses.projects[0].allTagClients[2].label)

// Watch for changes in responses
// watch(
//   responses,
//   (newVal, oldVal) => {
//     console.log(newVal, oldVal)
//     if (newVal !== oldVal) {
//       console.log('responses changed from', oldVal, 'to', newVal)
//     }
//   },
//   { deep: true }
// )
</script>

<style lang="stylus" scoped>
.grid-item
  font-size: 1.5rem;
</style>
