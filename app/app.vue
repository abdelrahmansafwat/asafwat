<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
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
          sameAs: ['https://www.linkedin.com/in/abdelrahman-safwat/', 'https://github.com/abdelrahmansafwat'],
          knowsAbout: ['Vue', 'React', 'NestJS', 'TypeScript', 'Node.js'],
        }),
      },
    ],
  })
</script>
