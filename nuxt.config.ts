import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-30',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Abdelrahman Safwat · Full stack developer',
      meta: [
        { name: 'description', content: 'Abdelrahman (Abdo) Safwat, a full stack developer building web apps with Vue, React, NestJS and TypeScript for 5+ years.' },
        { name: 'theme-color', content: '#FFB627' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'asafwat.dev' },
        { property: 'og:title', content: 'Abdelrahman "Abdo" Safwat · Full stack developer' },
        { property: 'og:description', content: 'Abdelrahman (Abdo) Safwat, a full stack developer building web apps with Vue, React, NestJS and TypeScript for 5+ years.' },
        { property: 'og:image', content: 'https://asafwat.dev/og.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: "Abdo's Mii next to his name, Full Stack Developer, Lv 5+" },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
  runtimeConfig: {
    resendApiKey: '',
    contactTo: '',
    contactFrom: 'Calling card <hello@asafwat.dev>',
    contactTransport: 'resend',
    public: {
      builtAt: new Date().toISOString(),
      linkedinUrl: 'https://www.linkedin.com/in/abdelrahman-safwat/',
    },
  },
})
