export default defineNuxtRouteMiddleware(async () => {
  const { loggedIn } = useAuthStore()
  if (!loggedIn) return navigateTo({ name: 'login' })
})
