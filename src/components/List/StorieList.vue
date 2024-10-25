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
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSeoMeta, useHead } from '@unhead/vue'

import { shuffle } from '@/helpers'

const apiStore = useApiStore()
const route = useRoute()

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

const info = ref({
  title: 'Storie',
  description: 'Storie'
})

const _items = ref()
const _type = ref()
const _responses = ref()

const headTitle = computed(() => `${info.value?.title}`)
const headDescription = computed(() => `${info.value?.description}`)

watch(
  [_responses, _type],
  (newVal) => {
    const _projects = newVal[0]?.[`${newVal[1]}`]
      ? newVal[0]?.[`${newVal[1]}`]?.[0]?.[props.pKey]
      : Array.from({ length: _items.value })
    console.log('Projects:', props.type)
    _items.value = shuffle([..._projects])
  },
  { deep: true }
)

// Watcher for route changes
watch(
  () => [route.params?.slug, _items.value],
  (newData, oldData) => {
    if (!_items.value) return
    console.log('Route changed:', route.params?.slug)
    const item = _items.value?.find((item) => route.params?.slug === item?.slug)
    const title = item ? `${item.title} – Storie` : undefined
    info.value = {
      title: title || 'Storie',
      description:
        'Storie beratet, organisiert und setzt um. Wir erarbeiten Lösungen. Kreativ und pragmatisch, auf Augenhöhe mit unseren Projektpartnerinnen.'
    }
  },
  { immediate: true, deep: true }
)
// Lifecycle hooks to add and remove the resize event listener
onMounted(() => {
  _type.value = props.type
  _responses.value = apiStore.responses
})

useHead({
  title: headTitle
})

useSeoMeta({
  charset: 'utf-8',
  title: headTitle,
  ogImage: 'https://staging.storie.ch/preview.png',
  twitterImage: 'https://staging.storie.ch/preview.png',
  ogDescription: headDescription,
  description: headDescription,
  ogLocale: 'de_CH',
  ogType: 'website',
  ogTitle: headTitle,
  ogUrl: 'https://staging.storie.ch'
})
</script>

<style lang="stylus" scoped>
.list
  width calc(100vw - 300px)
  ul
    width 100%
    padding 0
    margin 0
    padding-bottom 10rem
    list-style-type: none;


@media (max-width: 767px)
  .list
    width 100vw
    height auto
    min-height 100dvh
    padding-top: calc(1rem);
</style>
