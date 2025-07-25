<template>
  <div
    :class="`${
      route.params.slug === item.slug ? 'active ' : route.params.slug ? 'inActive ' : ' '
    }${type} ${getIsFiltered(item) || type !== 'project' ? '' : 'filtered'} grid-item ${
      (colAmount - (index % colAmount) > (type === 'project' ? 3 : 2) ? ' ' : ' left') +
      (Math.ceil(index / colAmount) < rowAmount - 2 ? ' ' : ' top')
    } ${index % 2 === 0 ? ' even' : ' odd'}`"
  >
    <RouterLink
      :to="
        !route.params.slug && (getIsFiltered(item) || type !== 'project')
          ? type === 'project'
            ? `/project/${item?.slug}`
            : `/about/${item?.slug}`
          : `/${type}`
      "
    >
      <Image class="img" v-if="item?.image" :data="item?.image?.responsiveImage" />
    </RouterLink>
    <div
      v-if="route.params.slug === item.slug && item?.slug"
      :class="`info${
        (colAmount - (index % colAmount) > (type === 'project' ? 3 : 2) ? ' ' : ' left') +
        (Math.ceil(index / colAmount + 0.01) < rowAmount - (rowAmount <= 5 ? 2 : 3)
          ? ' '
          : ' top') +
        (colAmount > 5 ? ' wide' : '') +
        (rowAmount <= 4 ? ' flat' : '')
      }`"
    >
      <template v-if="item?.title">
        <h1>
          {{ item?.title }}
        </h1>
        <h2>
          {{ item?.subTitle }}
        </h2>
      </template>
      <template v-else-if="item?.name">
        <h1>{{ `${item?.name} ${item?.lastname}` }}</h1>
        <template v-if="item?.eMail">
          <h2>
            <a :href="`mailto:${item?.eMail}`">
              {{ `${item?.eMail.replace('@', ' at ')}` }}
            </a>
          </h2>
        </template>
      </template>
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
    > div
      max-width unset !important
  &.blank
    visibility hidden
  &.filtered
    // pointer-events none
  &.filtered
    cursor default
    opacity 0.1
  &.inActive
    cursor default
    opacity 0.05
  &.active
    .info
      z-index 10
      background-color rgba(255, 255, 255, .25)
      padding-top .3em
      padding-bottom .6em
      padding-left 1em
      padding-right 1em
      z-index 1
      position absolute
      width calc(var(--square-size-row) * 2);
      top 0
      left 100%
      min-height 100%
      &.wide
        width calc(var(--square-size-row) * 3);
      &.left
        left calc(-100% * 2)
      &.left.wide
        left calc(-100% * 3)
      &.top
        top unset
        bottom 0%
      .text
        padding-top .8em
        display flex
        gap .8em
        flex-direction column
        hyphens auto
        width calc(100% + 1rem)
        max-height calc(var(--square-size-row) * 2.5);
        overflow hidden
        overflow-y scroll
      h3
        margin-top -.2rem
      &.flat
        .text
          max-height calc(var(--square-size-row) * 1);
  &.about
    .info
      width calc(var(--square-size-row) * 2);
      left 100%
      &.left
        left -200%
  .close
    position absolute
    top 0.1em
    right 0.5rem
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
    padding .2rem
    .info
    .info.left
    .info.top
      position absolute
      width 100vw
      // height 200%
      height fit-content
      min-height unset
      background-color white
      top calc(100% + .5rem) !important
      bottom unset
      left 0 !important
      padding-right 7rem
      border-block solid 1px black
      .text
        overflow unset
        max-height unset !important
    .close
      top 1rem
      right 2rem !important
    &.odd
      .info
        left calc(-1 * (100% + 4px))  !important
</style>
