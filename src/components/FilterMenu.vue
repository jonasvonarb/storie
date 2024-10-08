<template>
  <div class="container">
    <!-- alls tipp: ein v-for loop braucht immer einen key, der spezifisch für jedes elemnt anders ist -->
    <div v-for="bereich in responses?.project?.[0]?.allTagClients" class="grid-item" :key="bereich.id" @click="select">
      {{ bereich.label }}
    </div>

    <br>  

    <div v-for="auftrag in responses?.project?.[0]?.allTagProjectSorts" class="grid-item" :key="auftrag.id" @click="select">
      {{ auftrag.label }}
    </div>
    
    <br>  
    
    <div v-for="tag in responses?.project?.[0]?.allTagsProjectAreas" class="grid-item" :key="tag.id" @click="select">
      {{ tag.label }}
    </div>

  </div>
</template>

<script setup>
import { useApiStore } from '@/stores'

const { responses } = useApiStore()

function select() {
  console.log('Hallo');
}

//console.log('Test:', responses)
</script>

<style lang="stylus" scoped>
.container
  display flex
  flex-direction column
  width calc(100vw - var(--containert-width) - var(--padding))
  
  font-size 18px
  color black

</style>
