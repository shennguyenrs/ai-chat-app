# My Simple ChatGPT

![frame_1](https://github.com/shennguyenrs/ai-chat-app/assets/17680161/faaaf2fe-654e-4986-8425-67968a775727)

## Overview

A simple ChatGPT clone that custom functions for my needs. Current functions:

- [x] Chat with the bot
- [x] Function callings
  - [x] Write cover letter from LinkedIn URL

## Tech stacks

- Framework: [Next.Js](https://github.com/vercel/next.js) (App directory)
- Frontend: [UnoCSS](https://github.com/unocss/unocss), [Next Auth](https://github.com/nextauthjs/next-auth)
- Database: [Prisma](https://www.prisma.io/), Vercel KV & Postgres

## Sample .env for local development

```
# Local database
DATABASE_URL=
ADMIN_EMAIL=
ADMIN_PASSWORD=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Vercel KV Redis database
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=

# Vercel Postgres
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

# OpenAI Key
OPENAI_API_KEY=
```
