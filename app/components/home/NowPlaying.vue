<template>
  <section id="now" class="mx-auto max-w-5xl scroll-mt-28 px-4 pt-12">
    <div class="panel p-6 md:p-8">
      <h2 class="panel-title">Right now</h2>
      <dl class="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-lg">
        <template v-for="n in items" :key="n.label">
          <dt class="pixel text-[var(--c-muted)]">{{ n.label.toUpperCase() }}</dt>
          <dd>{{ n.value }}</dd>
        </template>
      </dl>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { now } from '~/data/site'

  const items = now.filter((n) => n.value)
</script>
