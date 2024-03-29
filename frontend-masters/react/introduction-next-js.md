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

But what is all that stuff?! First, we're importing a preset which is a starting point for our theme. For the theme object, there is a specific set of properties that should be there and immediately inside of that object, we are spreading out the `roboto` preset. Then at `containers`, the nested objects `card` & `page` are basically CSS components (called variants in Theme UI) that can be added to any component that you want. You can use theme-based values for properties; like 'muted', that is not a color in CSS, but is defined in the `roboto` theme preset. And then the `styles` object will be used to style things globally. To really see what is happening with the theme and what it is, add a `console.log` statement in the file: `console.log(theme)` then add it to the (entire) site, in `_app.jsx`, update that file code to:

{% highlight javascript %}

import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from '../../theme';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component { ...pageProps } />
    </ThemeProvider>
  )
}

{% endhighlight %}

If you've updated all the things, you should be able to reload the page and see that the fonts and colors have changed. If you are having an issue, try restarting the app: In the terminal; press ctrl + c to terminate the process, hit the up arrow to select the last command, press enter to restart. You can also check the console in the browser to see the theme object. Theme UI also handles responsive design very well, another great reason to use it. There is some more code / instructions to continue making out application look nice [over here](https://hendrixer.github.io/nextjs-course/themeui).

### Styling with Theme UI

You may have noticed quite a few different things going on if you followed the last bit above where I directed you to the course website:

* `/** @jsx jsx */
* `import { jsx } from 'theme-ui'`
* `sx={{...}}...`

What are those things and why?!

Side note: Adding `/** @jsx jsx */` resulted in an error, so I also had to add `/** @jsxRuntime classic */` to get this working properly.

This bit: `/** @jsx jsx */`, is called JavaScript pragma which is a directive to tell the compiler, in the case of Next.js, the compiler is Babel, that when it compiles jsx we want it to use a specific tool (jsx from theme-ui) and not React's jsx. Have you ever noticed that in every jsx file you are always importing React? This is for the compiler to be able to know how to compile jsx, and that information comes from React.

The Theme UI jsx compiler is what gives us the ability to use the `sx` property on the HTML elements in our components. The `sx` property is essentially inline styles, the difference being that the `sx` property will not actually be an inline style that you can inspect in the browser, but the `sx` properties will be transformed into CSS and added the the head of the document, with class names that are scoped to the elements. `sx` also gives you the ability to interact with / use theme variables, and is TypeScript, so you get a lot of useful and informative tooltips. None of this is specific to Next.js, this is all specific to Theme UI.

Q: Theme UI vs Tailwind?

A: Theme UI is associated with Gatsby, and Theme UI is the next iteration of Tailwind?

Q: Is this (Theme UI) built on top of Emotion? Can you use the styled interface that Emotion has?

A: Yep, you just have to import it like you normally would.

### Variants & Styling

[Continue updating your files following the notes here](https://hendrixer.github.io/nextjs-course/themeui). After you have updated all of your files, have a look at the result. Now go have a look at [Baseweb](https://baseweb.design/) it is similar to Theme UI, but is not Theme UI.

Another thing to check out is the [Theme UI components](https://theme-ui.com/components/). Another thing to note is that Theme UI is not restricted to Next.js usage. You can use it with a variety of applications.

### Customizing the Next.js Config

Right out of the box, Next.js handles a lot of things for us, but if you want to change anything or opt-in or opt-out of various things, create a `next-config.js` file in the root directory of your project. You have 2 options for the configuration export, an object or a function. The object format looks like this:

{% highlight javascript %}

module.exports = {
  webpack: {
    // webpack config properties
  },
  env: {
    MY_ENV_VAR: process.env.SECRET
  }
}

{% endhighlight %}

...and the function format:

{% highlight javascript %}

const { PHASE_PRODUCTION_SERVER } = require('next/constants')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {
      ...defaultConfig,
      webpack: {
        plugins: [new BundleAnalyzerPlugin()]
      }
    }
  }

  return defaultConfig
}

{% endhighlight %}

In the function example above, we've set a condition to check the `phase` value, which if the condition is met will run. Also, we have to use commonJS require instead of import statements. You can see the [other available phases here](https://github.com/vercel/next.js/blob/canary/packages/next/shared/lib/constants.ts).

Q: Do you have o modify the `defaultConfig`?

A: I usually don't modify arguments, so it is safest to spread over the `defaultConfig` and then add your changes. 

### Plugins

The Next.js config file gives us the ability to do some powerful stuff with plugins, which are basically extended configurations. The plugin naming convention is `withPluginName` and using a plugin looks something like this:

{% highlight javascript %}

// in next.config.js

const config = {}; // config options
module.exports = withPluginName(config) // some plugins have arguments, those would appear first, followed by the config object; i.e. withPluginName(argument, config)

{% endhighlight %}

Let's add a plugin that allows us to add environment variables to out Next.js app! Start by making a `.env` file in the root of your application. Now, let's install a couple of dependencies:

With npm: `npm i next-env dotenv-load --dev`

With yarn: `yarn add next-env dotenv-load --dev`

Once those dependencies are installed, add the following to the `next.config.js` file:

{% highlight javascript %}

const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad();

const withNextEnv = nextEnv();
module.exports = withNextEnv();

{% endhighlight %}

And in the `.env` file at the root of your application (create the file if needed):

{% highlight javascript %}

HELP_APP_URL=https://google.com

{% endhighlight %}

Now that we have the ability to use environment variables and have one set up, let's use it in the nav component:

{% highlight javascript %}

//...
<a sx={{
    color: 'text',
    fontSize: 3,
    cursor: 'pointer'
  }}
  href={process.env.HELP_APP_URL}
>
  Help
</a>
//...

{% endhighlight %}

Note: I could not get this section to work 😞

### Typescript with Next.js

If you want to use TypeScript with Next.js, all you have to do is make a `tsconfig.json` file and install the things: `npm install typescript @types/react --dev`. Then start your app again and Next.js should auto-populate your `tsconfig.json` file (also did not work for me). 

## API

### Creating API Routes

We've already looked at API Routes with Next.js, but let's look at it in a bit more detail. Next.js is a full-stack framework, it has a server for rendering components on the server, but also for an API. If you want to make an API for your app, just make an `api` folder inside of your `pages` folder. The routing for an API works exactly the same as it does for pages, so if you want to make an endpoint that is at the root of the `api`, add an `index.js` file inside of the `api` folder. If you want to nest routes for your API, it is again the same as pages, make a folder inside of the `api` folder, then add your files there.

### API Handlers

We're in [this section of the course website](https://hendrixer.github.io/nextjs-course/api-handlers)

In `pages/api/index.js` add:

{% highlight javascript %}

export default (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ message: 'hello' }))
}

{% endhighlight %}

Then load `localhost:3000/api` and you should see the message display on the page. This is super easy to set up out of the box, but is a bit lacking in what it offers, we'd like to be able to split up some logic based on GET, PUT, DELETE, etc... To do that, we need to install `next-connect`: `npm install next-connect` and in the `pages/api/index.js` file:

{% highlight javascript %}

import nc from 'next-connect';

const handler = nc()
  .get((req, res) => {
    res.json({message: 'get ok'})
  })
  .post((req, res) => {
    res.json({message: 'post ok'})
  })

export default handler

{% endhighlight %}

### Creating an API

To have an actual CRUD (Create, Read, Update, Delete) application, we need to be able to do the following:

create note => POST /api/note
update note => PATCH /api/note/:id
delete note => DELETE /api/note/:id
get one note => GET /api/note/:id
get all notes => GET /api/note/

Looking at the above, we only need 2 routes: `/api/note/:id` and `/api/note/`. Create a folder in the `api` folder, `note` and add an `index.js` and an `[id].js` file there. We are not going to be connecting to a database in this workshop, so to store our data, make a folder in `src`, `data` and add a file `data.js` there, with the following content:

{% highlight javascript %}

const notes = [];

module.exports = notes;

{% endhighlight %}

In `pages/api/note/index.js` add the following code:

{% highlight javascript %}

import nc from 'next-connect';
import notes from '../../../src/data/data'

const handler = nc()
  .post((req, res) => {
    const note = {
      ...req.body,
      id: Date.now()
    }
    notes.push(note)
    res.json({data: note})
  })
  .get((req, res) => {
    res.json({data: notes})
  })

export default handler

{% endhighlight %}

That handles the GET and POST for notes, now we need to build out the functionality or note by id:

{% highlight javascript %}

import nc from 'next-connect'
import notes from '../../../src/data/data'

const getNote = id => notes.find(n => n.id === parseInt(id))

const handler = nc()
  .get((req, res) => {
    
    const note = getNote(req.query.id)

    if (!note) {
      res.status(404)
      res.end()
      return
    }

    res.json({data: note})
  })
  .patch((req, res) => {
    const note = getNote(req.query.id)

    if (!note) {
      res.status(404)
      res.end()
      return
    }
    
    const i = notes.findIndex(n => n.id === parseInt(req.query.id))
    const updated = {...note, ...req.body}

    notes[i] = updated
    res.json({data: updated})
  })
  .delete((req, res) => {
    const note = getNote(req.query.id)

    if (!note) {
      res.status(404)
      res.end()
      return
    }
    const i = notes.findIndex(n => n.id === parseInt(req.query.id))
    
    notes.splice(i, 1)

    res.json({data: req.query.id})
  })
  

export default handler

{% endhighlight %}

Q: How to interact with your api on pages?

A: We'll get to that in a bit.

### Fetching Data & getStaticProps

There are many ways to fetch data with Next.js. Depending on when you need the data and what you are going to do with the data, there are options. If you want to fetch data ahead of time, you have the following options:

* getStaticProps
* getStaticPaths
* getServerSideProps

All of the above methods are for prerendering pages only. You cannot use them in components or client-side data fetching, let's look at `getStaticProps` first:

{% highlight javascript %}

// /pages/index.js

const IndexPage = () => {// jsx }
export default IndexPage

export async function getStaticProps(context) {
  return {
    props: {}
  }
}

{% endhighlight %}

Whatever is in the props object will be passed into the exported page. The `async` function `getStaticProps` will only ever run on the server. The actual code will not be bundled with client-side code. That means you can do things like; file system work, connect to a database, crawl a website, etc... 

### Building Static Pages with getStaticPaths

The `context` object is useful when the page is dynamic. The context will contain the value of the params. This function is not at runtime in the browser, so where do the params come from?

`getStatcPaths`! Imagine you have a documentation website with a catch-all route (`[..params].js`). `getStatcPaths` allows us to get the paths for static pages that need to be generated. If we had the following dynamic route: `/pages/blog/:slug.js`, we could use `getStatcPaths` like so:

{% highlight javascript %}

// /pages/blog/:slug.js

const IndexPage = () => {// jsx }
export default IndexPage

export async function getStaticPaths() {
  // get all the paths for your posts from an API
  // or file system
  const results = await fetch('/api/posts')
  const posts = await results.json()
  const paths = posts.map(post => ({params: {slug: 
  post.slug}}))
  /*
  [
    {params: {slug: 'get-started-with-node'}},
    {params: {slug: 'top-frameworks'}}
  ]
  */
  return {paths}
}

export async function getStaticProps({ params }) {
  const res = await fetch(`/api/post/${params.slug}`)
  const post = await res.json()
  return {
    props: {post}
  }
}

{% endhighlight %}

### Building Dynamic Pages with getServerSideProps

`getServerSideProps` will be called at runtime during every request, you will have runtime data like query params, HTTP headers, and the req and res objects from API handlers. `getServerSideProps` is probably a better place to get dynamic ids or routes.

### Methods of Fetching Data Review and Auth Q&A

When to use what...

* Do you need data at runtime but don't need SSR? Use client-side data fetching.
* Do you need data at runtime but do need SSR? Use `getServerSideProps`
* Do you have pages that rely on data that is cacheable and accessible at build time? Like from a CMS? Use `getStaticProps`
* Do you have the same as above but the pages have dynamic URL params? Use `getStaticProps` and `getStaticPaths`

Q: Are there any issues with using `getServerSideProps` and `getStaticProps`?

A: Yeah, it is not recommended to use `getServerSideProps` unless you absolutely need it.

Q: How would you think about authentication and where would you put it?

A: There are 2 types of authentication: authenticating APIs and front-end routes. Authenticating front-end routes is similar to what you would do now; use a hook to see if someone is authenticated. For an API route, you would check your auth middleware.

### Fetching Notes with getServerSideProps

Now we get to put some of this API business to use! Open up the `src/data/data.js` file, or create one if you haven't already done so. In that file, add the following:

{% highlight javascript %}

const notes = new Array(15)
  .fill(1)
  .map((_, i) => ({
    id: Date.now() + i,
    title: `Note ${i}`
  }))

module.exports = notes

{% endhighlight %}

The above code makes an array of 15 elements, then fills each element with the number 1, and finally maps over the array and makes each element into an object with an id and a title property. This will function as our 'database'. Now we have to fetch all the data. As we've seen, there are a few different ways we could approach this, but we are going to use `getServerSideProps` so that we can observe how that method works at runtime and really understand what is happening. This is not the recommended approach and `getServerSideProps` should only be used when absolutely necessary because if there were thousands or even more notes, this could become a very slow method of retrieving our data. In `pages/notes/index.jsx` add the following code at the bottom of the file:

{% highlight javascript %}

//...

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/note/`);
  const { data } = await res.json()

  console.log(data)

  return {
    props: {notes: data}
  }
}

{% endhighlight %}

You should now be able to refresh the page and it will look the same, but we are now getting our notes from the `data.js` file!

### Fetching Notes & Dynamic Rendering

Now we will set up the retrieval of a single note. We'll set this up in the event that a note is not found, the application will redirect back to the main notes page. Open up the `pages/notes/[id].jsx` file and update the code like this:

{% highlight javascript %}

//... import statements above here

export default ({note}) => {

  return (
    <div sx={{variant: 'containers.page'}}>
      <h1>Note: {note.title} </h1>
    </div>
  )
}

export async function getServerSideProps({params, req, res}) {
  const response = await fetch(`http://localhost:3000/api/note/${params.id}`)

  if (!response.ok) {
    res.writeHead(302, {
      Location: '/notes'
    })

    res.end()

    return {
      props: {}
    }
  }

  const {data} = await response.json()

  return {
    props: {note: data}
  }
}

{% endhighlight %}

Now, you should be able to go to the notes page and click on a note and be taken to the page for that note. It may take a moment the first time as it prerenders the page.

The last thing we are going to do is `getStaticProps` on the homepage of our app. Open up `pages/index.jsx` and update the code as follows:

{% highlight javascript %}

//... import statements above here

export default ({content}) => (
  <div sx={{ height: `calc(100vh - 60px)`}}>
    <div sx={{variant: 'containers.page', display: 'flex', alignItems: 'center', height: '100%'}}>
      <h1 sx={{fontSize: 8, my: 0}}>{content.title}</h1>
    </div>
  </div> 
)

export function getStaticProps() {

  return {
    props: {content: {
        title: 'This is my really nice app'
      }
    }
  }
}

{% endhighlight %}

Q: Is data fetching in components any different?

A: It would be the same way that you would do it in React, which is purely client-side. 

### Rendering Modes

Next.js looks at the data fetching in page components to determine how and when to prerender the page. The 3 different modes are:

* Static Generation - Pages built at build time into HTML. CDN cacheable.
* Server-side Rendering - Pages built at run time into HTML. Cached after the initial hit.
* Client-side Rendering - Single-page application.

By default, all of the pages are prerendered. If you choose `getStaticProps`, the page will be statically generated. `getServerSideProps` will server-side render the page. 

### Working with SSR

One of the biggest 'gotchas' with Server-Side Rendering (SSR) is using browser-specific things; i.e. DOM APIs. This will trigger an error because, on the server, `window` and `document` will not be defined. Next.js gives us some tools to help avoid these errors.

Sometimes you may need to skip SSR some components:

* [component] depends on the DOM API - `window`, `navigator`, GPS...
* [component] depends on client-side data
* something else?!

Next.js supports dynamic imports that, when used with components, will opt out of SSR. Dynamic imports look like this:

{% highlight javascript %}

import dynamic from 'next/dynamic'

const MyAwesomeDynamicComponent = dynamic(
  () => import('../components/myAwesomeDynamicComponent'),
  { ssr: false }
)

{% endhighlight %}

Dynamic components, similar to routes, don't get rendered / built with the other files. 

## Deployment

### Deploying Next.js Overview



### Deploying Next.js on Vercel



### Q&A


## Wrapping Up

### Wrapping Up


