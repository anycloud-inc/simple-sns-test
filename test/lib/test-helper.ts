import { Post } from '../entities/post.entity'
import { User } from '../entities/user.entity'
import { Room } from '../entities/room.entity'
import { Message } from '../entities/message.entity'
import { userFactory } from '../factories/user.factory'
import { accountRepository } from '../repositories/account.repository'
import { postRepository } from '../repositories/post.repository'
import { roomRepository } from '../repositories/room.repository'
import { AccessToken } from './access-token'
import { messageRepository } from '../repositories/message.repository'

export async function signup(): Promise<User> {
  const response = await accountRepository.create(userFactory.create())
  AccessToken.set(response.data.token)
  return response.data.user
}

export async function createPost(): Promise<Post> {
  const response = await postRepository.create('test post')
  return response.data.post
}

export async function createRoom(userIds: number[]): Promise<Room> {
  const response = await roomRepository.create(userIds)
  return response.data.room
}

export async function createMessage(roomId: string): Promise<Message> {
  const response = await messageRepository.create(roomId, 'test message')
  return response.data.message
}
