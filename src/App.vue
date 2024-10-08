<script setup>
import { RouterView, useRoute } from 'vue-router'
import Header from 'UI/Header.vue'
import Footer from 'UI/Footer.vue'

import { useApiStore } from '@/stores'
import AbouText from './components/AbouText.vue'
import FilterMenu from './components/FilterMenu.vue'

const apiStore = useApiStore()
apiStore.call('project')
const route = useRoute()
</script>

<template>
  <Header />
  <main class="container">
    <div class="leftWrapper">
      <FilterMenu
        v-if="
          route.matched?.[0]?.path === '/project' ||
          route.name === 'home' ||
          route.matched?.[0]?.path === '/list'
        "
      />
      <AbouText v-if="route.path.includes('/about')" />
    </div>
    <RouterView />
  </main>
  <Footer />
</template>

<style lang="stylus" scoped>
.container
  display flex
  position relative
  .leftWrapper
    position sticky
    //background-color red
    top 0rem
    padding 1rem
    padding-top calc(1rem + var(--header-height))
    height 100vh
    width calc(100vw - var(--containert-width))
</style>
