import * as assert from 'power-assert'
import { Post } from '../entities/post.entity'
import { PaginationParams } from '../lib/pagination'
import { createPost, signup } from '../lib/test-helper'
import { postRepository } from '../repositories/post.repository'

export async function findPosts() {
  console.log('find posts')
  await signup()

  const post1 = await createPost()
  const post2 = await createPost()

  let posts = await _findPosts()
  assert.equal(
    posts[0].id,
    post2.id,
    '直前に作ったPostと最新のPostのidが一致するべき'
  )

  posts = await _findPosts({ cursor: post2.id })
  assert.equal(
    posts[0].id,
    post1.id,
    'cursorにidを指定したpostのひとつ前のpostが、最新のPostとして返ってくるべき'
  )
}

async function _findPosts(pagination?: PaginationParams): Promise<Post[]> {
  const response = await postRepository.find(pagination)
  return response.data.posts
}
