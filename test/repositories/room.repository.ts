import api from '../lib/api'

export const roomRepository = {
  async create(userIds: number[]) {
    return await api.post('/rooms', { userIds })
  },
}
