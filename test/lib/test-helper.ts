import { Post } from '../entities/post.entity'
import { User } from '../entities/user.entity'
import { Room } from '../entities/room.entity'
import { userFactory } from '../factories/user.factory'
import { accountRepository } from '../repositories/account.repository'
import { postRepository } from '../repositories/post.repository'
import { roomRepository } from '../repositories/room.repository'
import { AccessToken } from './access-token'

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
