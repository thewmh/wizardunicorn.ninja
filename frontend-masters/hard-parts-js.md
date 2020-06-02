---
title: "Javascript: The Hard Parts, v2"
description: These are notes from the 'Javascript':' The Hard Parts, v2' course on Frontend Masters.
permalink: /frontend-masters/hard-parts-js

layout: page
subnav:
  - text: Introduction
    href: '#introduction'
  - text: Something
    links:
      - text: Something Else
        href: '#nope'
  - text: Functional Programming
    href: '#functional-programming'
---

## Introduction

[The link to the course document is here](https://static.frontendmasters.com/resources/2019-09-18-javascript-hard-parts-v2/javascript-hard-parts-v2.pdf)

The instructor breaks down the difference between Junior, Mid and Senior-Level developers, and the purpose of the course for the differenc levels of developers.

## JavaScript Principles

### Thread of Execution

When JavaScript runs, it:

* Goes through code line-by-line and runs/'executes' each line - known as the thread of execution

* Saves 'data' like strings and arrays so we can use that data later - in its memory

* We can even save code (functions)

{% highlight javascript %}

const num = 3; // define a variable and assign it the number 3

function multiplyBy2 (inputNumber) { // defining the function
    const result = inputNumber*2; 
    return result;
}

const output = multiplyBy2(num); // declare a constant and define it to a function call
const newOutput = multiplyBy2(10); // declare a constant and define it to a function call

{% endhighlight %}

Memory is the place in which we store data.

### Functions

A function being run is like a miniature program. We need the code and the memory to run a function.

A function is code we save ('define') functions & can use (call/invoke/execute/run) later with the functions name & ()

Execution context is created to run the code of a function. It has 2 parts:

* Thread of execution

* Memory

The first thing that happens when a function is run is a new execution context is established and the parameters and their arguments are stored in local memory. i.e. `inputNumber: 3`

JavaScript contains a single thread of execution, which means that you can only do one thing at a time (unless you are running your code asynchronously).

### Call Stack

* JavaScript keeps track of what function is currently running. i.e. where is the thread of execution

* Run a function - add to call stack

* Finish running the function - JS removes it from the call stack

* Whatever is at the top of the call stack is the function that is currently being run

## Functions & Callbacks

### Generalized Functions

{% highlight javascript %}

function tenSquared() {
    return 10*10
}

{% endhighlight %}

The above function is not generic enough, if we wanted to square other numbers, we would have to rewrite the function for each number we would want to square.

Don't Repeat Yourself!

How could we make the function more generic?

{% highlight javascript %}

function squareNum(num) {
    return num*num
}

{% endhighlight %}

With the above function, you could now pass any number and it would return the square of that number `num*num`

Generalizing functions:

'Parameters' (placeholders) mean we don't need to decide what data to run our functionality on until we run the function

* Then provide an actual value ('argument') when we run the function

Higher order functions follow the same principle

* We may not want to decide exactly what some of our functionality is until we run our function

### Repeating Functionality

This lesson walks through a function, further driving home the points above about execution context and return values being passed to global memory.

### Higher Order Functions

A better, more general, way to implement a function could be:

{% highlight javascript %}

function copyArrayAndManipulate(array, instructions) {
    const output = [];
    for (let i = 0; i < array.length; i++) {
        output.push(instructions(array[i]));
    }
    return output;
}

function multiplyBy2(input) { return input * 2; }
const result = copyArrayAndManipulate([1, 2, 3], multiplyBy2);

{% endhighlight %}

### Higher Order Functions Example

The example used in the section is the above codeblock. Just walking through each step of the execution context from global through the call stack as it is updated by calling functions.

### Higher Order Functions Q&A

No notes

### Callbacks & Higher Order Functions

Functions in JavaScript are first class objects. They can coexist with and be treated like any other JavaScript object:

1. Assigned to variables and properties of other objects

2. Passed as arguments into functions

3. Returned as values from functions

A callback function is a function that is placed inside of a Higher Order Function.

A Higher Order Function is defined as: A function that takes in OR passes out (returns) a function.

Callbacks and Higher Order Functions simplify code and keep it DRY

* Declarative, readable code: Map, filter, reduce - the most readable way to write code to work with data

* Asynchronous JavaScript: Callbacks are a core aspect of async JavaScript and are under the hood of promises, async/await

### Arrow Functions

Arrow functions are a shorthand way to save functions

{% highlight javascript %}

function multiplyBy2(input) { return input * 2; }

//  in an arrow function, becomes

const multiplyBy2 = input => input*2

{% endhighlight %}

Under the hood, JavaScript will put in parenthesis, curly brackets, and a return statement if your function only has one return.

Anonymous and arrow functions

* Improve the immediate legibility of code

* ...but they are merely 'syntatic sugar'

* Understanding how they work 'under the hood' is vital to avoid confusion

### Pair Programming

Pair programming is the most effective way to grow as an engineer, because:

* You get to tackle blocks (issues) with a partner

* Stay focused on the problem

* Refine technical communication

* Collaborate to solve the problem

## Closure

### Closure Introduction

* Closure is the most esoteric of JavaScript concepts - If you really understand it, you understand JavaScript well

* Enables powerful 'pro-level' functions like 'once' and 'memoize'

* Many JavaScript design patterns including the module pattern use closure

* Build iterators, handle partial application, and maintain state in an asynchronous world

Everytime a function gets invoked, it creates a new store of memory (in its execution context)...but

Functions with memories!

* When our function gets called, we create a live store of data (local memory/variable environment/state) for that functions execution context

* When the function finished executing, its local memory is deleted (except for the returned value)

* But what if the function could hold on to live data between executions?

* This would let function definitions hace an associated cache/persistent memory

* But it all starts with returning a function from another function

### Returning Functions

Returning a function from another function

{% highlight javascript %}

function createFunction() {
    function multiplyBy2 (num) {
        return num*2;
    }
    return multiplyBy2;
}

const generatedFunc = createFunction();
const result = generatedFunc(3); // 6

{% endhighlight %}

### Nested Function Scope

Calling a function in the same function call as it was defined:

{% highlight javascript %}

function outer() {
    let counter = 0;
    function incrementCounter () {
        counter ++;
    }
    return incrementCounter;
}

outer();

const myNewFunction = outer();
myNewFunction();
myNewFunction();

{% endhighlight %}

### Retaining Function Memory

In the above function definition, when `myNewFunction` is assigned to `outer()`, the inner function `incrementCounter()` is saved to it, including the parent scope of `outer()`, which allows access to the variable `counter`.

### Function Closure

Continuing on with the function defined above in the 'Nested Function Scope' section, more about calling a function outside of the function call it was assigned is discussed.

### Closure Q&A

If you define variables within the parent function and they are not referenced in the child function, does memory retain those variables? No, the child function will only retain (in global scope) those variable(s) which are directly referenced within the child function definition. Otherwise, there would be memory leaks.

### Closure Technical Definition & Review

Recommended reading: 'If Hemmingway Wrote JavaScript'

Where you save your function determines what data it will have access to when it is run.

Persistent Lexically Scoped Referenced Data (P.L.S.R.D) is the term used to describe a child functions access to its parent scope, AKA closure.

### Multiple Closure Instances

If you store a returned function definition in a variable, you are creating unique instances and (future; at run-time) execution contexts for that function. Following the above example, if you set `var anotherVariable = outer();`, anotherVariable would have its own execution context separate from myNewFunction. 

### Practical Applications

Closure gives our functions persistent memories and an entirely new toolkit for writing professional code

* Helper functions: Everyday professional helper functions like 'once' and 'memoize'

* Iterators and generators: Which use lexical scoping and closure to achieve the most contemporary patterns for handling data in JavaScript

* Module pattern: Preserve state for the life of an application without polluting the global namespace

* Asynchronous JavaScript: Callbacks and Promises rely on closure to persist state in an asynchronous environment

### Closure Exercises

[Closure exercises are here](http://csbin.io/closures)

## Asynchronous JavaScript

### Single Threaded Execution Review

Promises, Async, and the Event Loop

- Promises - The most significant ES6 feature

- Asynchronicity - The feature that makes dynamic web applications possible

- The Event Loop - JavaScript's triage

- Microtask queue, Callback queue, and Web Browser features (APIs) - [here's an article that goes into further detail](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

JavaScript is a synchronous language. This means that only one task can be run at a time, or only one line of code is executed at a time.

### Asynchronicity in JavaScript

Asynchronicity is the backbone of modern web development in JavaScript yet...

JavaScript is:

- Single threaded (one command runs at a time)

- Synchronously executed (each line is run in the order it appears in the code)

So what if we have a task:

- Accessing Twitter's server to get new tweets that takes a long time

- Code we want to run using those tweets

Challenge: We want to wait for the tweets to be stores in tweets so that they're there to run displayTweets on - but no code can run in the meantime

{% highlight javascript %}

// Slow function blocks further code from running

const tweets = getTweets("http://twitter.com/potus")

// 350ms wait while the request is sent to Twitter servers

displayTweets(tweets)

// more code to run

console.log('I am waiting for getTweets...')

{% endhighlight %}

JavaScript is not enough - we need new pieces (some of which are not JavaScript at all)

Our core JavaScript engine has 3 main parts:

- Thread of execution

- Memory / Variable Environment

- Call stack

We need to add some new components:

- Web Browser APIs / Node background APIs

- Promises

- Event Loop, Callback / Task queue, and micro task queue

### Asynchronous Browser Features

ES5 Solution: Introducing Callback Functions and Web Browser APIs

Web Browsers have Dev Tools (Console), Sockets, the ability to make Network Requests, and they can Render the HTML DOM (Document Object Model). We cannot (in JavaScript) code for these directly, but JavaScript can interface with them. JavaScript has 'labels' for each of the web browser 'features', that allow JavaScript to interact with them. i.e. setTimeout can use the browsers 'timer' function. 'document' is another web browser feature that allows JavaScript to interact with it.

### Web API Example

This section is focused on setTimeout which is not a feature of JavaScript, but a way for JavaScript to interface with a web browser(s) `timer` API - [more details on MDN](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)

`setTimeout` takes a number of arguments, but this focused on passing in a function and a number which represents the amount of time, in milliseconds, before the function will run i.e. `setTimeout(myFunction, 1000)`

`setTimeout` will start a timer at 0s and when it meets the argument `1000(ms)`, it will invoke the function `myFunction`

### Web API Rules

### Callback Queue & Event Loop

### Callback Queue & Event Loop Q&A

### Callback Hell & Async Exercises

## Promises

### Promises Introduction

### Promises Example: fetch

### Promises Example: then

### Web APIs & Promises Example: fetch

### Web APIs & Promises Example: then

### Web APIs & Promises Example: Microtask Queue

### Promises and Asynchronous Q&A

### Promises Review

## Classes & Prototypes

### Class & OOP Introduction

### Object Dot Notation

### Factory Functions

### Factory Functions Example

### Prototype Chain

### Prototype Chain Example: Prototypal Link

### Prototype Chain Example: Implicit Parameters

### hasOwnProperty Method

### this Keyword

### Arrow Function Scope & this

### Prototype Chain Review

### new Keyword

### new Keyword Example

### class Keyword

## Wrapping Up