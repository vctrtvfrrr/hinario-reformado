import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { hash } from '../../utils/password'
import { users } from '../schema'

export async function run(db: NodePgDatabase) {
  console.log('Seeding users')

  await db.insert(users).values({
    name: 'Webmaster',
    email: 'webmaster@hinarioreformado.com.br',
    password: await hash('secretpasswd'),
  })
}
