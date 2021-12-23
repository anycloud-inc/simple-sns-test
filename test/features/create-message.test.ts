import * as assert from 'power-assert'
import { Message } from '../entities/message.entity'
import { createRoom, signup } from '../lib/test-helper'
import { messageRepository } from '../repositories/message.repository'

export async function createMessage() {
  console.log('create message')

  const user1 = await signup()
  const user2 = await signup()
  const room = await createRoom([user1.id!])

  const content = 'test message'
  let response = await messageRepository.create(room.id, content)
  assert.equal(response.status, 200, '正しい値なので、200が返ってくるべき')

  let messages = await _findMessages(room.id)
  assert(
    messages[0].content === content && messages[0].userId === user2.id,
    '作成したメッセージが、ログイン中のユーザーに作られた最新のメッセージになるべき'
  )

  await signup()
  response = await messageRepository.create(room.id, content)
  assert.equal(
    response.status,
    422,
    'roomに入ってないユーザーのメッセージを作ろうとしているので、400になるべき'
  )
}

async function _findMessages(roomId: string): Promise<Message[]> {
  const response = await messageRepository.find(roomId)
  return response.data.messages
}
