import * as assert from 'power-assert'
import { User } from '../entities/user.entity'
import { userFactory } from '../factories/user.factory'
import { accountRepository } from '../repositories/account.repository'

export async function signup() {
  const user = userFactory.create()

  console.log('create user')
  await _createUser(user)

  console.log('signin')
  await _signin(user)
}

async function _createUser(user: User) {
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
    email: 'simple-snsgmail.com',
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

async function _signin(user: User) {
  let response = await accountRepository.signin({
    email: 'simple-snsgmail.com',
    password: '1234567',
  })
  assert.equal(
    response.status,
    400,
    'メールアドレス、パスワードが間違っているので400が返ってくるべき'
  )

  const { email, password } = user
  response = await accountRepository.signin({
    email,
    password,
  })
  assert.equal(response.status, 200, '正しい値なので、200が返ってくるべき')
}
