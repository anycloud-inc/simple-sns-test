require('dotenv').config()
import { createPost } from './features/create-post.test'
import { deletePost } from './features/delete-post.test'
import { findPosts } from './features/find-posts.test'
import { signup } from './features/signup.test'
import { updateProfile } from './features/update-profile.test'
import { createRoom } from './features/create-room.test'
import { findRooms } from './features/find-rooms.test'
import { createMessage } from './features/create-message.test'
import { createMessageViaPost } from './features/create-message-via-post.test'
import { findMessages } from './features/find-messages.test'

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

  console.log('start create room test')
  await createRoom()

  console.log('start find rooms test')
  await findRooms()

  console.log('start create message test')
  await createMessage()

  console.log('start create message via post test')
  await createMessageViaPost()

  console.log('start find messages test')
  await findMessages()
}

run().catch(e => {
  console.log(e)
})
