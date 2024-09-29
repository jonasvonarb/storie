<template>
  <div
    :class="`${route.params.id === item.id ? 'active ' : route.params.id ? 'inActive ' : ' '}${type} grid-item`"
  >
    <RouterLink
      :to="
        !route.params.id
          ? type === 'project'
            ? `/project/${item?.id}`
            : `/about/${item?.id}`
          : `/${type}`
      "
    >
      <Image v-if="item?.image" :data="item?.image?.responsiveImage" />
    </RouterLink>
    <div
      v-if="route.params.id === item.id"
      :class="`info${colAmount - (index % colAmount) > (type === 'project' ? 3 : 2) ? ' left' : ' '}`"
    >
      <h3>
        {{ item?.title }}
      </h3>
      <h4>
        {{ item?.subTitle }}
      </h4>
      <div class="text" v-html="item?.text" />
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
  type: {
    type: String,
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
  height var(--square-size-row);
  width calc(var(--square-size-row) * var(--img-aspect-ratio));
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  flex-grow: 0;
  a
    width 100%
    height 100%
    overflow hidden
  &.blank
    visibility hidden
  &.inActive
    opacity 0.05
  &.active
    .info
      padding .5rem
      padding-right 1.5rem
      z-index 1
      position absolute
      width calc(var(--square-size-row) * 3);
      top 0
      left -300%
      min-height 100%
      &.left
        left 100%
      .text
        hyphens auto
  &.about
    .info
      width calc(var(--square-size-row) * 2);
      left -200%
      &.left
        left 100%
</style>
