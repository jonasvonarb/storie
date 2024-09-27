<template>
  <div ref="gridContainer" :class="['grid'].join(' ')">
    <div :class="['label'].join(' ')">This will be a {{ type }} Storie Grid</div>
    <div class="grid-item" v-for="(item, index) in _items" :key="index">{{ index + 1 }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
// Define the props
const props = defineProps({
  type: {
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

// Create a reactive array of items (example: 25 items)
const _items = ref(Array.from({ length: props.items }))
const rowAmount = ref(0)
const colAmount = ref(0)
const colAmountActual = ref(0)
const cartAmount = ref(0)

const gridContainer = ref(null)

// Function to calculate and update the grid layout dynamically
const updateGridSize = () => {
  const width = window.innerWidth * 0.75
  const height = window.innerHeight
  const itemsCount = _items.value.length
  const squareSize = Math.sqrt((height * width) / itemsCount)
  rowAmount.value = Math.ceil(height / squareSize)
  colAmount.value = Math.ceil(itemsCount / rowAmount.value)
  colAmountActual.value = width / squareSize
  cartAmount.value = rowAmount.value * colAmountActual.value
  const squareSizeActual = height / rowAmount.value
  gridContainer.value.style.setProperty('--square-size-row', `${squareSizeActual}px`)
  gridContainer.value.style.setProperty(
    '--containert-width',
    `${squareSizeActual * colAmount.value}px`
  )
}

// Lifecycle hooks to add and remove the resize event listener
onMounted(() => {
  window.addEventListener('resize', updateGridSize)
  updateGridSize() // Initial call to set grid size on load
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateGridSize)
})
</script>

<style lang="stylus" scoped>
.grid
  // border solid black 1px
  position fixed
  top 0
  right 0
  display: flex;
  justify-content flex-start
  flex-wrap wrap;
  width 75vw
  width: var(--containert-width);
  margin 0
  // background-color #f3f3f3
  .label
    position absolute
    top 10px
    right 30px


.grid-item
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
</style>
