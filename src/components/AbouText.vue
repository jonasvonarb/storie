<template>
  <div class="container">
    <div>
      Wir beraten, organisieren und setzen um.
      Wir erarbeiten Lösungen. Kreativ und pragmatisch,
auf Augenhöhe mit unseren Projektpartner:innen.
</div>


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

<style lang="stylus" scoped>
</style>
