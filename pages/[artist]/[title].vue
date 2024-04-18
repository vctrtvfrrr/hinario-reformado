<script lang="ts" setup>
const { params } = useRoute()
const store = useSongsStore()

for (const key in params) {
  params[key] = urldecode(params[key] as string)
}

const song = store.getSongByParams(params as SongParams)

if (!song) navigateTo('/')
</script>

<template>
  <article class="py-16 lg:py-36">
    <div class="lg:px-8">
      <div class="lg:max-w-4xl">
        <div class="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">
          <header class="flex flex-col">
            <div class="flex flex-col">
              <h1 class="mt-2 text-4xl font-bold text-cool-900">{{ song?.title }}</h1>
              <small class="order-first font-mono text-sm leading-7 text-cool-500">{{
                song?.artist
              }}</small>
            </div>
          </header>

          <hr class="border-gray-200 my-12" />

          <ChordsArea v-if="song?.chords" :chords="song.chords" />

          <hr class="border-gray-200 my-12" />

      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="song?.lyrics.replace(/\n/g, '<br />')" />

          <hr class="border-gray-200 my-12" />

    <div class="flex">
      <UButton to="/" label="Voltar" />
    </div>
  </div>
      </div>
    </div>
  </article>
</template>
