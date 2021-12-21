import * as assert from 'power-assert'
import { signup } from '../lib/test-helper'
import { accountRepository } from '../repositories/account.repository'
import generateHash from '../lib/generate-hash'
import * as fs from 'fs'

export async function updateProfile() {
  console.log('update profile')
  await updateProfle()
  console.log('update profile icon')
  await updateIconImage()
}

async function updateProfle() {
  await signup()
  const name = 'new test name'
  let response = await accountRepository.updateProfile({
    name: name,
    email: 'simple-snsgmail.com',
  })
  assert.equal(
    response.status,
    422,
    'メールアドレスが不正なフォーマットなので422エラーになるべき'
  )

  const email = `${generateHash()}@gmail.com`
  response = await accountRepository.updateProfile({
    name: name,
    email: email,
  })
  assert.equal(response.status, 200, '正しい値なので、200が返ってくるべき')

  response = await accountRepository.show()
  const updatedUser = response.data.user
  assert.equal(updatedUser.name, name, '指定した値にnameが更新されているべき')
  assert.equal(
    updatedUser.email,
    email,
    '指定した値にemailが更新されているべき'
  )
}

async function updateIconImage() {
  await signup()
  const data = fs.createReadStream('test/images/app_icon.png')
  let response = await accountRepository.updateIconImage(data)
  assert.equal(response.status, 200, '正しい値なので、200が返ってくるべき')
  assert.notEqual(
    response.data.user.iconImageUrl,
    null,
    '画像が更新されていれば、iconImageUrlに値が入っているべき'
  )
}
