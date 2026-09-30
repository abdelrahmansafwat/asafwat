import { z } from 'zod'

const schema = z.object({
  name: z.string().trim().min(1, 'Please tell me your name.').max(80, 'Please keep your name under 80 characters.'),
  email: z.string().trim().max(254, 'That email is too long.').email('That email does not look right.'),
  message: z.string().trim().min(10, 'Please write at least a sentence.').max(2000, 'Please keep it under 2,000 characters.'),
})

export type ContactInput = z.infer<typeof schema>
export type ContactErrors = Partial<Record<keyof ContactInput, string>>

export function validateContact(body: unknown):
  | { ok: true; data: ContactInput }
  | { ok: false; errors: ContactErrors } {
  const result = schema.safeParse(body ?? {})
  if (result.success) return { ok: true, data: result.data }
  const errors: ContactErrors = {}
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof ContactInput
    if (key && !errors[key]) errors[key] = issue.message
  }
  return { ok: false, errors }
}

export function isBot(body: unknown): boolean {
  const website = (body as { website?: unknown } | null)?.website
  return typeof website === 'string' && website.trim().length > 0
}
