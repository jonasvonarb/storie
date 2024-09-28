<template>
  <div
    :class="`${route.params.id === item.id ? 'active ' : route.params.id ? 'inActive ' : ' '}grid-item`"
  >
    <RouterLink :to="`/project/${item?.id}`">
      <Image v-if="item?.image" :data="item?.image?.responsiveImage" />
    </RouterLink>
    <div v-if="route.params.id === item.id" :class="`info${(colAmount - index % colAmount) > 3 ? ' left' : ' '}`">
      <h3>
        {{ item?.title }}
      </h3>
      <h4>
        {{ item?.subTitle }}
      </h4>
      <div v-html="item?.text" />
    </div>
  </div>
</template>

<script setup>
import { Image } from 'vue-datocms'

import { RouterLink, useRoute } from 'vue-router'
const route = useRoute()

const props = defineProps({
  index: {
    type: Number,
    required: true
  },
  item: {
    type: Object,
    required: true,
    default: () => ({})
  },
  colAmount: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})
</script>

<style lang="stylus" scoped>
.grid-item
  position relative
  // border solid black 1px
  // width var(--square-size-row);
  height var(--square-size-row);
  max-height 25vh
  background-color: lightblue;
  display: flex;
  aspect-ratio: 1 / 1;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  flex-shrink: 0;
  flex-grow: 0;
  &:nth-child(2n)
    background-color: lightcoral
  &.blank
    visibility hidden
  &.inActive
    opacity 0.1
  &.active
    .info
      position absolute
      width calc(var(--square-size-row) * 2);
      top 0
      left -200%
      font-size 1rem
      &.left
        left 100%
</style>
