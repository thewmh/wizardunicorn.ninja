---
title: "Webpack Plugins System"
description: These are notes from the 'Webpack Plugins System' course on Frontend Masters.
permalink: /frontend-masters/webpack-plugins-system

layout: page
---

[Slide Deck for this workshop](https://docs.google.com/presentation/d/1P5f-cK4jlhGQIfPQ_vaYFRWV464kBb5UaUBkfRjBp4Y/edit)

## Plugin System

### Tapable Plugin System

All of Webpack is made of plugins! And to really understand this it helps to understand what the architecture is and what you can plug into. But what is Tapable? It was originally a ~200 line plugin library, but it was rewritten for Webpack 4. Tapable is the entire backbone of Webpack. Tapable is Webpack's plugin system. It is how plugins are written and registered, it's how Webpack adds any functionality that you could ever think of.

A Tapable instance is a class / object that extends Tapable AKA something you can plug into! You can extend, modify, or change behavior.

### Compiler & Compilation

There are 7(ish) Tapable instances AKA classes that you can tap into in Webpack. You can find the files for these in the Webpack `node_modules` folder, each instance will have a file that matches it's name; i.e. compiler instance `Compiler.js`

The first one is the `compiler`. The `compiler` is like central dispatch for Webpack. The hooks for `compiler` are very top-level, they control when Webpack starts, when Webpack is finished bundling, when Webpack is about to emit assets, before Webpack compiles, when Webpack is in watch mode, etc. To access any other [Tapable] instance, you have to go through the `compiler`.

The second [Tapable] instance is `compilation` AKA the dependency graph. The `compilation` instance is probably the most complicated instance in Webpack, being the heart of everything that happens in Webpack. The `compilation` instance is where Webpack builds, seals, and renders the dependency graph.

### Resolver & Module Factories

The `resolver` instance is used to resolve partial paths and make sure they exist, then give you the full path. An example of this is when you are using a `require` statement. The `resolver` instance will look at the `require` statement, find the file and return the 'full' request object with its path, context, request, and results defined. This information is then used to provide other parts of Webpack that need this information. The `resolver` instance is in the `node_modules` folder under `enhanced-resolver` because Webpack. Actually, Webpack chose to bundle the `enhanced-resolver` as a separate package so you could use it even if you aren't (God forbid) using Webpack.

The `module factories` instance creates module instances in Webpack. The `module factories` (there are 2) take successfully resolved requests (all the information that the resolver provides) and collects the source code for that file, creating a module object.

### Parser & Templates

The `parser` instance takes strings of source code and turns them into Abstract Syntax Trees. Webpack uses Acorn as their syntax parser by default [go to astexlporer.net to see an AST](https://astexplorer.net/). Webpack uses the output from the `parser` instance to understand exactly what code looks like and how it works. The `parser` takes a module object, turns it into an AST to parse, finds all `require` and `import` statements and creates dependencies. The dependency objects are then attached to the module object.

The last Tapable instance is `template`. Templates take care of data binding for your module objects. Templates create the code you see in your bundles. In Webpack, a `chunk` is something that contains modules in an array, which allows Webpack to keep track of it. Each type of abstraction, a chunk, a module, a dependency, they all have templates. They are literally called; chunk template, module template, dependency template. This is for the runtime code. The main template generates the runtime, the chunk template generates the array brackets for each module, and the module template creates the IFFEs for each module around the function. The dependency template transforms the dependences into a `__webpack_require__` or dynamic import into a `__webpack_require__.e`, or whatever the appropriate transformation is for them.

### Compiler Walkthrough

Pass the configuration to Webpack, it consumes it and reads the entry property. Not knowing whether that entry exists, Webpack goes through the module factory, which calls the resolver and asks if it exists. The resolver searches, if it finds it returns the full path information and some other context and useful data and passes it back to the module factory. The module factory creates an object, collects the source information, and now Webpack has the source for the module. Then, Webpack takes that source and parses it into an AST. It walks through the graph looking for dependency statements, and as it finds them, it attaches them to the module. To resolve the dependency paths, each dependency is passed to the resolver. This process is repeated until there are no more dependencies to be resolved. That is the entirety of Webpack, how it  creates the graph. If there are loaders, they will functionally transform the files until they are JavaScript and then it parses and goes through the exact same process.

Here's the same process, but outlined a little differently:

**How a Module gets to the browser with Webpack**

Module: "Hi! I'm a module!! I can't wait to work in the browser!

Compilation: "Whoa there!! Cool your jets, we need to get you into shape before you are ready for the 'Big Stage'!!"

Compilation: "First, I'll need you to jump in this container called a `chunk`, I'll be throwing a lot of `plugins` at you and I don't want to lose track of you."

Compilation: "Almost there, but we have a problem! Those require and import statements have to go!! The `parser` gave me special instructions for 'rendering' those dependencies you have!! Dependency Templates & Dependency Factory"

Module: "I'm finally rendered!! Here I come browserland, I'm so ready!"

This is literally how Webpack works in its entirety.

Build the graph, optimize the graph, render the graph.

### Plugin System Code Walkthrough

All of Webpack's CLIs use the Node API. There are hundreds of properties that Webpack default to out of the box (see `WebpackOptionsDefaulter.js`). In that same file, is where the `modes` are implemented. In `WebpackOptionsApply.js` the config and compiler instance are taken and are run in what is basically a giant `switch` statement which is looking for different properties in the config and determining which set of templates to run it against. In this same file is where the entry option is triggered `compiler.hooks.entryOption.call(options.context, options.entry);`, see `EntryOptionPlugin.js`. In the `parser` instance, Webpack emits an event for every type of variable from the AST. Webpack literally has plugins for every individual type of statement that exists in  Webpack, so events are firing in the thousands, tens of thousands, and hundreds of thousands because for every piece of the AST it is going to fire an event.

The best way of learning how to write Webpack plugins is to look at their source code.

## Creating Plugins

### Creating a Webpack Plugin

In its most basic form, a plugin is just a class that has an apply method. Continuing in the repo from the [Webpack 4 Fundamentals workshop]({%- link frontend-masters/webpack-4-fundamentals.md -%}) or if you are only reading this document, [grab the repo here](https://github.com/TheLarkInn/webpack-workshop-2018/tree/feature/0504-webpack-prefetch-preload), create a new file in the `build-utils` folder called `MyFirstWebpackPlugin.js` (`...WebpackPlugin...` is a naming convention that Webpack follows). In that `MyFirstWebpackPlugin.js` file, add the following: 

{%- highlight javascript -%}

class MyFirstWebpackPlugin {
    apply(compiler) { 
        compiler.hooks.done.tapAsync("MyFirstWebpackPlugin", (stats, callback) => {
            // check out the node_modules/webpack/lib/Compiler.js file for a complete list of hooks
            // tapAsync is the API for tapping in, the first argument should be the name of your plugin, then stats (the object we want to look at), and a callback which is required because it is async
            const assetNames = [];
            for (let assetName in stats.compilation.assets) {
                assetNames.push(assetName);
            }
            console.log(assetNames.join("\n"));
            callback(); // if you don't callback, Webpack won't run
        })
    }
}

module.exports = MyFirstWebpackPlugin;

{%- endhighlight -%}

And in your `webpack.config.js` file add:

{%- highlight javascript -%}

//..
const MyFirstWebpackPlugin = require('./build-utils/MyFirstWebpackPlugin');
//...
plugins: [
    new MyFirstWebpackPlugin()
]
//...

{%- endhighlight -%}

Now when you run `npm run prod`, in addition to the standard Webpack terminal logs, you should see the names of your assets output (somewhere) in the terminal. Try just logging stats and check out the object it returns, it contains all of the information about your build.

### Plugin Instance Hooks

Let's look at how to plug in to something that is not the compiler! If you want to plug in to a different instance, you still have to go through the compiler. In `MyFirstWebpackPlugin.js` update your code like so:

{%- highlight javascript -%}

class MyFirstWebpackPlugin {
    apply(compiler) { 
        compiler.hooks.done.tapAsync("MyFirstWebpackPlugin", (stats, callback) => {
            // check out the node_modules/webpack/lib/Compiler.js file for a complete list of hooks
            // tapAsync is the API for tapping in, the first argument should be the name of your plugin, then stats (the object we want to look at), and a callback which is required because it is async
            const assetNames = [];
            for (let assetName in stats.compilation.assets) {
                assetNames.push(assetName);
            }
            console.log(assetNames.join("\n"));
            callback(); // if you don't callback, Webpack won't run
        });

        compiler.hooks.compilation.tap("MyFirstWebpackPlugin", (compilation, params) => { // the compilation hook is synchronous
        const ThisCompilation = compilation;
            compilation.hooks.seal.tap("MyFirstWebpackPlugin", () => {
                console.log(ThisCompilation);
            });
        });
    }
}

module.exports = MyFirstWebpackPlugin;

{%- endhighlight -%}

For more details about the available hooks see the [Webpack Plugin API Documentation](https://webpack.js.org/api/plugins/). Loaders are also applied with a plugin... `LoaderPlugin.js`

### Isolating Plugins

Here is some information about how Webpack abstracts things in their source code. Because everything in Webpack is so decoupled and abstracted, you could take anything, like a MongoDB database, or some online service database and as long as you implement the right adapter, so that it works like [fs](https://nodejs.org/api/fs.html), you could hook into the compiler and set `compiler.inputFileSystem` and `compiler.outputFileSystem` to these values. Technically, because Webpack's resolver is in a separate package, if you felt the motivation to write an entirely separate resolver, you could.

The most basic explanation of how to make a Webpack plugin is to hook into a bunch of [Webpack] hooks. Webpack isolates the feature sets for each plugin. If they no longer wanted to support CommonJS, they could just remove the `CommonJsPlugin.js` file from their repo and they would no longer support CommonJS. 

## Config, Loaders, & Babel

### Creating a Custom Loader

To write a custom loader and develop it locally, you just need a couple of pieces. One of the pieces is a property called `resolveLoader`, the properties of which are identical to the `resolve` property. Any custom behavior that you want to apply to resolving modules, you can do the same thing for your loaders. A simple JS loader (filename: `webpack.myloader.js`) would look something like this:

{%- highlight javascript -%}

module.exports = () => ({
    resolveLoader: {
        alias: {
            "my-loader": require.resolve("./build-utils/my-loader.js")
        }
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: "my-loader"
            }
        ]
    }
})

{%- endhighlight -%}

Now you actually have to build the loader... make a new file, following the path above `my-loader.js`, and insert the following:

{%- highlight javascript -%}

function myLoader(source) { // this is the basic anatomy of a loader. It takes a function which requires the `source` argument, then returns the `source`
    return source;
}

module.exports = myLoader;

{%- endhighlight -%}

There is a ton of additional information about the [loader API in the Webpack documentation](https://webpack.js.org/api/loaders).

### Configuring Babel for Webpack

Since Webpack 2, Webpack has supported ES Modules out-of-the-box. A common pitfall is that people will have presets like Babel preset 2015, which by default compiles ES Modules into CommonJS syntax. This is a problem, because you are effectively opting out of every Webpack optimization. Webpack will not scope-hoist, tree-shake, or do much of anything with CommonJS Modules. In terms of supported syntax, Webpack is able to support any syntax that Acorn has adopted (generally stage 4 syntax). When in doubt, check the Acorn documentation. 

### Webpack Dev Kit & Wrap Up

One additional resource that is useful is the [Webpack Developer Kit](https://github.com/TheLarkinn/webpack-developer-kit). The Webpack Developer Kit was created by the instructor (Sean Larkin) and is a tool to develop plugins and loaders. Clone it, fork it, use it!