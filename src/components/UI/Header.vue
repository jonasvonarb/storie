<template>
  <header>
    <RouterLink to="/">
      <img src="/src/assets/logo.svg">
    </RouterLink>
  </header>
</template>

<script setup></script>

<style lang="stylus" scoped>
header
  position fixed
  z-index 10
  height 10px
  left 10px
  top 0rem
  left 0rem
  a
    color black
    text-decoration none
    width 100%
    img
      width 200px

@media (max-width: 767px)
  header
    top 0
    left 0px
    padding 1rem
    width 100vw
    background-color white
</style>
