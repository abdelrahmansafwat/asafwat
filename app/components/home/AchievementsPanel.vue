<template>
  <section id="achievements" class="mx-auto max-w-5xl scroll-mt-28 px-4 pt-12">
    <div class="panel p-6 md:p-8">
      <h2 class="panel-title">Achievements</h2>
      <ul class="mt-5 grid gap-4 md:grid-cols-3">
        <li v-for="a in achievements" :key="a.title" class="flex gap-3">
          <span class="badge" aria-hidden="true">
            <IconTrophy width="22" height="22" />
          </span>
          <div>
            <h3 class="font-black">{{ a.title }}</h3>
            <p class="mt-1">{{ a.detail }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { achievements } from '~/data/site'
</script>
