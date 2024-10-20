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
import { useHead } from 'unhead'

const { responses } = useApiStore()

import { useRoute } from 'vue-router'
import { useSeoMeta } from '@unhead/vue'
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
    _items.value = shuffle([..._projects])
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
  const width = window.innerWidth - 300
  const height = window.innerHeight
  const itemsCount = Math.ceil(Math.max(_items.value.length, 19))
  // Calculate the square size based on the number of items (+ Math.sqrt(itemsCount) -> ajusting for the ceils in squarsize and rowAmount)
  const squareSize = Math.sqrt((height * width) / itemsCount)
  rowAmount.value = Math.ceil(height / squareSize)
  colAmount.value = Math.ceil(itemsCount / rowAmount.value)
  const squareSizeActual = height / rowAmount.value
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

// Watcher for route changes
watch(
  () => [route.params?.id, _items.value],
  (newData, oldData) => {
    if (!_items.value) return
    const item = _items.value?.find((item) => route.params?.id === item?.id)
    const title = item ? `Storie - ${item.title}` : undefined
    info.value = {
      title: title || 'Storie',
      description: 'test'
    }
  },
  { immediate: true, deep: true }
)

useHead({
  // htmlAttrs,
  title: headTitle
})
useSeoMeta({
  charset: 'utf-8',
  title: headTitle,
  ogImage: 'https://storie.ch/preview.png',
  twitterImage: 'https://storie.ch/preview.png'
  // robots: headIndex,
  // ogDescription: headDescription,
  // description: headDescription,
  // ogLocale: locale,
  // ogType: "website",
  // ogTitle: headTitle,
  // ogUrl: ogUrl,
  // twitterCard: "summary_large_image",
  // twitterDomain: import.meta.env.VITE_APP_storie_Ch,
  // twitterUrl: ogUrl,
  // twitterTitle: headTitle,
  // twitterDescription: headDescription,
})
</script>

<style lang="stylus" scoped>

.grid
  --img-aspect-ratio: 1
  position relative
  display: flex;
  justify-content flex-start
  align-content flex-start
  flex-wrap wrap;
  width 75vw
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
    width 100vw
    height auto
    min-height 100dvh
    background-color white
    // padding-top: calc(1rem);
    padding-bottom 50vh

@media (min-aspect-ratio: 16/7)
  .grid
    --img-aspect-ratio: 1.1
</style>
