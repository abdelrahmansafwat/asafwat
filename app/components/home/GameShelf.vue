<template>
  <section id="shelf" class="mx-auto max-w-5xl scroll-mt-28 px-4 pt-12">
    <div class="panel p-6 md:p-8">
      <h2 class="panel-title">Game shelf</h2>
      <p class="mt-1">A very JRPG person, and a huge Nintendo fan.</p>
      <ul class="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        <li v-for="g in games" :key="g.name" class="cart" :class="{ 'has-note': g.note }" :tabindex="g.note ? 0 : undefined">
          <span class="cart-label">{{ g.name }}</span>
          <template v-if="g.note">
            <span class="cart-mark" aria-hidden="true">!</span>
            <span class="cart-note">{{ g.note }} <span v-if="g.keyboardNote" class="keyboard-only">{{ g.keyboardNote }}</span></span>
          </template>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { games } from '~/data/site'
</script>
