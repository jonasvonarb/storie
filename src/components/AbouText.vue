<template>
  <div class="container">
    <div>
      Wir beraten, organisieren und setzen um.
      Wir erarbeiten Lösungen. Kreativ und pragmatisch,
auf Augenhöhe mit unseren Projektpartner:innen.

<br>
<br>

Kulturgut
<br>
Wir ordnen Akten und dokumentieren Objekte. Im Auftrag von Museen, Archiven, NGOs, Unternehmen und Privaten.

<br>
<br>

Vermittlung
<br>
Wir recherchieren, entwickeln Erzählungen und setzen Inhalte in Szene. Für Ausstellungen, Veranstaltungen und Publikationen.

<br>
<br>

Betrieb
<br>
Wir evaluieren Bedürfnisse, definieren Vorgehensweisen und Kommunikationsstrategien, administrieren Betriebslösungen. Für Unternehmen, NGOs oder staatliche Institutionen.

</div>


  </div>
</template>

<script setup>
import { useApiStore } from '@/stores'
import { watch } from 'vue'

const { responses } = useApiStore()

// // Watch for changes in responses
// watch(
//   responses,
//   (newVal, oldVal) => {
//     console.log(newVal, oldVal)
//     if (newVal !== oldVal) {
//       console.log('responses changed from', oldVal, 'to', newVal)
//     }
//   },
//   { deep: true }
// )
</script>

<style lang="stylus" scoped>
</style>
