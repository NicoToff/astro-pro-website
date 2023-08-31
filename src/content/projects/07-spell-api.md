---
title: D&D Spell API
href: dnd-spell-api
shortDescription: A REST API to query homebrew spells for D&D 5e
description: Using NestJS, I built an OpenAPI-compliant REST service to query D&D 5e homebrew spells data from any frontend application.
technologies: [TypeScript, NestJS, TypeORM, SQLite, Swagger, Docker, VSCode, Fly.io, pnpm]
projectUrl: https://nestjs-spells-api.fly.dev/
repo: https://github.com/NicoToff/nestjs-spells-api
---

# D&D Spell REST API

## Context

To hone my back end skills, I decided to build a REST API to fetch data from my homebrew D&D 5e spell list. This is later going to be consumed by a frontend website for my players to search. For early testing purposes, the database is a SQLite file with which I interact using TypeORM.

The API is deployed on Fly.io using Docker.

## Tasks

- Start a NestJS project from scratch
- Create a simple schema for the data
- Expose endpoints using REST principles
- Learn how to be OpenAPI compliant
