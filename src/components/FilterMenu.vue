<template>
  <div class="container">
    <div
      v-for="bereich in responses?.project?.[0]?.allTagClients"
      class="grid-item"
      :class="getIsSelected(bereich) && ' active'"
      :key="bereich.id"
      @click="select(bereich)"
    >
      {{ bereich.label }}
    </div>
    <br />
    <div
      v-for="auftrag in responses?.project?.[0]?.allTagProjectSorts"
      class="grid-item"
      :class="getIsSelected(auftrag) && ' active'"
      :key="auftrag.id"
      @click="select(auftrag)"
    >
      {{ auftrag.label }}
    </div>
    <br />
    <div
      v-for="tag in responses?.project?.[0]?.allTagsProjectAreas"
      class="grid-item"
      :class="getIsSelected(tag) && ' active'"
      :key="tag.id"
      @click="select(tag)"
    >
      {{ tag.label }}
    </div>
  </div>
</template>

<script setup>
import { useApiStore, useGeneral } from '@/stores'
import { ref } from 'vue'

const { responses } = useApiStore()

const { selected, toggleSelected, getIsSelected } = useGeneral()

function select(tag) {
  console.log('tag', tag)
  toggleSelected(tag)
}
</script>

<style lang="stylus" scoped>
.container
  display flex
  flex-direction column
  width calc(100vw - var(--containert-width) - var(--padding))
  font-size 18px
  color black
  .grid-item
    cursor pointer
    display flex
    &:hover
      background-color #f1f1f1
    &.active
      background-color red
</style>
