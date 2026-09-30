<template>
  <section id="inventory" class="mx-auto max-w-5xl scroll-mt-28 px-4 pt-12">
    <div class="panel p-6 md:p-8">
      <h2 class="panel-title">Inventory</h2>
      <div class="mt-5 space-y-5">
        <div v-for="g in inventory" :key="g.group">
          <h3 class="pixel text-[var(--c-muted)]">{{ g.group.toUpperCase() }}</h3>
          <ul class="mt-2 flex flex-wrap gap-2">
            <li v-for="item in g.items" :key="item" class="slot">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { inventory } from '~/data/site'
</script>
