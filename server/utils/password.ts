import { Bcrypt } from 'oslo/password'

export function hash(plainPassword: string): Promise<string> {
  return new Bcrypt().hash(plainPassword)
}

export function verify(hash: string, plainPassword: string): Promise<boolean> {
  return new Bcrypt().verify(hash, plainPassword)
}
