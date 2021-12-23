import * as assert from 'power-assert'
import { Message } from '../entities/message.entity'
import { PaginationParams } from '../lib/pagination'
import { createMessage, createRoom, signup } from '../lib/test-helper'
import { messageRepository } from '../repositories/message.repository'

export async function findMessages() {
  console.log('find messages')

  await signup()
  const user1 = await signup()
  await signup()
  const room = await createRoom([user1.id!])
  const message1 = await createMessage(room.id)
  const message2 = await createMessage(room.id)

  let messages = await _findMessages(room.id)
  assert.equal(
    messages[0].id,
    message2.id,
    '直前に作ったMessageと最新のMessageのidが一致するべき'
  )

  messages = await _findMessages(room.id, { cursor: message2.id })
  assert.equal(
    messages[0].id,
    message1.id,
    'cursorにidを指定したMessageのひとつ前のMessageが、最新のMessageになるべき'
  )
}

async function _findMessages(
  roomId: string,
  pagination?: PaginationParams
): Promise<Message[]> {
  const response = await messageRepository.find(roomId, pagination)
  return response.data.messages
}
