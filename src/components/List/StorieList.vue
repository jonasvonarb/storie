<template>
  <div class="list">
    <ul>
      <ListElement
        v-for="item in apiStore.responses?.[type]?.[0]?.[pKey]"
        :item="item"
        :key="item"
      />
    </ul>
  </div>
</template>

<script setup>
import { useApiStore } from '@/stores'
import ListElement from './ListElement.vue'

const apiStore = useApiStore()

// Define the props
const props = defineProps({
  type: {
    type: String,
    required: true,
    default: ''
  },
  pKey: {
    type: String,
    required: true,
    default: ''
  },
  items: {
    type: Number,
    required: true,
    default: 10
  }
})
</script>

<style lang="stylus" scoped>
.list
  width calc(100vw - 300px)
  ul
    width 100%
    padding 0
    margin 0
    list-style-type: none;


@media (max-width: 767px)
  .list
    width 100vw
    height auto
    min-height 100dvh
    padding-top: calc(1rem);
</style>
