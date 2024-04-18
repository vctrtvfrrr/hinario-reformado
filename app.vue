<script setup lang="ts">
const appConfig = useAppConfig()
const title = appConfig.title as string
const description = appConfig.description as string
</script>

<template>
  <Html lang="pt-BR" class="h-full antialiased">
    <Head>
      <Title>{{ appConfig.title }}</Title>
      <Meta name="description" :content="description" />

      <!-- Fonts -->
      <Link rel="preconnect" href="https://fonts.googleapis.com" />
      <Link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <Link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&family=Inconsolata:wght@400;700&display=swap"
      />

      <!-- Favicon -->
      <Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <Link rel="manifest" href="/site.webmanifest" />
      <Link rel="mask-icon" href="/safari-pinned-tab.svg" color="#d62828" />
      <Meta name="apple-mobile-web-app-title" :content="title" />
      <Meta name="application-name" :content="title" />
      <Meta name="msapplication-TileColor" content="#d62828" />
      <Meta name="theme-color" content="#d62828" />
    </Head>

    <Body class="h-full bg-white text-black dark:bg-black dark:text-cool-200">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

      <UNotifications />
    </Body>
  </Html>
</template>
