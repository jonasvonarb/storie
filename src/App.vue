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
  <main class="containerMain">
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
.containerMain
  display flex
  position relative
  .leftWrapper
    position sticky
    top 0rem
    padding 1rem
    height 100vh
    padding-top calc(1rem + var(--header-height))
    width calc(100vw - var(--containert-width))



@media (max-width: 767px)
  .containerMain
    margin-top var(--header-height)
    position initial
    flex-direction column-reverse
    margin-bottom 50vh
    .leftWrapper
      position initial
      width 100vw
      padding-top 2rem
      padding-bottom 2rem
</style>
