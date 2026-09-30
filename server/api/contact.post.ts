const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 })

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => null)

  if (isBot(body)) {
    return { ok: true }
  }

  const result = validateContact(body)
  if (!result.ok) {
    setResponseStatus(event, 422)
    return { ok: false, errors: result.errors }
  }

  const ip = getRequestHeader(event, 'cf-connecting-ip') ?? getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  if (!limiter.hit(ip)) {
    setResponseStatus(event, 429)
    return { ok: false, error: 'rate_limited' }
  }

  try {
    await sendContactMail(result.data)
  } catch (err) {
    console.error('[contact] send failed:', err instanceof Error ? err.message : err)
    setResponseStatus(event, 502)
    return { ok: false, error: 'send_failed' }
  }

  return { ok: true }
})
