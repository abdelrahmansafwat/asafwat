export function createRateLimiter(opts: { limit: number; windowMs: number }) {
  const hits = new Map<string, number[]>()

  return {
    hit(key: string, now: number = Date.now()): boolean {
      const recent = (hits.get(key) ?? []).filter((t) => now - t < opts.windowMs)
      if (recent.length >= opts.limit) {
        hits.set(key, recent)
        return false
      }
      recent.push(now)
      hits.set(key, recent)
      return true
    },
  }
}
