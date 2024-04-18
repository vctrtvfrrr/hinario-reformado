<template>
  <div class="flex min-h-full">
    <div class="w-full">
      <AppHeader />

      <main
        class="lg:ml-112 xl:ml-120 border-t border-cool-200 lg:relative lg:mb-28 lg:border-t-0 dark:border-cool-800"
      >
        <div class="relative">
          <slot />
        </div>
      </main>

      <AppFooter />
    </div>
  </div>
</template>
