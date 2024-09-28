<template>
  <main class="about">
    <h1>This is the main page</h1>
    <FilterMenu />
    <StorieGrid type="projects" :items="32" />
  </main>
</template>

<script setup>
import FilterMenu from '@/components/Home/FilterMenu.vue'
import StorieGrid from '@/components/UI/StorieGrid.vue'
</script>

<style scoped></style>
