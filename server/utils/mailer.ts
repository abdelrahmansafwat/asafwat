import { Resend } from 'resend'
import type { ContactInput } from './contact-schema'

export async function sendContactMail(input: ContactInput): Promise<void> {
  const config = useRuntimeConfig()
  const subject = `Letter from ${input.name}`
  const text = `${input.message}\n\nFrom: ${input.name} <${input.email}>`

  if (config.contactTransport === 'log') {
    console.log('[contact:log]', { to: config.contactTo, subject, replyTo: input.email, text })
    return
  }

  if (!config.resendApiKey || !config.contactTo) {
    throw new Error('Mail is not configured: set NUXT_RESEND_API_KEY and NUXT_CONTACT_TO')
  }
  const resend = new Resend(config.resendApiKey)
  const { error } = await resend.emails.send({
    from: config.contactFrom,
    to: config.contactTo,
    replyTo: input.email,
    subject,
    text,
  })
  if (error) throw new Error(`Resend error: ${error.message}`)
}
