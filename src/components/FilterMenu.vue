<template>
  <div
    class="container"
    :class="route.params.id && route.matched?.[0]?.path === '/project' && 'inactive'"
  >
    <div
      v-for="type in ['allTagsProjectAreas', 'allTagProjectSorts', 'allTagClients']"
      class="filter-container"
      :key="type.id"
    >
      <div
        v-for="tag in responses?.project?.[0]?.[type]"
        class="grid-item"
        :class="`${getIsSelected(tag) && ' active'} ${!choosbaleRef?.includes(tag['id']) && ' notChoosable'}`"
        :key="tag.id"
        @click="select(tag)"
      >
        {{ tag.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useApiStore, useGeneral } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const { responses } = useApiStore()

const choosbaleRef = ref([])

const rouetId = computed(() => route.params.id)

const { toggleSelected, getIsSelected, getChoosables } = useGeneral()
const generalStore = useGeneral()
const { selectedAll } = storeToRefs(generalStore)

function select(tag) {
  toggleSelected(tag)
}
watch(
  [responses, selectedAll, rouetId],
  (newVal) => {
    if (responses?.project?.[0].allProjects) {
      choosbaleRef.value = getChoosables(responses?.project[0].allProjects)
    }
  },
  { deep: true, immediate: true } // Use deep: true if selected is an array or object
)

// console.log('Test:', responses?.project[0])
</script>

<style lang="stylus" scoped>
.container
  display flex
  flex-direction column
  width calc(100vw - var(--containert-width) - 2rem)
  height calc(100vh - var(--header-height) - var(--header-height))
  overflow scroll
  color black
  gap 2rem
  font-size var(--filter-font-size)
  &.inactive
    opacity 0.5
    pointer-events none
  .filter-container
    // gap .2rem
    display flex
    flex-direction column
    .grid-item
      padding-block .1rem
      cursor pointer
      display flex
      align-items center
      &::before
          content ''
          display block
          width 0rem
          height 0rem
          border-radius 50%
          background-color black
          transition 0.2s all
      &.active
        font-weight bold
        &::before
          width .5rem
          height .5rem
          margin-right .3rem
      @media (hover: hover)
        &:hover
          text-decoration underline
          text-underline-offset: .15rem;
          text-decoration-thickness: .1rem;
      &.notChoosable
        opacity 0.2
        pointer-events none



@media (max-width: 767px)
  .container
    width 100%
    flex-direction row
    display none
    gap 1rem
    .filter-container
      width calc((100% - 1rem * 2 ) / 3 )
      display flex
      flex-direction column
</style>
