<script setup lang="ts">
import type { Song } from '~/server/database/schema'

const store = useSongsStore()

await useAsyncData('songs', () => store.fetchSongs())

const { songs } = storeToRefs(store)

function preview(text: string): string {
  const lines = text.split('\n')
  if (lines.length >= 2) text = `${lines[0]}<br />${lines[1]}`
  return text
}

function link(song: Song): string {
  return `/${urlencode(song.artist)}/${urlencode(song.title)}`
}
</script>

<template>
  <div class="pb-12 pt-16 sm:pb-4 lg:pt-12">
    <div class="lg:px-8">
      <div class="lg:max-w-4xl">
        <div class="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">
          <h1 class="text-2xl font-bold leading-7 text-cool-900">Recém-adicionadas</h1>
        </div>
      </div>
    </div>

    <div class="divide-y divide-cool-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-cool-100">
      <article v-for="song in songs" :key="song.id" class="py-10 sm:py-12">
        <div class="lg:px-8">
          <div class="lg:max-w-4xl">
            <div class="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">
              <div class="flex flex-col items-start">
                <h2 class="mt-2 text-lg font-bold text-cool-900">
                  <NuxtLink :to="link(song)">
                    {{ song.title }}
                  </NuxtLink>
                </h2>

                <small class="order-first font-mono text-sm leading-7 text-cool-500">{{
                  song.artist
                }}</small>

                <!-- eslint-disable vue/no-v-html -->
                <p class="mt-1 text-base leading-snug text-cool-700" v-html="preview(song.lyrics)" />

                <div class="mt-4 flex items-center gap-4">
                  <UButton
                    variant="link"
                    icon="i-heroicons-play"
                    :padded="false"
                    label="ouvir"
                    class="font-bold"
                  />
                  <span class="text-sm font-bold text-cool-400">/</span>
                  <UButton
                    :to="link(song)"
                    variant="link"
                    :padded="false"
                    label="detalhes"
                    class="font-bold"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
