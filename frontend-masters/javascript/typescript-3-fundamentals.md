---
title: "TypeScript 3 Fundamentals, v2"
description: These are notes from the 'TypeScript 3 Fundamentals, v2' course on Frontend Masters.
permalink: /frontend-masters/typescript-3-fundamentals

layout: default
pagenav:
  - name: Introduction
    href: introduction
  - name: TypeScript Basics
    href: typescript-basics
  - name: Interfaces & Type Aliases
    href: interfaces--type-aliases
  - name: Classes
    href: classes
  - name: Converting to TypeScript
    href: converting-to-typescript
  - name: Generics
    href: generics
  - name: Top & Bottom Types
    href: top--bottom-types
  - name: Advanced Types
    href: advanced-types
  - name: Declaration Merging
    href: declaration-merging
  - name: Compiler API
    href: compiler-api
---

[Link to the workshop repository](https://github.com/mike-works/typescript-fundamentals/tree/master)
[Link to the workshop slides (presentation)](https://drive.google.com/file/d/170oHzpLNeprUa-TMmOAnSU4caEFDSb3e/view)

Have TypeScript installed ? Continue to workshop : `npm install typescript -g`

## Introduction

### Introduction

Our instructor for this workshop, Mike North, leads workshops at LinkedIn. He is also a tech lead on the frontend stack with a focus on TypeScript adoption. Great, but what is [TypeScript](https://www.typescriptlang.org)?

* An open-source `typed`, `syntactic superset` of JavaScript, developed by **Microsoft**
* Compiles to readable JavaScript
* Comes in three parts: `Language`, `Language Server`, and `Compiler`
* Works seamlessly with `Babel 7`

The types in TypeScript 'disappear' in the final compiled JavaScript, so you can think of TypeScript as a static analysis tool that does a lot of checking on your codebase. This is good in some ways, bad in others. Good because there is no 'cost' at runtime, bad because a fetched data response or user input will have no type-checking. You can think of TypeScript as a 'fancy' linter or other static analysis tool that verifies everything looks good, but does not produce any output.

Since the original edition of this workshop in 2017, there has been a +300% increase in TypeScript downloads, tying TypeScript's downloads and prevalence of use with that of React. 

### Rationale

...why add types?

* To encode constraints and assumptions, as part of developer intent
* Catch common mistakes (i.e. incomplete refactors)
* Move some runtime errors to compile time
* Provide your consumers (including you) with a great DX (Developer Experience)

### Course Overview

We're about to learn about:

* Adding type information to variables, functions, and classes
* Configuring the compiler
* A practical strategy for incrementally converting JS to TS
* Parameterizing interfaces and type aliases with generics
* Conditional, mapped, and branded types
* TS Compiler API Basics

While we will not be covering every single facet of TypeScript and its capabilities, our instructors goal is to leave us with a great mental model of how to think about TypeScript. Configuring the compiler is important because it can be the difference between shrinking code by 70%, i.e. if we were building for IE6, the code would be much larger because there are less features available in that browser. In the compiler you can also set how strict the rules are. We'll also get a peek under the 'hood' of TypeScript and gain an understanding of how TypeScript understands our code and how it splits it apart and represents our code in data structures.

⚠ from here forward, the workshop will be working from the repository listed at the top of these notes. If you would like to follow along, and get the most out of the workshop, clone the repository and follow the installation instructions before proceeding ⚠️

### Flags

Right... Hopefully you've read the little warning note above. If not, go read it now, we're waiting...

Now that you have the repository cloned and dependencies installed, take a look at `./examples/hello-ts/` because we are going to learn how to use the TypeScript compiler to turn TypeScript into JavaScript. Open up the `index.ts` file from the path just mentioned `./examples/hello-ts/src/index.ts`. In that file, you will see a couple of functions and then a 'program' that runs the functions. If for whatever reason you've refused to grab the repository or for some reason cannot, here's the code from that file:

{% highlight javascript %}

/**
 * Create a promise that resolves after some time
 * @param n number of milliseconds before promise resolves
 */
function timeout(n: number) {
  return new Promise(res => setTimeout(res, n));
}

/**
 * Add three numbers
 * @param a first number
 * @param b second
 */
export async function addNumbers(a: number, b: number) {
  await timeout(500);
  return a + b;
}

//== Run the program ==//
(async () => {
  console.log(await addNumbers(3, 4));
})();

{% endhighlight %}

The above code is pretty basic; there's a promise that is basically a `setTimeout` wrapped in a promise, a function that adds two numbers, and the 'run the program' function. The instructor explains that this was chosen because it is using some modern syntax that is not supported by all browsers, and we should like to see some different ways of compiling the code to support whatever browsers we need. It is important that you are using VS Code for this workshop as it is the editor that is more or less built hand-in-hand with TypeScript. In the terminal, change directories to the example project `cd examples/hello-ts/`. Then we should run the TypeScript compiler on the `index.ts` file by typing `tsc src/index.ts` in the terminal. You should now have a file `index.js` in the `src` folder. Take a look at them side by side!

You may notice that the file from the TypeScript compiler is significantly larger and hard to decipher, this is ES3 JavaScript! It will work in IE6, this is the default. By default the TypeScript compiler builds JavaScript that you can run basically anywhere. We can add a flag to the compiler command that will allow us to control the level at which the code is compiled, try:

`tsc src/index.ts --target ES2015`

You should see pretty immediately that the amount of code has been dramatically reduced. There is still some (extra) code that is there for compatibility reasons, but now you will see `Promise` remains as that is a part of ES6 / ES2015. You might also take not of the fact that async/await are non-existent as they were not a part of JavaScript at ES2015. Now try:

`tsc src/index.ts --target ES2017`

Boom! async / await are back! The only difference now between the `index.ts` and `index.js` files *should be* the parameter typing, i.e. `a: number` is just `a`. Try running the `index.js` file with node: `node src/index.js` — this should result in an error: `SyntaxError: Unexpected token exoprt` The reason for this is how node uses exports. The correct syntax should be `module.exports` not `export`. Node uses commonjs modules. To fix this issue, lets add another flag to the TypeScript compile command:

`tsc src/index.ts --target ES2017 --module commonjs`

You will see the `index.js` file from the compiler has been updated yet again. This time you can run `node src/index.js` and, after 500 milliseconds, you will see 7 print out in the console! If you add the 'watch' flag, the TypeScript compiler will continue to watch for changes in the source files, compiling them again whenever there are changes made:

`tsc src/index.ts --target ES2017 --module commonjs --watch`

### Configuring TypeScript

Having learned some flags and compiler commands is great, but do we have to type all that every time? Nope! Let's get a configuration file set up! In the `hello-ts` folder, create a file called `tsconfig.json`. We'll look at how to set that config file up in a moment. There are 2 things that you need to think about when configuring the compiler; First is defining which files are the inputs. You can do that by specifying a list of files, i.e. `"files": []` OR `"include": []` (which allows you to include files using 'globs' `*.ts`). The second to consider when setting up your config file is the compiler options, what are they? Well, the compiler options are basically the flags we saw in the last section but in a `"compilerOptions"` object in the `tsconfig.json` file. And if you are being a good person and are using VS Code as you've been asked to, you will get some helper text / suggestions for setting this file up! Once your config file is set up, you can simply run `tsc` and see the file(s) output according to your configuration file! Here's what we ended up with for the `tsconfig.json`:

{% highlight javascript %}

{
  "compilerOptions": {
    "module": "commonjs", // this was previously a flag
    "target": "es2017", // this was previously a flag
    "outDir": "lib" // this is a new directory where we want our files to be output (TypeScript will make it for us, no need to create this directory ourselves)
  },
  "include": ["src"] // what files to include when compiling
}

{% endhighlight %}

Now, with your new `tsconfig.json` file, you can type `tsc` in the terminal and you should now see a `lib` directory with `index.js` inside of it! 🔥

Now we could push all this up to source control and deploy only our `lib` directory, which is great, but the `index.js` output file contains a lot of 'type' stuff that is maybe no longer relevant? Let's add a couple more options to the `"compilerOptions"` object in the `tsconfig.json` file:

{% highlight javascript %}

{
  "compilerOptions": {
    ...
    "declaration": true,
    "sourceMap": true,
  },
  "include": ["src"] // what files to include when compiling
}

{% endhighlight %}

Run the compiler again, `tsc`, and you should see a couple of new files pop up in the output directory `lib`. One of the files is `index.d.ts`, if you look at it, kind of looks like a function with no implementation. It is actually a type declaration file that is intended to layer on top of the JavaScript that it represents. If you are using a TypeScript aware code editor :cough:cough: VS Code :cough:cough: it will read this file and understand that this file is intended to be matched with your JavaScript and that the types declared within are meant to go along with the JavaScript code.

The other (new) file is a sourcemap `index.js.map` which would allow us, if there were breakpoints in the code, map us back to the original TypeScript source. This gives the developer experience of debugging through TypeScript code when in fact that is not what is running, because what actually runs is JavaScript. Here is a more complex configuration to look at:

{% highlight javascript %}

{
  "compilerOptions": {
    "jsx": "react", // transforms JSX
    "strict": true, // Enable "strict" features
    "sourceMap": true,
    "noImplicitAny": true, // forbid implicit any - ensures type safety
    "strictNullChecks": true,
    "allowJs": true, // check and compile JS
    "types": [],
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "moduleResolution": "node",
    "target": "es2015" // target environment
  }
}

{% endhighlight %}

Q: How would your config look if you wanted to support IE11? Or no IE? (Using Babel)

A: Have TypeScript emit very modern JavaScript and have Babel take it (the compilation) the rest of the way. You can leave your `"target"` as `"ESNext"`, and in the Babel configuration define whatever browsers you want/need to support.

## TypeScript Basics

### Variables



### Variable Declarations



### Arrays & Tuples



### Object Types & Interfaces



### Intersection & Union Types



### Type Systems & Object Shapes



### Functions



### Function Signature Overloading



### Lexical Scope



## Interfaces & Type Aliases

### Type Aliases & extends



### Call & Construct Signatures



### Dictionary Objects & Index Signatures



### Combining Interfaces



### Type Tests

## Classes

### Classes



### Access Modifiers & Initialization



### Definite Assignment & Lazy Initialization



### Abstract Classes

## Converting to TypeScript

### Converting to TypeScript



### Compiling in "loose mode"



### Making Anys Explicit



### Strict Mode



### Address Book Exercise



### Address Book Solution



## Generics

### Generics



### Type Parameters



### Constraints & Scope



### Use Cases



### Dictionary Exercise



### Dictionary Solution



## Top & Bottom Types

### Top Types



### Type Guards



### Unknowns & Branded Types



### Bottom Types



## Advanced Types

### Mapped & Conditional Types, & Type Queries



### Built-In Utility Types



## Declaration Merging

### Declaration Merging



## Compiler API

### Initializing



### Type-Checker


### Wrapping Up
