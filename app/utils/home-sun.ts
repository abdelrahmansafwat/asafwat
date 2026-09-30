export function useHomeSun() {
  return useFetch('/api/sun', { key: 'sun', default: () => null })
}

export function isAfterDark(sun: { sunrise: string; sunset: string }, date = new Date()) {
  const now = date.toISOString().slice(11, 16)
  return now < sun.sunrise || now >= sun.sunset
}
