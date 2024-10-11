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
import { ref } from 'vue'

const { responses } = useApiStore()

const { selected, toggleSelected, getIsSelected } = useGeneral()

function select(tag) {
  console.log('tag', tag)
  toggleSelected(tag)
}
console.log('Test:', responses)
console.log('Test:', responses?.project[0])
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
