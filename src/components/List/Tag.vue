<template>{{ tag.label }}{{ last ? ', ' : ' ' }}</template>

<script setup>
const props = defineProps({
  tag: {
    type: Object,
    required: true,
    default: () => ({})
  },
  last: {
    type: Boolean,
    required: false,
    default: false
  },
  index: {
    type: Number,
    required: true
  },
  length: {
    type: Number,
    required: true
  }
})
</script>

<style lang="stylus" scoped></style>
