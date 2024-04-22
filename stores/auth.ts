import { defineStore } from 'pinia'

export const useAuthStore = defineStore('Auth', () => {
  const { loggedIn, user, session, clear, fetch } = useUserSession()

  async function login(credentials: { email: string; password: string }) {
    await useFetch('/auth/login', { method: 'POST', body: credentials })
    await fetch()
  }

  return { login, loggedIn, user, session, clear, fetch }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
