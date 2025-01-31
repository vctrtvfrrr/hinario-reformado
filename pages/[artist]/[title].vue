<script lang="ts" setup>
const { params } = useRoute()
const { loggedIn } = useAuthStore()
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
        <div v-if="song" class="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">
          <header class="flex flex-col">
            <div class="flex flex-col">
              <h1 class="mt-2 text-4xl font-bold text-cool-900 dark:text-cool-100">
                {{ song.title }}
              </h1>
              <small
                class="order-first font-mono text-sm leading-7 text-cool-500 dark:text-cool-400"
                >{{ song.artist }}</small
              >
            </div>
            <p class="mt-3 text-lg font-light leading-8 text-cool-700 dark:text-cool-300">
              He’s going to need you to go ahead and come in on Saturday, but there’s a lot more to
              the story than you think.
            </p>

            <div v-if="loggedIn" class="mt-4">
              <UButton
                to="/song-form"
                variant="link"
                icon="i-heroicons-pencil-square"
                :padded="false"
                label="Editar"
                class="font-bold"
              />
            </div>
          </header>

          <hr class="my-8 border-cool-200 dark:border-cool-800" />

          <ChordsArea v-if="song.chords" :chords="song.chords" />

          <hr class="my-8 border-cool-200 dark:border-cool-800" />

          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="song.lyrics.replace(/\n/g, '<br />')" />

          <hr class="my-8 border-cool-200 dark:border-cool-800" />

          <div class="flex items-center gap-4">
            <UButton
              to="/"
              variant="link"
              icon="i-heroicons-arrow-long-left"
              label="Voltar"
              class="font-bold"
            />
            <template v-if="song.link">
              <span class="text-sm font-bold text-cool-400 dark:text-cool-600">/</span>
              <UButton
                :to="song.link"
                variant="link"
                icon="i-heroicons-play"
                :padded="false"
                label="ouvir"
                class="font-bold"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
