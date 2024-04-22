<script setup lang="ts">
const { loggedIn } = useAuthStore()
</script>

<template>
  <div class="relative flex min-h-full">
    <div class="w-full">
      <AppHeader />

      <main
        class="border-t border-cool-200 lg:relative lg:mb-28 lg:ml-112 lg:border-t-0 xl:ml-120 dark:border-cool-800"
      >
        <div class="relative">
          <slot />
        </div>
      </main>

      <AppFooter />
    </div>

    <GlobalActions v-if="loggedIn" />
  </div>
</template>
