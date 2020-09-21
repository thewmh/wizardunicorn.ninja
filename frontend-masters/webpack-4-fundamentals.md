---
title: "Webpack 4 Fundamentals"
description: These are notes from the 'Webpack 4 Fundamentals' course on Frontend Masters.
permalink: /frontend-masters/webpack-4-fundamentals

layout: page
---

## Introduction

Why are we using Webpack and what problems does it solve? At its core, it's a very simple tool in terms of its capabilities standalone.

### Problems with Script Loading

But why? It is important to understand how we've used JavaScript on the web. There are really only 2 ways that you can use JavaScript in the browser. JavaScript is really just a script, top-down execution. The first way to load JavaScript in the browser is via a script tag. The second way is to actually write JavaScript in your HTML.

But what are the problems with these things?

They don't scale, you might have too many scripts, and each browser has bottlenecks. You could end up with unmaintainable scripts; scope, size, readability, fragility, monolithic files.

Potential solutions?

Immediately Invoked Function Expressions! Treat each file as an IIFE (Revealing Module Pattern). Using this pattern, you can now concatenate files without any concern of scope collision! This idea lead to the explosion of tools such as; **Make**, **Grunt**, **Gulp**, **Broccoli**, **Brunch**, **StealJS**. All of which are used to concatenate JS files.

But there are still problems... Full rebuilds everytime. Dead code (code you are not using). Lots of IIFEs are slow. No way to lazy load.

### History of Modules

How do you load JavaScript if there is no DOM?

NPM + Node + Modules

NPM was created as a package registry to share JS modules across the registry.

There is no browser support for CommonJS, there are no live-bindings which causes problems with circular references, it's slow...

The solution to this is to use bundlers / linkers. **Browserify**, **RequireJS**, **SystemJS**. The bundlers are used to write CommonJS modules and use them in your code.

But there are still problems. THere is no static async or lazy loading.

### EcmaScript Modules (ESM)

{% highlight javascript %}

import {uniq, forOf, bar} from 'lodash-es'
import * as utils from 'utils';

export const uniqConst = uniq([1,2,2,4]);

{% endhighlight %}

ES Modules is completely separate from ES 2015. ESM has named and default exports.

ESM brought reusable, encapsulated, organized, and convenient modules. The issues… ESM for Node.js? Incredibly slow in the browser.

### Introducing Webpack

Every [JavaScript] library is different; i.e. may use different module formats. Enter Webpack. Webpack is a module bundler which lets you write in any module format (including mixed formats) and compiles them for the browser. Webpack supports static async bundling which allows you to create separate lazy load bundles at build time. Webpack is the most performant way to ship JavaScript.

### Configuring Webpack

There's 3 ways that you can use Webpack.

1. The config - A Common.JS module that is an object which has a bunch of properties that define what Webpack should do with code.

2. Webpack CLI - Almost every single property in Webpack is bound to a CLI argument and parameter.

3. Node API - Neutrino is built with this.

Webpack is important for web performance, scalibility, and maintainability.

## Webpack from Scratch

### Using Webpack for the First Time

[Repo to play along](https://github.com/thelarkinn/webpack-workshop-2018)

Start in branch `feature/01-fem-first-script`. Looking at the package.json file, you will find a lot of dependencies. Run `npm install`. Still in the package.json file, add the following:

{% highlight json %}

"scripts" : {
    "webpack": "webpack"
}

{% endhighlight %}

Then in the CLI type: `npm run webpack` and you will see the default Webpack CLI output and there isn't even a config file yet!

### Adding npm Scripts for Environment Builds

In the output, there should be a warning message that no 'mode' has been set. [Click the link to learn more about Webpack 'mode'(s)](https://webpack.js.org/concepts/mode) Now add 'dev' and 'prod' environment to the 'scripts' section from above:

{% highlight json %}

"scripts" : {
    "webpack": "webpack",
    "dev": "npm run webpack -- --mode development",
    "prod": "npm run webpack -- --mode production"
}

{% endhighlight %}

Now in the CLI you can type `npm run dev` or `npm run prod` to trigger the Webpack build mode as needed. Webpack defaults to production. Development is a faster build, production is an optimized build. Time to debug.

Switch to:

`git checkout feature/03-fem-debug-script`

### Setting Up Debugging

If you want to debug a node application, you can simply run node and pass in a couple of arguments; i.e. 

{% highlight json %}

"debugthis": "node --inspect --inspect-brk ./src/index.js"

{% endhighlight %}

When you run the above with `npm run debugthis`, you will see a url in terminal that will link you to a debugger in your browser. If we want to be able to debug Webpack, the debug command in the project is:

{% highlight json %}

"debug": "node --inspect --debug-brk ./node_modules/webpack/bin/webpack.js"

{% endhighlight %}

Run the debug command and you can debug Webpack!

Get comfortable with adding to your config file, because the Webpack methodology is based on 'separation of concerns'. Most people have trouble with Webpack because they shove everything into one file, into one build file, so it becomes fragile.

### Coding Your First Module

In `src/` add a new file; i.e. `nav.js`. If you want to share some variables or a function, using the `export {a, v, r}` syntax will allow you to do so. Otherwise, use `export default "nav"`. In your entry-point; i.e. `index.js` add an import statement, `import nav from "./nav";`.

{% highlight javascript %}

import nav from "./nav";

console.log(nav)

{% endhighlight %}

Then build the project with the `npm run prod` command.

### Adding Watch Mode

To avoid having to continuously run a build command, you can just add a 'watch' flag to your `dev` command in the config file; i.e.


{% highlight json %}

"dev": "npm run webpack -- --mode development --watch"

{% endhighlight %}

Now when you type `npm run dev` in terminal, Webpack will 'watch' for changes. Update `nav.js` to the following:

{% highlight javascript %}

export default () => "nav";

{% endhighlight %}

Then you have to update the index.js file to:

{% highlight javascript %}

import nav from "./nav";

console.log(nav()) <!-- call the nav function -->

{% endhighlight %}

You will see in your terminal the changes to the files being 'watched' and Webpack will incrementally compile the changes.

### ES Module Syntax

Add a new file `footer.js` with the following: 

{% highlight javascript %}

export const top = "top";
export const bottom = "bottom";

{% endhighlight %}

And in the `index.js` file add the following import statement: 

{% highlight javascript %}

import { top, bottom } from "./footer";

{% endhighlight %}

Now you have access to the variables from footer.

### CommonJS Export



### CommonJS Named Exports

### Tree Shaking

### Webpack Bundle Walkthrough