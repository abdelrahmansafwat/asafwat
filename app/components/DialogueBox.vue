<template>
  <div class="dialogue" @click="onClick">
    <p class="sr-only" aria-live="polite">{{ text }}</p>
    <p aria-hidden="true" class="min-h-[4.5em] text-lg leading-relaxed">{{ shown }}</p>
    <span class="dialogue-next" aria-hidden="true">▼</span>
  </div>
</template>

<script setup lang="ts">
  import { useEventListener, useIntervalFn, usePreferredReducedMotion } from '@vueuse/core'

  const props = defineProps<{ text: string }>()
  const emit = defineEmits<{ next: [] }>()
  const shown = ref(props.text)
  const motion = usePreferredReducedMotion()
  let typed = 0

  const { isActive: typing, pause, resume } = useIntervalFn(() => {
    typed++
    shown.value = props.text.slice(0, typed)
    if (typed >= props.text.length) pause()
  }, 28, { immediate: false })

  function finish() {
    pause()
    shown.value = props.text
  }

  function type() {
    if (motion.value === 'reduce') return finish()
    typed = 0
    shown.value = ''
    resume()
  }

  function onClick() {
    if (typing.value) finish()
    else emit('next')
  }

  onMounted(type)
  watch(() => props.text, type)
  useEventListener('keydown', finish)
</script>
