export default defineEventHandler(async (event) => {
  const { email: requestEmail, password } = await readBody<{ email: string; password: string }>(
    event
  )

  if (!requestEmail || !password) {
    return createError({
      statusCode: 400,
      message: 'Endereço de e-mail e senha são obrigatórios',
    })
  }

  const user = await useDb().query.users.findFirst({
    where({ email }, { eq }) {
      return eq(email, requestEmail)
    },
  })

  if (!user) {
    return createError({
      statusCode: 401,
      message: 'Endereço de e-mail ou senha inválidos',
    })
  }

  const verified = await verify(user.password, password)
  if (!verified) {
    return createError({
      statusCode: 401,
      message: 'Endereço de e-mail ou senha inválidos',
    })
  }

  await setUserSession(event, { user: user.id })

  return user
})
