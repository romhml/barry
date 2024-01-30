<script setup lang="ts">
import { PlayIcon, PauseIcon } from '@heroicons/vue/20/solid'
import abcjs from 'abcjs'

const props = defineProps({
  data: { type: String, required: true },
})

const notes = ref()
const synth = ref()
const tune = ref()
const isPlaying = ref(false)
const loading = ref(false)

onMounted(async () => {
  synth.value = new abcjs.synth.CreateSynth()

  tune.value = abcjs.renderAbc(notes.value, props.data, {
    add_classes: true,
    responsive: 'resize',
    tablature: [
      {
        instrument: 'guitar',
      },
    ],
  })
  tune.value[0].setUpAudio()
})

async function play() {
  if (isPlaying.value || loading.value) return
  loading.value = true

  await synth.value.init({
    visualObj: tune.value[0],
    audioContext: new window.AudioContext(),
    millisecondsPerMeasure: tune.value[0].millisecondsPerMeasure(),
    options: {
      onEnded() {
        isPlaying.value = false
      },
    },
  })

  await synth.value.prime()
  loading.value = false
  isPlaying.value = true

  synth.value.start()
  synth.value
}

async function pause() {
  if (!isPlaying.value) return
  synth.value.stop()
  isPlaying.value = false
}
</script>

<template>
  <div
    class="not-prose relative my-4 flex justify-center rounded-lg border p-2"
  >
    <div
      ref="notes"
      class="mx-auto"
    ></div>

    <div class="absolute right-4 top-4">
      <button
        v-if="!isPlaying"
        class="cursor-pointer text-gray-400 transition hover:text-gray-600"
        @click="play()"
      >
        <PlayIcon class="w-5" />
      </button>
      <button
        v-else
        class="cursor-pointer text-gray-400 transition hover:text-gray-600"
        @click="pause()"
      >
        <PauseIcon class="w-5" />
      </button>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/main.css');
</style>
