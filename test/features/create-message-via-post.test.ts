import * as assert from 'power-assert'
import { Message } from '../entities/message.entity'
import { createPost, createRoom, signup } from '../lib/test-helper'
import { messageRepository } from '../repositories/message.repository'

export async function createMessageViaPost() {
  console.log('create message via post')

  const user1 = await signup()
  const post = await createPost()
  const user2 = await signup()
  const room = await createRoom([user1.id!])

  const content = 'test message'
  let response = await messageRepository.createViaPost(post.id, content)
  assert.equal(response.status, 200, '正しい値なので、200が返ってくるべき')

  let messages = await _findMessages(room.id)
  assert(
    messages[0].content === content &&
      messages[0].userId === user2.id &&
      messages[0].postId === post.id,
    '作成したメッセージが、指定したpostに紐づく最新のメッセージになるべき'
  )
}

async function _findMessages(roomId: string): Promise<Message[]> {
  const response = await messageRepository.find(roomId)
  return response.data.messages
}
