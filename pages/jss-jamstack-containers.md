---
title: "Sitecore: Road to JSS on Jamstack & Containers"
description: These are notes from the Sitecore Virtual Developer Day 2021 Workshop — 'Sitecore':' Road to JSS on Jamstack & Containers'.
permalink: /jss-jamstack-containers

layout: default
pagenav:
  - name: Introduction
    href: introduction
  - name: Sitecore JSS
    href: sitecore-jss
  - name: Jamstack
    href: jamstack
  - name: Sitecore & Jamstack
    href: sitecore--jamstack
  - name: Next.js
    href: nextjs
  - name: Next.js in Containers
    href: nextjs-containers
  - name: Kubernetes for Production
    href: kubernetes-production
  - name: Cost vs Complexity
    href: cost-vs-complexity
---

## Introduction

### Introduction

Remember how websites were delivered back in the day? Me neither... Apparently it was like this:

* Simple HTML
* Direct delivery from servers
* No complex business logic

Originally, web content delivery was just as described above; there was a visitor requesting a website from a server and the server would serve the website to the visitor. That wasn't enough. What if we could make the content dynamic? Enter server-side processing, a database solution, a load balancer, a content delivery network (CDN) — for static assets (JavaScript, CSS, images). This made property deployment instances much more complex to manage. And then came the need to make sure content rendering and content delivery be separate, which called for **more** servers!

## Sitecore JSS

### How Do We Internet with Sitecore?

Moving from the 'old' approach of how we made the internet without Sitecore *and* introducing Sitecore into the picture, how does that look? Normally, there would be a content delivery (CD) server which is only responsible for delivering JSON to a Node server, a Node server which is responsible for rendering content and delivering it to the visitor. Now you need to consider how any Node servers are needed and how many CD servers are needed. Doing some load testing is generally required to find the balance between how many C servers are needed vs how many Node servers are needed. There may also be some server clustering, asset caching, all with the aim of improving performance.

But... What if caching is enabled and infrastructure is already scaled to the maximum reasonable size, and  you achieve good performance? Can you do even better?

The answer of course is yes. Browsers became more capable over time and a lot of lessons have been learned about how to optimize performance. Time to jam.

## Jamstack

### Jamstack

What is Jamstack though?! JAM stands for: JavaScript, API, & Markup. According to the CEO & Co-founder of Netlify: [The Jamstack is] "A modern web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup". With the Jamstack approach, we still have a static server CDN that handles the HTTP routing and serving, the browser which handles the rendering of the Markup and processing of JavaScript at runtime.

What are the advantages of the Jamstack?

* Provides pre-rendered content
* Leverages the capabilities of the [web] browser
* Serves content without a web server
* Does the 'work' upfront, so the servers don't have to do it later
* Puts distance between complexity and the [end] user

Additionally, performance, scalability, and security are advantages of the Jamstack.

Performance - A pre-rendered website served from a CDN is easily tuned to have the best performance possible

Scalability - See performance

Security - Abstracted logic in microservices managed by third parties makes it more secure

The way that this looks is actually quite similar to the 'old' way of websites (but better?).

### But why?

Cool, but why Jamstack? Here's some use cases:

For Developers:

* Lowers the barrier to entry
* Simplifies continuous delivery workflow
* Provides modern tooling to build web apps

For Teams:

* Helps enforce a more maintainable architecture
* Decreases iteration time, enabling faster delivery

For End Users:

* Improves user experience by enabling faster load times with more interactivity

For Companies:

* Faster time to market for digital innovation
* Enhanced scalability, performance, and security
* Reduced infrastructure costs
* Increased revenue & conversion resulting from better page load and performance metrics

## Sitecore & Jamstack

### Sitecore & Jamstack