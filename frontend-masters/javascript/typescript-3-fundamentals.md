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

We made it through some basic configuration! Let's jump in to how to add types to modern JavaScript. We're about to cover:

* (Simple) Variables
* Arrays & Tuples - Ordered Data Structures (tuples are as specific kind of array)
* Objects
* Union & Intersection Types - The equivalent of AND / OR operators

If you are following along with the repository code and VS Code, head on over to `./notes/1-basics.ts`. In there, you can hover over many different things and VS Code will give feedback about what is going on. I'm not going to post all of the code here, but basically, uncomment the various lines where there is code, then hover over the declarations and see what the code editor has to say about them. Here is one example:

{% highlight javascript %}

/**
 * (1) x is a string, b/c we’ve initialized it
 */
// let x = "hello world"; // uncomment this line and hover over the 'x'

{% endhighlight %}

In the example above, when you uncomment the line of code and hover over the 'x', you will see `(1) x is a string, b/c we’ve initialized it`. In TypeScript, you do not have to explicitly assign a 'type' to everything. By assigning a value to a variable at declaration, a 'type' is inferred. It is in fact considered bad practice to assign a 'type' to every single thing because you then make your program extremely rigid, which is not good.

Moving along... you can reassign the value of 'x' to another string, this causes no issues. But trying to reassign 'x' to anything other than a string will throw an error. TypeScript does not like that. Next up is dealing with `const`. Assigning a value to a variable declared with `const` will give that variable the 'type' of whatever value it has been assigned. In the example, `const y = "hello world";`, the 'type' of `y` is 'hello world'. This is known as a 'literal type', meaning that you are enumerating a specified value rather than a type.

Q: When the code editor shows a tooltip, is that a feature of the code editors compatibility with TypeScript or is it a feature of TypeScript's compatibility with JSDoc?

A: Kind of both. TypeScript can understand the comments and the language server is pushing that comment data up to us.

With a `const` variable that is an object with properties, you can reassign the value of any property as long as the 'type' matches. i.e. you could have something like this:

{% highlight javascript %}

const obj = {
  foo: 'hello'
};

obj.foo = 'good bye';

{% endhighlight %}

### Variable Declarations

Still in the `./notes/1-basics.ts` file, we're going to look at separating variable declarations and initializations (starting at line 32). A scenario where this could pop up is when the value of the variable may need to change according to a set of conditions; switch/case statement anyone? If you uncomment lines 35-37, then hover over the `z` on line 35, you will see that the 'z' has a type of any. This literally means that 'z' can take any value. This behavior is exactly like JavaScript, but kind of misses the point of using TypeScript. There are places where the 'any' type is valid to be used, and your goal is not to purge 'any' from your app, but to be certain that where it exists that you do in fact want to allow it to be 'any'.

To avoid a variable declaration that has not been assigned a value being assigned the type of 'any', when you declare the variable, specify a type:

{% highlight javascript %}

let z: number;
z = 41;
z = 'string'; // this will throw an error

{% endhighlight %}

In the above example, `let z: number;` the `: number;` is what is known as a type annotation. The type annotation for a variable that has been declared but is unassigned will tell TypeScript what it is 'designed' to hold, in the above example, a number. The point is that if you have variable declarations that are not assigned a value, it is best to annotate them with a type.

Q: In the TypeScript documentation, they usually have type annotation even when a variable is initialized with a value. Is this the recommended way, is it necessary?

A: It is recommended to do it that way if you are writing docs, because you are being very descriptive in documentation. If you have a variable with an initializer, you do not need to provide a type annotation. We'll be very clear throughout the workshop the places where type information is absolutely necessary. This is a way of setting deliberate boundaries around pieces of code. 

### Arrays & Tuples

Starting at line 51 in `./notes/1-basics.ts`, let's look at typing arrays in TypeScript. Consider the following:

{% highlight javascript %}

let aa: number[] = [];
aa.push(33);
aa.push("abc"); // error!

{% endhighlight %}

The array has been defined to be an array of numbers, pushing a number to that array is fine, pushing anything other than a number is not fine. If you remove `: number[]` from the variable declaration, we get a new error. Try it, then hover over the 'aa', you should see the `never` type next to the array brackets; `never[]`. TypeScript has prevented us from using this declaration at all 😞, which may be a good thing because we probably do not want an array of anythings. For array declarations that start out as empty, you do need to have a type annotation; `: number[]` for example. If you place a value in the array, TypeScript will be able to infer what type of value is allowed in the array.

Now on lines 64-69 we are looking at tuples (Mike says tup-els, I've heard toop-els as well for pronunciations). Either way you say it, tuples are just a special type of array that have a fixed length:

{% highlight javascript %}

let bb: [number, string, string, number] = [
  123,
  "Fake Street",
  "Nowhere, USA",
  10110
];

bb = [1, 2, 3]; // error bb[1] and bb[2] are set above to be type string

{% endhighlight %}

One issue in the code block above is that you can actually use `.push` and get around the typing that has been defined. In general, array methods are not type-safe. There is actually no way to safely 'type' `.push`, it would require watching the type signature of the array and change the type check based on the state of the array. The only way to get a valid type check with tuples is to set everything at once which can then be checked as a whole.

Q: If you did want to have an array that can be either a number or a string, how would you go about doing that?

A: `(string | number)[]`

When creating tuples, things of fixed length i.e. a pair of numbers in an array, you are always going to specify the type you want and in the format you want; i.e. `const y: [number, number] = [1, 2];`

### Object Types & Interfaces

Object typing looks similar to object key/value pairs, but is instead key/type pairs. By default all object properties are mandatory. If you would like to make something in an object optional, you can use the optional operator (?) to do so. `let myObj: { key1: number; key2?: string };` If you want to re-use a type, you can create an 'interface' for it:

{% highlight javascript %}

interface Address {
  houseNum: number;
  streetName?: string;
}

let myThing: Address = { houseNum: 00 };

{% endhighlight %}

We'll cover interface more later. 

### Intersection & Union Types

Intersection Types - `./notes/1-basics.ts` lines 120 - 141

At the section in the file listed above, there have been two types of interfaces created, `HasPhoneNumber` & `HasEmail`. The interfaces share the `name` property, then have a phone or email property respectively. Lines 132 - 143 is going to 'randomly' initialize the `contactInfo` object where it will be set as either `HasEmail` or `HasPhoneNumber` depending on the outcome of `Math.random()`. Once the function 'sets up' the `contactInfo` variable, only the `.name` property is accessible, because that is the only property that is guaranteed to be there.

Union Types - `./notes/1-basics.ts` lines 150 - 160

Union types use the `&` operator to define a variable who's shape contains all of the properties of whatever is included between the objects declared. `let otherContactInfo: HasEmail & HasPhoneNumber` would require `otherContactInfo` to have a name, phone, and email property. Unlike the Intersection type, Union guarantees that the result will have all of the properties and they are therefore all accessible. 

### Type Systems & Object Shapes

Type Systems come down to the idea of Type Equivalence. We've already seen this when looking at some of the error messages. In nominal type systems, Java and many others, type equivalence is determined based on whether an input to a function is an instance of a class/type named the same as its definition; i.e.:

{% highlight javascript %}

function validateInputField(input: HTMLInputElement) {
  <!--  -->
}

validateInputField(x); // the nominal type system will check whether 'x' can be regarded as 'HTMLInputElement'

{% endhighlight %}

Nominal Type Systems require your code to be set up in an Object Oriented way, where you have constructors and you are dealing primarily with instances of classes. JavaScript code is not necessarily written this way. TypeScript is a Structural Type System which only cares about the shape of an object. Shape? Yes, shape refers to the names of properties and types of their values. Not only is shape and keeping it consistent important to TypeScript, but in JavaScript, avoiding introducing new properties to objects, you have a better shot at JavaScript runtimes, like V8, being able to optimize your code.

TypeScript uses the terms, wider and narrower to describe a level of specificity. In order of widest to narrowest, `any`, `any[]`, `string[]`, `[string, string, string]`, `["abc", "def", string]`, `never`. Wide is very general (`any`) while narrow is extremely specific. `never` is the narrowest level of specificity as it can literally hold no value. 

### Functions

You are now commanded to look at this file `./notes/2-function-basics.ts`.

Uncomment lines 6-11 (the entire `sendEmail` function declaration) and hover over `HasEmail`. If you are on a mac, you can 'command + click' `HasEmail` and you will be taken to the interface definition for `HasEmail`. Here's the `sendEmail` function definition:

{% highlight javascript %}

function sendEmail(to: HasEmail): { recipient: string; body: string } {
  return {
    recipient: `${to.name} <${to.email}>`, // Mike <mike@example.com>
    body: "You're pre-qualified for a loan!"
  };
}

{% endhighlight %}

The `{ recipient: string; body: string }` is the typing for the return object. Lines 13 - 21  show the arrow-function variant. Return types can also be inferred rather than explicitly defined (lines 23 - 38). If you uncomment those lines and hover over the function name; `getNameParts`, you will see the inferred return values: `first: string; middle: string | undefined; last: string;` It is important to be intentional in what you are returning from functions and to make sure that the shape of the data your are returning is consistent. Rest parameters work as expected, but the type has to be array-like, because it will be consumed like an array.

### Function Signature Overloading

To understand what is meant by function signature overloading, first check out / uncomment lines (14-21, 53-62, 65, 68, 71). 14-21 are a function that is referenced in 53-62, 65, 68, and 71 are calling the function from lines 53-62. In the `contactPeople` function, there are two OR conditions; "email" | "phone" and then selecting an object type based on that. The immediate issue is that either "email" OR "phone" are allowed to have either object type, but each object type is actually specific to either of the methods; "email" to `HasEmail` and "phone" to `HasPhoneNumber`. So we need a way to define that "email" only allows `HasEmail` and "phone" only allows `HasPhoneNumber`. Uncomment lines 49 & 50, then check line 71; there is now an error: `No overload matches this call.`

Q: With the function signature overload defined, could you then remove the typing from within the actual function definition?

A: Yes... but you'd then be removing any type of 'type safety', which would be bad for the purpose of maintaining the function. You might make the typing a bit more general if you needed to have more than 2 signature overload definitions; i.e. use `string` instead of "email" | "phone"

Q: So the overload signature is a documentation strategy?

A: No. It has documentation benefits but not only this. Overloading signatures also has type checking ramifications. More than providing tooltips, TypeScript is actually greenlighting certain styles of (function) invocation and forbidding anything else that does not fit. 

### Lexical Scope

`./notes/2-function-basics.ts` lines 75-101

Lexical scope in JavaScript determines what is the value of `this` when you invoke a function. The `sendMessage` function has its `this` set to the union type of `HasEmail` and `HasPhoneNumber`; an object with name, phone, and email properties. On line 87 an object `c` is created that matches the union type. Lines 89-91 defines a function that will 'destroy' the `this` binding, which can be seen on line 94, the conditions are not met and we see an error. Two ways to fix the binding (which we intentionally broke) are to `bind` the object to the function (line 97), or to `apply` the object to the function (line 102). You might not run into this very often, but if you do, now you know EVERYTHING you would ever need to know about functions.

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
