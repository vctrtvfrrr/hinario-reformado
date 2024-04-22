<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

definePageMeta({
  middleware: 'guest-only',
  layout: 'guest',
})

const toast = useToast()
const { login } = useAuthStore()

const schema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await login(event.data)
    await navigateTo('/')
  } catch (err) {
    console.log(err)
    toast.add({
      title: 'Atenção',
      description: 'Ocorreu um erro.',
    })
  }
}
</script>

<template>
  <div class="mx-auto my-8 max-w-96">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="E-mail" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup label="Senha" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <UButton type="submit" label="Entrar" />
    </UForm>
  </div>
</template>
