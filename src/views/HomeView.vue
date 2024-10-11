<template>
  <StorieGrid
    v-if="route.matched[0].path === '/project' || route.name === 'home'"
    type="project"
    p-key="allProjects"
    :items="32"
    key="projectsGrid"
  />
  <StorieList v-else type="project" p-key="allProjects" :items="32" key="projectsList" />
</template>

<script setup>
import StorieGrid from '@/components/Grid/StorieGrid.vue'
import StorieList from '@/components/List/StorieList.vue'

import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style scoped lang="stylus"></style>
