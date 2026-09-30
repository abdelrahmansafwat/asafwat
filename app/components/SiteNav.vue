<template>
  <nav aria-label="Main">
    <ul class="rpg-menu">
      <li v-for="link in links" :key="link.to">
        <NuxtLink :to="link.to">{{ link.label }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  const links = [
    { label: 'Party', to: '/#party' },
    { label: 'Inventory', to: '/#inventory' },
    { label: 'Save file', to: '/#save' },
    { label: 'Quests', to: '/#quests' },
    { label: 'Letter', to: '/contact' },
  ]
</script>
