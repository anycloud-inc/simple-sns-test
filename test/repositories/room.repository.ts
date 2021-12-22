import api from '../lib/api'

export const roomRepository = {
  async create(userIds: number[]) {
    return await api.post('/rooms', { userIds })
  },

  async find() {
    return await api.get('/rooms')
  },

  async findOne(id: string) {
    return await api.get(`/rooms/${id}`)
  },

  async markAsRead(id: string) {
    return await api.patch(`/rooms/${id}/read`)
  },
}
