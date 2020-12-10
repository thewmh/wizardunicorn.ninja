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

For this example, first make sure your `index.js` file looks like this:

{% highlight javascript %}

const getFooter = () => import("./footer");
import makeButton from "./button";
import { makeColorStyle } from "./button-styles";
import "./footer.scss";
const setButtonStyle = (color) => import(`./button-styles/${color}`);
const button = makeButton('I am a button');
button.style = makeColorStyle("cyan");

document.body.appendChild(button);

button.addEventListener("click", e => {
    getFooter().then(module => {
        document.body.appendChild(module.footer);
    });

    setButtonStyle("red").then(styleStr => {
        button.style = styleStr.default;
    });
});

{% endhighlight %}

And your `button.js` file looks like this:

{% highlight javascript %}

const makeButton = buttonName => {
  const buttonLabel =  `Button: ${buttonName}`;

  const button = document.createElement("button");
  button.innerText = buttonLabel;

  return button;
};

module.exports = makeButton;

{% endhighlight %}

Once your files match the above, make a new folder in your `src` directory named `button-styles`. In the `button-styles` folder add `red.js blue.js green.js yellow.js` files. Each of those files should look like this:

{% highlight javascript %}

export default "color: colorFromFileName;" // i.e. blue.js would be "color: blue;"

{% endhighlight %}

If you now run `npm run dev`, you should find new bundle files, 1 for each file in the `button-styles` folder, output in the `dist` folder. Following the button example, try to think of some other examples where you might want to structure your components so that the code for them is only downloaded when needed, perhaps based on an event trigger? If you had additional files in the `button-styles` folder, that maybe you did not want to include, you can specify in the `index.js` file (or wherever you have defined the import) that you only want that specific file type by adding the extension i.e. `...import(`./button-styles/${color}.js`)`.

## Module Methods & Magic Comments

### Introducing Magic Comments

When you are using code splitting as a technique, there is no name that is created when you add the bundle. This is because it is not an entry-point so it cannot be given an assigned name. When you look at the `dist` folder after a build, you will find a number of bundles there, but they are not named in a way that is immediately understandable. Enter [Magic Comments](https://webpack.js.org/api/module-methods/#magic-comments)! One of the things that Magic Comments allow you to do is name your bundles. This could prove valuable when you are debugging or if you are trying to keep track of which files generate their own bundles. In `index.js` add a `webpackChunkName` to the footer import:

{% highlight javascript %}

const getFooter = () => import(/* webpackChunkName: "footer" */"./footer");

{% endhighlight %}

To get the name to appear as part of the bundle name, update the `webpack.config.js` file like so:

{% highlight javascript %}

//...

output: {
        filename: "bundle.js",
        chunkFilename: "[name].lazy-chunk.js" // you can just use [name], the instructor prefers to add the .lazy-chunk
    },

//...

{% endhighlight %}

This may be useful to include as part of a base configuration, depending on your requirements maybe only the dev configuration?

### Webpack Modes

Also a part of Magic Comments is a feature called `webpackMode`. With this you can further control how code splitting happens, with four different settings. In the instance of the button styles, `/* webpaackMode: "lazy-once" */` would generate a single bundle, which can save build time. Pushing this further and continuing to define different build configurations, you could add this to the `index.js` file:

{% highlight javascript %}

if(process.env.NODE_ENV === "development") {
    const setButtonStyle = (color) => import(/* webpackMode: "lazy-once" */ `./button-styles/${color}`);
} else {
    const setButtonStyle = (color) => import(`./button-styles/${color}`);
}

{% endhighlight %}

Webpack, by default, injects a macro replacement to the `process.ev.NODE_ENV` variable. When you set the mode to `development`, the macro converts to development and by default, Webpack can convert the above code and evaluate the if/else statement. You probably care less about performance optimizations in your dev code, but while in dev would like faster build times, this is useful for that.

### Webpack Prefetch & Preload

*Insert shameless plug to subscribe to the Webpack Medium account and [this article](https://medium.com/webpack/link-rel-prefetch-preload-in-webpack-51a52358f84c)*

One of the trade-offs when code splitting is either having a smaller initial download or having additional network requests, both have their performance trade-offs. Two additional Webpack Magic Comments are `/* webpackPrefetch /*` and `/* webpackPreload /*` both of which use `<link rel"pre[fetch/load]">` respectively. [More info about prefetch and preload in the Webpack documentation](https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules) Similar to the previous Magic Comments, try adding a `/* webpackPrefetch /*` or `/* webpackPreload /*` to one of the 'lazy loaded' bundles. Run `npm run dev` again and when you look at the source code on your dev server, you should see a `<link>` with `rel="preload"` or `rel="prefetch"` depending on which one you chose. 

### Wrapping Up Code Splitting

As a topic for this workshop, code splitting has been exhausted. Nothing more to see here. But... Code splitting literally exists to solve the issue of load time as it relates to how much JavaScript you ship with the initial experience.

### Webpack Config Organization

The Webpack config organization has already been discussed / built in the [Webpack 4 Fundamentals workshop]({% link frontend-masters/webpack/webpack-4-fundamentals.md %}), with something like:

{% highlight javascript %}

- build-utils
    - presets
        webpack.analyze.js
        webpack.compress.js
    loadPresets.js
    webpack.development.js
    webpack.production.js
- dist
- node_modules
- src
.gitignore
LICENSE
package.json
README.md
TODO.md
webpack.config.js

{% endhighlight %}

The idea with presets is not that you only test out a single piece of functionality, like analyze or compress, but that you can build out entire sets of isolated functionality that allows you to experiment, test, or any other reason that you can just add on with a flag or add on with an extra script. The above configuration is enough to get started with the most complex piece of it being the `loadPresets.js` file, which is basically just flattening presets and making sure that if there is not a preset that it doesn't fail. Best practice is, don't hide your Webpack config, keep it at the root level of your project.

### Building Your Library with Webpack

Q: Should you build your library with Webpack?

A: The only time you should consider it is if you were going to ship something that could be loaded with a script tag, like a UMD (Universal Module Definition) bundle. If you yourself are using Webpack don't use anything else that has been built with Webpack. You lose out on being able to tree shake, scope hoist, or any of the other optimizations.