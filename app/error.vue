<template>
  <NuxtLayout>
    <section class="mx-auto max-w-2xl px-4 pt-20">
      <div class="dialogue text-center">
        <p class="pixel text-sm text-[#7FE0D6]">{{ notFound ? '404' : 'GAME OVER' }}</p>
        <p class="mt-2 text-xl leading-relaxed">
          {{
            notFound
              ? "Thank you for visiting! But the page you're looking for is in another castle!"
              : "The server fainted! It's resting at the Pokémon Center. Continue?"
          }}
        </p>
      </div>
      <div class="mt-6 flex justify-center gap-3">
        <button v-if="!notFound" type="button" class="btn btn-teal" @click="retry">Continue</button>
        <button type="button" class="btn" :class="{ 'btn-teal': notFound }" @click="clearError({ redirect: '/' })">Back to the start</button>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
  import type { NuxtError } from '#app'

  const props = defineProps<{ error: NuxtError }>()
  const notFound = computed(() => props.error?.statusCode === 404)
  useHead({ title: notFound.value ? 'Another castle · asafwat.dev' : 'Game over · asafwat.dev' })

  function retry() {
    window.location.reload()
  }
</script>
