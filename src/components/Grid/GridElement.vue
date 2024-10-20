<template>
  <div
    :class="`${
      route.params.id === item.id ? 'active ' : route.params.id ? 'inActive ' : ' '
    }${type} ${getIsFiltered(item) || type !== 'project' ? '' : 'filtered'} grid-item`"
  >
    <RouterLink
      :to="
        !route.params.id && (getIsFiltered(item) || type !== 'project')
          ? type === 'project'
            ? `/project/${item?.id}`
            : `/about/${item?.id}`
          : `/${type}`
      "
    >
      <Image v-if="item?.image" :data="item?.image?.responsiveImage" />
    </RouterLink>
    <div
      v-if="route.params.id === item.id && item?.title"
      :class="`info${
        (colAmount - (index % colAmount) > (type === 'project' ? 3 : 2) ? ' ' : ' left') +
        (Math.ceil(index / colAmount) < rowAmount - 2 ? ' ' : ' top')
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
import { useGeneral } from '@/stores'
import { Image } from 'vue-datocms'

import { RouterLink, useRoute } from 'vue-router'
const route = useRoute()

const { getIsFiltered } = useGeneral()

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
  cursor pointer
  transition 0.1s opacity
  > a
    cursor inherit
    width 100%
    height 100%
    overflow hidden
  &.blank
    visibility hidden
  &.filtered
    // pointer-events none
  &.filtered
    cursor default
    opacity 0.05
  &.inActive
    cursor default
    opacity 0.01
  &.active
    .info
      z-index 10
      background-color rgba(255, 255, 255, .5)
      padding-top .3em
      padding-bottom .6em
      padding-left 2em
      padding-right 1.9em
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
      .text
        hyphens auto
      h3
        margin-top -.2rem
  &.about
    .info
      width calc(var(--square-size-row) * 2);
      left 100%
      &.left
        left -200%
  .close
    position absolute
    top .8em
    left 0.5rem
    color black
    svg
      height 1.1em
      width 1.1em
  .info
    &.left
      .close
        left unset
        right .5rem

@media (max-width: 767px)
  .grid-item
    width calc(100vw / 2)
    height calc(100vw / 2)
    background-color white
    position relative
    .info
    .info.left
    .info.top
      position absolute
      width 100vw
      height auto
      min-height unset
      background-color white
      top 100% !important
      bottom 0
      left 0 !important
</style>
