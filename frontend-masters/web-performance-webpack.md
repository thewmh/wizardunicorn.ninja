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

Walking through the above code, we are first importing `Listener`, then assigning a function that returns a dynamic import statement and a path to a module. Finally, when an event occurs, the above code is returning a promise that will, on promise fulfillment, perform the functionality. In the [Webpack 4 Fundamentals workshop](https://wizardunicorn.ninja/frontend-masters/webpack-4-fundamentals) [see the bottom of the page, "Q&A Section"], this was shown when clicking on a button and then loading the footer code. 

### Webpack Code Splitting Under the Hood

### Load a Heave Module Asynchronously

### Code Splitting in Vue, React, & Frameworks

### Code Splitting Named Exports

### Vendor Bundles are an Anti Pattern

### Dynamic Code Splitting

### Dynamic Code Splitting Walkthrough

## Module Methods & Magic Comments

### Introducing Magic Comments

### Webpack Modes

### Webpack Prefetch & Preload

### Wrapping Up Code Splitting

### Webpack Config Organization

### Building Your Library with Webpack