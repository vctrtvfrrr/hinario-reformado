<script setup lang="ts">
import { transpose, type Token } from 'chord-transposer'

const props = defineProps<{ chords: string }>()

const tokens = ref<Token[][]>()
tokens.value = transpose(props.chords).tokens
</script>

<template>
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
