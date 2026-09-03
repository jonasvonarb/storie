<template>
  <li :class="!getIsFiltered(item) && 'filtered'">
    <RouterLink :to="route.params.slug !== item.slug ? `/list/${item.slug}` : '/list'">
      <template v-if="route.params.slug === item.slug">
        <h1 class="title">
          {{ item.title }}
        </h1>
        <h1 class="subtitlte">
          {{ item.subTitle }}
        </h1>
      </template>
      <template v-else>
        <div class="title">
          {{ item.title }}
        </div>
        <div class="subtitlte">
          {{ item.subTitle }}
        </div>
      </template>
    </RouterLink>
    <div class="info" v-if="route.params.slug === item.slug">
      <Image class="img" v-if="item?.image" :data="item?.image?.responsiveImage" />
      <div class="text">
        <div class="tags">
          <template
            v-for="(tags, i) in ['tagAuftraggeber', 'tagProjektart', 'tagProjektfeld']"
            :key="tags"
          >
            <!-- <template class="tag-group"> -->
            <Tag
              v-for="(tag, index) in item?.[tags]"
              :key="tag?.id + '_listTag'"
              :tag="tag"
              :index="index"
              :length="item?.[tags].length"
              :last="item?.[tags].length !== index + 1"
            />
            <!-- </template> -->
            <template v-if="i !== 2">
              {{ ' - ' }}
            </template>
          </template>
        </div>
        <div class="text" v-html="item.text" />
      </div>
    </div>
  </li>
</template>

<script setup>
import { useGeneral } from '@/stores'
import { useRoute, RouterLink } from 'vue-router'

import Tag from '@/components/List/Tag.vue'
import { Image } from 'vue-datocms'

const route = useRoute()
const { getIsFiltered } = useGeneral()

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
  &.filtered
    opacity 0.05
    display none
    pointer-events none
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
  .info
    display flex
    padding-top 2rem
    flex-direction row
    gap 1rem
    padding-bottom 2rem
    .img
      height unset
      width 300px !important
      flex-shrink 0
      :global(picture > img)
        object-fit cover
        height unset !important
    .text
      padding-right 2rem
      .tags
        display flex
        gap 1em
        // font-family: monospace;
        font-size .75em
        .tag-group
          flex-shrink 1
          display flex
      .text
        max-width 700px
        // background-color red
        // padding-top 2rem

@media (max-width: 767px)
  li
    padding-inline 1rem
    a
      flex-direction column
      gap 0
      .title
        font-weight bold
      &.router-link-active
        font-weight normal
    .text
      gap 1rem
      display flex
      flex-direction column
      .tags
        flex-direction column
        gap 0rem !important
        > div:nth-child(2)
        > div:nth-child(4)
          display none
    .info
      flex-direction column !important
      .img
        width 100% !important
        flex-shrink 0
</style>
