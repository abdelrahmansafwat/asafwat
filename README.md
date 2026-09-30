# asafwat.dev

My personal site, styled like a cozy JRPG status screen: a party card with my Mii, an inventory of the tools I use, achievements, a save file built from my GitHub contributions, a quest log of where I've worked, and a shelf of the games I love.

Live at [asafwat.dev](https://asafwat.dev).

## A few details

- **Save file:** the contribution heatmap is read live from my GitHub contribution calendar and cached for an hour.
- **Sunset mode:** the site switches to dusk after the sun sets where I live, using sunrise and sunset times from [sunrise-sunset.org](https://sunrise-sunset.org). Visitors can still pick either mode.
- **Letters:** the contact form sends email through [Resend](https://resend.com), with a honeypot and a per-visitor rate limit instead of a captcha.
- **Easter eggs:** a few, for those who look.

## Stack

Nuxt 4, Vue 3, TypeScript, Tailwind CSS 4, VueUse, zod and Resend. It runs as a single Docker container.

## Running it locally

```bash
npm install
cp .env.example .env
NUXT_CONTACT_TRANSPORT=log npm run dev
```

With `NUXT_CONTACT_TRANSPORT=log`, letters are printed to the console, so no Resend key is needed.

Other scripts:

```bash
npm run typecheck
npm run build
docker build -t asafwat .
```
