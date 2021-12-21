import * as assert from 'power-assert'
import { Post } from '../entities/post.entity'
import { signup } from '../lib/test-helper'
import { postRepository } from '../repositories/post.repository'

export async function createPost() {
  console.log('create post')
  const user = await signup()

  let posts = await _findPosts()
  const latestPostId = posts[0].id

  const body = 'test post'
  const response = await postRepository.create(body)
  assert.equal(response.status, 200, '正しい値なので、200が返ってくるべき')

  posts = await _findPosts()
  assert(
    latestPostId < posts[0].id,
    'create前と後で、最新のpostのidが増えているべき'
  )
  assert(
    posts[0].body === body && posts[0].userId === user.id,
    'リクエストで投げたbodyと同じbody、tokenと紐づいたuserIdが入った最新のpostがあるべき'
  )
}

async function _findPosts(): Promise<Post[]> {
  const response = await postRepository.find()
  return response.data.posts
}
