<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

definePageMeta({
  middleware: 'user-only',
})

const toast = useToast()

const schema = z.object({
  title: z.string({ required_error: 'É obrigatório informar um título' }),
  artist: z.string({ required_error: 'É obrigatório informar um compositor' }),
  lyrics: z.string({ required_error: 'É obrigatório informar uma letra' }),
  chords: z.string({ required_error: 'É obrigatório informar uma cifra' }),
})

type Schema = z.output<typeof schema>

const state = reactive({
  title: undefined,
  artist: undefined,
  lyrics: undefined,
  chords: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await useFetch('/api/songs', {
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
  <div class="pb-12 pt-16 sm:pb-4 lg:pt-12">
    <div class="px-4 sm:px-6 md:px-4 lg:px-8">
      <h1 class="text-2xl font-bold leading-7 text-cool-900 dark:text-cool-100">
        Adicionar nova música
      </h1>
    </div>

    <div
      class="divide-y divide-cool-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-cool-100 dark:divide-cool-900 dark:border-cool-900"
    >
      <div class="px-4 py-10 sm:px-6 sm:py-12 md:max-w-6xl md:px-4 lg:px-8">
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <div class="flex flex-col gap-4 sm:flex-row">
            <div class="flex-auto">
              <UFormGroup label="Título" name="title" required>
                <UInput v-model="state.title" size="lg" :ui="{ size: { lg: 'text-xl' } }" />
              </UFormGroup>
            </div>

            <div class="flex-auto">
              <UFormGroup label="Compositor" name="artist" required>
                <UInput v-model="state.artist" size="lg" :ui="{ size: { lg: 'text-xl' } }" />
              </UFormGroup>
            </div>
          </div>

          <div class="flex flex-col gap-4 md:flex-row">
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
      </div>
    </div>
  </div>
</template>
