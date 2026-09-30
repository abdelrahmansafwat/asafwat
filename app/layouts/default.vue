<template>
  <div class="flex min-h-screen flex-col">
    <a href="#content" class="btn sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50">Skip to content</a>
    <SiteHeader />
    <main id="content" class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
