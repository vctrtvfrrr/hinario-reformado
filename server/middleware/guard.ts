export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const { pathname } = new URL(url)
  const protectedRoutes = ['/register-new-song']
  if (protectedRoutes.includes(pathname)) await requireUserSession(event)
})
