<script setup lang="ts">
import { transpose, type Token } from 'chord-transposer'

const chords = ref('')
const tokens = ref<Token[][]>()

watch(chords, (value) => {
  tokens.value = transpose(value).tokens
})
</script>

<template>
  <div class="container mx-auto py-4">
    <UTextarea v-model="chords" />

    <template v-if="tokens">
      <hr />
      <div>
        <div v-for="(line, i) in tokens" :key="i" class="min-h-4 font-mono">
          <template v-for="(token, j) in line">
            <template v-if="typeof token === 'string'">
              {{ token.replace(/\s/g, '&nbsp;') }}
            </template>
            <span v-else :key="j" class="font-bold text-red-500">{{
              token.toString().replace(/\s/g, '&nbsp;')
            }}</span>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>
