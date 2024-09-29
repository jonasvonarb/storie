<template>
  <FilterMenu />
  <StorieGrid type="project" p-key="allProjects" :items="32" key="projectsGrid" />
</template>

<script setup>
import FilterMenu from '@/components/Home/FilterMenu.vue'
import StorieGrid from '@/components/UI/StorieGrid.vue'
</script>

<style scoped></style>
