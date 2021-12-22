import { Message } from './message.entity'
import { RoomUser } from './room-user.entity'

export interface Room {
  id: string
  roomUsers: RoomUser[]
  messages: Message[]
}
