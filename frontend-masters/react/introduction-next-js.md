---
title: "Introduction to Next.js"
description: These are notes from the 'Introduction to Next.js' course on Frontend Masters.
permalink: /frontend-masters/introduction-nextjs

layout: default
pagenav:
  - name: Introduction
    href: introduction
  - name: Routing
    href: routing
  - name: config
    href: config
  - name: API
    href: api
  - name: Deployment
    href: deployment
  - name: Wrapping Up
    href: wrapping-up
---

[Link to Course Website](https://hendrixer.github.io/nextjs-course/)

[Link to Course Repository](https://github.com/Hendrixer/nextjs-course-app/tree/master/)

## Introduction

### Introduction

The instructor, Scott Moss, talks about the various ways he uses Next.js from static websites to full blown full stack applications and APIs. This workshop will be a 'follow along' type of format. You do not have to follow along, but you are encouraged to do so. The course website (link above) will be used as a reference for everything that is going to be covered in this workshop. This workshop, as named, will be an introduction to Next.js. There will be some advanced topics touched on, but they are not the focus of this workshop.

There are tons of great resources available on Next.js, this is Scott's take on what we need to know. This workshop is perfect for people who know some React. But if you do not know React, i.e. maybe you know another framework or at least some web development, you should be fine. But if you would like to learn some React, you can check my notes about that, or go to Frontend Masters and directly take the workshop(s). We will also be covering how to use JAMstack with Next.js.

The goal of this workshop is to get you to the point that you can make a Next.js app and have a great foundation for more advanced topics. 

### Course Overview

As mentioned, the format of this course is to follow along. There is also a repository which is linked at the top of these notes. [Link to Course Repository](https://github.com/Hendrixer/nextjs-course-app/tree/master/) The repository is structured with a branch for every major checkpoint of this workshop, so if you missed something or want to see how the outcome of a particular section should look, you can check out the different branches as needed, but we will be starting from scratch.

As for what we will be building, we will be building a SaaS note taking application. It is very simple, so that we can focus on the Next.js specifics, and not build something too complicated or feature-rich that would get in the way of focusing on Next.js itself.

What do we need to participate with this workshop?

Node.js >= 10 - it is recommended to use nvm (node version manager) or n
npm or yarn

What are we going to learn?

Next.js? Yes, but what specifically? Well... What is Next.js, how does it compare to React, when to use Next.js, getting started, creating pages and components, SEO, static and dynamic routing, navigation, styling, API routes, fetching data, pre-rendering, deployment, JAMstack.

### Next.js Overview

In order to understand Next.js, it is important to understand some of its bigger dependencies, the biggest of which is React. React is not exactly a framework, but more of a view library. You can't really build a full, feature-rich application with React alone. You will have to install a few more things; a router, you have to figure out how to do styling, you'll have to figure out a build system, and so on. There are a lot of decisions that need to be made if you are using only React. Next.js on the other hand, is a framework, or an app-ready framework. Next.js is a full stack framework, no only allowing you to build frontend applications, but it also helps you build out APIs, and it uses React as its view library.

Next.js is essentially a bunch of conventions and opinions built on top of the React 'framework'. Vercel, the creators of Next.js, basically took all of their opinions and a lot of the things that the (React?) community has been doing over the years and decided that Next.js was basically the way that everyone is going to build things anyway, hence they created a new framework, AKA Next.js. Some of the things that you get for 'free' with Next.js:

* Dev build system - i.e. Webpack
* Production build system
* Pre-rendering
  * SSR - Server Side Rendering
  * Build Time
  * Static
* Routing
* API routes

Wonderful! What about `CRA` (create-react-app)? Create React App does a lot of the above things and has a lot of opinions baked-in to it, but it is basically boilerplate, with a build system, but as mentioned you still have to make a lot of decisions.

And what about Gatsby? Gatsby is more similar to Next.js, but there are some differences in their features and opinions. Gatsby will serve you well if you know GraphQL, it can not create API routes or do server-side rendering. Gatsby also has image optimization out of the box, which Next.js does not have.

When should you use Next.js? Are you only making a single page application? Use Create React App. Do you need a static site, like a blog, that is also a SPA? Use Next.js (or Gatsby). Need server-side rendering, an API, and all the other things? Use Next.js.

Q: Can you use databases with Next.js?

A: Yes, you can.

### Getting Started with Next.js

Drop this in to your terminal `git clone https://github.com/Hendrixer/nextjs-course-app.git & git checkout start`. This will put us at a basic starting point, but you can also start from scratch with your own repository. If you were to start from scratch, you could run either of the following commands:

With npm: `npx create-next-app`

With yarn: `yarn create-next-app`

Either of the commands above will run an install of the CLI and scaffold a next app for you, but we are going to do it a different way altogether...

With npm: `npm i next react react-dom --save`

With yarn: `yarn add next react react-dom`

Either of those commands will add/install the dependencies that we need. Then in the `package.json` file, we need to add some scripts:

{% highlight javascript %}

"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start"
}

{% endhighlight %}

What are the scripts doing? `dev` will run the Next.js application in development mode using Hot Module Reloading. `build` will build command which gets the application ready for production. And `start` will start a build. `build`  and `start` are only really for production.

Note: Next.js is a full-stack framework and needs to be hosted on a platform that supports Node.js. 

## Routing

### Routing with Pages in Next.js

When you create a 'vanilla' React app, you have to decide which routing library and version you want to use, then install it, set it up. With Next.js, routing is already handled for you and the conventions have been created for you as well. To get started with routing in Next.js, open up your project in your code editor (use VSCode!). In the root of your project, create a folder named 'pages'. Inside of that new folder, make a new file, `index.jsx`. Then make a quick React component, the example given is:

{% highlight javascript %}

import React from 'react';

const Page = () => <div>Index Page</div>

export default Page;

{% endhighlight %}

Once you have the above set up, you can run `npm run dev` to spin up your app. Now if you point your browser to `localhost:3000` you should see the index page that we just created. All we had to do was create a folder and a file and the routing is handled for us! Admittedly not super exciting, but what if we wanted to create nested OR dynamic routes, i.e. a route that is based on a specific parameter like a username? No problem. Since we are making a note taking app, we will need a route for all notes `/notes` and a route for a single note `/notes/:id`.

In the `pages` folder, add a new folder, `notes` and in the `notes` folder add a new file, `index.jsx`. In the `index.jsx` file add this code:

{% highlight javascript %}

import React from 'react';

const Page = () => <div>Notes index path</div>

export default Page;

{% endhighlight %}

Now to make the dynamic route for a single note, the file naming syntax looks like this: `[id].jsx`. The brackets surrounding `id` will tell Next.js that a parameter will be passed in when accessing this page, in our case and id. Drop this code into `[id].jsx`:

{% highlight javascript %}

import React from 'react';

const Page = () => <div>Note page</div>

export default Page;

{% endhighlight %}

Now point your browser to `localhost:3000/notes` and you can see the notes page we created, `localhost:3000/notes/whateveryouwanttoputhere` and you should see the page that says 'Note page'. If you try to access a nested route of `notes/id/...`, i.e. `localhost:3000/notes/whateveryouwanttoputhere/anotherpage`, you should see a 404 error page. On any non-error page, you might notice that there is a lightening bolt there, if you hover over it, you will see that it says 'Prerendered Page'. This is letting us know that the page has been... prerendered. You can click on that message and be taken to the Next.js documentation and learn more about what that means, but we will also cover it later.

### Dynamic Route Parameters in Next.js



### Catch-All Routes



### Page Navigation with the Link Component



### Routing and Navigation Q&A


## Config

### Adding CSS & Modules



### Adding Theme UI



### Styling with Theme UI



### Variants & Styling



### Customizing the Next.js Config



### Plugins



### Typescript with Next.js


## API

### Creating API Routes



### API Handlers



### Creating an API



### Fetching Data & getStaticProps



### Building Static Pages with getStaticPaths



### Building Dynamic Pages with getServerSideProps



### Methods of Fetching Data Review and Auth Q&A



### Fetching Notes with getServerSideProps



### Fetching Notes & Dynamic Rendering



### Rendering Modes



### Working with SSR


## Deployment

### Deploying Next.js Overview



### Deploying Next.js on Vercel



### Q&A


## Wrapping Up

### Wrapping Up


