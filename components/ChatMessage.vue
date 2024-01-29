<script setup lang="ts">
import { marked } from 'marked'
const props = defineProps({
  content: { type: String, required: true },
  role: { type: String as PropType<'user' | 'assistant'>, required: true },
})

const augmentedResponse = computed(() => {
  if (props.role == 'user') {
    return props.content
  }
  return marked(props.content)
})
</script>

<template>
  <div class="flex items-start space-x-3 py-4">
    <div class="h-8 w-8 flex-none rounded-full bg-gray-200"></div>
    <div class="w-full">
      <p class="mt-0.5 font-bold">{{ role == 'user' ? 'You' : 'Bot' }}</p>
      <div
        class="prose-md mx-auto whitespace-pre text-wrap break-words"
        v-html="augmentedResponse"
      />
    </div>
  </div>
</template>
