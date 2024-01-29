<script setup lang="ts">
import { defineCustomElement } from 'vue'
import Progression from '~/components/ce/Progression.ce.vue'
import Lyrics from '~/components/ce/Lyrics.ce.vue'

const BProgression = defineCustomElement(Progression)
const BLyrics = defineCustomElement(Lyrics)

function register() {
  customElements.define('b-progression', BProgression)
  customElements.define('b-lyrics', BLyrics)
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
