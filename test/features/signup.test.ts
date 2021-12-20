import * as assert from 'power-assert'
import { userFactory } from '../factories/user.factory'
import { accountRepository } from '../repositories/account.repository'

export async function signup() {
  console.log('create user')
  await createUser()

  console.log('signin')
}

async function createUser() {
  const user = userFactory.create()

  // パスワードが短いケース
  let response = await accountRepository.create({
    ...user,
    password: '1234567',
  })
  assert.equal(response.status, 422)

  // メールアドレスのフォーマットが不正なケース
  response = await accountRepository.create({
    ...user,
    email: 's.kazutaka55555gmail.com',
  })
  assert.equal(response.status, 422)

  // きちんと作成できるケース
  response = await accountRepository.create(user)
  assert.equal(response.status, 200)

  // 同じメールアドレスのユーザーがいるケース
  response = await accountRepository.create(user)
  assert.equal(response.status, 422)
}

// TODO
async function signin() {}
