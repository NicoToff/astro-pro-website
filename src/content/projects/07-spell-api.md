---
title: D&D Spell API
href: dnd-spell-api
shortDescription: A REST API to query homebrew spells for D&D 5e
description: Using NestJS, I built an OpenAPI-compliant REST service to query D&D 5e homebrew spells data from any frontend application.
technologies: [TypeScript, NestJS, MongoDB, mongoose, TypeORM, SQLite, Swagger, Docker, VSCode, Fly.io, pnpm]
projectUrl: https://nestjs-spells-api.fly.dev/api
repo: https://github.com/NicoToff/nestjs-spells-api
---

# D&D Spell REST API

## Context

To hone my backend skills, I decided to build a REST API to fetch data from my homebrew D&D 5e spell list. NestJS seemed like a great fit for this use case after my previous experience with it and the reliability it provides.

For early testing purposes, the database was a SQLite file with which I interacted using TypeORM. I find the concept of SQLite incredible: your database is reduced to its most simple form and doesn't even require a server! Later on, I switched to a MongoDB database hosted on Atlas because I wanted a more flexible schema and the ability to store more complex data in a single field. I am using mongoose to interact with the database and create a strict document schema.

I also used Swagger to document the API and make it OpenAPI compliant.

The API is deployed on Fly.io using Docker.

## Accomplishments

- Start a NestJS project from scratch
- Create a simple schema for the data
- Expose endpoints using REST principles
- Host the API on a reliable service
- Learn how to be OpenAPI compliant
- Move data from SQLite to MongoDB Atlas
- Create React components to consume the API

### API Documentation