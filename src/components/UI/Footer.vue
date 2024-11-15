<template>
  <footer>
    <nav>
      <template
        v-if="route.path.includes('/list') || route.path.includes('/project') || route.path === '/'"
      >
        <div>
          <RouterLink
            :to="`${route.params.slug ? '/project/' + route.params.slug : '/'}`"
            :class="route.path.includes('/list') ? 'active iocn' : 'icon'"
          >
            <GridIcon />
          </RouterLink>
          <RouterLink
            :class="
              route.path.includes('/project') || route.path === '/'
                ? 'list icon active'
                : 'list icon'
            "
            :to="`/list${route.params.slug ? '/' + route.params.slug : ''}`"
          >
            <ListIcon />
          </RouterLink>
        </div>
        <RouterLink to="/about">über uns</RouterLink>
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
  bottom 0
  left 0
  display flex
  flex-direction column
  text-align bottom
  justify-content flex-end
  background: linear-gradient(to bottom, rgba(255,255,255,0),rgba(255,255,255,0.8), rgba(255,255,255,1))
  padding 1rem
  width calc(100vw - var(--containert-width) - 2rem)
  a
    margin-right 1rem
    text-decoration none
    color black
    font-size var(--nav-font-size)
    svg
      height 1em
      width 1em
      margin-left .05em
    @media (hover: hover)
      &:hover
        text-decoration underline
.icon
  opacity .2
  transition opacity .3s
  &.list
    svg
      height 0.95em
  &.active
    opacity 1
@media (max-width: 767px)
  nav
    flex-direction: column-reverse
    top .5rem
    width auto
    text-align right
    left unset
    bottom unset
    z-index 10
    right .5rem
    padding-inline .5rem
    padding-top 0
    padding-bottom 0
    gap .2em
    a
      margin-right 0
      text-align end
    div
      display flex
      justify-content flex-start
      flex-direction row-reverse
      gap .5rem
      svg
        height 1em
        width 1em
</style>
