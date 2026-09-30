<template>
  <header class="px-4 pt-4 md:sticky md:top-0 md:z-40">
    <div class="panel mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-3">
      <NuxtLink to="/" class="pixel text-xl font-bold">asafwat<span class="text-[var(--c-red)]">.</span>dev</NuxtLink>
      <SiteNav class="order-last w-full min-w-0 md:order-none md:w-auto" />
      <ThemeToggle />
    </div>
  </header>
</template>
