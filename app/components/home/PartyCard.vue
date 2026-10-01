<template>
  <section id="party" class="mx-auto max-w-5xl scroll-mt-28 px-4 pt-10">
    <div class="panel grid gap-6 p-6 md:grid-cols-[auto_1fr] md:items-center md:p-8">
      <div class="relative justify-self-center md:justify-self-start">
        <button ref="portrait" type="button" class="portrait" :class="egg" @click="poke" @contextmenu.prevent @animationend="egg = ''">
          <img :src="profile.avatar" alt="Poke Abdo's Mii: red glasses and a teal hoodie" width="180" height="180" fetchpriority="high" draggable="false">
        </button>
        <div v-if="menuOpen" ref="menu" class="emote-menu" role="group" aria-label="Emotes">
          <button v-for="(_, name) in emotes" :key="name" type="button" class="btn !px-3 !py-1 !text-sm" @click="emote(name)">{{ name.slice(1) }}</button>
        </div>
      </div>
      <div>
        <p class="panel-title text-center md:text-left">Party member</p>
        <h1 class="mt-1 text-center text-3xl font-black leading-tight md:text-left md:text-5xl">{{ profile.name }}</h1>
        <DialogueBox class="mt-4 md:hidden" :text="line" @next="line = greeting" />
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
    <DialogueBox class="mt-5 hidden md:block" :text="line" @next="line = greeting" />
    <div class="mt-6 flex flex-wrap gap-3">
      <a :href="profile.cvHref" class="btn" download @click="giveCv">Download CV</a>
      <NuxtLink to="/contact" class="btn btn-teal">Write me a letter</NuxtLink>
      <a :href="profile.linkedin" class="btn" target="_blank" rel="noopener">LinkedIn</a>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onClickOutside, onLongPress, useEventListener, useIdle, useMediaQuery, useTimeoutFn } from '@vueuse/core'
  import { profile, intro, languages, likes } from '~/data/site'

  const line = ref(intro)
  const night = ref(false)
  const hello = ref('Hi!')
  const greeting = computed(() => {
    const text = intro.replace(/^Hi!/, hello.value)
    return night.value ? `${text} It's late here, so I'm probably deep in a JRPG right now.` : text
  })
  const { data: sun } = await useHomeSun()
  const egg = ref('')
  const pokes = ref(0)
  const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
  let progress = 0
  let typed = ''
  const emotes: Record<string, [string, string]> = {
    '/wave': ['egg-wiggle', 'Abdo waves at you.'],
    '/dance': ['egg-dance', 'Abdo dances gleefully.'],
    '/cheer': ['egg-jump', 'Abdo cheers you on!'],
  }

  const portrait = ref<HTMLElement>()
  const menu = ref<HTMLElement>()
  const menuOpen = ref(false)
  let longPressed = false
  onLongPress(portrait, (e) => {
    if (e.pointerType !== 'touch') return
    longPressed = true
    menuOpen.value = true
  }, { delay: 500 })
  onClickOutside(menu, () => { menuOpen.value = false }, { ignore: [portrait] })

  function emote(name: string) {
    menuOpen.value = false
    play(...emotes[name]!)
  }
  const keyboard = useMediaQuery('(hover: hover) and (pointer: fine)')
  const hints = computed(() => [
    ...(keyboard.value
      ? ['Psst... old games had cheat codes. Some habits die hard.', 'FFXIV players: this box understands emotes. Try /wave.']
      : ['Hold me down for a second. I know a few emotes.']),
    'You can poke me, you know.',
  ])
  let hint = 0
  const { idle } = useIdle(20_000)
  watch(idle, (isIdle) => {
    if (!isIdle || line.value !== greeting.value) return
    line.value = hints.value[hint % hints.value.length]!
    hint++
  })

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
    if (longPressed) {
      longPressed = false
      return
    }
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
    if (e.key === '/') e.preventDefault()
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
    const hour = Number(new Intl.DateTimeFormat('en-GB', { timeZone: profile.home.timeZone, hour: '2-digit', hourCycle: 'h23' }).format(new Date()))
    if (night.value && hour < 12) hello.value = 'Hi, night owl!'
    else if (hour < 9) hello.value = 'Yaaawn... Good morning!'
    else if (hour < 12) hello.value = 'Good morning!'
    else if (hour < 17 && !night.value) hello.value = 'Good afternoon!'
    else hello.value = 'Good evening!'
    line.value = greeting.value
  })
  useEventListener('keydown', onKey)
</script>
