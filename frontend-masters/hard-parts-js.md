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

[The link to the course document is here]('https://static.frontendmasters.com/resources/2019-09-18-javascript-hard-parts-v2/javascript-hard-parts-v2.pdf')

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

### Returning Functions

### Nested Function Scope

### Retaining Function Memory

### Function Closure

### Closure Q&A

### Closure Technical Definition & Review

### Multiple Closure Instances

### Practical Applications

### Closure Exercises

## Asynchronous JavaScript

### Single Threaded Execution Review

### Asynchronicity in JavaScript

### Asynchronous Browser Features

### Web API Example

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