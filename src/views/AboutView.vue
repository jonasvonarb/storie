<template>
  <StorieGrid type="about" p-key="allPeople" :items="12" key="aboutGrid" />
</template>

<script setup>
import { useApiStore } from '@/stores'
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'

import StorieGrid from '@/components/Grid/StorieGrid.vue'

const { call } = useApiStore()

useHead({
  title: 'über uns – Storie'
})

onMounted(() => {
  call('about')
})
</script>

<style scoped></style>
