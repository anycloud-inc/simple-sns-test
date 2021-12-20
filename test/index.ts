require('dotenv').config()
import { signup } from './features/signup.test'

async function run() {
  console.log('start test')
  console.log('start signup test')
  await signup()
}

run()
