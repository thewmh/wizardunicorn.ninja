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

The dynamic route we created `[id].jsx` is nice, but how does it work and how can we use it? Well, to start, we'll have to import the Next.js router module `useRouter`. At the top of `[id].jsx` add the following `impoort` statement:

`import { useRouter } from 'next/router'

`useRouter` is a React hook, most React hooks start with the 'use' keyword. We'll update the `[id].jsx` code in a moment, but are going to touch on the difference between a functional and  class-based component. In a functional component, the whole component is the render function, whereas with a class component, you manually have to create a render function and anything outside of that render function is not a part of it.

Update `[id].jsx` like so:

{% highlight javascript %}

import React from 'react';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();

  const { id } = router.query;

  return (
    <h1>
      Note {id}
    </h1>
  )
}

export default Page;

{% endhighlight %}

Now, if you return to `localhost:3000/notes/1`, you should see an `<h1>` element rendered on the page with 'Note 1' displayed.

### Catch-All Routes

We had used `router.query` to grab the `id` property for a dynamic route in the last section. `router.query` has a lot of other properties and even gives you the ability to create catch-all routes. You might use this if you have a nested folder inside of a nested folder inside of a nested folder. Catch-all routes are similar to a glob pattern `path/folder/**` where the asterisks denote that everything after the last specified directory (folder in this example) is included. In Next.js, we can specify a catch-all route with the following file naming syntax: `[...params].jsx` We can now update our component to use a catch-all route, but let's try to think of why we would even ever use this 🤔

Maybe all of your pages within a nested directory need the same rendering? This would be a good use case. There is another type of catch-all route, the optional catch-all route. The optional catch-all route will also include its parent, and the syntax for an optional catch-all route is `[[...params]].jsx` (notice the 2 sets of brackets, also FYI, the `params` name can be whatever you want). Again, docs and wikis might be great use cases for this approach.

We've learned a bit about pages, but what about things that are not pages? Non-pages! When it comes to components, Next.js doesn't have any opinions or conventions. The community-convention is to create a `/src/componets` folder to house components. This is similar to how people generally structure their React applications. And once you have a `/src/` directory, you can throw your `pages` directory in there as well, to keep your project cleaner, but make sure that you do not also have a `pages` directory in the root of your project because that would take precedence over the one in `/src/`. 

### Page Navigation with the Link Component

There's some pages in our app now, but navigating through the address bar in the browser is probably not the best for usability. Let's add a link component to our app. Next.js 'gives' us a link component which allows us to route between pages. The link component is strictly for client-side routing, if you are linking to another site, then you should use the `<a>` tag instead. Open up `pages/index.jsx` and update it to use the link component:

{% highlight javascript %}

import React from 'react';
import Link from 'next/link';

const Page = () => (
  <div>
    <h1>Index Page</h1>
    <Link href="/notes">
      <a>
        Link to Notes directory
      </a>
    </Link>
  </div>
)

export default Page;

{% endhighlight %}

Your main app page will now have a link on it! How about those dynamic routes though? How can we link to them? Open up `pages/notes/index.jsx` and update that page code to this:

{% highlight javascript %}

import React from 'react';
import Link from 'next/link';

const Page = () => (
  <div>
    <h1>Note index page</h1>

    <Link href="/notes/[id]" as={`/notes/1`}>
      <a>
        Note 1
      </a>
    </Link>
  </div>
)

export default Page;

{% endhighlight %}

And if you want to see how that could be set up for when we eventually have a bunch of notes, that would be like this:

{% highlight javascript %}

import React from 'react'
import Link from 'next/link'

export default () => {
  const notes = new Array(15).fill(1).map((e, i) => ({id: i+1, title: `Note ${i+1}`}))

  return (
    <div>
      <h1>Notes</h1>

      {notes.map(note => (
        <div>
          <Link key={note.id} href="/notes/[id]" as={`/notes/${note.id}`}>
            <a>
              <strong>{note.title}</strong>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

{% endhighlight %}

(I added the +1 so that the notes do not start from zero... as arrays do)

What if you need to route programmatically using JavaScript? Like there should be routing based on an event?! The router to the rescue! We'd need to push routes to the browser, which could look like this:

{% highlight javascript %}

import React from 'react'
import { useRouter } from 'next/router'

export default () => {
  const router = useRouter()
  const id = 2

  return (
    <div>
      <button onClick={e => router.push('/')}>
        Go Home
      </button>

      <button onClick={e => router.push('/user/[id]', `/user/${id}`)}>
        Dashboard
      </button>
    </div>
  )
}

{% endhighlight %}

[Refer to the course website - Navigation section for more info](https://hendrixer.github.io/nextjs-course/navigation)

### Routing and Navigation Q&A

Q: Is there a reason that we have to use `as` on the `<Link>` component? Can we use it without?

A: If we left `as` off of the `<Link>` component, how would Next.js know what the value of `[id]` is? It wouldn't. `as` is only required for dynamic routes.

Q: Do all routes have to be declared from the root of the pages folder?

A: Yes, links are relative to the pages folder.

Q: Are there any SEO considerations when using `<Link>`?

A: No more than if you were using any other client-side router. Client-side routing usually proxies the HTML5 pushState experience. Google now crawls JavaScript for page indexing, but Twitter and Facebook do not, so with any client-side routing, you may run into issues. 

## Config

### Adding CSS & Modules

Moving on to our instructors favorite thing, styling! [Here's the link to that section of the course website](https://hendrixer.github.io/nextjs-course/styling). Scott enjoys CSS and making things look picture perfect. If you have any familiarity with React, you may also be aware that there are a number of different ways to work with CSS and how to style things. So Next.js made a decision(s) for us. In Next.js there are two basic types of styling: global and component.

The only way to get global styling into your Next.js application is through the use of a special page called `pages/_app.jsx` (or wherever you've placed your pages folder). `_app.jsx` allows us to 'hijack' the entry point to our Next.js application. This file is created for us by default by Next.js and does not need to be created unless we want to do some global styling. Go ahead and make an `_app.jsx` file in the pages folder root, and add this to it:

{% highlight javascript %}

import React from 'react';

export default function App({ Component, pageProps }) {
  return <Component { ...pageProps } />
}

{% endhighlight %}

Straight away, this does nothing different than what Next.js does out of the box, but with this file we are now able to add global styling. In the `_app.jsx` file you can now import styles: `import 'directoryname/nameofcssfile.css`. And if you try to import a CSS file in to any other page, you will get an error, but you can import CSS as a module in files other than `_app.jsx`. We'll look at that shortly. The reason Next.js has you use global styling in this way has to do with the bundling of the styles and how global styles are treated to make sure they are loaded in properly. Anyway, try to avoid using global CSS.

What we are going to be using is Next.js' support for CSS modules. The way CSS modules work is that for each import of CSS, even if it is the same CSS, it will get scoped to the component with a unique name before each class so that the CSS styling is unique to each import. This happens at build time. You can use CSS modules anywhere. To create a CSS module, all you have to do is add module to the filename: `styles.module.css`. Now you can import that CSS as a module everywhere. The only other thing to know right now is that CSS modules need class names, you are not allowed to target 'pure' elements (basically any HTML element; body, div, a, etc...). The reason being that the way the classnames get scoped, they have to be a class and not an element. 

### Adding Theme UI

Scott is now going to speak about his approach to working with CSS in React / Next.js, starting with the fact that he likes to use [Theme UI](https://theme-ui.com/). From the Theme UI docs: "Theme UI is a library for creating themeable user interfaces based on constraint-based design principles.". Basically, you can create an object that represents a theme and use that for all of your components. Let's get Theme UI installed:

With npm: `npm i theme-ui @theme-ui/presets --save`

With yarn: `yarn add theme-ui @theme-ui/presets`

Then, in the root directory of your project, create a theme file: `theme.js`. And in your theme file, drop in the following code:

{% highlight javascript %}

import { roboto } from '@theme-ui/presets'

const theme = {
  ...roboto,
  containers: {
    card: {
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      border: '1px solid',
      borderColor: 'muted',
      borderRadius: '4px',
      p: 2,
    },
    page: {
      width: '100%',
      maxWidth: '960px',
      m: 0,
      mx: 'auto',
    }
  },
  styles: {
    ...roboto.styles
  }
}

export default theme

{% endhighlight %}

But what is all that stuff?! First, we're importing a preset which is a starting point for our theme. For the theme object, there is a specific set of properties that should be there and immediately inside of that object, we are spreading out the 'roboto' preset. Then at `containers`, the nested objects `card` & `page` are basically CSS components (called variants in Theme UI) that can be added to any component that you want. You can use theme-based values for properties; like 'muted', that is not a color in CSS, but is defined in the 'roboto' theme preset. And then the `styles` object will be used to style things globally.

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


