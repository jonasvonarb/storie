<template>
  <div class="container">
    <div v-html="responses?.about?.[0]?.about?.aboutText" />
    <br />
    <RouterLink to="/privacy">Datenschutz</RouterLink>
  </div>
</template>

<script setup>
import { useApiStore } from '@/stores'
import { onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'

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
  width calc(100vw - var(--containert-width) - 2rem)
  // height calc(100vh - var(--header-height) - var(--header-height))
  overflow hidden
  max-width 350px
  hyphens auto
  padding-bottom 4rem


@media (max-width: 767px)
  .container
    flex-direction column !important
    width calc(100vw - 4rem)
    max-width unset
</style>
