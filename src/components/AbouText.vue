<template>
  <div class="container">
    <div v-html="responses?.about?.[0]?.about?.aboutText" />
  </div>
</template>

<script setup>
import { useApiStore } from '@/stores'
import { onMounted, watch } from 'vue'

const { responses } = useApiStore()

// Watch for changes in responses
watch(
  responses,
  (newVal, oldVal) => {
    // console.log('about', newVal.about[0].about.aboutText)
    // if (newVal !== oldVal) {
    // }
  },
  { deep: true }
)
</script>

<style lang="stylus" scoped>
.container
  // max-width 300px
  hyphens auto
</style>
