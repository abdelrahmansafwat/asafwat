<template>
  <section v-if="days.length" id="save" class="mx-auto max-w-5xl scroll-mt-28 px-4 pt-12">
    <div class="panel p-6 md:p-8">
      <h2 class="panel-title">Save file</h2>
      <p class="mt-2 text-2xl font-black">{{ total.toLocaleString('en-US') }} contributions · {{ active }} days played</p>
      <p class="text-sm text-[var(--c-muted)]">
        GitHub contributions since 2023, including private work repositories.
      </p>
      <div class="mt-4 flex flex-wrap gap-2" role="group" aria-label="Year">
        <button
          v-for="y in years"
          :key="y"
          type="button"
          class="btn !px-3 !py-1 !text-sm"
          :class="{ 'btn-teal': y === year }"
          :aria-pressed="y === year"
          @click="year = y"
        >
          {{ y }}
        </button>
      </div>
      <div class="mt-4 overflow-x-auto pb-2">
        <div class="heat" role="img" :aria-label="`${yearTotal} contributions in ${year}`">
          <span
            v-for="(d, i) in cells"
            :key="i"
            :data-l="d?.level"
            :class="{ 'heat-empty': !d }"
            :title="d ? tip(d) : undefined"
          />
        </div>
      </div>
      <p class="pixel mt-2 text-sm">{{ yearTotal.toLocaleString('en-US') }} in {{ year }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
  type Day = { date: string; count: number; level: number }
  const { data } = await useFetch('/api/contributions', { default: () => ({ start: '2023-01-01', counts: [] as number[], levels: '' }) })
  const days = computed<Day[]>(() => {
    const start = new Date(`${data.value.start}T00:00:00Z`).getTime()
    return data.value.counts.map((count, i) => ({
      date: new Date(start + i * 86_400_000).toISOString().slice(0, 10),
      count,
      level: Number(data.value.levels[i]),
    }))
  })
  const years = computed(() => [...new Set(days.value.map((d) => d.date.slice(0, 4)))])
  const year = ref(years.value[years.value.length - 1]!)
  const total = computed(() => days.value.reduce((sum, d) => sum + d.count, 0))
  const active = computed(() => days.value.filter((d) => d.count > 0).length)
  const busiest = computed(() => days.value.reduce((a, b) => (b.count > a.count ? b : a), days.value[0]!))

  const yearDays = computed(() => days.value.filter((d) => d.date.startsWith(year.value)))
  const yearTotal = computed(() => yearDays.value.reduce((sum, d) => sum + d.count, 0))
  const cells = computed<(Day | null)[]>(() => {
    const offset = new Date(`${year.value}-01-01T00:00:00Z`).getUTCDay()
    return [...Array<null>(offset).fill(null), ...yearDays.value]
  })

  function tip(d: Day) {
    const base = `${d.count} on ${d.date}`
    return d.date === busiest.value.date ? `${base}. A critical hit!` : base
  }
</script>
