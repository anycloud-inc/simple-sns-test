import api from '../lib/api'
import * as FormData from 'form-data'
import { ReadStream } from 'fs'

interface CreateParams {
  name: string
  email: string
  password: string
}

interface SigninParams {
  email: string
  password: string
}

interface UpdateProfileParams {
  name?: string
  email?: string
}

export const accountRepository = {
  async create(params: CreateParams) {
    return await api.post('/account', { ...params })
  },

  async show() {
    return await api.get('/account')
  },

  async signin(params: SigninParams) {
    return await api.post('/auth', { ...params })
  },

  async updateProfile(params: UpdateProfileParams) {
    return await api.patch('/account/profile', { ...params })
  },

  async updateIconImage(data: ReadStream) {
    const formData = new FormData()
    formData.append('file', data)
    return await api.patch('/account/icon_image', formData, {
      headers: formData.getHeaders(),
    })
  },
}
