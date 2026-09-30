<template>
  <section id="quests" class="mx-auto max-w-5xl scroll-mt-28 px-4 pt-12">
    <div class="panel p-6 md:p-8">
      <h2 class="panel-title">Quest log</h2>
      <ol class="mt-5 space-y-6">
        <li v-for="job in experience" :key="job.company">
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h3 class="text-xl font-black">{{ job.role }} · {{ job.company }}</h3>
            <span class="pixel text-sm text-[var(--c-muted)]">{{ job.period }}</span>
          </div>
          <ul class="mt-2 list-disc space-y-1 pl-5">
            <li v-for="p in job.points" :key="p">{{ p }}</li>
          </ul>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { experience } from '~/data/site'
</script>
