<script setup lang="ts">
import { transpose, type Token } from 'chord-transposer'

const chords = ref('')
const tokens = ref<Token[][]>()

watch(chords, (value) => {
  tokens.value = transpose(value).tokens
})
</script>

<template>
  <div>
    <textarea v-model="chords" rows="20" cols="80"></textarea>

    <template v-if="tokens">
      <hr />
      <div>
        <div v-for="line in tokens" class="line">
          <template v-for="token in line">
            <template v-if="typeof token === 'string'">{{
              token.replace(/\s/g, "&nbsp;")
            }}</template>
            <span v-else class="chord">{{ token.toString().replace(/\s/g, "&nbsp;") }}</span>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.line {
  font-family: "Roboto Mono", "Courier New", Courier, monospace;
  min-height: 1rem;
}
.chord {
  font-weight: 700;
  color: red;
}
</style>
