<template>
  <section class="mx-auto max-w-2xl px-4 pt-12">
    <h1 class="text-3xl font-black md:text-4xl">Write Abdo a letter</h1>
    <p class="mt-3 max-w-xl">A role, a question, an FFXIV raid invite, or just hello. It goes straight to my inbox.</p>
    <div class="mt-8">
      <LetterForm />
    </div>
  </section>
</template>

<script setup lang="ts">
  useHead({
    title: 'Write Abdo a letter · asafwat.dev',
    meta: [{ name: 'description', content: 'Write Abdelrahman (Abdo) Safwat a letter: a role, a question, or just hello.' }],
  })
</script>
