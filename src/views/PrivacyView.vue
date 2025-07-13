<template>
  <div class="container">
    <h2>Datenschutz</h2>
    <div class="text" v-html="render(responses?.privacy?.[0]?.privacy?.text?.value)"></div>
  </div>
</template>

<script setup>
import { useApiStore } from '@/stores'
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { render } from 'datocms-structured-text-to-html-string'

const { call, responses } = useApiStore()

useHead({
  title: 'Datenschutz – Storie'
})

onMounted(() => {
  call('privacy')
})
</script>
<style lang="stylus" scoped>
.container
  padding 2rem
  width var(--containert-width)
  max-width 700px
  h2
    margin-bottom 2rem

@media (max-width: 768px)
  .container
    padding 1rem
    width 100vw
</style>
