import * as assert from 'power-assert'
import { createMessage, createRoom, signup } from '../lib/test-helper'
import { roomRepository } from '../repositories/room.repository'

export async function markAsRead() {
  console.log('mark as read')

  await signup()
  const user1 = await signup()
  const user2 = await signup()
  let room = await createRoom([user1.id!])
  await createMessage(room.id)

  let response = await roomRepository.markAsRead(room.id)
  assert.equal(response.status, 200, '正しい値なので、200が返ってくるべき')

  response = await roomRepository.findOne(room.id)
  room = response.data.room
  const roomUser = room.roomUsers.find(roomUser => roomUser.userId === user2.id)

  assert.notEqual(
    roomUser?.readAt,
    null,
    '既読がついていれば、roomUser.readAtに値が入ってるべき'
  )

  await signup()
  response = await roomRepository.findOne(room.id)
  assert.equal(
    response.status,
    404,
    '自分が所属しないRoomをとってこようとしてるので、404が返ってくるべき'
  )
}
