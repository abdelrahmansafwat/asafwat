<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
  import { useDocumentVisibility } from '@vueuse/core'
  import { profile } from '~/data/site'

  const { data: sun } = await useHomeSun()
  const route = useRoute()
  const url = computed(() => `https://asafwat.dev${route.path}`)

  useHead({
    link: [{ rel: 'canonical', href: url }],
    meta: [{ property: 'og:url', content: url }],
    script: [
      {
        tagPosition: 'head',
        innerHTML: () =>
          `(function(){try{var s=${JSON.stringify(sun.value)};var t=localStorage.getItem('theme');var now=new Date().toISOString().slice(11,16);var dark=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches||(s&&(now<s.sunrise||now>=s.sunset));if(dark){document.documentElement.classList.add('dark')}}catch(e){}})();`,
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Abdelrahman Safwat',
          alternateName: 'Abdo',
          jobTitle: 'Full Stack Developer',
          url: 'https://asafwat.dev',
          image: 'https://asafwat.dev/mii.webp',
          sameAs: [profile.linkedin, `https://github.com/${profile.github.username}`],
          knowsAbout: ['Vue', 'React', 'NestJS', 'TypeScript', 'Node.js'],
        }),
      },
    ],
  })

  const visibility = useDocumentVisibility()
  let title = ''
  watch(visibility, (state) => {
    if (state === 'hidden') {
      title = document.title
      document.title = 'Hey! Listen!'
    } else if (title) {
      document.title = title
    }
  })

  onMounted(() => {
    console.log(
      '%cOh, a fellow developer!%c\nThe source is on GitHub: https://github.com/%s/asafwat\nAnd letters are always welcome: https://asafwat.dev/contact',
      'font-size: 16px; font-weight: bold; color: #1F9E96',
      'font-size: 13px',
      profile.github.username,
    )
  })
</script>
