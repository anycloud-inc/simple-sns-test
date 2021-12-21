import * as assert from 'power-assert'
import { signup, createPost } from '../lib/test-helper'
import { postRepository } from '../repositories/post.repository'

export async function deletePost() {
  console.log('delte post')
  await signup()
  let post = await createPost()

  let response = await postRepository.delete(post.id)
  assert.equal(response.status, 200, '正しい値なので、200が返ってくるべき')

  response = await postRepository.findOne(post.id)
  assert.equal(
    response.status,
    404,
    '削除したPostを取得しようとしてるので、404になるべき'
  )

  response = await postRepository.delete(post.id)
  assert.equal(
    response.status,
    404,
    '削除したPostをもう一度削除しようとしてるので、404になるべき'
  )

  post = await createPost()
  await signup()

  response = await postRepository.delete(post.id)
  assert.equal(
    response.status,
    404,
    '他のユーザーのPostを削除しようとしてるので、404になるべき'
  )
}
