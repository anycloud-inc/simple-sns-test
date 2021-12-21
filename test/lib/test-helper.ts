import { User } from '../entities/user.entity'
import { userFactory } from '../factories/user.factory'
import { accountRepository } from '../repositories/account.repository'
import { AccessToken } from './access-token'

export async function signup(): Promise<User> {
  const response = await accountRepository.create(userFactory.create())
  AccessToken.set(response.data.token)
  return response.data.user
}
