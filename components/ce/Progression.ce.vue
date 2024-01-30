<script setup lang="ts">
import Chord from '@tonaljs/chord'

const props = defineProps({
  data: { type: String, required: true },
  author: { type: String, default: undefined },
  title: { type: String, default: undefined },
})

function parseProgression(prog: string) {
  const bars = prog.split(/\|/)

  return bars.reduce((acc, bar) => {
    const chords = bar.split(/\s+/).filter((chord) => chord.trim() !== '')

    const chordsInBar = chords.map((value) => {
      const trimmed = value.trim()
      const chord = Chord.get(trimmed)

      return chord.empty ? trimmed : chord.symbol
    })
    acc.push(chordsInBar)

    return acc
  }, [] as string[][])
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
          v-for="chord in bar"
          :key="`bar${barIndex}-chord${chord}`"
          class="text-wrap p-2 font-jazz"
          :class="{
            'text-4xl': bar.length < 3,
            'text-2xl': bar.length >= 3,
          }"
        >
          {{ chord }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/main.css');
</style>
