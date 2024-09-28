<script setup>
import { RouterView } from 'vue-router'
import Header from 'UI/Header.vue'
import Footer from 'UI/Footer.vue'

import { useApiStore } from '@/stores'

const apiStore = useApiStore()
apiStore.call('projects')
</script>

<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<style scoped></style>
