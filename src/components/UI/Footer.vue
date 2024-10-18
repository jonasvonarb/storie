<template>
  <footer>
    <nav>
      <template v-if="!route.path.includes('/about')">
        <RouterLink
          v-if="!route.path.includes('/list')"
          :to="`/list${route.params.id ? '/' + route.params.id : ''}`"
        >
          <ListIcon />
        </RouterLink>
        <RouterLink :to="`${route.params.id ? '/project/' + route.params.id : '/'}`" v-else>
          <GridIcon />
        </RouterLink>
        <RouterLink to="/about">Über Uns</RouterLink>
      </template>
      <RouterLink v-else to="/">Projekte</RouterLink>
    </nav>
  </footer>
</template>

<script setup>
import GridIcon from '@/assets/icones/GridIcon.vue'
import ListIcon from '@/assets/icones/ListIcon.vue'
import { RouterLink, useRoute } from 'vue-router'
const route = useRoute()
</script>

<style lang="stylus" scoped>
nav
  position fixed
  bottom 1rem
  left 1rem
  display flex
  flex-direction column
  text-align bottom
  justify-content flex-end
  a
    margin-right 1rem
    text-decoration none
    color black
    font-size var(--nav-font-size)
    &:hover
      text-decoration underline

@media (max-width: 767px)
  nav
    flex-direction: column-reverse
    top .5rem
    right .5rem
    left unset
    bottom unset
    z-index 10
    a
      text-align end
</style>
