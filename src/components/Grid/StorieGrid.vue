<template>
  <div ref="gridContainer" :class="['grid', type].join(' ')">
    <GridElement
      v-for="(item, index) in _items"
      :key="index"
      :index="index"
      :item="item"
      :amount="_items.length"
      :colAmount="colAmount"
      :rowAmount="rowAmount"
      :type="type"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import GridElement from './GridElement.vue'
import { useApiStore } from '@/stores'

const { responses } = useApiStore()

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
    _items.value = newVal[0]?.[`${newVal[1]}`]
      ? newVal[0]?.[`${newVal[1]}`]?.[0]?.[props.pKey]
      : Array.from({ length: props.items })
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
  const itemsCount = Math.ceil(_items.value.length * (props.type === 'about' ? 1.5 : 1))
  // Calculate the square size based on the number of items (+ Math.sqrt(itemsCount) -> ajusting for the ceils in squarsize and rowAmount)
  const squareSize = Math.sqrt((height * width) / itemsCount)
  rowAmount.value = Math.ceil(height / squareSize)
  const rowAmountPlusOne = Math.ceil(height / squareSize) + 1
  colAmount.value = Math.ceil(itemsCount / rowAmount.value)
  const colAmountPlusOne = Math.ceil(itemsCount / rowAmountPlusOne)
  const squareSizeActual = height / rowAmount.value
  const squareSizeActualPlusOne = height / rowAmountPlusOne
  const size =
    squareSizeActual * colAmount.value <= width ? squareSizeActual : squareSizeActualPlusOne
  const cols = squareSizeActual * colAmount.value <= width ? colAmount.value : colAmountPlusOne
  // gridContainer.value.style.setProperty('--square-size-row', `${size}px`)
  // gridContainer.value.style.setProperty('--containert-width', `${size * cols}px`)
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
    padding-top: calc(1rem);

@media (min-aspect-ratio: 16/7)
  .grid
    --img-aspect-ratio: 1.1
</style>
