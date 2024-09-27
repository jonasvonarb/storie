<template>
  <footer>
    <nav>
      <RouterLink v-if="route.name !== 'about'" to="/about">About</RouterLink>
      <RouterLink v-else to="/">Projekte</RouterLink>
    </nav>
  </footer>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
const route = useRoute()
</script>

<style scoped></style>
