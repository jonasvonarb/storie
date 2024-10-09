<template>
  <div class="container">
    {{ selected }}
    <div
      v-for="bereich in responses?.project?.[0]?.allTagClients"
      class="grid-item"
      :class="selected.includes(bereich.id) && ' active'"
      :key="bereich.id"
      @click="select(bereich.id)"
    >
      {{ bereich.label }}
    </div>
    <br />
    <div
      v-for="auftrag in responses?.project?.[0]?.allTagProjectSorts"
      class="grid-item"
      :class="selected.includes(auftrag.id) && ' active'"
      :key="auftrag.id"
      @click="select(auftrag.id)"
    >
      {{ auftrag.label }}
    </div>
    <br />
    <div
      v-for="tag in responses?.project?.[0]?.allTagsProjectAreas"
      class="grid-item"
      :class="selected.includes(tag.id) && ' active'"
      :key="tag.id"
      @click="select(tag.id)"
    >
      {{ tag.label }}
    </div>
  </div>
</template>

<script setup>
import { useApiStore } from '@/stores'
import { ref } from 'vue'

const { responses } = useApiStore()

const selected = ref([])

function select(id) {
  selected.value.push(id)
}

//console.log('Test:', responses)
</script>

<style lang="stylus" scoped>
.container
  display flex
  flex-direction column
  width calc(100vw - var(--containert-width) - var(--padding))
  font-size 18px
  color black

.active
  background-color red
</style>
