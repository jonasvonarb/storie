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
      :class="`info${
        (colAmount - (index % colAmount) > (type === 'project' ? 3 : 2) ? ' ' : ' left') +
        (Math.floor(index / rowAmount) < (type === 'project' ? rowAmount - 2 : 0) ? ' ' : ' top')
      }`"
    >
      <h3>
        {{ item?.title }}
      </h3>
      <h4>
        {{ item?.subTitle }}
      </h4>
      <div class="text" v-html="item?.text" />
      <RouterLink :to="`/${type}`" class="close"><CloseIcon /></RouterLink>
    </div>
  </div>
</template>

<script setup>
import CloseIcon from '@/assets/icones/CloseIcon.vue'
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
  rowAmount: {
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
  padding .15rem
  > a
    width 100%
    height 100%
    overflow hidden
  &.blank
    visibility hidden
  &.inActive
    opacity 0.05
  &.active
    .info
      padding-left .5rem
      padding-right 1rem
      z-index 1
      position absolute
      width calc(var(--square-size-row) * 3);
      top 0
      left 100%
      min-height 100%
      &.left
        left -300%
      &.top
        top unset
        bottom 0%
      // &.top
      .text
        hyphens auto
  &.about
    .info
      width calc(var(--square-size-row) * 2);
      left 100%
      &.left
        left -200%
  .close
    position absolute
    top .3rem
    right .5rem
    color black
    svg
      height 1.5em
      width 1.5em
</style>
