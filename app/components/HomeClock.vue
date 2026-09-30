<template>
  <time class="pixel" :title="`Local time in ${profile.home.name}`">{{ time }}</time>
</template>

<script setup lang="ts">
  import { useIntervalFn } from '@vueuse/core'
  import { profile } from '~/data/site'

  const format = new Intl.DateTimeFormat('en-GB', { timeZone: profile.home.timeZone, hour: '2-digit', minute: '2-digit', hour12: false })
  const time = ref('--:--')
  const tick = () => { time.value = format.format(new Date()) }
  const { resume } = useIntervalFn(tick, 15_000, { immediate: false })

  onMounted(() => {
    tick()
    resume()
  })
</script>
