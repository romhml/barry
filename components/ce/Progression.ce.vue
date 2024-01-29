<script setup lang="ts">
import Chord from '@tonaljs/chord'
import type { Chord as ChordT } from '@tonaljs/chord'

const props = defineProps({
  data: { type: String, required: true },
  author: { type: String, default: undefined },
  title: { type: String, default: undefined },
})

function parseProgression(prog: string) {
  const bars = prog.split(/\|/)

  return bars.reduce((acc, bar) => {
    const chords = bar.split(/\s+/).filter((chord) => chord.trim() !== '')

    const chordObjects = chords.map((chord) => {
      const trimmed = chord.trim()
      return Chord.get(trimmed)
    })

    acc.push(chordObjects)
    return acc
  }, [] as ChordT[][])
}

const progression = computed(() => parseProgression(props.data))

onMounted(() => {
  console.log('Parsed Progression: ', progression.value)
})
</script>

<template>
  <div class="not-prose my-4 rounded-lg border p-6">
    <div class="mb-8 text-center">
      <p class="font-jazz text-3xl font-bold">{{ props.title }}</p>
      <p class="font-jazz text-lg">{{ props.author }}</p>
    </div>

    <div class="grid grid-cols-4 gap-y-6">
      <div
        v-for="(bar, barIndex) in progression"
        :key="`bar-${barIndex}`"
        class="flex space-x-2 border-r-2 border-black"
      >
        <p
          v-for="(chord, chordIndex) in bar"
          :key="`bar${barIndex}-chord${chordIndex}`"
          class="text-wrap p-2 font-jazz"
          :class="{
            'text-4xl': bar.length < 3,
            'text-2xl': bar.length >= 3,
          }"
        >
          {{ chord.symbol }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/main.css');
</style>
