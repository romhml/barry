<script setup lang="ts">
import type { Chord } from '@/composables/useChord'

const props = defineProps({
  data: { type: String, required: true },
  author: { type: String, default: undefined },
  title: { type: String, default: undefined },
})

function parseProgression(prog: string) {
  const chords = prog.split(/\|/)

  return chords.reduce((acc, value) => {
    const trimmed = value.trim()

    if (trimmed == '' || !trimmed || trimmed == '\n') {
      return acc
    }

    acc.push({ label: trimmed })
    return acc
  }, [] as Chord[])
}

const progression = computed(() => parseProgression(props.data))
</script>

<template>
  <div class="my-4 rounded-lg border p-6">
    <div class="mb-8 text-center">
      <p class="font-jazz text-3xl font-bold">{{ props.title }}</p>
      <p class="font-jazz text-lg">{{ props.author }}</p>
    </div>

    <div class="grid grid-cols-4 gap-y-6">
      <p
        v-for="(chord, count) in progression"
        :key="chord.label + count"
        :class="{ 'border-l-2': count % 4 === 0 }"
        class="border-r-2 border-black p-2 font-jazz text-4xl"
      >
        {{ chord.label }}
      </p>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/main.css');
</style>
