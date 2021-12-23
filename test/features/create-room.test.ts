import * as assert from 'power-assert'
import { Room } from '../entities/room.entity'
import { createMessage, signup } from '../lib/test-helper'
import { roomRepository } from '../repositories/room.repository'

export async function createRoom() {
  console.log('create room')

  const user1 = await signup()
  const user2 = await signup()

  let response = await roomRepository.create([user1.id!])
  assert.equal(response.status, 200, '正しい値なので、200が返ってくるべき')
  await createMessage(response.data.room.id)

  const roomId = response.data.room.id
  await createMessage(roomId)

  let rooms = await _findRooms()
  assert(
    _stringifyUserIds(rooms[0]?.roomUsers.map(item => item.userId)) ==
      _stringifyUserIds([user1.id!, user2.id!]),
    '作成時に指定したユーザー同士のRoomが返ってくるべき'
  )
}

async function _findRooms(): Promise<Room[]> {
  const response = await roomRepository.find()
  return response.data.rooms
}

function _stringifyUserIds(userIds: number[]): string {
  return JSON.stringify(userIds.sort((a, b) => a - b))
}
