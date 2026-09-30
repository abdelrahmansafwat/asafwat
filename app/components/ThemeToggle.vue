<template>
  <button
    type="button"
    class="btn !px-3 !py-1"
    :aria-pressed="isDark"
    :aria-label="isDark ? 'Switch to sunset mode' : 'Switch to dusk mode'"
    @click="toggle"
  >
    <IconSun v-if="isDark" width="20" height="20" />
    <IconMoon v-else width="20" height="20" />
  </button>
</template>

<script setup lang="ts">
  const isDark = ref(false)

  useHead({ meta: [{ name: 'theme-color', content: () => (isDark.value ? '#1E1B3A' : '#FFB627') }] })

  onMounted(() => {
    isDark.value = document.documentElement.classList.contains('dark')
  })

  function toggle() {
    const dark = !isDark.value
    const apply = () => {
      isDark.value = dark
      document.documentElement.classList.toggle('dark', dark)
    }
    if (document.startViewTransition) document.startViewTransition(apply)
    else apply()
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {}
  }
</script>
