import api from '../lib/api'
import { PaginationParams } from '../lib/pagination'

export const messageRepository = {
  async create(roomId: string, content: string) {
    return await api.post('/messages', { roomId, content })
  },

  async find(roomId: string, pagination?: PaginationParams) {
    return await api.get('/messages', {
      params: {
        roomId,
        pagination,
      },
    })
  },
}
