<template>
  <FilterMenu />
  <StorieGrid type="projects" :items="32" />
</template>

<script setup>
import StorieGrid from 'UI/StorieGrid.vue'
import FilterMenu from './FilterMenu.vue'
</script>

<style scoped></style>
