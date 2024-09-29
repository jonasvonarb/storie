<template>
  <AbouText />
  <StorieGrid type="about" p-key="allPeople" :items="12" key="aboutGrid" />
</template>

<script setup>
import { useApiStore } from '@/stores'
import { onMounted } from 'vue'

import AbouText from '@/components/About/AbouText.vue'
import StorieGrid from '@/components/UI/StorieGrid.vue'

const { call } = useApiStore()

onMounted(() => {
  call('about')
})
</script>

<style scoped></style>
