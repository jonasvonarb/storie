<template>
  <div>This Will be the About Text (Designed by Niklas &#129398;)</div>
  <div>
  </div>
</template>

<script setup>
import { useApiStore } from '@/stores'
import { watch } from 'vue'

const { responses } = useApiStore()

// // Watch for changes in responses
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

<style lang="stylues" scoped></style>
