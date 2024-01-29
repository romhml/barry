<script setup lang="ts">
import { ArrowRightIcon, ArrowPathIcon } from '@heroicons/vue/20/solid'

const loading = ref(false)
const form = ref()
const formData = ref({ prompt: '' })

const messages = ref()

async function onSubmit() {
  if (loading.value) {
    return
  }

  const prompt = formData.value.prompt
  messages.value.unshift({
    // TODO: Generating IDs randomly for now to pass a key to the v-for.
    // replace with API value later.
    id: Math.random().toString(36).substring(2),
    content: prompt,
    role: 'user',
  })

  loading.value = true
  formData.value.prompt = ''

  const { data } = await useFetch('/api/prompt', {
    method: 'post',
    body: { ...formData.value, prompt },
  })

  messages.value.unshift({
    ...data.value!.choices[0].message,
    id: Math.random().toString(36).substring(2),
  })

  loading.value = false

  // Temporarily store messages to localStorage for easy testing / debugging
  localStorage.setItem('chat', JSON.stringify(messages.value))
}

onMounted(() => {
  // Temporarily store messages to localStorage for easy testing / debugging
  messages.value = JSON.parse(localStorage.getItem('chat') ?? '[]')
})
</script>

<template>
  <div class="mx-auto flex h-screen w-full max-w-screen-md flex-col pb-4">
    <div class="flex w-full flex-1 flex-col-reverse overflow-y-scroll py-4">
      <TransitionGroup name="list">
        <ChatMessage
          v-for="message in messages"
          :key="message.id"
          :content="message.content"
          :role="message.role"
          class="w-full"
        />
      </TransitionGroup>
    </div>

    <form
      ref="form"
      class="relative w-full"
      hx-sse-post="/"
      hx-trigger="submit, keyup[keyCode==13 && !shiftKey && !ctrlKey && !altKey]"
      hx-sse-events="message, chunk, end"
      hx-on::sse-message="onSSEMessage(event)"
      hx-swap="none"
      @submit.prevent="onSubmit()"
      @keyup.enter.exact="onSubmit()"
    >
      <textarea
        v-model="formData.prompt"
        name="prompt"
        class="w-full resize-none rounded-xl border border-gray-200 px-4 py-3.5 pr-12 shadow-lg outline-none focus:shadow-xl"
        rows="5"
        placeholder="Ask me anything!"
        required
        @keydown.enter.exact="$event.preventDefault()"
      ></textarea>

      <button
        type="submit"
        class="absolute right-2 top-2.5 rounded-xl bg-black p-1.5 font-bold text-white transition ease-in-out disabled:cursor-not-allowed disabled:bg-gray-500/80"
        :disabled="loading"
      >
        <Transition mode="out-in">
          <ArrowPathIcon
            v-if="loading"
            class="h-5 w-5 animate-spin"
          />
          <ArrowRightIcon
            v-else
            class="h-5 w-5"
          />
        </Transition>
      </button>
    </form>
  </div>
</template>
