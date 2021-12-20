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

  let response = await accountRepository.create({
    ...user,
    password: '1234567',
  })
  assert.equal(
    response.status,
    422,
    'パスワードが7文字以下だったら422エラーになるべき'
  )

  response = await accountRepository.create({
    ...user,
    email: 's.kazutaka55555gmail.com',
  })
  assert.equal(
    response.status,
    422,
    'メールアドレスが不正なフォーマットの場合422エラーになるべき'
  )

  response = await accountRepository.create(user)
  assert.equal(response.status, 200, '正しい値なので、200が返ってくるべき')

  response = await accountRepository.create(user)
  assert.equal(
    response.status,
    422,
    '同じアドレスのユーザーがいる場合422エラーになるべき'
  )
}
