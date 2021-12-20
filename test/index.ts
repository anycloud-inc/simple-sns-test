require('dotenv').config()
import { createAccount } from './account/create.test'

Promise.resolve(console.log('start test'))
  .then(() => console.log('create user'))
  .then(createAccount)
