require('dotenv').config()
import { createPost } from './features/create-post.test'
import { deletePost } from './features/delete-post.test'
import { findPosts } from './features/find-posts.test'
import { signup } from './features/signup.test'
import { updateProfile } from './features/update-profile.test'

async function run() {
  console.log('start test')

  console.log('start signup test')
  await signup()

  console.log('start update profile test')
  await updateProfile()

  console.log('start create post test')
  await createPost()

  console.log('start delete post test')
  await deletePost()

  console.log('start find posts test')
  await findPosts()
}

run()
