<template>
  <header>
    <RouterLink to="/">
      <img src="/src/assets/logo.svg" />
    </RouterLink>
  </header>
</template>

<script setup></script>

<style lang="stylus" scoped>
header
  position fixed
  z-index 10
  height 5rem
  width calc(100vw - var(--containert-width) - 2rem)
  top 1rem
  left 1rem
  a
    color black
    text-decoration none
    width 100%
    height 2rem
    img
      height 100%

@media (max-width: 767px)
  header
    top 0
    left 0px
    padding 1rem
    width 100vw
    background-color white
</style>
