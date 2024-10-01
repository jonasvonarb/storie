<template>
  <div class="container">
    <!-- alls tipp: ein v-for loop braucht immer einen key, der spezifisch für jedes elemnt anders ist -->
    <div v-for="text in responses?.project?.[0]?.allTagClients" class="grid-item" :key="text.id">
      {{ text.label }}
    </div>
  </div>
</template>

<script setup>
import { useApiStore } from '@/stores'

const { responses } = useApiStore()
</script>

<style lang="stylus" scoped>
.container
  display flex
  flex-direction column
  width calc(100vw - var(--containert-width) - var(--padding))
  background-color green
</style>
