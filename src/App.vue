<script setup>
import { RouterView } from 'vue-router'
import Header from 'UI/Header.vue'
import Footer from 'UI/Footer.vue'

import { useApiStore } from '@/stores'

const apiStore = useApiStore()
apiStore.call('project')
</script>

<template>
  <Header />
  <main class="container">
    <RouterView />
  </main>
  <Footer />
</template>

<style lang="stylus" scoped>
.container
  height 1000%

</style>
