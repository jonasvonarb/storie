<template>
  <div
    class="container"
    :class="route.params.slug && route.matched?.[0]?.path === '/project' && 'inactive'"
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
    <div v-if="selectedAll.length !== 0" class="filter-container">
      <div class="grid-item close" @click="clearSelected">
        <CloseIcon />
        zurücksetzen
      </div>
    </div>
  </div>
</template>

<script setup>
import CloseIcon from '@/assets/icones/CloseIcon.vue'
import router from '@/router'
import { useApiStore, useGeneral } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const { responses } = useApiStore()

const choosbaleRef = ref([])

const rouetId = computed(() => route.params.slug)

const { toggleSelected, getIsSelected, getChoosables, clearSelected } = useGeneral()
const generalStore = useGeneral()
const { selectedAll } = storeToRefs(generalStore)

function select(tag) {
  if (route.params.slug) {
    router.push({ name: route.name.split('-')[0] })
  }
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
  color black
  overflow hidden
  gap 2rem
  font-size var(--filter-font-size)
  padding-bottom 12rem
  padding-top 2rem
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
      &.close
        font-size 0.7em
        align-items center
        svg
          margin-top .1em
          margin-right .3rem
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
    display none !important
</style>
