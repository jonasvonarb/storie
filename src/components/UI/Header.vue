<template>
  <header>
    <RouterLink to="/">
      <h1>Storie</h1>
      <h2>Kulturagentur</h2>
    </RouterLink>
  </header>
</template>

<script setup></script>

<style lang="stylus" scoped>
header
  position fixed
  z-index 10
  top 1rem
  left 1rem
  a
    color black
    text-decoration none
    h1
      width var(--container-width)
</style>
