<template>
  <footer class="px-4 pb-8 pt-12">
    <div class="panel mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-3">
      <p class="pixel text-sm">Last saved: {{ lastSaved }}</p>
      <ul class="flex flex-wrap gap-x-4 font-bold [&_a]:inline-block [&_a]:py-2.5 md:[&_a]:py-0">
        <li><a :href="profile.linkedin" target="_blank" rel="noopener">LinkedIn</a></li>
        <li><NuxtLink to="/contact">Letter</NuxtLink></li>
        <li><a :href="profile.cvHref" download>CV</a></li>
      </ul>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import { profile } from '~/data/site'

  const lastSaved = new Date(useRuntimeConfig().public.builtAt)
    .toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
</script>
