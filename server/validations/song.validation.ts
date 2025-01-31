import { z } from 'zod'

export const Song = z.object({
  title: z
    .string({ required_error: 'É obrigatório informar um título' })
    .min(1, 'O título precisa ter no mínimo 1 caractere.'),
  artist: z
    .string({ required_error: 'É obrigatório informar um compositor' })
    .min(1, 'O nome do artista precisa ter no mínimo 1 caractere.'),
  link: z.string().min(7, 'Informe um link válido.').optional(),
  lyrics: z.string({ required_error: 'É obrigatório informar uma letra' }),
  chords: z
    .object({
      line: z.string(),
      hasChords: z.boolean(),
    })
    .optional()
    .array(),
})
