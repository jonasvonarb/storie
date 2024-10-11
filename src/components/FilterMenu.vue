<template>
  <div
    class="container"
    :class="route.params.id && route.matched?.[0]?.path === '/project' && 'inactive'"
  >
    <div class="filter-container">
      <div
        v-for="bereich in responses?.project?.[0]?.allTagClients"
        class="grid-item"
        :class="getIsSelected(bereich) && ' active'"
        :key="bereich.id"
        @click="select(bereich)"
      >
        {{ bereich.label }}
      </div>
    </div>
    <div class="filter-container">
      <div
        v-for="auftrag in responses?.project?.[0]?.allTagProjectSorts"
        class="grid-item"
        :class="getIsSelected(auftrag) && ' active'"
        :key="auftrag.id"
        @click="select(auftrag)"
      >
        {{ auftrag.label }}
      </div>
    </div>
    <div class="filter-container">
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
  </div>

  <!--

Gescheiterter Versuch für einen nested Loop von Niklas feat. ChatGPT

<ul>
  <li v-for="bereich in responses?.project" class="grid-item" :key="bereich.id">
    {{ bereich.label }}
    
    <ul>
      <li v-for="auftrag in bereich.tags" class="grid-item" :key="auftrag.id">
        {{ auftrag.label }}
        
        <ul>
          <li v-for="tag in auftrag.tags" class="grid-item" :key="tag.id">
            {{ tag.label }}
          </li>
        </ul>
        
      </li>
    </ul>
  </li>
</ul>
--></template>

<script setup>
import { useApiStore, useGeneral } from '@/stores'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const { responses } = useApiStore()

const { selected, toggleSelected, getIsSelected } = useGeneral()

function select(tag) {
  toggleSelected(tag)
}

watch(
  () => responses?.project,
  () => {
    if (responses?.project) {
      // console.log('responses?.project', responses?.project[0]) //watches for changes and "waits" for the data to be loaded
    }
  },
  { deep: true }
)

// console.log('Test:', responses?.project[0])
</script>

<style lang="stylus" scoped>
.container
  display flex
  flex-direction column
  width calc(100vw - var(--containert-width) - var(--padding))
  font-size 18px
  color black
  gap 2rem
  &.inactive
    opacity 0.5
    pointer-events none
  .grid-item
    cursor pointer
    display flex
    &:hover
      background-color #f1f1f1
    &.active
      background-color red

@media (max-width: 767px)
  .container
    width 100%
    flex-direction row
    display none
    gap 1rem
    .filter-container
      width calc((100% - 1rem * 2 ) / 3 )
      display flex
      flex-direction column
</style>
