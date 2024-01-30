<script setup lang="ts">
import { UserIcon } from '@heroicons/vue/20/solid'
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
    <div class="h-8 w-8 flex-none rounded-full border p-1.5">
      <svg
        v-if="role === 'assistant'"
        class="text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M10 21q-1.65 0-2.825-1.175T6 17q0-1.65 1.175-2.825T10 13q.575 0 1.063.138t.937.412V4q0-.425.288-.712T13 3h4q.425 0 .713.288T18 4v2q0 .425-.288.713T17 7h-3v10q0 1.65-1.175 2.825T10 21"
        />
      </svg>
      <UserIcon
        v-else
        class="text-gray-400"
      />
    </div>
    <div class="w-full">
      <p class="mt-1 font-bold">{{ role == 'user' ? 'You' : 'Barry' }}</p>
      <div
        class="prose-md mx-auto whitespace-pre text-wrap break-words"
        v-html="augmentedResponse"
      />
    </div>
  </div>
</template>
