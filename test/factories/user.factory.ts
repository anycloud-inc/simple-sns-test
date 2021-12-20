import { User } from '../entities/user.entity'
import generateHash from '../lib/generate-hash'

export const userFactory = {
  create(): User {
    const hash = generateHash()
    return {
      name: 'test',
      email: `${hash}@gmail.com`,
      password: '12345678',
    }
  },
}
