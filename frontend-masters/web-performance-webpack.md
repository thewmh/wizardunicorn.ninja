---
title: "Web Performance with Webpack"
description: These are notes from the 'Web Performance with Webpack' course on Frontend Masters.
permalink: /frontend-masters/web-performance-webpack

layout: page
---

## Web Performance

### Top Performance Issues

What are the top three causes of web performance issues?

* Amount of JavaScript for initial download
* Amount of CSS for initial download
* Amount of Network Requests on initial download

### Performance Goals

* <= 200KB (uncompressed) initial JavaScript [total]
* <= 100KB (uncompressed) initial CSS [total]
* HTTP: <= 6 initial network calls
* HTTP/2 <= 20 initial network calls
* 90% code coverage (only 10% code unused)

The above performance goals will ensure that you have a fast loading website / application across all user experiences, even in emerging markets.

### Code Coverage

How can you determine your code coverage? Google's Chrome browser has a feature in its Dev Tools that lets you look at code coverage. With Dev Tools open, press `Shift+⌘+P` and type `coverage`, then select the first option and click the reload icon. You will then see all of the files and what their code coverage is. This approach to looking at code coverage is a little time consuming, but is currently the only way to check code coverage. It is important to establish performance as a first class citizen, to make performance a priority amongst your team(s). At the bottom of the code coverage view, you can see the total code coverage for all of your files.

### Code Splitting

Google Web Toolkit first introduced the concept of code splitting. They allowed asynchronous code to be loaded dynamically, so (for example) if you had a piece of code that was only needed when a button was clicked, that code could then be imported and run. Code splitting is the process of splitting pieces of your code into async chunks [at build time]. Code splitting [according to Webpack] is arguably one of the most important considerations to undertake when enabling performance in web applications.

How does it work? Webpack, under the hood, takes your entry point and passes it to a resolver where you must make sure the file exists [if it doesn't exist, you cannot parse and read it]. Webpack then reads the source code, looks for dependency statements like imports, requires, Common JS, AMD syntax, etc... And then Webpack puts object models called dependencies on them. This information is then leveraged to separate everything in the graph into a separate bundle, flatten it, and create it.

## Code Splitting

### Types of Code Splitting

The future of web is mobile, the average mobile website takes 14 seconds to get interactive, loading less code => interactive faster.

In the context of Webpack, when referring to 'dynamic imports', this `import();` is the syntax it refers to. This would allow you to, at runtime, dynamically fetch any piece of JavaScript and use it like a module. There are some issues with this though; you cannot optimize anything that you are doing dynamically, there are some security concerns, and there is no complete browser interoperability on the syntax.

The two types of code splitting are static and "dynamic". Static code splitting is useful to use whenever you have a "heavy" JavaScript library that you need to use, but you might not need it up front, anything temporal (i.e. anything that is not there at load, but can appear at some point... modal, tooltip, dialog box), routes; anytime you have routes set up (especially client-side routes), you can split the code for those routes so the user is only loading the relevant code for the route that they are on.

### Code Splitting Demonstration

Take a look at the following pseudo code for an example of code splitting:

{% highlight javascript %}

import Listener from './listeners.js';

const getModal = () => import('./src/modal.js');

Listener.on('didSomethingToWarrantModalBeingLoaded', () => {
    // Async fetching modal code from a separate chunk
    getModal().then((module) => {
        const modalTarget = document.getElementById('Modal');
        module.initModal(modalTarget);
    });
});

{% endhighlight %}

Walking through the above code, we are first importing `Listener`, then assigning a function that returns a dynamic import statement and a path to a module. Finally, when an event occurs, the above code is returning a promise that will, on promise fulfillment, perform the functionality. In the [Webpack 4 Fundamentals workshop]({% link frontend-masters/webpack-4-fundamentals.md %}) [see the bottom of the page, "Q&A Section"], this was shown when clicking on a button and then loading the footer code. If you are lazy... here's the code example:

{% highlight javascript %}

// from index.js in the workshop repo
//..
const loadFooter = () => import('./footer');
//..

button.addEventListener("click", e => {
    loadFooter().then(m => {
        document.body.appendChild(m.footer) // moved from below
    });
});

{% endhighlight %}

The above is code splitting. Nothing else is code splitting. If the event that triggers the asynchronous dynamic loading of JavaScript is re-triggered, it will not re-fetch the asset, but look into the cache for the code.

### Webpack Code Splitting Under the Hood

[Checkout this branch](https://github.com/TheLarkInn/webpack-workshop-2018/tree/feature/0500-code-splitting-example) and set the mode in the webpack.config.js file to none; i.e. `mode: "none"`, then run `npm run webpack`. In the `dist` folder you should see a couple of bundle files. Take a look at them to get a sense of what Webpack is doing in terms of code splitting under the hood. For my code, since I started this workshop after the Webpack  Fundamentals workshop, there are 2 bundle files in my `dist` folder; `1.bundle.js` and `bundle.js`. Webpack 'cares' about code coverage, so the multiple bundle files are an effort to reduce your code to only what is needed at runtime.

The most important piece of the bundle code is the `__webpack_require__e` function [more details about the function here](https://dev.to/jenhsuan/day-8-of-100daysofcode-the-relationship-between-bundle-chunk-and-modules-for-webpack-3hni).

The basic premise of code splitting it that Webpack creates bundles (based on your code) that handle asynchronous loading of files. And you do not have to control any of the on demand loading, it's part of your code. All you are doing is using that function, using that dynamic import. When anyone talks about code splitting or lazy loading bundles, this is what they are talking about. Now that you have some understanding of code splitting, maybe you can take a look at a website you are working on an check out the code coverage of it and then strategize how to split up the code so that unused code is bundled differently and served only when needed! A lot of the time, the unused code is coming from another library or module.

### Load a Heavy Module Asynchronously

The example here is using GSAP. Immediately, the bundle size increased dramatically and the code coverage dropped significantly. Just by importing GSAP, you are instantly not using about 80% of the library (because it is in the global scope). Lazy loading to the rescue! Just by using a dynamic import, you can immediately remove unused code from being initially loaded at runtime. 

### Code Splitting in Vue, React, & Frameworks

There are some frameworks and libraries that disregarded Webpack as an important tool that people use 😢 and therefore missed the opportunity to make lazy loading a first class citizen for them. Vue (at the time of the workshop) is the only framework that has code splitting built in to it. [React has some documentation about code splitting as well](https://reactjs.org/docs/code-splitting.html).

### Code Splitting Named Exports

As of Webpack 4, code splitting named exports was not supported, there are some ideas around how they could approach it, but the example used was to import a single feature of a utility library i.e. lodash-es

{% highlight javascript %}

const getLodashUniq = () => import("lodash-es/uniq");

{% endhighlight %}

### Vendor Bundles are an Anti Pattern

Optimizing for caching is not the preferred method for saving load time. Pay attention to code coverage for the greatest savings at page load. Only when you get your bundle down to a very small size should you concern yourself with caching.

### Dynamic Code Splitting

Anytime you use an import statement i.e. `import('./thing.js')`, it's always returning a promise and its creating and putting the modules that you dynamically imported into a separate file. "Dynamic" code splitting in Webpack is not truly dynamic. Consider the following code example:

{% highlight javascript %}

const getTheme = (themeName) => import(`./src/themes/${themeName}`);

// Using `import()` 'dynamically'
if (window.feeling.stylish) {
    getTheme("stylish").then((module) => {
        module.applyTheme();
    });
} else if (window.feeling.trendy) {
    getTheme("trendy").then((module) => {
        module.applyTheme();
    });
}

{% endhighlight %}

The above import statement should be familiar, assigning a variable to a function that returns a dynamic import, but in this case the path is not fully static. If you were actually using the above code, you can see that you can actually access global conditions at runtime to choose when to dynamically load something. You can use runtime conditions to choose when to load something lazily. In Webpack terms, this is considered to be a `Context Module`. The above code would tell Webpack to find all of the modules that are in the partial path `./src/themes/` and create a bundle for each of them. Ultimately, there is no real dynamic code splitting happening because all of the assets will be produced as static assets at build time, but you can dynamically serve them. Potential use cases include; A/B Testing, Theming, and Convenience.

### Dynamic Code Splitting Walkthrough

## Module Methods & Magic Comments

### Introducing Magic Comments

### Webpack Modes

### Webpack Prefetch & Preload

### Wrapping Up Code Splitting

### Webpack Config Organization

### Building Your Library with Webpack