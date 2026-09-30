import { profile } from '~/data/site'

const { username, since: start } = profile.github
const day = 86_400_000

async function fetchYear(year: number) {
  const html = await $fetch<string>(`https://github.com/users/${username}/contributions?from=${year}-01-01&to=${year}-12-31`, { responseType: 'text' })
  const tips = new Map<string, string>()
  for (const m of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g)) tips.set(m[1]!, m[2]!)
  const days = new Map<string, { count: number; level: number }>()
  for (const m of html.matchAll(/<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="([^"]+)"[^>]*data-level="(\d)"/g)) {
    const count = Number(tips.get(m[2]!)?.match(/^(\d+) contribution/)?.[1] ?? 0)
    days.set(m[1]!, { count, level: Number(m[3]) })
  }
  return days
}

export default defineCachedEventHandler(async () => {
  const today = new Date().toISOString().slice(0, 10)
  const fetched = new Map<string, { count: number; level: number }>()
  for (let y = Number(start.slice(0, 4)); y <= Number(today.slice(0, 4)); y++) {
    for (const [date, d] of await fetchYear(y)) fetched.set(date, d)
  }
  const counts: number[] = []
  let levels = ''
  for (let t = Date.parse(`${start}T00:00:00Z`); ; t += day) {
    const date = new Date(t).toISOString().slice(0, 10)
    const d = fetched.get(date)
    if (!d || date > today) break
    counts.push(d.count)
    levels += d.level
  }
  return { start, counts, levels }
}, { maxAge: 60 * 60, name: 'contributions' })
