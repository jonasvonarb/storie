<template>
  <header>
    <RouterLink to="/" :onclick="removeElements">
      <img src="/src/assets/logo.svg" />
    </RouterLink>
  </header>
</template>

<script setup>
import { useGeneral } from '@/stores'

const { clearSelected } = useGeneral()

const removeElements = () => {
  clearSelected()
}
</script>

<style lang="stylus" scoped>
header
  position fixed
  z-index 10
  height calc(var(--header-height) + 1rem)
  width calc(100vw - var(--containert-width) - 2rem)
  top 0
  left 0
  padding 1rem
  padding-bottom 0
  background: linear-gradient(to top, rgba(255,255,255,0),rgba(255,255,255,0.98) 25%, rgba(255,255,255,1))
  a
    color black
    text-decoration none
    width 100%
    height 2rem
    img
      height 5rem

@media (max-width: 767px)
  header
    top 0
    left 0px
    padding 1rem
    width 100vw
    background-color white
</style>
