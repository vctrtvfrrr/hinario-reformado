<script setup lang="ts">
const appConfig = useAppConfig()
const title = appConfig.title as string
</script>

<template>
  <Html lang="pt-BR">
    <Head>
      <Title>{{ appConfig.title }}</Title>
      <Meta name="description" content="" />

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

    <Body>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

      <UNotifications />
    </Body>
  </Html>
</template>
