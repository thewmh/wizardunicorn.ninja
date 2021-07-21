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

[As of these notes, here's the latest TypeScript documentation about `this`](https://www.typescriptlang.org/docs/handbook/2/functions.html#declaring-this-in-a-function)

## Interfaces & Type Aliases

### Type Aliases & extends

We're now moving on to `./notes/3-interface-type-basics.ts`. Open it. Look at it. Bask in it's commented-out glory.

Earlier there had been a question about the difference between interfaces and type aliases. Both interfaces and type aliases are ways of giving a structure a name that can be imported and exported from modules and referred to. The main benefit of this is having one, central place where a type is defined and used throughout a code base. Now we will look at both interfaces and aliases and compare / contrast them. We'll look at Call, Construct, and Index Signatures. We'll cover something called "Open interfaces" which is a way to augment types that you may import from another library. We'll look at 'Access modifier keywords' which gives us control over who can see methods and instance data when it comes to classes. And finally, we'll cover 'Heritage clauses' which is just another word for extends and implement (which is specific to TypeScript).

Starting with type aliases, they are a very simple concept. A type alias is literally giving a type a name. Any type that you can use with a variable you can also create a type alias for. Type aliases are defined and 'figured out' by the (TypeScript) compiler in terms of what values are allowed, in-line as the file is parsed. This (compiler) behavior prevents you from creating self-referential types (see lines 14 & 15). We will look at this a bit more closely later.

We've already looked at interfaces, but let's look at how interfaces can extend other interfaces, similar syntax to classes. `extends` is used for inheritance of like things; i.e. interfaces extend from interfaces as classes extend from classes. Here's how `extend` looks:

{% highlight javascript %}

export interface HasInternationalPhoneNumber extends HasPhoneNumber {
  countryCode: string;
}

{% endhighlight %}

### Call & Construct Signatures

In `./notes/3-interface-type-basics.ts` line 30.

We can use interface to describe a call signature:

{% highlight javascript %}

interface ContactMessenger1 {
  (contact: HasEmail | HasPhoneNumber, message: string): void;
}

{% endhighlight %}

The parenthesis above are being used to describe a function. Interfaces can describe objects, functions, and we'll also see how interfaces can describe arrays. We're dealing exclusively with JavaScript values that extend from the JavaScript object type. There is no way to describe primitive JavaScript types with an interface (string or number). Type aliases, unlike interfaces, can handle the primitives and everything that an interface can handle. A benefit of defining interfaces is that you don't need type annotations all over the place:

{% highlight javascript %}

const emailer: ContactMessenger1 = (_contact, _message) => {
  /** ... */
};

{% endhighlight %}

The parameters `_contact` and `_message` will have their type defined by `ContactMessenger1`. Constructor signatures look very similar to (function) call signatures, with the `new` keyword in front of the parenthesis:

{% highlight javascript %}

interface ContactConstructor {
  new (...args: any[]): HasEmail | HasPhoneNumber;
}

{% endhighlight %}

### Dictionary Objects & Index Signatures

Starting at line 50 in `./notes/3-interface-type-basics.ts`.

`inerface PhoneNumberDict` is an example of an Index Signature:

{% highlight javascript %}

interface PhoneNumberDict {
  [numberName: string]:
    | undefined
    | {
        areaCode: number;
        num: number;
      };
}

const phoneDict: PhoneNumberDict = {
  office: { areaCode: 321, num: 5551212 },
  home: { areaCode: 321, num: 5550010 } // try editing me
};

// at most, a type may have one string and one number index signature

{% endhighlight %}

### Combining Interfaces

Index Signatures can be used in combination with other types AND they are considered to be 'open' meaning that any declarations of the same name will be merged. In `./notes/3-interface-type-basics.ts` lines 82-97, `interface PhoneNumberDict` has been augmented in a way where `home` and `office` numbers are required. This augmentation will be merged with the initial interface definition. The original interface definition for `PhoneNumberDict` is property agnostic in the sense that it only cares about the shape of the object and what the type of the key / value is. Augmenting that interface with additional typing allows us to ensure that we receive, and have type checked, an object with minimal key / value pairs (as defined by the interface), while also retaining the ability to type check any additional objects that get assigned to the object.

The last thing to point out about interfaces is that they are parsed like functions. Type aliases are sorted eagerly whereas interfaces are sorted lazily. Interfaces, like functions, get hoisted and can therefore be used before they are defined. Through combining types and interfaces, you do have the ability to create self-referential, or recursive, types. Here's an example of that from the type alias section we looked at earlier:

{% highlight javascript %}

type NumVal = 1 | 2 | 3 | NumVal[];
interface NumArr extends Array<NumVal> {}

{% endhighlight %}

Self-referential types are actually available in TypeScript as of version 3.7! (As of these notes, TypeScript was at version 4.3.5).

### Type Tests

In TypeScript, you can write tests for types. Microsoft has a library called 'dtslint' which uses 'tslint' which parses the linting error messages and compares them against special comments that you can leave in your types. This allows you to write test cases around things that are purely types.

[dtslint repository](https://github.com/microsoft/dtslint)

## Classes

### Classes

While you may be familiar with using classes in JavaScript, TypeScript adds some new concepts on top of what you're used to (if you are familiar with classes in JavaScript...). The additions are, fields and access modifier keywords, which allow control over who can see member data and member functions on instances. Head on over to the `./notes/4-class-basics.ts` file and we'll dive right in. Let's look at this class:

{% highlight javascript %}

export class Contact implements HasEmail {
  email: string;
  name: string;
  constructor(name: string, email: string) {
    this.email = email;
    this.name = name;
  }
}

{% endhighlight %}

`implements` is one of the heritage clauses we heard about earlier; extends being the other. implements describes a class that aligns with a particular interface. The `HasEmail` interface (which we also saw earlier) has defined both an email and a name property with the type string and when using `implements`, we need to define, up-front, these same properties on a class that `implements` them. 

### Access Modifiers & Initialization

Continuing with the code from above, you can see that it is fairly verbose, with email and name being defined 3 times 😞 TypeScript has a shortcut for this called 'Parameter Properties', and to understand the shortcut, we also need to understand access modifiers; public, protected, and private. Here are the access modifier definitions:

* public - everyone 🎉
* protected - self and subclasses
* private - only self

By utilizing the access modifiers, we can simplify the code from the previous section to look like this:

{% highlight javascript %}

class ParamPropContact implements HasEmail {
  constructor(
    public name: string,
    public email: string = "no email") {
    // nothing needed
  }
}

{% endhighlight %}

Using the `public` access modifier inside of the constructor tells it to expect to receive a specified property as an argument as well as to place it on the instance of the object it constructs. If we were to change any (or both) of the access modifiers to `protected`, the resulting object would have whichever of the properties have the `protected` unable to be read and it would also throw an error in TypeScript because the class would no longer conform to what the interface it is implementing.

Class fields can have initializers, as seen above `string = "no email"`.

Q: Does TypeScript infer a type if given a default value (to an initializer)?

A: Yes... TypeScript will follow the same rules as we saw for variables, where if given an initial value, TypeScript will make a guess as to what the type should be.

One additional access modifier(ish) method that you can use is `readonly` which will throw an error if you try to write to it. This `readonly` does nothing for us at build, in JavaScript, consumers of our code would have access to `readonly` properties, it is strictly a linting tool for authoring TypeScript.

### Definite Assignment & Lazy Initialization

{% highlight javascript %}

class OtherContact implements HasEmail, HasPhoneNumber {
  protected age: number = 0;
  private password: string;
  constructor(public name: string, public email: string, public phone: number) {
    // () password must either be initialized like this, or have a default value
    this.password = Math.round(Math.random() * 1e14).toString(32);
  }
}

{% endhighlight %}

In the above code block, an initializer is being provided in another way. The `Math.round...` could be moved up as a property initializer, but the point is that it could be initialized in either place. If you comment out the `this.password...` line, TypeScript will throw an error message:

"Property 'password' has no initializer and is not definitely assigned in the constructor."

This is because `password` is expected, based on its type, to have a value that is of type string. One way to get around this would be to set its type as `string | undefined`. In this  way, `password` would be either a string or undefined. Another option, if we are 100% absolutely certain that we will have a condition met to then assign something to a property, is to use the definite assignment operator, which is an exclamation point `!`, which would then look like this: `private password!: string;`. We're basically telling TypeScript that it does not need to worry about this having an assignment, we'll take care of it, like for real for real.

But where else would we maybe want to use the definite assignment operator? Have you used any of these? React, Ember, Angular, Polymer, or Vue? Do you directly instantiate components? i.e. `new ComponentName` then putting it directly in the DOM, or does the framework handle it for you? The framework handles it for you. There are often lifecycle hooks where you might be setting things up, setting up properties. In an early lifecycle hook, you might take care of putting a property such as password in place. It would be in this case, of using a framework, where you know that a property will be there, TypeScript is angry, but you want to let TypeScript know that it is going to be ok; the property that you are worried about will be there! Use the definite assignment initializer.

The other option is to 'lazily' create the password like so:

{% highlight javascript %}

class OtherContact implements HasEmail, HasPhoneNumber {
  protected age: number = 0;
  private passwordVal: string | undefined;
  constructor(public name: string, public email: string, public phone: number) {
    // () password must either be initialized like this, or have a default value
  }
  get password(): string {
    if(!this.passwordVal) {
      this.passwordVal = Math.round(Math.random() * 1e14).toString(32);
    }
    return this.passwordVal;
  }
}

{% endhighlight %}

### Abstract Classes

Abstract classes cannot be instantiated directly, they just serve as base classes. Abstract classes can have implementations.

{% highlight javascript %}

abstract class AbstractContact implements HasEmail, HasPhoneNumber {
  public abstract phone: number; // must be implemented by non-abstract subclasses

  constructor(
    public name: string,
    public email: string // must be public to satisfy HasEmail
  ) {}

  abstract sendEmail(): void; // must be implemented by non-abstract subclasses
}

{% endhighlight %}

In addition to the class itself being abstract, fields and methods can be abstract as well.

Here is the implementation of the abstract class from above:

{% highlight javascript %}

class ConcreteContact extends AbstractContact {
  constructor(
    public phone: number, // must happen before non property-parameter arguments
    name: string,
    email: string
  ) {
    super(name, email);
  }
  sendEmail() {
    // mandatory!
    console.log("sending an email");
  }
}

{% endhighlight %}

## Converting to TypeScript

### Converting to TypeScript

Let's step outside of the world of code for a moment and get into a delicious recipe: "How to convert JavaScript to TypeScript" 🤔 never mind... that does not sound very tasty. One of the great things about TypeScript is that it can inter-operate with JavaScript very easily, you can have JS and TS modules side-by-side. We should not treat a code base transition from JavaScript to TypeScript as the same kind of change that would result from changing from one programming language to something totally unrelated. i.e. rewriting something from Ruby to Rust. We are going to walk through a step-by-step process so that this change can be made incrementally on a few files at a time. Before we talk about what to do, lets look at what NOT to do:

* Functional changes at the same time - i.e. don't change from checking whether a value is truthy or not to a typeof check
* Attempt with low test coverage - you need to be able to confirm whether the code still works the way you want it to work
* Let perfect be the enemy of good - don't try to type things too strongly too early on
* Forget to add tests for types - `dtslint` is your friend here
* Publish types for consumer use while they are in a weak state - wait until you are completely happy with your types before publishing them

### Compiling in "loose mode"

Step one of the "How to convert JavaScript to TypeScript" recipe is as follows:

* Start with tests passing
* Rename all `.js` to `.ts` allowing implicit `any` - for whenever the TypeScript compiler is unable to infer any of the types; i.e. function arguments might be primary culprits here
* Fix only the things that are not type-checking or causing compile errors - JavaScript classes are a common culprit here, because in TypeScript you have to state the fields and their types
* Be careful to avoid changing behavior
* Get tests passing again

Submit PR.

### Making Anys Explicit

Step two of the "How to convert JavaScript to TypeScript" recipe is as follows:

* Start with tests passing
* Ban implicit any ("noImplicitAny": true,) - this will cause TypeScript to throw an error whenever is unable to infer the type of something, instead of falling back to `any`
* Where possible, provide a specific and appropriate type
  * Import types for dependencies from `DefinitelyTyped` - `DefinitelyTyped` is an open source project that provides ambient type information for your project's dependencies
  * otherwise explicit `any` - via type annotation
* Get tests passing again

Submit PR.

### Strict Mode

Step three of the "How to convert JavaScript to TypeScript" recipe is as follows:

* Incrementally, in small chunks...
* Enable strict mode: 
    {
      ...
      "strictNullChecks": true, // the only value that can be null is null
      "strict": true, // strictness settings
      "strictFunctionTypes": true, // validates arguments and return callback types
      "strictBindCallApply": true // makes sure that the arguments passed to bind call and apply all type check appropriately
      ...
    }
* Replace explicit `any`(s) with more appropriate types
* Try to avoid unsafe casts - avoid using the `as` keyword

Q: What are the benefits of moving an existing code base over to TypeScript?

A: All of the benefits that you would get if you started out using TypeScript from the genesis of your project.

Q: But, for the amount of effort, is it REALLY worth it?

A: It depends, case-by-case. Small JavaScript modules that only do one thing? Probably not much value. You can tell TypeScript to regard entire modules as `any`, but this is losing the value of types.

### Address Book Exercise

Now that we have completed the overview of the "How to convert JavaScript to TypeScript" recipe, let's put that into practice by actually converting a piece of JavaScript code into TypeScript. There is an example in the project repository: `./challenges/address-book/src/index.js`. I'll drop the code here as well, because it is walked-through so we can understand the places where we might need to think about type information.

The first of our 3 step recipe is to rename the file from `...js` to `...ts` and setting up the TypeScript compiler in a very loose mode to get everything to pass. But step 0 (of course he hid a step from us) is to get the tests to pass before AND after we are done. In the console / terminal, switch into the directory that the exercise file is in: `cd challenges/address-book` (if you were still at the root directory of the repository...), then run `yarn test`. All tests pass, but now the trick is to change the file extension from `.js` to `.ts` and try to get the tests to pass AND go through the 2 other steps after that to complete the recipe 😞

{% capture summary %}Click to view the source code{% endcapture %}
{% capture details %}  
{% highlight javascript %}

export class AddressBook {
  contacts = [];

  addContact(contact) {
    this.contacts.push(contact);
  }

  findContactByName(filter) {
    return this.contacts.filter(c => {
      if (
        typeof filter.firstName !== "undefined" &&
        c.firstName !== filter.firstName
      ) {
        return false;
      }
      if (
        typeof filter.lastName !== "undefined" &&
        c.lastName !== filter.lastName
      ) {
        return false;
      }
      return true;
    });
  }
}

export function formatDate(date) {
  return (
    date
      .toISOString()
      .replace(/[-:]+/g, "")
      .split(".")[0] + "Z"
  );
}

function getFullName(contact) {
  return [contact.firstName, contact.middleName, contact.lastName]
    .filter(Boolean)
    .join(" ");
}

export function getVcardText(contact, date = new Date()) {
  const parts = [
    "BEGIN:VCARD",
    "VERSION:2.1",
    `N:${contact.lastName};${contact.firstName};${contact.middleName ||
      ""};${contact.salutation || ""}`,
    `FN:${getFullName(contact)}`,
    ...Object.keys(contact.phones).map(
      phName => `TEL;${phName.toUpperCase()};VOICE:${contact.phones[phName]}`
    ),
    ...Object.keys(contact.addresses)
      .map(addrName => {
        const address = contact.addresses[addrName];
        if (address) {
          return `ADR;${addrName.toUpperCase()}:;;${address.houseNumber} ${
            address.street
          };${address.city};${address.state};${address.postalCode};${
            address.country
          }\nLABEL;${addrName.toUpperCase()};ENCODING=QUOTED-PRINTABLE;CHARSET=UTF-8:${
            address.houseNumber
          } ${address.street}.=0D=0A=${address.city}, ${address.state} ${
            address.postalCode
          }=0D=0A${address.country}`;
        } else {
          return "";
        }
      })
      .filter(Boolean)
  ];

  if (contact.email) {
    parts.push(`EMAIL:${contact.email}`);
  }
  const d = new Date();
  parts.push(`REV:${formatDate(date)}`);
  parts.push("END:VCARD");
  return parts.join("\n");
}

{% endhighlight %}
{% endcapture %}{% include details.html %} 

### Address Book Solution

Everything contained in the solution here has been covered in the sections / workshop until this point. The hardest part was thinking in TypeScript

{% capture summary %}Click to view the solution{% endcapture %}
{% capture details %}  
{% highlight javascript %}

interface Person {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  salutation?: string;
  phones: {
    [k: string]: string;
  };
  addresses: {
    [k: string]: {
      houseNumber: number;
      postalCode: number;
      city: string;
      state: string;
      country: string;
      street: string;
    };
  };
  email?: string;
}

export class AddressBook {
  contacts: Person[] = [];

  addContact(contact: Person) {
    this.contacts.push(contact);
  }

  findContactByName(filter: { firstName?: string; lastName?: string }) {
    return this.contacts.filter(c => {
      if (
        typeof filter.firstName !== "undefined" &&
        c.firstName !== filter.firstName
      ) {
        return false;
      }
      if (
        typeof filter.lastName !== "undefined" &&
        c.lastName !== filter.lastName
      ) {
        return false;
      }
      return true;
    });
  }
}

export function formatDate(date: Date) {
  return (
    date
      .toISOString()
      .replace(/[-:]+/g, "")
      .split(".")[0] + "Z"
  );
}

function getFullName(contact: Person) {
  return [contact.firstName, contact.middleName, contact.lastName]
    .filter(Boolean)
    .join(" ");
}

export function getVcardText(contact: Person, date = new Date()) {
  const parts = [
    "BEGIN:VCARD",
    "VERSION:2.1",
    `N:${contact.lastName};${contact.firstName};${contact.middleName ||
      ""};${contact.salutation || ""}`,
    `FN:${getFullName(contact)}`,
    ...Object.keys(contact.phones).map(
      phName => `TEL;${phName.toUpperCase()};VOICE:${contact.phones[phName]}`
    ),
    ...Object.keys(contact.addresses)
      .map(addrName => {
        const address = contact.addresses[addrName];
        if (address) {
          return `ADR;${addrName.toUpperCase()}:;;${address.houseNumber} ${
            address.street
          };${address.city};${address.state};${address.postalCode};${
            address.country
          }\nLABEL;${addrName.toUpperCase()};ENCODING=QUOTED-PRINTABLE;CHARSET=UTF-8:${
            address.houseNumber
          } ${address.street}.=0D=0A=${address.city}, ${address.state} ${
            address.postalCode
          }=0D=0A${address.country}`;
        } else {
          return "";
        }
      })
      .filter(Boolean)
  ];

  if (contact.email) {
    parts.push(`EMAIL:${contact.email}`);
  }
  const d = new Date();
  parts.push(`REV:${formatDate(date)}`);
  parts.push("END:VCARD");
  return parts.join("\n");
}

{% endhighlight %}
{% endcapture %}{% include details.html %}

Q: I accidentally added commas instead of semicolons when writing out my interface and it seemed like those are fine to use?

A: Yes, you can use commas between key / type pairs in interface definitions, the reason (the instructor prefers) to use them would be to more readily be able to identify that they are key / type pairs, not key / value pairs.

## Generics

### Generics

Generics parameterize types in the same way that functions parameterize values. Let's look at when it is appropriate to use a generic, the ins and outs of type parameters in general, and how to constrain type parameters so that you have what you need to have type safety in a function and the surrounding environment is 'happy' (i.e. tests pass / compiler is not YELLING at you) as well.

Open `./notes/5-generics-basics.ts`. We'll be working from there. Looking at the first function `wrappedValue`:

{% highlight javascript %}

// param determines the value of x
function wrappedValue(x: any) {
  return {
    value: x
  };
}

{% endhighlight %}

In the above code, whatever is passed into `wrappedValue` as an argument will determine the value of `x`. We could also create a type that functions similar to the `wrappedValue` function:

{% highlight javascript %}

// type param determines the type of x
interface WrappedValue<X> {
  value: X;
}

let val: WrappedValue<string[]> = { value: [] };
val.value;

{% endhighlight %}

Setting `val` to the generic type `WrappedValue` and passing in a 'string array' will give `val.value` that same type. You can name the type parameters whatever you want, the `X` could be `SuperAwesomeParameterName`. It doesn't matter, it's almost like an argument passed to a function. However, the (TypeScript) convention is to start with the letter `T` and use capital letters like 'T', 'U', 'V', 'S', or 'R'. This naming convention is a carryover from C++ which uses template parameters that are conceptually identical to what we are seeing here. Cool.

If we were using something like the array filter method, we could type a function that would appropriately filter based on the types of things that might be in the array. i.e. if we were filtering through an array of strings, to remove any empty string we found, we would want our filtering function 
to take a string as an argument and return a boolean. Like so:

{% highlight javascript %}

// for Array.prototype.filter
interface FilterFunction<T = any> {
  (val: T): boolean;
}

const stringFilter: FilterFunction<string> = val => typeof val === "string";
stringFilter(0); // 🚨 ERROR
stringFilter("abc"); // ✅ OK

{% endhighlight %}

### Type Parameters

`T = any` this syntax we saw from the last section has been likened to function arguments. Based on that analogy, what does the `= any` mean in this context? In this context, if no type parameter is provided, the default type is `any`. So far, we've declared that we have a type parameter `T` and we've defined that we are using `T` directly: `(val: T)`, but we are not limited to this, nor do we always have to do that. Here's an example of exactly that (lines 54 - 68 in `./notes/5-generics-basics.ts`):

{% highlight javascript %}

function resolveOrTimeout<T>(promise: Promise<T>, timeout: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    // start the timeout, reject when it triggers
    const task = setTimeout(() => reject("time up!"), timeout);

    promise.then(val => {
      // cancel the timeout
      clearTimeout(task);

      // resolve with the value
      resolve(val);
    });
  });
}
resolveOrTimeout(fetch(""), 3000);

{% endhighlight %}

In the above code, when passed a `Promise<T>`, the promise type is generic over the type that it resolves to. Generic in the sense that it abstracts the type it resolves to, it takes it as a type parameter. i.e. you could have a promise that resolves to a number or an HTTP response. `<T>` is a parameter, and as an argument we are taking in `Promise<T>` where the type of `T` is inferred based on the provided promise. In the above case, `T` will resolve to being a response type.

### Constraints & Scope

Type parameters can also have constraints. When you start using type parameters, if you do not have a constraint, you may get a type error where you cannot access a property because you can only do something if you have explicitly asked for it.

{% highlight javascript %}

function arrayToDict<T extends { id: string }>(array: T[]): { [k: string]: T } {
  const out: { [k: string]: T } = {};
  array.forEach(val => {
    out[val.id] = val;
  });
  return out;
}

{% endhighlight %}

The `extends { id: string }` is the constraint, without which you will get a type error because `T` would not have been defined as being an object with an `id` property. The above code could be refactored in such a way that we are expecting to receive an object with an id property that is a string, but this would narrow our constraints too much where we would not be able to access any other properties that may be on the object.

Like function arguments, type parameters are associated with a scope.

{% highlight javascript %}

function startTuple<T>(a: T) {
  return function finishTuple<U>(b: U) {
    return [a, b] as [T, U];
  };
}
const myTuple = startTuple(["first"])(42);

{% endhighlight %}

In the above code, before the return statement of `startTuple`, `b` and `U` are inaccessible. Inside of `finishTuple`, all variables are accessible; `a`, `T`, `b`, `U`. This scope is very much the same as standard JavaScript function scope.

### Use Cases

I know, you're saying, "hey! these generics are lit, but when should I use them?!". Fine, let's talk about that.

Side note: Take blog posts and other sources of content out there in the world **wild** web with a heaping tablespoon of salt. Many of these 'sources' get "When should I use a generic in TypeScript" wrong.

Generics are great for relating two things. i.e. take in an array of `T` and get back a dictionary of `T`. The generic, type parameter, is what ties both `T`(s) together. If you are only using a type parameter once, you can eliminate it. Constraints on type parameters are equivalent to specifying the type on an argument, in that it dictates what you can do within the function.

Q: In the code (lines 110 in `./notes/5-generics-basics.ts`), would it make any difference to use `interface` vs `type`?

A: No, in this example it would not make a difference.

### Dictionary Exercise

Time to create some familiar looking utilities built around a dictionary type! We are going to build `.map` and `.reduce` for dictionaries and define a dictionary type. The goal is to produce a dictionary with the same keys, but with transformed values. The project file is here: `./challenges/dict/`, and here's the code:

{% capture summary %}Click to view the source code{% endcapture %}
{% capture details %}  
{% highlight javascript %}

export type Dict = {};

// Array.prototype.map, but for Dict
export function mapDict() {}

// Array.prototype.reduce, but for Dict
export function reduceDict() {}

{% endhighlight %}
{% endcapture %}{% include details.html %} 

### Dictionary Solution

The workshop does not get to the implementation of the reduce function for a dictionary, but try to figure it out if you can!

{% capture summary %}Click to view the solution{% endcapture %}
{% capture details %}  
{% highlight javascript %}

export type Dict<T> = {
  [k: string]: T | undefined;
};

// Array.prototype.map, but for Dict
export function mapDict<T, S>(
  dict: Dict<T>,
  fn: (arg: T, idx: number) => S): Dict<S> {
    const out: Dict<S> = {};
    Object.keys(dict).forEach((dKey, idx) => {
      const thisItem = dict[dKey];
      if (typeof thisItem !== 'undefined') {
        out[dKey] = fn(thisItem, idx);
      }
    })
    return out;
  }

// Array.prototype.reduce, but for Dict
export function reduceDict<T>(dict: Dict<T>) {}

{% endhighlight %}
{% endcapture %}{% include details.html %}

## Top & Bottom Types

### Top Types

We've already seen top and bottom types which are `any` and `never` respectively. We'll now dig deeper into this topic and focus on:

* Passing private values through typed code
* Exhaustive Conditionals
* Type Guards

Open up `./notes/6-guards-and-exterme-types.ts` to follow along. Starting with top types. TypeScript actually has two top types; `any` and `unknown`. Like `any`, `unknown` can receive any value, but the difference is in how you can access things off of these types. `unknown` while it is happy to hold any value, you cannot use the value directly, you must narrow it in some way before you can use it. An example use case for `unknown` is for an API response where you know you've got some JSON back, but you need to perform some sort of assertion to make sure it is what you really hope it to be before you continue down the path of using it. We'll look at how you narrow that down using type guards, in the next section. 

When would you want to use `any`? Ideally, in parts of our programs where we want to retain a lot of flexibility. Here's an example:

{% highlight javascript %}

async function logWhenResolved(p: Promise<any>) {
  const val = await p;
  console.log("Resolved to: ", val);
}

{% endhighlight %}

In the above example, we can see that the `logWhenResolved` function is going to print whatever value is returned from the promise. There is no reason to limit what type we are using here, `any` is appropriate.

In terms of when to use `unknown`, this is good for either when values are private, i.e. using a library and you don't want it to know the structure of what it is being passed, not for security, but you don't want it to depend on the structure of the thing. But as is, `unknown` is not usable, as mentioned, we need a type guard in order to sufficiently narrow its type and use it. Here are some built-in type guards that may be familiar:

{% highlight javascript %}

if (typeof myUnknown === "string") {
  // in here, myUnknown is of type string
  myUnknown.split(", "); // ✅ OK
}
if (myUnknown instanceof Promise) {
  // in here, myUnknown is of type Promise<any>
  myUnknown.then(x => console.log(x));
}

{% endhighlight %}

### Type Guards

We can also define our own type guards, here is an example of a user-defined type guard:

{% highlight javascript %}

function isHasEmail(x: any): x is HasEmail {
  return typeof x.name === "string" && typeof x.email === "string";
}

{% endhighlight %}

The above will check if both `x.name` and `x.email` are strings and return a boolean. Then, we can access the values like so:

{% highlight javascript %}

if (isHasEmail(myUnknown)) {
  // In here, myUnknown is of type HasEmail
  console.log(myUnknown.name, myUnknown.email);
}

{% endhighlight %}

### Unknowns & Branded Types

When working with unknowns, there is this issue:

{% highlight javascript %}

let aa: unknown = 41;
let bb: unknown = ["a", "string", "array"];
bb = aa; // 🚨 yikes

{% endhighlight %}

Any unknown can be assigned to any other unknown, because it is a top type. So as an alternative and safer way to use unknowns, let's look at branded types.

{% highlight javascript %}

interface BrandedA {
  __this_is_branded_with_a: "a";
}
function brandA(value: string): BrandedA {
  return (value as unknown) as BrandedA;
}
function unbrandA(value: BrandedA): string {
  return (value as unknown) as string;
}

interface BrandedB {
  __this_is_branded_with_b: "b";
}
function brandB(value: { abc: string }): BrandedB {
  return (value as unknown) as BrandedB;
}
function unbrandB(value: BrandedB): { abc: string } {
  return (value as unknown) as { abc: string };
}

let secretA = brandA("This is a secret value");
let secretB = brandB({ abc: "This is a different secret value" });

secretA = secretB; // ✅ No chance of getting these mixed up
unbrandB(secretA);
unbrandA(secretB);

// back to our original values
let revealedA = unbrandA(secretA);
let revealedB = unbrandB(secretB);

{% endhighlight %}

In the above code, we have removed the possibility of reassigning an unknown to another unknown. Make sure you keep the above approach to branding and unbranding in one location that no consumer of your code will need to be concerned with so that you can make changes as needed and no one will be any the wiser / have to worry about it.

Q: What is the point of doing things this way versus using an object and adding a `private` property to it?

A: `private` can only be used on class instances. Again, the use of branded types and unknown is not about security, it is about discouraging other developers from intertwining themselves with private parts of your code.

### Bottom Types

All bottom types can hold no values. A place where you will commonly see a bottom type is through exhaustive narrowing, like so:

{% highlight javascript %}

let x = "abc" as string | number;

if (typeof x === "string") {
  // x is a string here
  x.split(", ");
} else if (typeof x === "number") {
  // x is a number here
  x.toFixed(2);
} else {
  // x is a never here
}

{% endhighlight %}

In the above code, if we ever got to the final `else` statement, the type of `x` would be a never. You will not be creating values of the type never, but you may come across them. But what if we wanted to use the type of never for something? Here's a possible scenario:

{% highlight javascript %}

class UnreachableError extends Error {
  constructor(val: never, message: string) {
    super(`TypeScript thought we could never end up here\n${message}`);
  }
}

let y = 4 as string | number;

if (typeof y === "string") {
  // y is a string here
  y.split(", ");
} else if (typeof y === "number") {
  // y is a number here
  y.toFixed(2);
} else {
  throw new UnreachableError(y, "y should be a string or number");
}

{% endhighlight %}

In the `UnreachableError` class, `never` is provided as an argument.

Q: In the above code, under what circumstances would we ever reach the final `else` statement?

A: There are a few ways. One, you could have done some casting, weakening your types in such a way that they are lying to you. Another possibility, because TypeScript is compile-time only, when your code is out in the wild, there is a possibility that a consumer of your code passes something to your function that does not meet any of the conditions which would then hit the final `else` statement. 

## Advanced Types

### Mapped & Conditional Types, & Type Queries

Moving into even more advanced types, go have a look at `./notes/7-advanced-types.ts`. It may be useful to get a sense for what is possible as you learn more and more about how to design effective constraints with TypeScript. First up, mapped types which involve using an interface as a way for getting to the interfaces keys to the types associated with those keys. Earlier in the workshop we were using / looking at function signature overloads in order to ensure that there was something that could match for type of `HasPhoneNumber` and `HasEmail`. This methodology would require that as more communication methods are added that there would also need to be more signatures added. A more efficient way would be to use a mapped type. From `./notes/7-advanced-types.ts` (lines 3 - 25):

{% highlight javascript %}

interface CommunicationMethods {
  email: HasEmail;
  phone: HasPhoneNumber;
  fax: { fax: number };
}

function contact<K extends keyof CommunicationMethods>(
  method: K,
  contact: CommunicationMethods[K] // 💡turning key into value -- a *mapped type*
) {
  //...
}
contact("email", { name: "foo", email: "mike@example.com" });
contact("phone", { name: "foo", phone: 3213332222 });
contact("fax", { fax: 1231 });

// we can get all values by mapping through all keys
type AllCommKeys = keyof CommunicationMethods;
type AllCommValues = CommunicationMethods[keyof CommunicationMethods];

{% endhighlight %}

Type queries by way of `typeof` allows us to get the type of a value. And that (with little explanation) looks like this:

{% highlight javascript %}

const alreadyResolvedNum = Promise.resolve(4);

type ResolveType = typeof Promise.resolve;

const x: ResolveType = Promise.resolve;
x(42).then(y => y.toPrecision(2));

{% endhighlight %}

Conditional types allow us to use ternary operators to define the type (can only be used for generics). Conditional types look like this:

{% highlight javascript %}

type EventualType<T> = T extends Promise<infer S> // if T extends Promise<any>
  ? S // extract the type the promise resolves to
  : T; // otherwise just let T pass through

{% endhighlight %}

### Built-In Utility Types

TypeScript comes with a couple of utility types. The first we'll look at is `Partial` which makes everything on a type optional. This is useful if you have an options object where you may have a set of default values and some can pass in a subset of those options and you want to do an object merge. i.e. take whatever is given and merge it in to the fallbacks. `Partial` will put a `?` (optional) in front of all the properties, making them... optional.

{% highlight javascript %}

type MayHaveEmail = Partial<HasEmail>;
const me: MayHaveEmail = {}; // everything is optional

{% endhighlight %}

The next utility type is `Pick` which allows us to select one or more properties from an object. It allows you to define precisely which properties you want.

{% highlight javascript %}

type HasThen<T> = Pick<Promise<T>, "then" | "catch">;

let hasThen: HasThen<number> = Promise.resolve(4);
hasThen.then; // .catch is also available

{% endhighlight %}

`Extract` lets us obtain a subset of types that are assignable to something.

{% highlight javascript %}

type OnlyStrings = Extract<"a" | "b" | 1 | 2, number>;

{% endhighlight %}

`Exclude` lets us obtain a subset of types that are NOT assignable to something.

{% highlight javascript %}

type NotStrings = Exclude<"a" | "b" | 1 | 2, string>;

{% endhighlight %}

`Record` helps us create a type with specified property keys and the same value type.

{% highlight javascript %}

type ABCPromises = Record<"a" | "b" | "c", Promise<any>>;

{% endhighlight %}

## Declaration Merging

### Declaration Merging

This section is important in terms of forming the right mental model in terms of how TypeScript works. We're going to look at how VS Code's tooltips provide information that we can use to figure out whether something is a value or a type. This should help us understand how we can put small fixes on top of libraries, imperfect type information, or maybe you want to prototype something and the types do not exist for it yet, this will help you augment some of the existing type information in your app. Go on... open up `./notes/8-declaration-merging.ts` and follow along. In TypeScript, identifiers (things you can export) or as TypeScript internally calls them; symbols, can be associated with up to three things; a value, a type, or a namespace.

A namespace is like an object in that it has a type and it has a value. Here's some code to look at:

{% highlight javascript %}

function foo() {}
interface bar {}
namespace baz {
  export const biz = "hello";
}

{% endhighlight %}

Here are some ways (using the above code as an example) to test for value, type, or namespace:

{% highlight javascript %}

// how to test for a value
const x = foo; // foo is in the value position (RHS).

// how to test for a type
const y: bar = {}; // bar is in the type position (LHS).

// how to test for a namespace (hover over baz symbol)
baz;

export { foo, bar, baz }; // all are importable/exportable

{% endhighlight %}

Functions and variables are purely values. Their types may only be extracted using type queries (`typeof`).

{% highlight javascript %}

const xx = 4;
const yy: typeof xx = 4;

{% endhighlight %}

Interfaces are purely types.

{% highlight javascript %}

interface Address {
  street: string;
}

const z = Address; // 🚨 ERROR (fails value test)

{% endhighlight %}

Classes are both types and values. A class is a factory to produce instances. Using a class as a type is almost like using an interface for the instance.

{% highlight javascript %}

class Contact {
  name: string;
}

// passes both the value and type tests

const contactClass = Contact; // value relates to the factory for creating instances
const contactInstance: Contact = new Contact(); // interface relates to instances

{% endhighlight %}

When declarations have the same name and do not have values that collide with other values, class, namespace, and interface will stack on top of each other. In this way you can add additional types as needed:

{% highlight javascript %}

class Album {
  label: Album.AlbumLabel = new Album.AlbumLabel();
}
namespace Album {
  export class AlbumLabel {}
}
interface Album {
  artist: string;
}

let al: Album; // type test
let alValue = Album; // value test

export { Album }; // 👈 hover over the "Album" -- all three slots filled

{% endhighlight %}

Namespaces, as seen above, are their own entity, they are neither an interface or a class.

{% highlight javascript %}

class AddressBook {
  contacts!: Contact[];
}
namespace AddressBook {
  export class ABContact extends Contact {} // inner class
}

const ab = new AddressBook();
ab.contacts.push(new AddressBook.ABContact());

{% endhighlight %}

Notice the inner class above and how it is accessed. The reason this is allowed is because a namespace serves to tack things on to something, in the above case, `ABContact` is being added to `AddressBook`. Similar to classes, functions can be extended with a namespace:

{% highlight javascript %}

function format(amt: number) {
  return `${format.currency}${amt.toFixed(2)}`;
}
namespace format {
  export const currency: string = "$ ";
}

format(2.314); // $ 2.31
format.currency; // $

{% endhighlight %}

Knowing what is a type and what is a value is a key takeaway here. Also, knowing what can be augmented, interfaces, versus knowing what you have to leave alone (when defined), types and values.

## Compiler API

### Initializing

The last thing we are going to look at is how the TypeScript compiler sees code. We will do so by way of creating a quick and dirty documentation generator. So strap yourself in and head on over to `./notes/9-compiler-api.ts`. At the top of the file, there are a couple of wildcard imports `*`. A wildcard import will import all the things from whatever is being imported, in this case, `path` and `typescript`. `ts.createProgram` is quite similar to what you might have seen in a `tsconfig` file and needs both the `options` object and the `rootNames` object (this is using the node `path` module we imported).

Next, step (2) of the file, starting at line 20, we are getting the non-declaration source files because we do not want to include declaration files in our documentation generator. 

### Type-Checker

Still in `./notes/9-compiler-api.ts`, but now on step (3), we are going to use the `getTypeChecker` method from TypeScript which is part of the compiler. `getTypeChecker` takes all the types and interfaces you create and the AST (abstract syntax tree), which is the in-memory representation of your code, and it binds these things together to identify what is going to be type checked.

Step (4), we are going to use the type checker to obtain the appropriate `ts.Symbol` (interface, namespace) for each source file.

And the last step, (5), is a big one, but we'll walk through it. Immediately, we are just looking to log out the name of each instance of an `sfSymbol`, then if there are `fileExports`, console.log a string `"== Exports =="` and for each export log it's key (name) and stringified type. Finally, we are going to `getJsDocTags` and log them to the console with their tag name and tag text. 

### Wrapping Up

That's it! Hopefully you have a greater understanding of how typed programming works and where to apply type information. Try to avoid any over-constrain traps when typing. 👏
