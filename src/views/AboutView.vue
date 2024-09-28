<template>
  <main class="about">
    <h1>This is an about page</h1>
    <AbouText />
    <StorieGrid type="people" :items="12" />
  </main>
</template>

<script setup>
import AbouText from '@/components/About/AbouText.vue'
import StorieGrid from '@/components/UI/StorieGrid.vue'
</script>

<style scoped></style>
