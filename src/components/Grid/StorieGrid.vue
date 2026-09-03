<template>
  <div ref="gridContainer" :class="['grid', type].join(' ')">
    <GridElement
      v-for="(item, index) in _items"
      :key="index"
      :index="index"
      :item="item"
      :amount="Math.max(_items.length, 15)"
      :colAmount="colAmount"
      :rowAmount="rowAmount"
      :type="type"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import GridElement from './GridElement.vue'
import { useApiStore } from '@/stores'

const { responses } = useApiStore()

import { useRoute } from 'vue-router'
import { useSeoMeta, useHead } from '@unhead/vue'
import { shuffle } from '@/helpers'
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

const _items = ref()
const _type = ref(null)
const _responses = ref(null)
// Watch for changes in responses
watch(
  [_responses, _type],
  (newVal) => {
    const _projects = newVal[0]?.[`${newVal[1]}`]
      ? newVal[0]?.[`${newVal[1]}`]?.[0]?.[props.pKey]
      : Array.from({ length: props.items })
    _items.value = props.type === 'project' ? shuffle([..._projects]) : [..._projects]
    updateGridSize() // Initial call to set grid size on load
  },
  { deep: true }
)

const rowAmount = ref(0)
const colAmount = ref(0)

const gridContainer = ref(null)

// Function to calculate and update the grid layout dynamically
const updateGridSize = () => {
  if (!_items.value) return
  const panel_left = 400
  const width = window.innerWidth - panel_left - 8 * 2
  const height = window.innerHeight - 4 * 2
  const itemsCount = Math.ceil(Math.max(_items.value.length, 19))
  // Calculate the square size based on the number of items (+ Math.sqrt(itemsCount) -> ajusting for the ceils in squarsize and rowAmount)
  const squareSize = Math.sqrt((height * width) / itemsCount)
  rowAmount.value = Math.ceil(height / squareSize)
  colAmount.value = Math.ceil(itemsCount / rowAmount.value)
  let squareSizeActual = height / rowAmount.value
  const isToBig = squareSizeActual * colAmount.value - width > 0 && props.type === 'about'
  if (isToBig) squareSizeActual = width / colAmount.value - 10
  document.documentElement.style.setProperty('--square-size-row', `${squareSizeActual}px`)
  document.documentElement.style.setProperty(
    '--containert-width',
    `${squareSizeActual * colAmount.value}px`
  )
}

// Lifecycle hooks to add and remove the resize event listener
onMounted(() => {
  window.addEventListener('resize', updateGridSize)
  _type.value = props.type
  _responses.value = responses
  updateGridSize() // Initial call to set grid size on load
})

onBeforeUnmount(() => {
  document.documentElement.style.setProperty('--containert-width', `calc(100vw - 300px)`)
  window.removeEventListener('resize', updateGridSize)
})

const info = ref({
  title: 'Storie',
  description: 'Storie'
})

const headTitle = computed(() => `${info.value?.title}`)
const headDescription = computed(() => `${info.value?.description}`)
const canonical = computed(() => `${info.value?.canonical}`)

// Watcher for route changes
watch(
  () => [route.params?.slug, _items.value],
  () => {
    if (!_items.value) return
    console.log(route.path)
    const item = _items.value?.find((item) => route.params?.slug === item?.slug)
    const title = item
      ? `${item.title ? item.title : item.name} – Storie Kulturagentur, Basel`
      : undefined
    info.value = {
      title: title || 'Storie Kulturagentur, Basel',
      description:
        'Storie beratet, organisiert und setzt um. Wir erarbeiten Lösungen. Kreativ und pragmatisch, auf Augenhöhe mit unseren Projektpartnerinnen.',
      canonical: 'https://storie.ch' + route?.path?.replace('project', 'list')
    }
  },
  { immediate: true, deep: true }
)

useHead({
  title: headTitle
})
useSeoMeta({
  charset: 'utf-8',
  title: headTitle,
  ogImage: 'https://storie.ch/preview.png',
  twitterImage: 'https://storie.ch/preview.png',
  ogDescription: headDescription,
  description: headDescription,
  ogLocale: 'de_CH',
  ogType: 'website',
  ogTitle: headTitle,
  ogUrl: 'https://storie.ch'
})
</script>

<style lang="stylus" scoped>

.grid
  --img-aspect-ratio: 1
  position fixed
  right 0
  padding-block 4px
  transform translate(-4px, 0px)
  display: flex;
  justify-content flex-start
  align-content flex-start
  flex-wrap wrap;
  height 100vh
  margin 0
  width: calc(var(--containert-width) * var(--img-aspect-ratio));
  &.about
    // width calc(100vw - 300px)
  .label
    position absolute
    top 10px
    right 30px

@media (max-width: 767px)
  .grid
    position initial
    transform translate(0px, 0px)
    padding-top 0
    width 100vw
    height auto
    min-height 100dvh
    gap 0
    background-color white
    padding-bottom 1rem
    // padding-top: calc(1rem);

@media (min-aspect-ratio: 16/7)
  .grid
    // --img-aspect-ratio: 1.1
</style>
