<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const toast = useToast()

const schema = z.object({
  title: z.string({ required_error: 'É obrigatório informar um título' }),
  lyrics: z.string({ required_error: 'É obrigatório informar uma letra' }),
  chords: z.string({ required_error: 'É obrigatório informar uma cifra' }),
})

type Schema = z.output<typeof schema>

const state = reactive({
  title: undefined,
  lyrics: undefined,
  chords: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await $fetch('/api/songs', {
      method: 'POST',
      body: event.data,
    })

    toast.add({
      color: 'green',
      title: 'Sucesso',
      description: 'Música salva com sucesso',
      icon: 'i-heroicons-check-circle',
      timeout: 10000,
    })

    await navigateTo('/')
  } catch (err) {
    toast.add({
      color: 'red',
      title: 'Atenção',
      description: 'Ocorreu um erro ao salvar a música.',
      icon: 'i-heroicons-exclamation-circle',
      timeout: 15000,
    })

    console.log(err)
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <div>
      <UFormGroup label="Título" name="title" required>
        <UInput v-model="state.title" size="lg" :ui="{ size: { lg: 'text-xl' } }" />
      </UFormGroup>
    </div>

    <div class="flex gap-4">
      <div class="flex-auto">
        <UFormGroup label="Cifra" name="chords" required>
          <UTextarea v-model="state.chords" :rows="20" autoresize />
        </UFormGroup>
      </div>

      <div class="flex-auto">
        <UFormGroup label="Letra" name="lyrics" required>
          <UTextarea v-model="state.lyrics" :rows="20" autoresize />
        </UFormGroup>
      </div>
    </div>

    <div class="flex">
      <UButton type="submit" label="Salvar" />
    </div>
  </UForm>
</template>
