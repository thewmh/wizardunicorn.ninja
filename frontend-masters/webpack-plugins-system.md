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

The `parser` instance takes strings of source code and turns them into Abstract Syntax Trees. Webpack uses Acorn as their syntax parser by default [check out  astexlporer.net for more in for on ASTs](https://astexplorer.net/). Webpack uses the output from the `parser` instance to understand exactly what code looks like and how it works. The `parser` takes a module object, turns it into an AST to parse, finds all `require` and `import` statements and creates dependencies. The dependency objects are then attached to the module object.

The last Tapable instance is `template`. Templates take care of data binding for your module objects. Templates create the code you see in your bundles. In Webpack, a `chunk` is something that contains modules in an array, which allows Webpack to keep track of it. Each type of abstraction, a chunk, a module, a dependency, they all have templates. They are literally called; chunk template, module template, dependency template. This is for the runtime code. The main template generates the runtime, the chunk template generates the array brackets for each module, and the module template creates the IFFEs for each module around the function. The dependency template transforms the dependences into a `__webpack_require__` or dynamic import into a `__webpack_require__.e`, or whatever the appropriate transformation is for them.

### Compiler Walkthrough

### Plugin System Code Walkthrough

## Creating Plugins

### Creating a Webpack Plugin

### Plugin Instance Hooks

### Isolating Plugins

## Config, Loaders, & Babel

### Creating a Custom Loader

### Configuring Babel for Webpack

### Webpack Dev Kit & Wrap Up