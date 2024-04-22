export default defineNuxtRouteMiddleware(async () => {
  const { loggedIn } = useAuthStore()

  if (!loggedIn) {
    if (import.meta.server) return navigateTo({ name: 'index' })
    return abortNavigation()
  }
})
