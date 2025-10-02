---
title: MTG-Fast-SQLite
href: mtg-fast-sqlite
shortDescription: Another Magic the Gathering search engine
description: A fully client-side search-as-you-type search engine for Magic the Gathering cards.
technologies: [TypeScript, Astro, React, SQLite, SQLocal]
---

Website: https://www.mtg-fast.com/

# _Magic: the Gathering_, even mooore blazingly fast

## Context

There is nothing better than a second iteration. After a first search-as-you-type project based on the MtG card pool, I found myself wondering how to make it simpler. The previous project relied on a powerful search tool, Typesense, similar to Algolia, because the 30000 cards in the pool are pretty complex to search into... or are they?

I took the challenge to create the simplest possible storage format for this impressive collection. The end goal was to send the whole payload to the client-side and let the browser handle the filtering without any server calls.

Handling this with a simple JSON payload and filtering with pure JavaScript quickly became a nightmare. I ended up settling on a SQLite database, which _does_ work in browsers thanks to their [WASM build](https://sqlite.org/wasm/doc/trunk/about.md). A thin wrapper called [`sqlocal`](https://github.com/DallasHoff/sqlocal) made that journey even smoother. The DB file gets stored in the rather recent [origin private file system (OPFS)](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system) of the browser.

The website in its full glory can be found here: https://www.mtg-fast.com/

> Surely sending a whole MtG database to the browser is super heavy, right?

I'm glad you asked! It turns out that when you filter out all the clutter to keep the bare (opinionated) essentials about the cards, you can end up with ~8MB SQLite DB. Still pretty chonky, but after a brotli conversion, this fall to a mere 2.2MB! Which is obviously cached browser-side ;)

## Accomplishments

- Adapt an existing e-commerce template to my specific needs
- Integrate Typesense as a search engine
- Design an optimized document schema to serve the card objects
- Acquire and update card pricing (available publicly) from reputable websites
- Deploy and maintain the project
