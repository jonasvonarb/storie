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
    <h1 v-if="!route?.params?.slug" class="hidden-h1">
      Storie beratet, organisiert und setzt um. Wir erarbeiten Lösungen. Kreativ und pragmatisch,
      auf Augenhöhe mit unseren Projektpartnerinnen.
    </h1>
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

.hidden-h1
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);


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
