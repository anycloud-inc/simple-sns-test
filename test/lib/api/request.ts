import { AxiosRequestConfig } from 'axios'
import { AccessToken } from '../access-token'

export const addAuthorizationHeader = (config: AxiosRequestConfig) => {
  const token = AccessToken.get()
  if (!token) return config
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  }
  return config
}
