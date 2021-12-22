import { RoomUser } from './room-user.entity'

export interface Room {
  id: string
  roomUsers: RoomUser[]
}
