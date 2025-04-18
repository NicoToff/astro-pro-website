---
title: Next.js
imageOnLight: "/images/logos/nextjs-logo-light.svg"
imageOnDark: "/images/logos/nextjs-logo-dark.svg"
---

I've grown to like Next.js. It's far from being a perfect solution, but the rough edges are getting smoother every year. Thanks to [Vercel](https://vercel.com/docs/concepts/deployments/overview)'s infrastructure, it is trivial to deploy a robust, scalable Next.js application. However, there is a dark side to this.

Since Vercel is maintaining Next.js, they are able to solve problems at the infrastructure level when they design Next.js internal APIs. This means self hosting a Next.js application is far from easy or cheap. When teams choose Next.js as their framework, they often overlook this issue and spend precious resources trying to take advantage of Next.

Vercel is slowly making efforts to make self hosting easier (some internals were barely documented until 2024), but this task remains mostly delegated to open source projects such as OpenNext or [SST](https://sst.dev/docs/start/aws/nextjs/).

In my opinion, if you can afford the potential vendor lock-in by hosting on Vercel, Next.js is a compelling framework. If you can't, you're better off choosing another solution.