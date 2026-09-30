<template>
  <section id="party" class="mx-auto max-w-5xl scroll-mt-28 px-4 pt-10">
    <div class="panel grid gap-6 p-6 md:grid-cols-[auto_1fr] md:items-center md:p-8">
      <button type="button" class="portrait" :class="egg" @click="poke" @animationend="egg = ''">
        <img :src="profile.avatar" alt="Poke Abdo's Mii: red glasses and a teal hoodie" width="180" height="180" fetchpriority="high">
      </button>
      <div>
        <p class="panel-title">Party member</p>
        <h1 class="mt-1 text-3xl font-black leading-tight md:text-5xl">{{ profile.name }}</h1>
        <dl class="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-lg">
          <dt class="pixel text-[var(--c-muted)]">CLASS</dt>
          <dd>{{ profile.role }}</dd>
          <dt class="pixel text-[var(--c-muted)]">LV</dt>
          <dd>{{ profile.level }} years</dd>
          <dt class="pixel text-[var(--c-muted)]">HOME</dt>
          <dd>{{ profile.home.name }} · <HomeClock /> local time<template v-if="night">, after dark</template></dd>
          <dt class="pixel text-[var(--c-muted)]">LANG</dt>
          <dd>{{ languages }}</dd>
          <dt class="pixel text-[var(--c-muted)]">LIKES</dt>
          <dd>{{ likes }}</dd>
        </dl>
      </div>
    </div>
    <DialogueBox class="mt-5" :text="line" @next="line = greeting" />
    <div class="mt-6 flex flex-wrap gap-3">
      <a :href="profile.cvHref" class="btn" download @click="giveCv">Download CV</a>
      <NuxtLink to="/contact" class="btn btn-teal">Write me a letter</NuxtLink>
      <a :href="profile.linkedin" class="btn" target="_blank" rel="noopener">LinkedIn</a>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useEventListener, useTimeoutFn } from '@vueuse/core'
  import { profile, intro, languages, likes } from '~/data/site'

  const line = ref(intro)
  const night = ref(false)
  const greeting = computed(() => (night.value ? `${intro} It's late here, so I'm probably deep in a JRPG right now.` : intro))
  const { data: sun } = await useHomeSun()
  const egg = ref('')
  const pokes = ref(0)
  const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
  let progress = 0
  let typed = ''
  const emotes: Record<string, [string, string]> = {
    '/wave': ['egg-wiggle', 'Abdo waves at you.'],
    '/dance': ['egg-dance', 'Abdo dances gleefully.'],
    '/bow': ['egg-bow', 'Abdo bows courteously to you.'],
  }
  const { start: stopEvolving } = useTimeoutFn(() => { line.value = '...Huh? Abdo stopped evolving!' }, 2200, { immediate: false })

  function play(anim: string, text: string) {
    egg.value = ''
    requestAnimationFrame(() => { egg.value = anim })
    line.value = text
  }

  function giveCv() {
    play('', "It's dangerous to go alone! Take this.")
  }

  function poke() {
    pokes.value++
    if (pokes.value % 10 === 0) {
      play('egg-evolve', 'What? Abdo is evolving!')
      stopEvolving()
    } else if (pokes.value % 5 === 0) {
      play('egg-wiggle', 'Hey, that tickles! Five pokes? You must really like clicking things.')
    }
  }

  function onKey(e: KeyboardEvent) {
    if (e.key.length > 1 && !e.key.startsWith('Arrow')) return
    const target = e.target as HTMLElement | null
    if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return
    if (e.key.length === 1) {
      typed = (typed + e.key.toLowerCase()).slice(-10)
      const emote = Object.keys(emotes).find((name) => typed.endsWith(name))
      if (emote) {
        typed = ''
        play(...emotes[emote]!)
      }
    }
    if (e.key.toLowerCase() === konami[progress]?.toLowerCase()) progress++
    else progress = e.key === 'ArrowUp' ? Math.min(progress, 2) || 1 : 0
    if (progress === konami.length) {
      progress = 0
      play('egg-jump', 'Up, up, down, down, left, right, left, right, B, A! Secret unlocked: +30 lives. Please use them wisely.')
    }
  }

  onMounted(() => {
    night.value = !!sun.value && isAfterDark(sun.value)
    line.value = greeting.value
  })
  useEventListener('keydown', onKey)
</script>
