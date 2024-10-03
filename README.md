# Video Chat

## Introduction

This is my attempt at learning WebRTC, Socket, and Streaming for network.

Visit [https://video-chat-client-sooty.vercel.app/](https://video-chat-client-sooty.vercel.app/) to check it out.

The tech stack is `Node.js`, `TypeScript`, `MongoDB`, `Socket.io` for backend. And `Next.js` for frontend.

This is a simple messaging and video calling web application with these functionalities:

- User can sign up/sign in for an account that allows them access to all features
- User have to connect to other users before being able to message/call them
- User can use the real time messaging features that allow them to talk to anybody from anywhere in real time,
  with support for browsering the chat history.
- User can initiate/accept a voice chat or a video call from other users.
- During the call, user can mute their audio and video. And they also have access to the chat that is relative to
  that room/conversation.
- A call can handle up to `100` clients simultaneously with relatively low impact on performance.
- User can search for room that interests them to join. The search is finding matching or related terms from the
  room name or description.
