import * as assert from 'power-assert'
import { Room } from '../entities/room.entity'
import { createMessage, createRoom, signup } from '../lib/test-helper'
import { roomRepository } from '../repositories/room.repository'

export async function findRooms() {
  console.log('find rooms')

  const user1 = await signup()
  const user2 = await signup()
  const user3 = await signup()
  await signup()

  const room1 = await createRoom([user1.id!])
  const room2 = await createRoom([user2.id!])
  const room3 = await createRoom([user3.id!])

  await createMessage(room2.id)
  await createMessage(room1.id)
  const message = await createMessage(room3.id)

  const rooms = await _findRooms()
  assert(
    rooms[0].id == room3.id &&
      rooms[1].id == room1.id &&
      rooms[2].id == room2.id,
    '最新のメッセージ順にRoomが並ぶべき'
  )
  assert.equal(
    rooms[0].messages[0].id,
    message.id,
    '最新のMessageが入っているべき'
  )
}

async function _findRooms(): Promise<Room[]> {
  const response = await roomRepository.find()
  return response.data.rooms
}
