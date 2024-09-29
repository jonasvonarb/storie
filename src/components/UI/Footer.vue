<template>
  <footer>
    <nav>
      <RouterLink v-if="route.name !== 'about'" to="/about">Über Uns</RouterLink>
      <RouterLink v-else to="/">Projekte</RouterLink>
    </nav>
  </footer>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
const route = useRoute()
</script>

<style  lang="stylus" scoped>
nav
  a
    margin-right 1rem
    text-decoration none
    color black
    font-size var(--nav-font-size)
    &:hover
      text-decoration underline
</style>
