<script setup lang="ts">
const { title, description } = useAppConfig()
</script>

<template>
  <header
    class="lg:w-112 xl:w-120 bg-cool-50 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:items-start lg:overflow-y-auto"
  >
    <hgroup
      class="relative z-10 mx-auto px-4 pb-4 pt-10 sm:px-6 md:max-w-2xl md:px-4 lg:min-h-full lg:flex-auto lg:border-x lg:border-cool-200 lg:px-8 lg:py-12 xl:px-12"
    >
      <div class="text-center lg:text-left">
        <h1 class="text-2xl font-bold text-cool-900">
          <a href="/">{{ title }}</a>
        </h1>
        <p class="mt-3 text-lg font-light leading-8 text-cool-700">{{ description }}</p>
      </div>

      <WidgetAbout class="mt-12 hidden lg:block" />
      <WidgetTags class="mt-10 hidden lg:mt-12 lg:block" />
      <WidgetCopyright class="mt-10 hidden lg:mt-12 lg:block" />
    </hgroup>
  </header>
</template>
