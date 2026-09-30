import { profile } from '~/data/site'

export default defineCachedEventHandler(async () => {
  const { results } = await $fetch<{ results: { sunrise: string; sunset: string } }>(
    `https://api.sunrise-sunset.org/json?lat=${profile.home.lat}&lng=${profile.home.lng}&formatted=0`,
    { timeout: 3000 },
  )
  return { sunrise: results.sunrise.slice(11, 16), sunset: results.sunset.slice(11, 16) }
}, { maxAge: 6 * 60 * 60, name: 'sun' })
