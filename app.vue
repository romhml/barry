<script setup lang="ts">
import { defineCustomElement } from 'vue'
import Progression from '~/components/ce/Progression.ce.vue'
import Partition from '~/components/ce/Partition.ce.vue'

useServerSeoMeta({})

useServerSeoMeta({
  title: 'Barry - Your Music Learning Assistant',
  description:
    'Barry helps you learn music with personalized guidance and information.',
  keywords:
    'music, learn music, music theory, sheet music, chords, music assistant',
})

const BProgression = defineCustomElement(Progression)
const BPartition = defineCustomElement(Partition)

function register() {
  customElements.define('b-progression', BProgression)
  customElements.define('b-partition', BPartition)
}

onMounted(() => {
  register()
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease-in;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
