<template>
  <div v-if="state === 'sent'" class="panel letter p-8 text-center" role="status">
    <p class="letter-title">Letter sent!</p>
    <p class="mt-3">Thanks for writing. I read every letter and will reply to your email.</p>
  </div>

  <form v-else class="panel letter space-y-5 p-6 md:p-8" novalidate @submit.prevent="submit">
    <Teleport to="body">
      <p v-if="objection" class="objection" aria-hidden="true">OBJECTION!</p>
    </Teleport>
    <span class="stamp" aria-hidden="true">
      <IconMail width="34" height="34" />
    </span>
    <p class="letter-title">Dear Abdo,</p>

    <div>
      <label for="letter-name" class="block font-bold">Your name</label>
      <input id="letter-name" v-model="form.name" name="name" autocomplete="name" maxlength="80" class="field-input" :aria-invalid="!!errors.name" aria-describedby="letter-name-err">
      <p v-if="errors.name" id="letter-name-err" class="field-error">{{ errors.name }}</p>
    </div>

    <div>
      <label for="letter-email" class="block font-bold">Your email</label>
      <input id="letter-email" v-model="form.email" name="email" type="email" autocomplete="email" maxlength="254" class="field-input" :aria-invalid="!!errors.email" aria-describedby="letter-email-err">
      <p v-if="errors.email" id="letter-email-err" class="field-error">{{ errors.email }}</p>
    </div>

    <div>
      <label for="letter-message" class="block font-bold">Your letter</label>
      <textarea id="letter-message" v-model="form.message" name="message" rows="7" maxlength="2000" class="field-input" :aria-invalid="!!errors.message" aria-describedby="letter-message-err" />
      <p v-if="errors.message" id="letter-message-err" class="field-error">{{ errors.message }}</p>
    </div>

    <div class="honeypot" aria-hidden="true">
      <label for="letter-website">Leave this empty</label>
      <input id="letter-website" v-model="form.website" name="website" tabindex="-1" autocomplete="off">
    </div>

    <p v-if="state === 'failed'" class="field-error" role="alert">
      The letter got lost in the mail. Please try again in a bit, or reach me on
      <a :href="pub.linkedinUrl" class="underline" target="_blank" rel="noopener">LinkedIn</a>.
    </p>
    <p v-if="state === 'limited'" class="field-error" role="alert">
      That's a lot of letters in a short time. Please wait a few minutes and try again.
    </p>

    <button type="submit" class="btn btn-teal" :disabled="state === 'sending'">
      {{ state === 'sending' ? 'Sending...' : 'Send letter' }}
    </button>
  </form>
</template>

<script setup lang="ts">
  type Field = 'name' | 'email' | 'message'
  type State = 'idle' | 'sending' | 'sent' | 'failed' | 'limited'

  const { public: pub } = useRuntimeConfig()
  const form = reactive({ name: '', email: '', message: '', website: '' })
  const errors = ref<Partial<Record<Field, string>>>({})
  const state = ref<State>('idle')
  const objection = ref(false)

  async function submit() {
    objection.value = true
    setTimeout(() => { objection.value = false }, 800)
    state.value = 'sending'
    errors.value = {}
    try {
      await $fetch('/api/contact', { method: 'POST', body: { ...form } })
      state.value = 'sent'
    } catch (err: any) {
      const status = err?.response?.status
      const data = err?.data
      if (status === 422 && data?.errors) {
        errors.value = data.errors
        state.value = 'idle'
      } else if (status === 429) {
        state.value = 'limited'
      } else {
        state.value = 'failed'
      }
    }
  }
</script>
