<script setup lang="ts">
import abcjs from 'abcjs'

const props = defineProps({
  data: { type: String, required: true },
})

const notes = ref()

onMounted(() => {
  abcjs.renderAbc(notes.value, props.data, {
    add_classes: true,
    responsive: 'resize',
    tablature: [
      {
        instrument: 'guitar',
      },
    ],
  })
})
</script>

<template>
  <div class="not-prose my-4 flex justify-center rounded-lg border p-2">
    <div
      ref="notes"
      class="mx-auto"
    ></div>
  </div>
</template>
<style scoped>
@import url('@/assets/css/main.css');
</style>
