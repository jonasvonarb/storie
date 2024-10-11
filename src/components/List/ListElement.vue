<template>
  <li>
    <RouterLink :to="route.params.id !== item.id ? `/list/${item.id}` : '/list'">
      <div class="title">
        {{ item.title }}
      </div>
      <div class="subtitlte">
        {{ item.subTitle }}
      </div>
    </RouterLink>
    <div class="text" v-if="route.params.id === item.id" v-html="item.text" />
  </li>
</template>

<script setup>
import { useGeneral } from '@/stores'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()
const { selected } = useGeneral()

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({})
  }
})
</script>

<style lang="stylus" scoped>
li
  padding-block .5rem
  border-bottom 1px solid black
  a
    display flex
    gap 1rem
    color black
    text-decoration none
    .title
      width 300px
      flex-shrink 0
    &.router-link-active
      font-weight bold
  .text
    padding-top 2rem
    max-width 700px
</style>
