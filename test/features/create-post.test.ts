import * as assert from 'power-assert'
import { Post } from '../entities/post.entity'
import { User } from '../entities/user.entity'
import { userFactory } from '../factories/user.factory'
import { accountRepository } from '../repositories/account.repository'
import { postRepository } from '../repositories/post.repository'

export async function createPost() {
  console.log('create post')
  const { user, token } = await signup()

  let posts = await findPosts(token)
  const latestPostId = posts[0].id

  const body = 'test post'
  const response = await postRepository.create(token, body)
  assert.equal(response.status, 200, '正しい値なので、200が返ってくるべき')

  posts = await findPosts(token)
  assert(
    latestPostId < posts[0].id,
    'create前と後で、最新のpostのidが増えているべき'
  )
  assert(
    posts[0].body === body && posts[0].userId === user.id,
    'リクエストで投げたbodyと同じbody、tokenと紐づいたuserIdが入った最新のpostがあるべき'
  )
}

async function signup(): Promise<{ user: User; token: string }> {
  const response = await accountRepository.create(userFactory.create())
  return { user: response.data.user, token: response.data.token }
}

async function findPosts(token: string): Promise<Post[]> {
  const response = await postRepository.find(token)
  return response.data.posts
}
