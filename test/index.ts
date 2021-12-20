require('dotenv').config()
import { createPost } from './features/create-post.test'
import { signup } from './features/signup.test'

async function run() {
  console.log('start test')
  console.log('start signup test')
  await signup()
  console.log('start create post test')
  await createPost()
}

run()
