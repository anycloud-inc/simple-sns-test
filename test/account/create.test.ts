import * as assert from 'power-assert'
import { accountRepository } from './account.repository'

export async function createAccount() {
  const expectedResponse = {
    id: 1,
    name: 'test',
    email: 's.kazutaka55555@gmail.com',
    iconImageUrl: null,
  }

  const user = await accountRepository.create({
    name: expectedResponse.name,
    email: expectedResponse.email,
    password: '12345678',
  })

  assert.deepEqual(expectedResponse, user)
}
